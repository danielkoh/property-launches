"use client";

/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect */

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";

type ChartInstance = any;

export default function OcrStrataLandedClient({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
    const [chartsLoaded, setChartsLoaded] = useState(false);

    // ROI Calculator States
    const [purchasePrice, setPurchasePrice] = useState(2800000);
    const [sellingPrice, setSellingPrice] = useState(3800000);
    const [holdingPeriod, setHoldingPeriod] = useState(4.2);

    // ROI Calculator Calculations
    const totalProfit = sellingPrice - purchasePrice;
    const profitPercent = (totalProfit / purchasePrice) * 100;
    // CAGR Formula: (Selling / Purchase) ^ (1 / Holding) - 1
    const cagr = (Math.pow(sellingPrice / purchasePrice, 1 / holdingPeriod) - 1) * 100;

    // Table Filter State
    const [selectedDistrict, setSelectedDistrict] = useState<"ALL" | "D19" | "D28" | "D16" | "D22">("ALL");

    // References for charts
    const resaleRoiChartRef = useRef<HTMLCanvasElement>(null);
    const priceBenchmarkChartRef = useRef<HTMLCanvasElement>(null);

    // Chart instances for cleanup
    const resaleRoiChartInstance = useRef<ChartInstance>(null);
    const priceBenchmarkChartInstance = useRef<ChartInstance>(null);

    // Data for OCR Resale table
    const resaleData = [
        { project: "Hillsgrove", district: "D19", tenure: "999-Yr", date: "29 Jan 2024", price: 3900000, psf: 859, profit: 1450000, holding: "3Y 4M", return: 14.90 },
        { project: "Hillsgrove", district: "D19", tenure: "999-Yr", date: "02 Feb 2024", price: 3770000, psf: 830, profit: 1320000, holding: "3Y 9M", return: 12.14 },
        { project: "Marlene Ville", district: "D19", tenure: "Freehold", date: "25 Jul 2025", price: 3700000, psf: 1245, profit: 1200000, holding: "4Y 1M", return: 10.04 },
        { project: "Parkwood Collection", district: "D19", tenure: "99LH", date: "26 Apr 2024", price: 4500000, psf: 998, profit: 1178000, holding: "2Y 1M", return: 15.14 },
        { project: "Marlene Ville", district: "D19", tenure: "Freehold", date: "26 Apr 2026", price: 3428000, psf: 1332, profit: 1148000, holding: "5Y 5M", return: 7.82 },
        { project: "Este Villa", district: "D28", tenure: "Freehold", date: "10 Jun 2025", price: 3720000, psf: 979, profit: 1120000, holding: "4Y 10M", return: 7.66 },
        { project: "Este Villa", district: "D28", tenure: "Freehold", date: "10 Mar 2025", price: 3380000, psf: 1007, profit: 1090000, holding: "4Y 3M", return: 9.65 },
        { project: "D'Manor", district: "D16", tenure: "99LH", date: "11 Nov 2025", price: 3050000, psf: 902, profit: 1070000, holding: "4Y 10M", return: 9.31 },
        { project: "Marlene Ville", district: "D19", tenure: "Freehold", date: "06 Oct 2023", price: 3125000, psf: 1262, profit: 1025000, holding: "4Y 5M", return: 9.32 },
        { project: "Este Villa", district: "D28", tenure: "Freehold", date: "21 Apr 2025", price: 3450000, psf: 1008, profit: 992000, holding: "5Y 9M", return: 6.07 },
        { project: "Marlene Ville", district: "D19", tenure: "Freehold", date: "15 Dec 2022", price: 2978888, psf: 1177, profit: 978888, holding: "3Y 2M", return: 13.23 },
        { project: "Cabana", district: "D28", tenure: "103LH", date: "09 May 2025", price: 2817777, psf: 966, profit: 967777, holding: "4Y 3M", return: 10.37 },
        { project: "D'Manor", district: "D16", tenure: "99LH", date: "16 Sep 2025", price: 2850000, psf: 1047, profit: 930000, holding: "3Y 10M", return: 10.81 },
        { project: "Cabana", district: "D28", tenure: "103LH", date: "21 Jan 2026", price: 2708000, psf: 928, profit: 908000, holding: "4Y 11M", return: 8.63 },
        { project: "The Woods", district: "D22", tenure: "99LH", date: "20 Apr 2026", price: 2800000, psf: 697, profit: 850000, holding: "4Y 9M", return: 7.88 },
        { project: "D'Manor", district: "D16", tenure: "99LH", date: "23 Jun 2025", price: 2880000, psf: 869, profit: 812000, holding: "4Y 4M", return: 7.93 },
    ];

    const filteredResaleData = selectedDistrict === "ALL" 
        ? resaleData 
        : resaleData.filter(d => d.district === selectedDistrict);

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).Chart) {
            setChartsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (chartsLoaded && typeof window !== "undefined" && (window as any).Chart) {
            const Chart = (window as any).Chart;

            Chart.defaults.font.family = "'Inter', sans-serif";
            Chart.defaults.color = '#64748b';

            // --- CHART 1: ROI COMPARISON (Horizontal Bar) ---
            if (resaleRoiChartRef.current) {
                if (resaleRoiChartInstance.current) resaleRoiChartInstance.current.destroy();
                const ctxRoi = resaleRoiChartRef.current.getContext("2d");
                if (ctxRoi) {
                    resaleRoiChartInstance.current = new Chart(ctxRoi, {
                        type: "bar",
                        data: {
                            labels: ["Parkwood Collection (D19)", "Hillsgrove (D19)", "Marlene Ville (D19)", "Cabana (D28)", "Este Villa (D28)", "D'Manor (D16)", "The Woods (D22)"],
                            datasets: [{
                                label: "Annualised Return (CAGR %)",
                                data: [15.14, 14.90, 13.23, 10.37, 9.65, 9.31, 7.88],
                                backgroundColor: [
                                    "#3b82f6", // Blue
                                    "#60a5fa", // Light Blue
                                    "#2563eb", // Royal Blue
                                    "#f59e0b", // Amber
                                    "#d97706", // Dark Amber
                                    "#10b981", // Emerald
                                    "#059669"  // Dark Emerald
                                ],
                                borderRadius: 8,
                                borderSkipped: false,
                                barThickness: 24,
                            }]
                        },
                        options: {
                            indexAxis: "y",
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: (context: any) => ` Annualised gain: ${context.parsed.x}%`
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    grid: { display: false },
                                    ticks: { callback: (val: any) => `${val}%` },
                                    suggestedMax: 17
                                },
                                y: {
                                    grid: { display: false },
                                    ticks: { font: { weight: "600" } }
                                }
                            }
                        }
                    });
                }
            }

            // --- CHART 2: PRICE BENCHMARK COMPARISON (Grouped Bar) ---
            if (priceBenchmarkChartRef.current) {
                if (priceBenchmarkChartInstance.current) priceBenchmarkChartInstance.current.destroy();
                const ctxBenchmark = priceBenchmarkChartRef.current.getContext("2d");
                if (ctxBenchmark) {
                    priceBenchmarkChartInstance.current = new Chart(ctxBenchmark, {
                        type: "bar",
                        data: {
                            labels: ["Freehold built-up (D19)", "Leasehold built-up (OCR)"],
                            datasets: [
                                {
                                    label: "Standard Condominium",
                                    data: [2046, 1700], // OCR condo estimated comparison
                                    backgroundColor: "#94a3b8",
                                    borderRadius: 6,
                                },
                                {
                                    label: "Strata Landed (Cluster)",
                                    data: [1306, 1263],
                                    backgroundColor: "#3b82f6",
                                    borderRadius: 6,
                                },
                                {
                                    label: "Pure Landed Terrace (Built-up)",
                                    data: [1495, 1113],
                                    backgroundColor: "#f59e0b",
                                    borderRadius: 6,
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: true, position: "top" },
                                tooltip: {
                                    callbacks: {
                                        label: (context: any) => ` ${context.dataset.label}: $${context.parsed.y} PSF`
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    grid: { color: "#f1f5f9" },
                                    ticks: { callback: (val: any) => `$${val}` }
                                },
                                x: { grid: { display: false } }
                            }
                        }
                    });
                }
            }
        }

        return () => {
            if (resaleRoiChartInstance.current) resaleRoiChartInstance.current.destroy();
            if (priceBenchmarkChartInstance.current) priceBenchmarkChartInstance.current.destroy();
        };
    }, [chartsLoaded]);

    return (
        <div className="font-sans text-slate-800 bg-slate-50 min-h-screen dark:bg-[#0a192f] dark:text-gray-100 antialiased">
            <Script
                src="https://cdn.jsdelivr.net/npm/chart.js"
                strategy="afterInteractive"
                onLoad={() => setChartsLoaded(true)}
            />

            <style jsx global>{`
                .chart-container {
                    position: relative;
                    width: 100%;
                    height: 380px;
                }
                @media (max-width: 640px) {
                    .chart-container {
                        height: 300px;
                    }
                }
                .hero-bg-overlay {
                    background: linear-gradient(180deg, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.9) 100%);
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                }
                .dark .glass-card {
                    background: rgba(17, 34, 64, 0.85);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .card-transition {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .card-transition:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }
                /* Slider Customization */
                input[type="range"] {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 6px;
                    background: #e2e8f0;
                    border-radius: 5px;
                    outline: none;
                }
                .dark input[type="range"] {
                    background: #334155;
                }
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    transition: transform 0.1s ease;
                }
                input[type="range"]::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                }
            `}</style>

            {/* Back Button */}
            <div className="absolute top-6 left-6 z-50">
                <Link 
                    href="/articles" 
                    className="flex items-center gap-2 bg-white/90 dark:bg-[#112240]/90 text-slate-800 dark:text-blue-300 font-bold px-4 py-2 rounded-full shadow-md backdrop-blur hover:bg-blue-50 dark:hover:bg-[#233554] transition-all group"
                >
                    <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                    <span>Back to Articles</span>
                </Link>
            </div>

            {/* Premium Hero Banner */}
            <header className="relative w-full h-[65vh] md:h-[75vh] flex items-end justify-center overflow-hidden">
                <Image
                    src="/images/ocr-strata-landed-hero.png"
                    alt="Luxury Strata Landed (Cluster Housing) Development Singapore"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
                />
                <div className="absolute inset-0 hero-bg-overlay z-10" />

                <div className="relative z-20 max-w-5xl mx-auto px-6 pb-16 text-center">
                    <div className="inline-flex gap-2 mb-4 bg-blue-500/20 border border-blue-500/30 backdrop-blur-md px-3 py-1 rounded-full text-blue-300 text-xs font-semibold uppercase tracking-wider">
                        <span>Landed Focus</span>
                        <span className="w-1.5 h-1.5 self-center rounded-full bg-amber-400" />
                        <span>OCR Enclaves</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
                        The OCR Strata Landed Phenom: How a &quot;Stagnant&quot; Asset Class Netted Buyers Up to $1.45M in 3 Years
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
                        Deep micro-market analysis exposing the dramatic gap between stagnant national averages and highly localized outperformance.
                    </p>

                    <div className="mt-8 flex items-center justify-center gap-3 text-sm text-slate-400 font-medium">
                        <Image
                            src="/daniel-profile.jpg"
                            width={32}
                            height={32}
                            alt="Daniel Koh"
                            className="rounded-full border border-slate-700 animate-pulse-subtle"
                            style={{ objectFit: 'cover' }}
                        />
                        <span>Daniel Koh</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span>Property Analyst</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span>Published 24 May 2026</span>
                    </div>
                </div>
            </header>

            {/* Main Section */}
            <main className="max-w-5xl mx-auto px-6 py-16">
                
                {/* Intro Quick Insights Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 -mt-24 relative z-30">
                    <div className="bg-white dark:bg-[#112240] p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-[#233554] text-center card-transition">
                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Top OCR Profit</div>
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">$1.45 Million</div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Netted in D19 Hillsgrove in exactly 3 Years 4 Months.</p>
                    </div>
                    <div className="bg-white dark:bg-[#112240] p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-[#233554] text-center card-transition">
                        <div className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Annualised Returns</div>
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">3.8% – 15.1%</div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Short-term gains massively outperforming the wider market average.</p>
                    </div>
                    <div className="bg-white dark:bg-[#112240] p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-[#233554] text-center card-transition">
                        <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">PSF Valuation Gap</div>
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">35% – 45%</div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Strata Landed built-up PSF trading at a huge discount to OCR condos.</p>
                    </div>
                </section>

                {/* Core Narrative Paragraphs */}
                <article className="prose prose-slate dark:prose-invert max-w-none text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300 space-y-6">
                    <p>
                        If you read national property reports, the narrative on strata landed (cluster housing) seems clear: it’s a slow-moving, illiquid own-stay asset with modest annualized returns of 2.1% to 2.2%. Many analysts advise buying it only if you plan to stay forever.
                    </p>
                    <p className="font-semibold text-slate-800 dark:text-white text-xl">
                        But if you look at the actual transaction logs for Outside Central Region (OCR) enclaves across Kovan, Serangoon, Seletar, Bedok, and Jurong, that national narrative completely falls apart.
                    </p>
                    <p>
                        In fact, <strong className="text-slate-900 dark:text-white font-bold">recent short-term holds (typically under 5 years) in OCR strata projects have massively outperformed the wider market, netting sellers between $450,000 and $1,450,000 in pure profit in as little as 2 to 5 years.</strong>
                    </p>
                    <p>
                        If you are a condo upgrader weighing a $2.8M to $4.5M strata landed home, you need to look past broad national generalizations and focus on the micro-market mechanics of why specific OCR projects have become historic cash-generation vehicles.
                    </p>
                </article>

                {/* Chart Section: Annualised Return */}
                <section className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-[#233554] my-16">
                    <div className="mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">OCR Strata Resale Surge (Annualised Gains)</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Annualised CAGR performance for key short-term resales across major Outside Central Region projects.</p>
                    </div>
                    <div className="chart-container">
                        {chartsLoaded ? (
                            <canvas ref={resaleRoiChartRef} id="resaleRoiChart" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <span className="text-slate-400 text-sm">Loading visual performance data...</span>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-xs text-slate-400 dark:text-slate-500">Source: Direct extraction from URA and Landed Transaction Database, May 2026.</p>
                    </div>
                </section>

                {/* Table: OCR Resales */}
                <section className="my-16">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                                <span className="w-2.5 h-6 bg-blue-600 rounded-full" />
                                Hard Evidence: OCR Strata Transactions
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Systematic audit of short-term holds in key OCR enclaves.</p>
                        </div>
                        
                        {/* District Filter Buttons */}
                        <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                            {(["ALL", "D19", "D16", "D28", "D22"] as const).map((dist) => (
                                <button
                                    key={dist}
                                    onClick={() => setSelectedDistrict(dist)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        selectedDistrict === dist
                                            ? "bg-white dark:bg-[#112240] text-blue-600 dark:text-blue-400 shadow-sm"
                                            : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                                    }`}
                                >
                                    {dist}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-white dark:bg-[#112240] border border-slate-100 dark:border-[#233554] rounded-2xl shadow-sm">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-[#233554] bg-slate-50/50 dark:bg-[#1b305a]/30 text-slate-600 dark:text-slate-400 font-semibold">
                                    <th className="p-4">Project (District)</th>
                                    <th className="p-4">Tenure</th>
                                    <th className="p-4">Tnx Date</th>
                                    <th className="p-4 text-right">Price</th>
                                    <th className="p-4 text-right">Strata PSF</th>
                                    <th className="p-4 text-right">Total Profit</th>
                                    <th className="p-4">Holding Period</th>
                                    <th className="p-4 text-right text-blue-600 dark:text-blue-400 font-bold">Annualised</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-[#233554] text-slate-700 dark:text-slate-300">
                                {filteredResaleData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                        <td className="p-4 font-bold text-slate-950 dark:text-white">{row.project} <span className="text-xs font-semibold text-slate-400">({row.district})</span></td>
                                        <td className="p-4 text-xs font-semibold text-slate-500">{row.tenure}</td>
                                        <td className="p-4 text-xs">{row.date}</td>
                                        <td className="p-4 text-right font-semibold">${row.price.toLocaleString()}</td>
                                        <td className="p-4 text-right text-xs text-slate-500">${row.psf}</td>
                                        <td className="p-4 text-right text-emerald-600 dark:text-emerald-400 font-bold">+${row.profit.toLocaleString()}</td>
                                        <td className="p-4 text-xs">{row.holding}</td>
                                        <td className="p-4 text-right text-blue-600 dark:text-blue-400 font-extrabold">{row.return.toFixed(2)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Sinking Ledgers - Warning Highlight */}
                <section className="bg-rose-50/50 dark:bg-red-950/20 border-l-4 border-rose-500 p-6 md:p-8 rounded-r-3xl my-16 shadow-sm">
                    <h3 className="text-xl font-bold text-rose-950 dark:text-red-400 flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-rose-500">warning</span>
                        The Other Side of the Ledger: The Sub-0% Growth Trap
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                        Strata landed is not a guaranteed home run. While well-selected suburban entry prices captured huge windfalls, a closer look at the broader transaction logs—covering both the luxury Core Central Region (CCR) and Outside Central Region (OCR) enclaves—reveals a very different and sobering reality. Sinking millions of dollars into a project at a premium entry PSF at the peak of a market cycle or buying into a poorly positioned layout can trap your capital for over a decade with flat or negative returns.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="bg-white dark:bg-[#112240] p-5 rounded-xl shadow-sm border border-rose-100 dark:border-rose-900/30">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-4 bg-rose-500 rounded-full" />
                                Premium Leasehold Loss (CCR)
                            </h4>
                            <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-xs">
                                In a 99-year leasehold strata development in District 10, a unit transacted in June 2025 resulted in a loss of <strong>-$612,600 (-15.2%)</strong> after a holding period of 13.8 years. Another unit in the same project transacted in June 2024 with a loss of <strong>-$875,100 (-19.6%)</strong> after a 12.8-year hold.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-[#112240] p-5 rounded-xl shadow-sm border border-rose-100 dark:border-rose-900/30">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-4 bg-rose-500 rounded-full" />
                                Peak Freehold Trap (CCR & OCR)
                            </h4>
                            <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-xs">
                                Even freehold titles aren&apos;t a shield against poor entry timing. In D11, a seller who exited in Feb 2022 after an 8.6-year hold registered a net loss of <strong>-$550,000 (-10.1%)</strong>. In D15, a freehold Mixed-Development Townhouse exited in April 2025 after a massive 13.4-year hold with a net loss of <strong>-$131,384 (-3.1%)</strong>.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-[#112240] p-5 rounded-xl shadow-sm border border-rose-100 dark:border-rose-900/30">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-4 bg-rose-500 rounded-full" />
                                Mixed-Development Premium Trap
                            </h4>
                            <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-xs">
                                In D16 (Bedok), a 99-year leasehold strata landed home nested inside a larger condominium project transacted in February 2026 at a loss of <strong>-$300,000 (-7.7%)</strong> after a 3.4-year hold. Sinking capital into mixed projects with high entry premiums can trap you for a long time.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-[#112240] p-5 rounded-xl shadow-sm border border-rose-100 dark:border-rose-900/30">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-4 bg-rose-500 rounded-full" />
                                The 10-Year Opportunity Cost
                            </h4>
                            <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-xs">
                                Sinking millions into an illiquid asset for over a decade just to break even is a massive opportunity cost. In D10, a resale in Sep 2025 after an 11.1-year hold returned a near-flat profit of just <strong>$50,000 (0.08% annualized)</strong>. Entering at peak premiums freezes your liquidity.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ROI Interactive Calculator Section */}
                <section className="bg-slate-900 text-white rounded-3xl p-8 my-16 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="mb-8">
                            <span className="bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/30">Interactive Simulator</span>
                            <h3 className="text-2xl md:text-3xl font-extrabold mt-3 text-white">Strata Landed ROI & Renovation Auditor</h3>
                            <p className="text-slate-400 text-sm mt-1">Simulate your acquisition metrics and see how a strata landed built-up entry stacks up against traditional landed overheads.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Inputs */}
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                                        <span>Purchase Price (SGD)</span>
                                        <span className="text-blue-400 font-extrabold">${purchasePrice.toLocaleString()}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1500000" 
                                        max="6000000" 
                                        step="50000"
                                        value={purchasePrice} 
                                        onChange={(e) => setPurchasePrice(Number(e.target.value))}
                                    />
                                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                        <span>$1.5M</span>
                                        <span>$6.0M</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                                        <span>Selling Price (SGD)</span>
                                        <span className="text-emerald-400 font-extrabold">${sellingPrice.toLocaleString()}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="2000000" 
                                        max="8000000" 
                                        step="50000"
                                        value={sellingPrice} 
                                        onChange={(e) => setSellingPrice(Number(e.target.value))}
                                    />
                                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                        <span>$2.0M</span>
                                        <span>$8.0M</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                                        <span>Holding Period (Years)</span>
                                        <span className="text-amber-400 font-extrabold">{holdingPeriod.toFixed(1)} Years</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="10" 
                                        step="0.1"
                                        value={holdingPeriod} 
                                        onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                                    />
                                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                        <span>1 Year</span>
                                        <span>10 Years</span>
                                    </div>
                                </div>
                            </div>

                            {/* Outputs Box */}
                            <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-6 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="border-b border-slate-700/60 pb-3">
                                        <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Total Capital Gain</span>
                                        <div className={`text-3xl font-black mt-1 ${totalProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {totalProfit >= 0 ? `+$${totalProfit.toLocaleString()}` : `-$${Math.abs(totalProfit).toLocaleString()}`}
                                        </div>
                                        <div className="text-xs text-slate-400 mt-0.5">
                                            Return on Entry: <span className="font-bold">{profitPercent.toFixed(1)}%</span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Annualised Return (CAGR)</span>
                                        <div className={`text-4xl font-black mt-1 ${cagr >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>
                                            {isNaN(cagr) ? "0.00" : cagr.toFixed(2)}%
                                        </div>
                                        <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                                            {cagr >= 8 
                                                ? "🔥 High Perform: Matches outperforming OCR enclaves."
                                                : cagr >= 3 
                                                ? "📈 Modest Growth: Standard market-average return."
                                                : cagr >= 0 
                                                ? "⚖️ Stagnant: Underperforming typical Singapore property yield."
                                                : "⚠️ Negative: Sunk capital warning."}
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-slate-700/60 pt-4 mt-6">
                                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
                                        <span className="material-symbols-outlined text-sm">construction</span>
                                        <span>Hidden Renovation Arbitrage</span>
                                    </div>
                                    <p className="text-xs text-slate-300 leading-normal">
                                        Traditional Pure Landed under $4.5M typically requires an extensive structural rebuild or heavy overhaul, costing between <strong>$150k to $450k+</strong> in upfront cash outlays. <br/>
                                        Strata landed external structural maintenance is completely covered by the MCST, leaving your outlays strictly cosmetic (averaging <strong>$50k - $150k</strong>) — saving a huge <strong>$100k - $300k in cash reserves</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Price Benchmark Section & Chart 2 */}
                <section className="my-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="prose prose-slate dark:prose-invert">
                            <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">The PSF Gap: Condo Catch-Up & Built-up PSF Matrix</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                                As OCR condominium prices soared, typical 3-bedroom new launch condos in District 20 and 26 breached <strong>$2,400–$2,600+ PSF</strong>, making absolute price tags for standard family apartments hit <strong>$2.5M to $2.8M</strong>.
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                                Condo upgraders realized they could secure a <strong>2,200 to 3,000 sqft strata landed home</strong> in mature OCR enclaves for <strong>$2.6M to $3.5M</strong>, trading at a highly compressed <strong>$900 to $1,400 Strata Built-up PSF</strong>. 
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-semibold text-blue-600 dark:text-blue-400">
                                This massive built-up PSF gap (trading up to 45% discount to condos) triggered a wave of &quot;catch-up&quot; demand, driving resales in strata estates upwards while pure landed remained out of reach.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-[#112240] p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-[#233554]">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 text-center">Apples-to-Apples Space & PSF Benchmark Comparison</h4>
                            <div className="chart-container" style={{ height: "300px" }}>
                                {chartsLoaded ? (
                                    <canvas ref={priceBenchmarkChartRef} id="priceBenchmarkChart" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl">
                                        <span className="text-slate-400 text-sm">Loading benchmarks...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comparison Matrix: Strata vs Pure Landed */}
                <section className="bg-white dark:bg-[#112240] border border-slate-100 dark:border-[#233554] rounded-3xl p-8 my-16 shadow-sm">
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-2">99-Year Leasehold Audit: Strata vs. Pure Landed</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">When leaseholds are compared to leaseholds, the choice is not about saving upfront capital quantum. Instead, it is a direct trade-off between lifestyle conveniences and structural autonomy:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 99LH Pure Landed */}
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h4 className="font-extrabold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500">grid_view</span>
                                99-Year Pure Landed (e.g. Loyang Villas)
                            </h4>
                            <ul className="space-y-3.5 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <div>
                                        <strong className="text-slate-900 dark:text-white block">Absolute Land Boundary Ownership</strong>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs">You own the actual land plot boundary and dirt beneath the structure.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <div>
                                        <strong className="text-slate-900 dark:text-white block">Zero Monthly MCST Fees</strong>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs">No monthly recurring management fees. You manage own bills.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-500 font-bold">✗</span>
                                    <div>
                                        <strong className="text-slate-900 dark:text-white block">Advanced Lease Decay</strong>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs">Most properties built in the 1995s have ~65-70 years remaining.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-500 font-bold">✗</span>
                                    <div>
                                        <strong className="text-slate-900 dark:text-white block">Immediate Cash Renovation Outlays</strong>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs">Requires $150,000 to $350,000+ for facade, plumbing, and roof repairs.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-500 font-bold">✗</span>
                                    <div>
                                        <strong className="text-slate-900 dark:text-white block">Zero Communal Amenities</strong>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs">No swimming pools, security gates, clubhouses, or gyms.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* 99LH Strata Landed */}
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h4 className="font-extrabold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-500">domain</span>
                                99-Year Strata Landed (e.g. D&apos;Manor, Cabana)
                            </h4>
                            <ul className="space-y-3.5 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <div>
                                        <strong className="text-slate-900 dark:text-white block">Lower Immediate Renovation Costs</strong>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs">Only interior cosmetic updates are needed. Structural repairs covered by MCST.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <div>
                                        <strong className="text-slate-900 dark:text-white block">Full Condominium Resort Facilities</strong>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs">Communal pool, professional gym, security gates, and landscaping.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <div>
                                        <strong className="text-slate-900 dark:text-white block">Younger Building Age</strong>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs">Generally newer construction (e.g., completed 2010+) with less lease decay.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-500 font-bold">✗</span>
                                    <div>
                                        <strong className="text-slate-900 dark:text-white block">No Individual Land Title</strong>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs">You share the title footprint across the entire development.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-rose-500 font-bold">✗</span>
                                    <div>
                                        <strong className="text-slate-900 dark:text-white block">Monthly MCST Maintenance Fees</strong>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs">Recurring $700 to $1,200 per month for facilities and building maintenance.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Key Tactics & Strategic Verdict */}
                <section className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300">
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white">How to Select a Winning Strata Landed Asset</h3>
                    <p>The OCR data proves that strata landed properties can be phenomenal short-term investments, but only if you select the right micro-market. To replicate these gains, apply these three rules:</p>
                    <ol className="space-y-4">
                        <li>
                            <strong>Prioritize Established Landed Enclaves:</strong> Look for strata estates nested within mature landed housing enclaves (D19, D28, D16, D5, D15) rather than isolated plots hemmed in by high-rise condos.
                        </li>
                        <li>
                            <strong>Target Freehold/999-Yr Titles for Premium, but Don&apos;t Discount Leaseholds at High Gaps:</strong> While freehold projects excel in long-term liquidity, leasehold projects like <i>D&apos;Manor</i> and <i>Cabana</i> show spectacular short-term gains due to deep PSF discounts. Ensure the entry PSF is heavily discounted to the surrounding condo market.
                        </li>
                        <li>
                            <strong>Buy the PSF Gap, but Beware the Value Trap:</strong> Enter when the strata landed PSF trades at a 35% to 45% discount to adjacent new launch condos. But <strong>never buy a project simply because it is cheap.</strong> A low PSF baseline can sometimes mask layout inefficiencies, poor natural light, high density, or severe lease decay.
                        </li>
                    </ol>

                    <hr className="border-slate-200 dark:border-slate-800 my-10" />

                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white">The Strategic Verdict</h3>
                    <p>Strata landed is not a stagnant asset class. In the right district, with the right entry quantum, it has proven to be a highly lucrative short-to-medium-term investment that outpaces standard condominiums.</p>
                    <p>If you are currently holding a condo or EC and weighing an upgrade, looking past superficial advice is critical. Navigating the entry timing, layout efficiencies, and price-gaps requires a personalized, data-driven approach.</p>
                    <div className="mt-8 p-6 rounded-2xl bg-blue-50 dark:bg-slate-800/30 border border-blue-100 dark:border-slate-800/80">
                        <p className="font-semibold text-slate-800 dark:text-white mb-2">
                            Ready to explore if a strata landed asset fits your portfolio progression?
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                            Let&apos;s evaluate your current property timeline and perform a comprehensive block-by-block OCR audit. You can initiate a customized discussion on property progression and investment strategy with our team.
                        </p>
                        <Link 
                            href="/contact-us?purpose=Strategy%20Consultation" 
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full active:scale-95 transition-all shadow-md group no-underline"
                        >
                            <span>Start a Strategy Discussion</span>
                            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
