"use client";

import { useState, useEffect } from "react";

interface HouseholdIncomeCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HouseholdIncomeCalculator({ isOpen, onClose }: HouseholdIncomeCalculatorProps) {
    const [price, setPrice] = useState(2000000);
    const [tenure, setTenure] = useState(30);
    const [interestRate, setInterestRate] = useState(4.0);
    const [downpaymentPercent, setDownpaymentPercent] = useState(25);
    const [monthlyDebt, setMonthlyDebt] = useState(0);
    const [requiredIncome, setRequiredIncome] = useState(0);
    const [monthlyMortgage, setMonthlyMortgage] = useState(0);

    useEffect(() => {
        if (isOpen) {
            calculateIncome();
        }
    }, [price, tenure, interestRate, downpaymentPercent, monthlyDebt, isOpen]);

    const calculateIncome = () => {
        const principal = price * (1 - downpaymentPercent / 100);
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = tenure * 12;

        let mortgage = 0;
        if (monthlyRate === 0) {
            mortgage = principal / numberOfPayments;
        } else {
            mortgage =
                (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        setMonthlyMortgage(mortgage);

        // TDSR Calculation (Total Debt Servicing Ratio) - 55% Limit
        // (Mortgage + Other Debts) / Income <= 0.55
        // Income >= (Mortgage + Other Debts) / 0.55
        const totalMonthlyObligations = mortgage + monthlyDebt;
        const incomeNeeded = totalMonthlyObligations / 0.55;

        setRequiredIncome(incomeNeeded);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700 shrink-0">
                    <h3 className="text-xl font-bold">Household Income Req.</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Output Display */}
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">
                            Required Monthly Household Income
                        </p>
                        <p className="text-4xl font-black text-primary">
                            ${requiredIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                            Based on TDSR of 55% (Private Property Limit)
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">Est. Monthly Mortgage</span>
                        <span className="font-bold text-gray-900 dark:text-white">${monthlyMortgage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Property Price ($)
                            </label>
                            <input
                                type="text"
                                value={price.toLocaleString()}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/,/g, '');
                                    if (!isNaN(Number(value))) {
                                        setPrice(Number(value));
                                    }
                                }}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Downpayment (%)
                                </label>
                                <input
                                    type="number"
                                    value={downpaymentPercent}
                                    onChange={(e) => setDownpaymentPercent(Number(e.target.value))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Interest Rate (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={interestRate}
                                    disabled
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Other Monthly Debt Payments ($)
                            </label>
                            <input
                                type="number"
                                value={monthlyDebt}
                                onChange={(e) => setMonthlyDebt(Number(e.target.value))}
                                placeholder="Car loans, study loans, credit cards..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <p className="text-[10px] text-gray-400 mt-1">Include car loans, study loans, credit card min payments etc.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Loan Tenure (Years)
                            </label>
                            <input
                                type="range"
                                min="5"
                                max="35"
                                value={tenure}
                                onChange={(e) => setTenure(Number(e.target.value))}
                                className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                            <div className="text-right text-sm font-bold text-primary mt-1">
                                {tenure} Years
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shrink-0">
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={() => {
                                onClose();
                                window.location.hash = "vvip-registration";
                            }}
                            className="text-primary text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-none p-0"
                        >
                            <span className="material-symbols-outlined text-sm">chat</span>
                            Need help working out the sums? Contact us
                        </button>
                    </div>
                    <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                        Disclaimer: This calculation assumes a Total Debt Servicing Ratio (TDSR) limit of 55%. Interest rates are stressed at 4.0% per MAS guidelines for calculating loan eligibility. Actual eligiblity may vary based on credit score, employment status and bank policies.
                    </p>
                </div>
            </div>
        </div>
    );
}
