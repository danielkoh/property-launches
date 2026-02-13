"use client";

import { useState, useEffect } from "react";

interface EcViabilityCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EcViabilityCalculator({ isOpen, onClose }: EcViabilityCalculatorProps) {
    // --- Inputs ---
    const [purchasePrice, setPurchasePrice] = useState(1500000);
    const [householdIncome, setHouseholdIncome] = useState(12000);
    const [citizenshipProfile, setCitizenshipProfile] = useState("SC+SC"); // SC+SC, SC+SPR, SC+FR (Not eligible), Others
    const [hasPrivateProperty, setHasPrivateProperty] = useState(false);
    const [cashAvailable, setCashAvailable] = useState(100000);
    const [cpfAvailable, setCpfAvailable] = useState(300000);

    // --- Outputs ---
    const [isEligible, setIsEligible] = useState(true);
    const [eligibilityIssues, setEligibilityIssues] = useState<string[]>([]);
    const [maxLoanAmount, setMaxLoanAmount] = useState(0);
    const [monthlyInstallment, setMonthlyInstallment] = useState(0);
    const [cashOutlay, setCashOutlay] = useState({
        minCash5: 0,
        balanceDown20: 0,
        bsd: 0,
        legalFee: 3000,
        totalInitial: 0
    });
    const [shortfall, setShortfall] = useState(0);
    const [cashShortfall, setCashShortfall] = useState(0);

    // --- Constants ---
    const INCOME_CEILING = 16000;
    const MSR_LIMIT = 0.30; // 30% MSR
    const INTEREST_RATE = 4.0; // MAS Floor Rate for MSR calculation is higher than market rate
    const LOAN_TENURE = 30;

    useEffect(() => {
        if (isOpen) {
            calculateViability();
        }
    }, [
        purchasePrice, householdIncome, citizenshipProfile,
        purchasePrice, householdIncome, citizenshipProfile,
        hasPrivateProperty, cashAvailable, cpfAvailable, isOpen
    ]);

    const calculateViability = () => {
        const issues: string[] = [];
        let eligible = true;

        // 1. Eligibility Checks
        if (citizenshipProfile === "Others" || citizenshipProfile === "SC+FR") {
            issues.push("Must be a Singaporean household (SC+SC or SC+SPR).");
            eligible = false;
        }

        if (householdIncome > INCOME_CEILING) {
            issues.push(`Household income exceeds the $${INCOME_CEILING.toLocaleString()} ceiling.`);
            eligible = false;
        }

        if (hasPrivateProperty) {
            issues.push("Must satisfy 30-month wait-out period after disposing private property.");
            eligible = false;
        }

        setIsEligible(eligible);
        setEligibilityIssues(issues);

        // 2. Financial Calculations (MSR)
        // MSR Formula: Monthly Repayment cannot exceed 30% of Gross Income
        const maxMonthlyRepayment = householdIncome * MSR_LIMIT;

        // Calculate Max Loan based on MSR
        // PV = PMT * (1 - (1 + r)^-n) / r
        const r = INTEREST_RATE / 100 / 12;
        const n = LOAN_TENURE * 12;

        const maxLoan = (maxMonthlyRepayment * (1 - Math.pow(1 + r, -n))) / r;

        // Cap max loan at 75% of Purchase Price (LTV)
        const ltvLimit = purchasePrice * 0.75;
        const finalMaxLoan = Math.min(maxLoan, ltvLimit);

        setMaxLoanAmount(finalMaxLoan);

        // Required Downpayment and Costs
        // 5% minimum cash
        const minCash5 = purchasePrice * 0.05;
        // 20% remaining downpayment (CPF/Cash)
        const balanceDown20 = purchasePrice * 0.20;

        // Buyer Stamp Duty (BSD) - residential rates
        let bsd = 0;
        let remaining = purchasePrice;
        const tiers = [
            { limit: 180000, rate: 0.01 },
            { limit: 180000, rate: 0.02 },
            { limit: 640000, rate: 0.03 },
            { limit: 500000, rate: 0.04 },
            { limit: 1500000, rate: 0.05 },
            { limit: Infinity, rate: 0.06 }
        ];
        for (const tier of tiers) {
            if (remaining <= 0) break;
            const amount = Math.min(remaining, tier.limit);
            bsd += amount * tier.rate;
            remaining -= amount;
        }

        const legalFee = 3000;
        const totalInitial = minCash5 + balanceDown20 + bsd + legalFee;

        setCashOutlay({
            minCash5,
            balanceDown20,
            bsd,
            legalFee,
            totalInitial
        });

        // 3. Shortfall Calculation
        // Total Cost = Price + BSD + Legal
        // Resources = Max Loan + Funds Available
        // Note: Funds Available needs to cover the Downpayment + BSD + Legal + any amount loan doesn't cover
        // Actually simpler:
        // Price must be covered by: Loan + CPF + Cash
        // Shortfall = (Purchase Price + BSD + Legal) - (Max Loan + Funds Available)
        // BUT: User must have minimum 5% cash.
        // Let's assume 'Funds Available' includes the Cash portion for simplicity,
        // or check if Funds Available >= Downpayment + BSD + Legal.

        const totalCostToCheck = purchasePrice + bsd + legalFee;
        const totalResources = finalMaxLoan + cashAvailable + cpfAvailable;

        let shortfallVal = totalCostToCheck - totalResources;
        if (shortfallVal < 0) shortfallVal = 0;

        setShortfall(shortfallVal);

        // Check specifically for 5% Cash Shortfall
        let cashShort = minCash5 - cashAvailable;
        if (cashShort < 0) cashShort = 0;
        setCashShortfall(cashShort);

        // Calculate actual monthly installment if borrowing max
        setMonthlyInstallment(maxMonthlyRepayment);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        Executive Condo Viability
                        <span className="text-[10px] font-bold text-white bg-primary px-2 py-1 rounded uppercase tracking-wider shadow-lg shadow-primary/20">
                            New Launch Only
                        </span>
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* INPUTS */}
                    <div className="space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                            <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">verified</span>
                                Why Buy an Executive Condo?
                            </h4>
                            <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
                                <li>
                                    <strong>No ABSD</strong> for HDB Upgraders (Dispose HDB within 6 months).
                                </li>
                                <li>
                                    <strong>Deferred Payment Scheme</strong> available (Pay 20% down, $0 until TOP).
                                </li>
                            </ul>
                        </div>

                        <section>
                            <h4 className="text-sm font-black uppercase text-gray-400 tracking-wider mb-3">Profile</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Citizenship</label>
                                    <select
                                        value={citizenshipProfile}
                                        onChange={e => setCitizenshipProfile(e.target.value)}
                                        className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm"
                                    >
                                        <option value="SC+SC">SC + SC Household</option>
                                        <option value="SC+SPR">SC + SPR Household</option>
                                        <option value="SC+FR">SC + Foreigner (Ineligible)</option>
                                        <option value="Others">Others / Single</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                                        Household Income ($/mo)
                                    </label>
                                    <input
                                        type="number"
                                        value={householdIncome}
                                        onChange={e => setHouseholdIncome(Number(e.target.value))}
                                        className={`w-full p-2 rounded border ring-offset-0 focus:ring-0 text-sm ${householdIncome > 16000 ? 'border-red-300 bg-red-50 text-red-900' : 'border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700'}`}
                                    />
                                    {householdIncome > 16000 && (
                                        <p className="text-[10px] text-red-500 mt-1">Exceeds $16,000 ceiling</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        id="hasProp"
                                        checked={hasPrivateProperty}
                                        onChange={e => setHasPrivateProperty(e.target.checked)}
                                        className="rounded text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="hasProp" className="text-xs text-gray-600 dark:text-gray-300">
                                        Owns private property / disposed within 30 months
                                    </label>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h4 className="text-sm font-black uppercase text-gray-400 tracking-wider mb-3">Financials</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Target EC Price ($)</label>
                                    <input
                                        type="number"
                                        value={purchasePrice}
                                        onChange={e => setPurchasePrice(Number(e.target.value))}
                                        className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                                            Cash Savings ($)
                                        </label>
                                        <input
                                            type="number"
                                            value={cashAvailable}
                                            onChange={e => setCashAvailable(Number(e.target.value))}
                                            className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                                            CPF OA ($)
                                        </label>
                                        <input
                                            type="number"
                                            value={cpfAvailable}
                                            onChange={e => setCpfAvailable(Number(e.target.value))}
                                            className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* OUTPUTS */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 flex flex-col h-full">
                        <div className="mb-6">
                            <h4 className="text-lg font-black text-gray-800 dark:text-white mb-2">Assessment</h4>
                            {isEligible ? (
                                <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined">check_circle</span>
                                    Eligible to Purchase
                                </div>
                            ) : (
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-bold">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="material-symbols-outlined">cancel</span>
                                        Not Eligible
                                    </div>
                                    <ul className="list-disc list-inside text-xs opacity-90">
                                        {eligibilityIssues.map((issue, idx) => (
                                            <li key={idx}>{issue}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {isEligible && (
                            <div className="space-y-6 flex-1">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Max Loan (MSR 30%)</p>
                                    <p className="text-2xl font-bold text-primary">
                                        ${maxLoanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </p>
                                    <p className="text-[10px] text-gray-400 mt-1">
                                        Est. Monthly: ${monthlyInstallment.toLocaleString(undefined, { maximumFractionDigits: 0 })} (based on 4.0% interest)
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">Initial Cash/CPF Outlay</p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>5% Cash (Mandatory)</span>
                                            <span className="font-bold">${cashOutlay.minCash5.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                            <span>20% Downpayment</span>
                                            <span>${cashOutlay.balanceDown20.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                            <span>Est. Buyer Stamp Duty</span>
                                            <span>${cashOutlay.bsd.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                            <span>Legal Fees (Est)</span>
                                            <span>${cashOutlay.legalFee.toLocaleString()}</span>
                                        </div>
                                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold">
                                            <span>Total Initial Required</span>
                                            <span>${cashOutlay.totalInitial.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-lg border ${shortfall > 0 ? 'bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-800' : 'bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-800'}`}>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-xs font-bold uppercase ${shortfall > 0 || cashShortfall > 0 ? 'text-red-700' : 'text-green-700'}`}>
                                            {shortfall > 0 ? 'Total Shortfall' : (cashShortfall > 0 ? 'Cash Shortfall' : 'Surplus Funds')}
                                        </span>
                                        <div className="text-right">
                                            <span className={`text-xl font-black block ${shortfall > 0 || cashShortfall > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {shortfall > 0 ? `$${shortfall.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : (cashShortfall > 0 ? 'Insufficient Cash' : 'OK')}
                                            </span>
                                            {cashShortfall > 0 && shortfall === 0 && (
                                                <span className="text-xs text-red-500 font-bold">
                                                    Short by ${cashShortfall.toLocaleString(undefined, { maximumFractionDigits: 0 })} (5% rule)
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {shortfall > 0 && (
                                        <p className="text-[10px] text-red-600 mt-1 leading-tight">
                                            You need more cash/CPF to cover the gap between the purchase price and your max loan eligibility.
                                            {cashShortfall > 0 && ` Also, you are short of the 5% cash downpayment by $${cashShortfall.toLocaleString()}.`}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
