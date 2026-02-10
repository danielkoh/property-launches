"use client";

import { useState, useEffect } from "react";

interface ProgressionPlannerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProgressionPlanner({ isOpen, onClose }: ProgressionPlannerProps) {
    // --- Inputs ---
    const [purchasePrice, setPurchasePrice] = useState(2500000);
    const [loanPercent, setLoanPercent] = useState(75);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // Option Date
    const [topDate, setTopDate] = useState(""); // Expected TOP

    // --- State for calculated timeline ---
    const [timeline, setTimeline] = useState<any[]>([]);

    useEffect(() => {
        // Default TOP to 3 years from now
        const today = new Date();
        const topYear = today.getFullYear() + 3;
        const topMonth = String(today.getMonth() + 1).padStart(2, '0');
        setTopDate(`${topYear}-${topMonth}`);
    }, []);

    useEffect(() => {
        calculateTimeline();
    }, [purchasePrice, loanPercent, startDate, topDate]);

    const calculateTimeline = () => {
        if (!startDate || !topDate) return;

        const start = new Date(startDate);
        // Parse TOP (YYYY-MM)
        const [topY, topM] = topDate.split('-').map(Number);
        const top = new Date(topY, topM - 1, 1);

        if (top <= start) return;

        // Standard BUC Schedule
        // 1. Booking (5%) - Now
        // 2. S&P / Stamp Duty (15% + BSD/ABSD) - +8 weeks
        // 3. Foundation (10%)
        // 4. Reinf. Concrete (10%)
        // 5. Partition Walls (5%)
        // 6. Roofing (5%)
        // 7. Door/Window/Wiring (5%)
        // 8. Carpark/Roads (5%)
        // 9. TOP (25%)
        // 10. CSC (15%) - +1 year from TOP

        const totalDurationMonths = (top.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44);

        // Distribute construction stages linearly between S&P and TOP
        // S&P is usually 8 weeks (approx 2 months) after Option
        const spDate = new Date(start);
        spDate.setDate(spDate.getDate() + 56); // +8 weeks

        const constructionStart = spDate;
        const constructionEnd = top;
        const constructionDuration = (constructionEnd.getTime() - constructionStart.getTime());

        // Helper to get date at % of construction duration
        const getDateAt = (pct: number) => {
            const time = constructionStart.getTime() + (constructionDuration * pct);
            return new Date(time);
        };

        const cscDate = new Date(top);
        cscDate.setFullYear(cscDate.getFullYear() + 1);

        const stages = [
            { name: "Booking (Option Fee)", pct: 5, date: start, icon: "receipt_long" },
            { name: "S&P Signed + Stamp Duty", pct: 15, date: spDate, icon: "edit_document" },
            { name: "Foundation Work", pct: 10, date: getDateAt(0.15), icon: "foundation" },
            { name: "Reinforced Concrete", pct: 10, date: getDateAt(0.35), icon: "architecture" },
            { name: "Partition Walls", pct: 5, date: getDateAt(0.55), icon: "grid_view" },
            { name: "Roofing / Ceiling", pct: 5, date: getDateAt(0.70), icon: "roofing" },
            { name: "Door/Window/Wiring", pct: 5, date: getDateAt(0.85), icon: "sensor_door" },
            { name: "Carpark / Roads", pct: 5, date: getDateAt(0.95), icon: "directions_car" },
            { name: "TOP (Temp Occupation)", pct: 25, date: top, icon: "key" },
            { name: "CSC (Completion)", pct: 15, date: cscDate, icon: "verified" },
        ];

        let cumulative = 0;
        const calculatedTimeline = stages.map(stage => {
            const amount = purchasePrice * (stage.pct / 100);
            cumulative += amount;
            return {
                ...stage,
                amount,
                cumulative,
                formattedDate: stage.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            };
        });

        setTimeline(calculatedTimeline);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200 h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0">
                    <div>
                        <h3 className="text-xl font-bold">Progression Planner</h3>
                        <p className="text-xs text-gray-400 mt-1">Visualize your BUC payment journey</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3">
                    {/* LEFT: Inputs */}
                    <div className="p-6 bg-gray-50 dark:bg-gray-900 border-r border-gray-100 dark:border-gray-700 overflow-y-auto">
                        <section className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Property Price ($)</label>
                                <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-bold" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Start Date (Option)</label>
                                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Expected TOP</label>
                                <input type="month" value={topDate} onChange={e => setTopDate(e.target.value)} className="w-full p-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm" />
                            </div>
                        </section>

                        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                            <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">Summary</h4>
                            <div className="space-y-2 text-xs text-blue-700 dark:text-blue-400">
                                <div className="flex justify-between">
                                    <span>Total Price</span>
                                    <span className="font-bold">${purchasePrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Timeline Duration</span>
                                    <span className="font-bold">~{((new Date(topDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24 * 365.25)).toFixed(1)} Years</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Timeline Visualization */}
                    <div className="col-span-1 md:col-span-2 overflow-y-auto p-6 bg-white dark:bg-gray-800">
                        <div className="space-y-0 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-700 z-0"></div>

                            {timeline.map((stage, i) => (
                                <div key={i} className="relative z-10 flex gap-6 pb-8 last:pb-0 group">
                                    {/* Icon Circle */}
                                    <div className="w-12 h-12 shrink-0 rounded-full border-4 border-white dark:border-gray-800 bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-lg">{stage.icon}</span>
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group-hover:border-blue-100 dark:group-hover:border-blue-900">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-gray-800 dark:text-white text-sm">{stage.name}</h4>
                                                <p className="text-xs text-gray-400">{stage.formattedDate}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-primary text-sm">{stage.pct}%</p>
                                                <p className="text-xs text-gray-500">${stage.amount.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        {/* Progress Bar for this stage */}
                                        <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden mt-3">
                                            <div
                                                className="bg-primary h-full rounded-full"
                                                style={{ width: `${(stage.cumulative / purchasePrice) * 100}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1 text-right">
                                            Cumulative: ${stage.cumulative.toLocaleString()} ({((stage.cumulative / purchasePrice) * 100).toFixed(0)}%)
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
