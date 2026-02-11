"use client";

import { useState, useEffect } from "react";

interface InvestmentRoiCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function InvestmentRoiCalculator({ isOpen, onClose }: InvestmentRoiCalculatorProps) {
    // --- Purchase Details ---
    const [purchasePrice, setPurchasePrice] = useState(2500000);
    const [downpaymentPercent, setDownpaymentPercent] = useState(25);
    const [interestRate, setInterestRate] = useState(1.3);
    const [loanTenure, setLoanTenure] = useState(30);

    // --- Timeline ---
    // --- Timeline ---
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
    const [topDate, setTopDate] = useState("");
    const [holdingPeriod, setHoldingPeriod] = useState(8); // Years

    // --- Costs & Fees ---
    const [agentCommissionPercent, setAgentCommissionPercent] = useState(2);
    const [mcstFee, setMcstFee] = useState(500); // Monthly
    const [legalFee, setLegalFee] = useState(3000); // One-time estimate

    // --- Projections ---
    const [appreciationPreTop, setAppreciationPreTop] = useState(2); // % p.a.
    const [appreciationPostTop, setAppreciationPostTop] = useState(4); // % p.a.

    // --- Outputs ---
    const [totalCashOut, setTotalCashOut] = useState(0);
    const [netProfit, setNetProfit] = useState(0);
    const [roi, setRoi] = useState(0);
    const [annualizedRoi, setAnnualizedRoi] = useState(0);
    const [projectedSalePrice, setProjectedSalePrice] = useState(0);
    const [ssdAmount, setSsdAmount] = useState(0);
    const [outstandingLoanState, setOutstandingLoanState] = useState(0);

    // Initialize dates on mount
    useEffect(() => {
        const today = new Date();
        // Default TOP: 3 years from now
        const topYear = today.getFullYear() + 3;
        const topMonth = String(today.getMonth() + 1).padStart(2, '0');
        setTopDate(`${topYear}-${topMonth}`);
    }, []);

    useEffect(() => {
        if (isOpen) {
            calculateRoi();
        }
    }, [
        purchasePrice, downpaymentPercent, interestRate, loanTenure,
        purchaseDate, topDate, holdingPeriod,
        agentCommissionPercent, mcstFee, legalFee,
        appreciationPreTop, appreciationPostTop,
        isOpen
    ]);

    const calculateRoi = () => {
        const pDate = new Date(purchaseDate);

        // Handle TOP Date (YYYY-MM) safely
        let toDate = new Date();
        if (topDate) {
            const [y, m] = topDate.split('-').map(Number);
            // Month is 0-indexed in JS Date
            toDate = new Date(y, m - 1, 1);
        }

        // Calculate Sale Date based on Holding Period
        const sDate = new Date(pDate);
        sDate.setFullYear(sDate.getFullYear() + holdingPeriod);

        // Basic Validation
        if (sDate <= pDate) return;

        // --- 1. Initial Costs ---
        const downpaymentAmt = purchasePrice * (downpaymentPercent / 100);
        const loanAmount = purchasePrice - downpaymentAmt;

        // Auto-calculate BSD (2025/2026 Residential Rates)
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

        const initialCashOut = downpaymentAmt + bsd + legalFee;

        // --- 2. Monthly Outflows (Progressive Payment Simulation) ---
        let totalMonthlyOutflow = 0;
        let currentLoanDisbursed = 0;

        // Simplified Progressive Payment Schedule relative to Construction Phase (approximate)
        // We'll map the time between Purchase and TOP to stages.
        const monthsToTop = Math.max(1, (toDate.getTime() - pDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
        const monthsTopToSale = Math.max(0, (sDate.getTime() - toDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));

        // Calculate full monthly installment (standard amortization)
        const monthlyRate = interestRate / 100 / 12;
        const numPayments = loanTenure * 12;
        const fullMonthlyInstallment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

        // Pre-TOP Outflows
        // We assume a simplified S-curve or stepped disbursement roughly:
        // 0-20% time: 10% disbursed (Foundation)
        // 20-50% time: 30% disbursed (Reinf. Concrete)
        // 50-80% time: 65% disbursed (Brick walls etc)
        // 80-100% time: 85% disbursed (Roads/Drains/Carpark)
        // At TOP: 100% disbursed (CSC/Key Collection usually hits 100% soon after)

        for (let i = 1; i <= Math.floor(monthsToTop); i++) {
            const progress = i / monthsToTop;
            let disbursementRatio = 0;
            if (progress < 0.2) disbursementRatio = 0.10;
            else if (progress < 0.5) disbursementRatio = 0.30;
            else if (progress < 0.8) disbursementRatio = 0.65;
            else disbursementRatio = 0.85;

            // Interest only on disbursed amount
            const interestPayment = (loanAmount * disbursementRatio) * monthlyRate;
            totalMonthlyOutflow += interestPayment;
        }

        // Post-TOP Outflows
        for (let i = 1; i <= Math.floor(monthsTopToSale); i++) {
            // Full installment + MCST
            totalMonthlyOutflow += fullMonthlyInstallment + mcstFee;
        }

        const totalCashInvested = initialCashOut + totalMonthlyOutflow;

        // --- 3. Sale Proceeds & Final Calculations ---

        // Projected Sale Price
        // Years Pre-TOP
        const yearsPreTop = monthsToTop / 12;
        let valueAtTop = purchasePrice * Math.pow(1 + (appreciationPreTop / 100), yearsPreTop);

        // Years Post-TOP
        const yearsPostTop = monthsTopToSale / 12;
        const finalValue = valueAtTop * Math.pow(1 + (appreciationPostTop / 100), yearsPostTop);

        setProjectedSalePrice(finalValue);

        // Seller Stamp Duty (SSD)
        // Holding Period = Sale Date - Purchase Date
        const holdingPeriodYears = (sDate.getTime() - pDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        let ssdRate = 0;
        if (holdingPeriodYears <= 1) ssdRate = 0.16;
        else if (holdingPeriodYears <= 2) ssdRate = 0.12;
        else if (holdingPeriodYears <= 3) ssdRate = 0.08;
        else if (holdingPeriodYears <= 4) ssdRate = 0.04;
        else ssdRate = 0;

        const ssd = finalValue * ssdRate;
        setSsdAmount(ssd);

        const agentFee = finalValue * (agentCommissionPercent / 100);

        // Calculate Outstanding Loan Principal at point of sale
        // Post-TOP, we started paying principal.
        // Principal paid = Full Installment - Interest
        // Simplified: For the Pre-TOP period, assume Interest Only (no principal reduction).
        // For Post-TOP period, standard amortization principal reduction.
        let outstandingLoan = loanAmount;

        // Reduce principal for post-TOP months
        for (let i = 1; i <= Math.floor(monthsTopToSale); i++) {
            const interestPart = outstandingLoan * monthlyRate;
            const principalPart = fullMonthlyInstallment - interestPart;
            outstandingLoan -= principalPart;
        }

        // Net Proceeds from Sale
        const netProceeds = finalValue - outstandingLoan - ssd - agentFee;

        // Profit
        // We already deducted cash outflows? No.
        // Net Profit = (Net Proceeds) - (Total Cash Invested - PrincipalRepaid?)
        // Easier way: Net Profit = (Total In) - (Total Out)
        // Total In = Sale Price
        // Total Out = Initial Cash + Monthly Outflows (Interest+Principal+MCST) + Outstanding Loan Payoff + SSD + AgentFee
        // Wait, Monthly Outflows includes Principal. Outstanding Loan Payoff is the remainder.
        // So Sum(Monthly) + Outstanding + Initial = Total Cost to acquire and hold.

        const totalCost = totalCashInvested + outstandingLoan + ssd + agentFee;
        // Note: totalCashInvested includes the 'Downpayment'.
        // The 'LoanAmount' was borrowing. We pay back 'OutstandingLoan'.
        // The 'Principal' portion of monthly payments + 'OutstandingLoan' = Original Loan Amount.
        // So effectively Cost = Downpayment + Bsd + Legal + TotalInterestPaid + MCST + SSD + AgentFee + OriginalLoanAmount?
        // Let's stick to Cashflow:
        // Cash Out = Initial (Down+BSD+Legal) + Monthly (Inc Interest+Principal+MCST).
        // On Sale: We receive Sale Price. We pay back Outstanding Loan, SSD, Agent Fee.
        // Net Cash In Hand = SalePrice - OutstandingLoan - SSD - Agent Fee.
        // Net Profit = Net Cash In Hand - Total Cash Out (Initial + Monthly).

        const netCashInHand = finalValue - outstandingLoan - ssd - agentFee;
        const profit = netCashInHand - totalCashInvested;

        setTotalCashOut(totalCashInvested);
        setOutstandingLoanState(outstandingLoan);
        setNetProfit(profit);

        const roiVal = (profit / totalCashInvested) * 100;
        setRoi(roiVal);

        const annualized = (Math.pow(1 + (roiVal / 100), 1 / holdingPeriodYears) - 1) * 100;
        setAnnualizedRoi(annualized);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h3 className="text-xl font-bold">Investment ROI Simulator (BUC)</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* LEFT COLUMN: INPUTS */}
                    <div className="space-y-6">

                        <section>
                            <h4 className="text-sm font-black uppercase text-gray-400 tracking-wider mb-3">Purchase Details</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Price ($)</label>
                                    <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Downpay %</label>
                                        <input type="number" value={downpaymentPercent} onChange={e => setDownpaymentPercent(Number(e.target.value))} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Loan Tenure (Y)</label>
                                        <input type="number" value={loanTenure} onChange={e => setLoanTenure(Number(e.target.value))} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Interest Rate (%)</label>
                                    <input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm" />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h4 className="text-sm font-black uppercase text-gray-400 tracking-wider mb-3">Timeline</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Purchase Date</label>
                                    <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Expected TOP (Month/Year)</label>
                                    <input type="month" value={topDate} onChange={e => setTopDate(e.target.value)} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Holding Period (Years)</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            step="1"
                                            value={holdingPeriod}
                                            onChange={e => setHoldingPeriod(Number(e.target.value))}
                                            className="flex-1 cursor-pointer accent-primary"
                                        />
                                        <span className="font-bold text-primary w-8 text-center">{holdingPeriod}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h4 className="text-sm font-black uppercase text-gray-400 tracking-wider mb-3">Assumptions</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
                                    <label className="block text-xs font-bold text-yellow-700 dark:text-yellow-500 mb-1">Apprec. Pre-TOP (%)</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={appreciationPreTop}
                                        onChange={e => setAppreciationPreTop(Number(e.target.value))}
                                        className="w-full p-2 rounded border border-yellow-200 dark:border-yellow-800 bg-white dark:bg-gray-800 text-sm font-bold text-gray-800 dark:text-white"
                                    />
                                </div>
                                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
                                    <label className="block text-xs font-bold text-yellow-700 dark:text-yellow-500 mb-1">Apprec. Post-TOP (%)</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={appreciationPostTop}
                                        onChange={e => setAppreciationPostTop(Number(e.target.value))}
                                        className="w-full p-2 rounded border border-yellow-200 dark:border-yellow-800 bg-white dark:bg-gray-800 text-sm font-bold text-gray-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">MCST Fee ($/mo)</label>
                                    <input type="number" value={mcstFee} onChange={e => setMcstFee(Number(e.target.value))} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Agent Comm (%)</label>
                                    <input type="number" value={agentCommissionPercent} onChange={e => setAgentCommissionPercent(Number(e.target.value))} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm" />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: OUTPUTS */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 flex flex-col h-full">
                        <h4 className="text-lg font-black mb-6 text-gray-800 dark:text-white">Simulation Results</h4>

                        <div className="space-y-6 flex-1">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex justify-between items-baseline mb-1">
                                    <p className="text-xs text-gray-500 uppercase font-bold">Total Cash Outlay</p>
                                    <span className="text-[10px] text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded font-bold" title="Remaining loan amount at point of sale">
                                        Loan Bal: ${outstandingLoanState.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">${totalCashOut.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                <p className="text-[10px] text-gray-400 mt-1">Includes Downpayment, BSD, Legal, Interest, MCST & Principal Repaid</p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Projected Sale Price</p>
                                <p className="text-2xl font-bold text-primary">${projectedSalePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">SSD Payable</p>
                                    <p className="text-lg font-bold text-red-500">${ssdAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Net Profit</p>
                                    <p className={`text-lg font-bold ${netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>${netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                </div>
                            </div>

                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-green-700 dark:text-green-400 uppercase font-bold">Total ROI</p>
                                    <p className="text-2xl font-black text-green-600 dark:text-green-400">{roi.toFixed(1)}%</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-green-700 dark:text-green-400 uppercase font-bold">Annualized</p>
                                    <p className="text-xl font-black text-green-600 dark:text-green-400">{annualizedRoi.toFixed(1)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                        Disclaimer: This simulation provides estimates based on current market assumptions and 2026 regulations. Actual returns may vary due to market fluctuations, policy changes, and specific property attributes. Book an appointment for personalized advice.
                    </p>
                </div>
            </div>
        </div >
    );
}
