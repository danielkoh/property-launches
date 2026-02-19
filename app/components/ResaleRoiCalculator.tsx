"use client";

import { useState, useEffect } from "react";

interface ResaleRoiCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResaleRoiCalculator({ isOpen, onClose }: ResaleRoiCalculatorProps) {
    // --- Purchase Details ---
    const [purchasePrice, setPurchasePrice] = useState(2500000);
    const [downpaymentPercent, setDownpaymentPercent] = useState(25);
    const [interestRate, setInterestRate] = useState(1.4);
    const [loanTenure, setLoanTenure] = useState(30);

    // --- Timeline ---
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
    const [holdingPeriod, setHoldingPeriod] = useState(8); // Years

    // --- Costs & Fees ---
    const [agentCommissionPercent, setAgentCommissionPercent] = useState(2);
    const [mcstFee, setMcstFee] = useState(500); // Monthly
    const [legalFee, setLegalFee] = useState(3000); // One-time estimate
    const [renovationCost, setRenovationCost] = useState(50000); // Resale often needs reno

    // --- Projections ---
    const [appreciationRate, setAppreciationRate] = useState(3); // % p.a.
    const [monthlyRentalIncome, setMonthlyRentalIncome] = useState(4000);

    // --- Outputs ---
    const [totalCashOut, setTotalCashOut] = useState(0);
    const [netProfit, setNetProfit] = useState(0);
    const [roi, setRoi] = useState(0);
    const [annualizedRoi, setAnnualizedRoi] = useState(0);
    const [projectedSalePrice, setProjectedSalePrice] = useState(0);
    const [ssdAmount, setSsdAmount] = useState(0);
    const [outstandingLoanState, setOutstandingLoanState] = useState(0);
    const [cashProceeds, setCashProceeds] = useState(0);

    useEffect(() => {
        if (isOpen) {
            calculateRoi();
        }
    }, [
        purchasePrice, downpaymentPercent, interestRate, loanTenure,
        purchaseDate, holdingPeriod,
        agentCommissionPercent, mcstFee, legalFee, renovationCost,
        appreciationRate, monthlyRentalIncome,
        isOpen
    ]);

    const calculateRoi = () => {
        const pDate = new Date(purchaseDate);

        // Calculate Sale Date based on Holding Period
        const sDate = new Date(pDate);
        sDate.setFullYear(sDate.getFullYear() + holdingPeriod);

        // Basic Validation
        if (sDate <= pDate) return;

        // --- 1. Initial Costs ---
        const downpaymentAmt = purchasePrice * (downpaymentPercent / 100);
        const loanAmount = purchasePrice - downpaymentAmt;

        // Auto-calculate BSD (Residential Rates)
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

        const initialCashOut = downpaymentAmt + bsd + legalFee + renovationCost;

        // --- 2. Monthly Outflows (Full Loan) ---
        let totalMonthlyNetCashflow = 0; // Negative means cost, Positive means profit

        const monthlyRate = interestRate / 100 / 12;
        const numPayments = loanTenure * 12;

        let fullMonthlyInstallment = 0;
        if (monthlyRate > 0) {
            fullMonthlyInstallment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        } else {
            fullMonthlyInstallment = loanAmount / numPayments;
        }

        const totalMonths = holdingPeriod * 12;

        // Calculate total monthly impact
        for (let i = 1; i <= totalMonths; i++) {
            const monthlyCost = fullMonthlyInstallment + mcstFee;
            const netMonthly = monthlyRentalIncome - monthlyCost;
            totalMonthlyNetCashflow += netMonthly;
        }

        // --- 3. Sale Proceeds & Final Calculations ---

        // Projected Sale Price
        const finalValue = purchasePrice * Math.pow(1 + (appreciationRate / 100), holdingPeriod);
        setProjectedSalePrice(finalValue);

        // Seller Stamp Duty (SSD)
        // Holding Period = Sale Date - Purchase Date
        let ssdRate = 0;
        if (holdingPeriod < 1) ssdRate = 0.16;
        else if (holdingPeriod < 2) ssdRate = 0.12;
        else if (holdingPeriod < 3) ssdRate = 0.08;
        else if (holdingPeriod < 4) ssdRate = 0.04;
        else ssdRate = 0;

        const ssd = finalValue * ssdRate;
        setSsdAmount(ssd);

        const agentFee = finalValue * (agentCommissionPercent / 100);

        // Calculate Outstanding Loan Principal at point of sale
        let outstandingLoan = loanAmount;
        // Reduce principal for all months
        for (let i = 1; i <= totalMonths; i++) {
            const interestPart = outstandingLoan * monthlyRate;
            const principalPart = fullMonthlyInstallment - interestPart;
            outstandingLoan -= principalPart;
        }
        if (outstandingLoan < 0) outstandingLoan = 0;

        // Net Proceeds from Sale (Cash received from selling)
        const netCashFromSale = finalValue - outstandingLoan - ssd - agentFee;

        // Total Cash Invested concept for ROI:
        // Strictly, ROI = (Total Net Profit) / (Total Invested Capital)
        // Total Invested Capital = Initial Cash Out + Any negative monthly cashflows (top-ups)
        // This is a more accurate "Cash on Cash" ROI.

        let totalCashInvested = initialCashOut;
        let cumulativeCashflow = 0;

        // Let's refine the loop to track exact cash invested
        // reset loan for distinct calculation loop if needed, but we can do simple sum for now
        // if we assume constant rental and payment.

        const monthlyNet = monthlyRentalIncome - (fullMonthlyInstallment + mcstFee);
        if (monthlyNet < 0) {
            // We are topping up every month
            totalCashInvested += Math.abs(monthlyNet) * totalMonths;
        } else {
            // We are positive cashflow. This doesn't increase investment.
            // It potentially returns capital?
            // For ROI calculation, we typically use the denominator as the "Max Capital Employed".
            // Since it's uniform, Initial is the max if monthly is positive.
        }

        // Total Profit = Net Cash From Sale + Sum of All Monthly Net Cashflows - Initial Cash Out
        // Wait. 
        // Net Position = (Cash In Hand at End) + (Cumulative Cashflow during hold) - (Initial Cash Out).
        // Cash In Hand at End = netCashFromSale.
        // Cumulative Cashflow = monthlyNet * totalMonths.
        // Initial Cash Out = downpayment + renovation + fees.

        const totalProfit = netCashFromSale + (monthlyNet * totalMonths) - initialCashOut;

        // Does this match? 
        // Example: Buy 1M. Down 250k. Fees 50k. Initial 300k.
        // Monthly net = +1k. Hold 10 months. +10k.
        // Sell for 1.1M. Outstanding 700k. Fees 20k.
        // Net Cash Sale = 1.1M - 700k - 20k = 380k.
        // Previous logic: Net Profit = 380k + 10k - 300k = 90k.
        // Change in wealth: 
        // Start: -300k.
        // During: +10k.
        // End: +380k.
        // Net: +90k. Correct.

        setTotalCashOut(totalCashInvested);
        setOutstandingLoanState(outstandingLoan);
        setNetProfit(totalProfit);
        setCashProceeds(netCashFromSale);

        const roiVal = (totalProfit / totalCashInvested) * 100;
        setRoi(roiVal);

        const annualized = (Math.pow(1 + (roiVal / 100), 1 / holdingPeriod) - 1) * 100;
        setAnnualizedRoi(annualized);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h3 className="text-xl font-bold">Resale ROI Simulator</h3>
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
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Holding Period (Years)</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="1"
                                            max="20"
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
                                    <label className="block text-xs font-bold text-yellow-700 dark:text-yellow-500 mb-1">Appreciation (%)</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={appreciationRate}
                                        onChange={e => setAppreciationRate(Number(e.target.value))}
                                        className="w-full p-2 rounded border border-yellow-200 dark:border-yellow-800 bg-white dark:bg-gray-800 text-sm font-bold text-gray-800 dark:text-white"
                                    />
                                </div>
                                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
                                    <label className="block text-xs font-bold text-yellow-700 dark:text-yellow-500 mb-1">Monthly Rent ($)</label>
                                    <input
                                        type="number"
                                        value={monthlyRentalIncome}
                                        onChange={e => setMonthlyRentalIncome(Number(e.target.value))}
                                        className="w-full p-2 rounded border border-yellow-200 dark:border-yellow-800 bg-white dark:bg-gray-800 text-sm font-bold text-gray-800 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">MCST Fee ($/mo)</label>
                                    <input type="number" value={mcstFee} onChange={e => setMcstFee(Number(e.target.value))} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Reno Cost ($)</label>
                                    <input type="number" value={renovationCost} onChange={e => setRenovationCost(Number(e.target.value))} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm" />
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
                                    <p className="text-xs text-gray-500 uppercase font-bold">Total Cash Invested</p>
                                    <span className="text-[10px] text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded font-bold" title="Remaining loan amount at point of sale">
                                        Loan Bal: ${outstandingLoanState.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">${totalCashOut.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                <p className="text-[10px] text-gray-400 mt-1">Initial (Down+Fees+Reno) + Monthly Top-ups (if any)</p>
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

                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Cash/CPF Proceeds</p>
                                <p className="text-lg font-bold text-gray-800 dark:text-white">${cashProceeds.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                <p className="text-[10px] text-gray-400 mt-1">Cash you get back after paying loan & fees (from sale)</p>
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
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={() => {
                                onClose();
                                window.location.hash = "vvip-registration";
                            }}
                            className="text-primary text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-none p-0"
                        >
                            <span className="material-symbols-outlined text-sm">chat</span>
                            Want a detailed investment analysis? Contact us
                        </button>
                    </div>
                    <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                        Disclaimer: This simulation provides estimates based on current market assumptions and 2026 regulations. Actual returns may vary due to market fluctuations, policy changes, and specific property attributes. Book an appointment for personalized advice.
                    </p>
                </div>
            </div>
        </div >
    );
}
