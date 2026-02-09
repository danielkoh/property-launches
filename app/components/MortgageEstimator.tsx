"use client";

import { useState, useEffect } from "react";

interface MortgageEstimatorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MortgageEstimator({ isOpen, onClose }: MortgageEstimatorProps) {
    const [price, setPrice] = useState(1500000);
    const [tenure, setTenure] = useState(30);
    const [interestRate, setInterestRate] = useState(3.5);
    const [downpaymentPercent, setDownpaymentPercent] = useState(25);
    const [monthlyRepayment, setMonthlyRepayment] = useState(0);

    useEffect(() => {
        if (isOpen) {
            calculateMortgage();
        }
    }, [price, tenure, interestRate, downpaymentPercent, isOpen]);

    const calculateMortgage = () => {
        const principal = price * (1 - downpaymentPercent / 100);
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = tenure * 12;

        if (monthlyRate === 0) {
            setMonthlyRepayment(principal / numberOfPayments);
        } else {
            const repayment =
                (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
            setMonthlyRepayment(repayment);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold">Mortgage Estimator</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Output Display */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">
                            Estimated Monthly Repayment
                        </p>
                        <p className="text-4xl font-black text-primary">
                            ${monthlyRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                            Based on loan amount of ${(price * (1 - downpaymentPercent / 100)).toLocaleString()}
                        </p>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Property Price ($)
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
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
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
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

                <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                        Disclaimer: Before committing to any property purchase, please consult a banker for an In-Principle Approval (IPA) on your loan. This calculator provides estimates only based on standard bank loan formulas and does not guarantee loan approval or specific rates.
                    </p>
                </div>
            </div>
        </div>
    );
}
