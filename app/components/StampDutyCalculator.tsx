"use client";

import { useState, useEffect } from "react";

interface StampDutyCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

type ResidencyStatus = "SC" | "PR" | "FR" | "ENTITY";

export default function StampDutyCalculator({ isOpen, onClose }: StampDutyCalculatorProps) {
    const [price, setPrice] = useState(2500000);
    const [residency, setResidency] = useState<ResidencyStatus>("SC");
    const [propertyCount, setPropertyCount] = useState(0); // 0 means buying 1st property
    const [isFTA, setIsFTA] = useState(false);

    const [bsd, setBsd] = useState(0);
    const [absd, setAbsd] = useState(0);
    const [totalTax, setTotalTax] = useState(0);

    useEffect(() => {
        if (isOpen) {
            calculateStampDuty();
        }
    }, [price, residency, propertyCount, isFTA, isOpen]);

    const calculateBSD = (price: number) => {
        let tax = 0;
        let remaining = price;

        // Rate 1%: First $180,000
        const tier1 = Math.min(remaining, 180000);
        tax += tier1 * 0.01;
        remaining -= tier1;
        if (remaining <= 0) return tax;

        // Rate 2%: Next $180,000
        const tier2 = Math.min(remaining, 180000);
        tax += tier2 * 0.02;
        remaining -= tier2;
        if (remaining <= 0) return tax;

        // Rate 3%: Next $640,000
        const tier3 = Math.min(remaining, 640000);
        tax += tier3 * 0.03;
        remaining -= tier3;
        if (remaining <= 0) return tax;

        // Rate 4%: Next $500,000
        const tier4 = Math.min(remaining, 500000);
        tax += tier4 * 0.04;
        remaining -= tier4;
        if (remaining <= 0) return tax;

        // Rate 5%: Next $1,500,000
        const tier5 = Math.min(remaining, 1500000);
        tax += tier5 * 0.05;
        remaining -= tier5;
        if (remaining <= 0) return tax;

        // Rate 6%: Remaining Amount
        tax += remaining * 0.06;

        return tax;
    };

    const calculateABSD = (price: number, residency: ResidencyStatus, count: number, isFTA: boolean) => {
        // Treat FTA eligible foreigners as SC
        const effectiveResidency = (residency === "FR" && isFTA) ? "SC" : residency;

        let rate = 0;

        if (effectiveResidency === "SC") {
            if (count === 0) rate = 0; // 1st property
            else if (count === 1) rate = 0.20; // 2nd property
            else rate = 0.30; // 3rd and subsequent
        } else if (effectiveResidency === "PR") {
            if (count === 0) rate = 0.05; // 1st property
            else if (count === 1) rate = 0.30; // 2nd property
            else rate = 0.35; // 3rd and subsequent
        } else if (effectiveResidency === "FR") {
            rate = 0.60;
        } else if (effectiveResidency === "ENTITY") {
            rate = 0.65;
        }

        return price * rate;
    };

    const calculateStampDuty = () => {
        const calculatedBSD = calculateBSD(price);
        const calculatedABSD = calculateABSD(price, residency, propertyCount, isFTA);

        setBsd(calculatedBSD);
        setAbsd(calculatedABSD);
        setTotalTax(calculatedBSD + calculatedABSD);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h3 className="text-xl font-bold">Stamp Duty Calculator</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Output Display */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl space-y-4">
                        <div className="text-center pb-4 border-b border-blue-100 dark:border-blue-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">
                                Total Tax Payable
                            </p>
                            <p className="text-4xl font-black text-primary">
                                ${totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">BSD</p>
                                <p className="text-lg font-bold text-gray-700 dark:text-gray-200">${bsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">ABSD</p>
                                <p className="text-lg font-bold text-gray-700 dark:text-gray-200">${absd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                            </div>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Purchase Price ($)
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Residency Status
                            </label>
                            <select
                                value={residency}
                                onChange={(e) => setResidency(e.target.value as ResidencyStatus)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                            >
                                <option value="SC">Singapore Citizen</option>
                                <option value="PR">Permanent Resident</option>
                                <option value="FR">Foreigner</option>
                                <option value="ENTITY">Entity (Company/Trust)</option>
                            </select>
                        </div>

                        {residency === "FR" && (
                            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <input
                                    type="checkbox"
                                    id="ftaCheck"
                                    checked={isFTA}
                                    onChange={(e) => setIsFTA(e.target.checked)}
                                    className="mt-1 w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                                />
                                <label htmlFor="ftaCheck" className="text-sm text-gray-600 dark:text-gray-300 leading-snug cursor-pointer">
                                    <span className="font-bold">FTA Eligible?</span>
                                    <br />
                                    <span className="text-xs text-gray-500">I am a National of USA, or National/PR of Iceland, Liechtenstein, Norway, or Switzerland.</span>
                                </label>
                            </div>
                        )}

                        {residency !== "ENTITY" && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Number of Attributes Owned
                                </label>
                                <p className="text-xs text-gray-500 mb-2">Count of residential properties currently owned in Singapore.</p>
                                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                    {[0, 1, 2].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setPropertyCount(count)}
                                            className={`flex-1 py-1.5 rounded-md text-sm font-bold transition-all ${propertyCount === count
                                                ? "bg-white dark:bg-gray-600 shadow-sm text-primary"
                                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                                                }`}
                                        >
                                            {count === 2 ? "2+" : count}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                        Disclaimer: This calculator provides estimates based on current IRAS rates (2026 baseline). Actual stamp duty may vary based on specific circumstances. Please verify with IRAS or a legal professional.
                    </p>
                </div>
            </div>
        </div>
    );
}
