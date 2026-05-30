"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
    display: "swap",
});

// Type definitions for Chart.js and Plotly loaded via CDN
type ChartInstance = any;
type PlotlyInstance = any;



export default function ResaleVsNewLaunchClient({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
    // --- State ---
    const [chartsLoaded, setChartsLoaded] = useState({ chartjs: false, plotly: false });

    // Fix for navigation race condition: check if scripts are already loaded
    useEffect(() => {
        const newState = { chartjs: false, plotly: false };
        let updated = false;

        if (typeof window !== "undefined") {
            if ((window as any).Chart) {
                newState.chartjs = true;
                updated = true;
            }
            if ((window as any).Plotly) {
                newState.plotly = true;
                updated = true;
            }
        }

        if (updated) {
            setChartsLoaded(prev => ({ ...prev, ...newState }));
        }
    }, []);
    const [rent, setRent] = useState(4800);
    const [wait, setWait] = useState(3.5);
    const [interest] = useState(0.014); // Fixed at 1.4%
    const [propertyValue] = useState(1800000); // Fixed base for equity calc simplicity in this version
    const [appreciation] = useState(0.03); // Fixed 3%

    // --- Refs ---
    const harmChartRef = useRef<HTMLCanvasElement>(null);
    const rateRadarRef = useRef<HTMLCanvasElement>(null);

    // Instance refs
    const harmChartInstance = useRef<ChartInstance>(null);
    const rateRadarInstance = useRef<ChartInstance>(null);

    // --- Derived Values ---
    const totalSunkCost = rent * 12 * wait;

    // --- Effect: Load Chart.js Charts ---
    useEffect(() => {
        if (chartsLoaded.chartjs && typeof window !== "undefined" && (window as any).Chart) {
            const Chart = (window as any).Chart;
            Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
            Chart.defaults.color = '#64748b';

            // 1. Harmonization Chart
            if (harmChartRef.current) {
                if (harmChartInstance.current) harmChartInstance.current.destroy();
                const ctx = harmChartRef.current.getContext('2d');
                if (ctx) {
                    harmChartInstance.current = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['Resale (Old Rules)', 'New Launch (2026)'],
                            datasets: [
                                {
                                    label: 'Internal Living Space',
                                    data: [88, 96],
                                    backgroundColor: '#10b981',
                                    borderRadius: 6
                                },
                                {
                                    label: 'AC Ledges / Strata Voids',
                                    data: [7, 0],
                                    backgroundColor: '#94a3b8',
                                    borderRadius: 6
                                },
                                {
                                    label: 'Balcony/PES',
                                    data: [5, 4],
                                    backgroundColor: '#06b6d4',
                                    borderRadius: 6
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10, weight: 'bold' } } },
                                tooltip: { callbacks: { label: (c: any) => ` ${c.dataset.label}: ${c.raw}% of GFA` } }
                            },
                            scales: {
                                x: { stacked: true, grid: { display: false } },
                                y: { stacked: true, max: 100, ticks: { callback: (v: any) => v + '%' } }
                            }
                        }
                    });
                }
            }

            // 2. Rate Radar
            if (rateRadarRef.current) {
                if (rateRadarInstance.current) rateRadarInstance.current.destroy();
                const ctx = rateRadarRef.current.getContext('2d');
                if (ctx) {
                    rateRadarInstance.current = new Chart(ctx, {
                        type: 'radar',
                        data: {
                            labels: ['Principal Paydown', 'Leverage Power', 'Cashflow Ease', 'Asset Stability', 'Growth Potential'],
                            datasets: [
                                {
                                    label: 'Current (1.4%)',
                                    data: [95, 90, 85, 80, 75],
                                    borderColor: '#10b981',
                                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                                    pointBackgroundColor: '#10b981'
                                },
                                {
                                    label: 'Old Market (4.0%)',
                                    data: [40, 50, 30, 85, 60],
                                    borderColor: '#94a3b8',
                                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                                    borderDash: [5, 5]
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                r: { beginAtZero: true, max: 100, ticks: { display: false } }
                            },
                            plugins: { legend: { position: 'bottom' } }
                        }
                    });
                }
            }
        }
    }, [chartsLoaded.chartjs]);

    // --- Effect: Update Plotly Charts ---
    useEffect(() => {
        if (chartsLoaded.plotly && typeof window !== "undefined" && (window as any).Plotly) {
            const Plotly = (window as any).Plotly;

            // 1. Waterfall Plot (Dead Money)
            const totalRent = rent * 12 * wait;
            // Simplified logic for illustrative waterfall components
            const progressiveInt = 15000;
            const renoDifference = 50000; // Saving on reno for new launch usually

            const waterfallData = [{
                type: "waterfall",
                orientation: "v",
                measure: ["relative", "relative", "relative", "total"],
                x: ["Rental Burn", "Progressive Int.", "Reno Buffer", "Total Sunk"],
                y: [totalRent, progressiveInt, -renoDifference, 0],
                connector: { line: { color: "rgb(63, 63, 63)" } },
                increasing: { marker: { color: "#ef4444" } },
                decreasing: { marker: { color: "#10b981" } },
                totals: { marker: { color: "#0f172a" } }
            }];

            const waterfallLayout = {
                title: { text: "New Launch: Sunk Cost Waterfall", font: { family: "Plus Jakarta Sans", size: 14, color: '#64748b' } },
                showlegend: false,
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                margin: { t: 50, b: 40, l: 40, r: 40 },
                font: { family: "Plus Jakarta Sans" }
            };

            Plotly.react('waterfallPlot', waterfallData, waterfallLayout, { displayModeBar: false });

            // 2. Equity Forecast
            const years = [0, 1, 2, 3, 4, 5, 6, 7];
            const annualRent = rent * 12;

            const resaleEquity = years.map(y => {
                const value = propertyValue * Math.pow(1 + appreciation, y);
                // Simplified principal repayment model at 1.4% interest
                // Assuming standard 30y amortization curve logic roughly
                const principalPaid = (propertyValue * 0.75) * 0.025 * y;
                return (value * 0.25) + principalPaid;
            });

            const nlEquity = years.map(y => {
                const value = propertyValue * Math.pow(1 + appreciation, y);
                const rentLost = y <= wait ? annualRent * y : annualRent * wait;
                const principalPaid = y > wait ? (propertyValue * 0.75) * 0.025 * (y - wait) : 0;
                return (value * 0.25) + principalPaid - rentLost;
            });

            const equityTraces = [
                {
                    x: years, y: resaleEquity, name: 'Resale Condo', mode: 'lines+markers',
                    line: { color: '#10b981', width: 4 },
                    fill: 'tozeroy', fillcolor: 'rgba(16, 185, 129, 0.05)'
                },
                {
                    x: years, y: nlEquity, name: 'New Launch (Wait)', mode: 'lines',
                    line: { color: '#94a3b8', width: 3, dash: 'dot' }
                }
            ];

            const equityLayout = {
                hovermode: 'x unified',
                yaxis: { tickprefix: '$', gridcolor: '#f1f5f9' },
                xaxis: { title: 'Years Post-Upgrade', gridcolor: '#f1f5f9' },
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                font: { family: "Plus Jakarta Sans", color: '#64748b' },
                margin: { t: 20, b: 40, l: 60, r: 20 },
                legend: { orientation: 'h', y: 1.1 }
            };

            Plotly.react('equityForecast', equityTraces, equityLayout, { displayModeBar: false });

        }
    }, [chartsLoaded.plotly, rent, wait, propertyValue, appreciation]);

    return (
        <div className={`bg-slate-50 min-h-screen text-slate-800 font-sans ${plusJakartaSans.variable}`}>
            <Script
                src="https://cdn.jsdelivr.net/npm/chart.js"
                strategy="lazyOnload"
                onLoad={() => setChartsLoaded(prev => ({ ...prev, chartjs: true }))}
            />
            <Script
                src="https://cdn.plot.ly/plotly-2.27.0.min.js"
                strategy="lazyOnload"
                onLoad={() => setChartsLoaded(prev => ({ ...prev, plotly: true }))}
            />

            <style jsx global>{`
                .chart-container { 
                    position: relative; 
                    width: 100%; 
                    max-width: 700px; 
                    margin: 0 auto; 
                    height: 380px; 
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(226, 232, 240, 0.8);
                    border-radius: 16px;
                    padding: 1.5rem;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
                }
                .slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 3px; background: #e2e8f0; }
                .slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #10b981; cursor: pointer; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.2); }
                
                .cashflow-bar-container { height: 180px; position: relative; }
                .cashflow-bar { 
                    width: 45%; 
                    transition: height 0.5s ease; 
                    border-top-left-radius: 8px; 
                    border-top-right-radius: 8px; 
                    position: absolute; 
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    color: white;
                    font-size: 0.75rem;
                }
            `}</style>





            {/* Hero */}
            <section className="relative pt-16 pb-24 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                            Resale vs <span className="text-emerald-600">New Launch</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            In 2026, the gap between New Launch and Resale isn't just about PSF—it's about <strong>Efficiency</strong>.
                            With mortgage rates stabilized at a favorable 1.4%, the cost of debt has dropped significantly from the 2024 peak,
                            yet the <strong>cost of waiting</strong> remains the upgrader's biggest hurdle.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="glass-card flex-1 min-w-[200px]">
                                <p className="text-xs font-bold text-slate-400 mb-1">AVG. NEW LAUNCH PSF</p>
                                <p className="text-2xl font-black text-slate-900">$2,650</p>
                                <p className="text-xs text-emerald-600 font-bold">Harmonized Area</p>
                            </div>
                            <div className="glass-card flex-1 min-w-[200px]">
                                <p className="text-xs font-bold text-slate-400 mb-1">AVG. RESALE PSF</p>
                                <p className="text-2xl font-black text-slate-900">$1,720</p>
                                <p className="text-xs text-slate-500 font-bold">Standard Area (OCR)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-100 -skew-x-12 translate-x-1/2 -z-0"></div>
            </section>

            {/* Harmonization Section */}
            <section id="harmonization" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6">The "Harmonization" Efficiency Gap</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                By 2026, the 2023 URA/LTA harmonization rules are the market standard.
                                <strong>New Launch PSF</strong> reflects only usable floor area (no AC ledges or strata voids).
                                While this transparency is good, it results in a higher entry PSF that many Resale units still "hide" in their older, less efficient floor plans.
                            </p>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 border-l-4 border-cyan-500 rounded">
                                    <h4 className="font-bold text-sm">Resale (Pre-2023 Rules)</h4>
                                    <p className="text-xs text-slate-500 mt-1">You pay $1,700 PSF for 1000 sqft, but up to 7% is "dead space" like oversized AC ledges. Effective useable PSF is higher than it looks.</p>
                                </div>
                                <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded">
                                    <h4 className="font-bold text-sm">New Launch (2026 Rules)</h4>
                                    <p className="text-xs text-slate-500 mt-1">You pay $2,650 PSF. Every square foot is internal living space. Maximum transparency, but significantly higher financial threshold.</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <div className="glass-card">
                                <h3 className="text-center font-bold text-slate-700 mb-4">Area Breakdown: Resale vs. 2026 New Launch</h3>
                                <div className="chart-container">
                                    <canvas ref={harmChartRef} id="harmChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Cashflow UI Update */}
            <section id="cashflow" className="py-20 bg-slate-900 text-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">The 1.4% Mortgage Impact</h2>
                        <p className="text-slate-400">Lower rates compared to 2024 significantly reduce the cost of holding debt.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Refined Cashflow Comparison UI */}
                        <div className="space-y-8">
                            <div className="glass-card bg-slate-800 border-slate-700 text-white p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-emerald-400">Monthly Payment (Loan: $1.2M)</h3>
                                    <span className="text-[10px] bg-slate-700 px-2 py-1 rounded text-slate-300">30Y Tenure</span>
                                </div>

                                <div className="cashflow-bar-container border-b border-slate-700 mb-4">
                                    {/* 2024 Peak Bar */}
                                    <div className="cashflow-bar bg-slate-600 left-0" style={{ height: '100%' }}>
                                        <div className="absolute -top-6 text-xs text-slate-400 font-bold">2024 (4.0%)</div>
                                        $5,728
                                    </div>

                                    {/* 2026 Stable Bar */}
                                    <div className="cashflow-bar bg-emerald-500 right-0" style={{ height: '71%' }}>
                                        <div className="absolute -top-6 text-xs text-emerald-400 font-bold">2026 (1.4%)</div>
                                        $4,085
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-6">
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Monthly Difference</p>
                                        <p className="text-2xl font-black text-emerald-400">+$1,643 <span className="text-xs font-normal text-slate-400 ml-1">in savings</span></p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Annual Saving</p>
                                        <p className="text-lg font-bold text-white">$19,716</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed italic">
                                By 2026, the market has settled at 1.4%. While this is higher than the extreme sub-1% lows of the early 2020s, it allows Resale buyers to lock in immediate, sustainable monthly cashflow profiles.
                            </p>
                        </div>

                        <div className="w-full">
                            <div className="chart-container h-[400px]">
                                <canvas ref={rateRadarRef} id="rateRadar"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rental Burn Section */}
            <section id="dead-money" className="py-20 container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-black mb-4">The "Dead Money" Reality</h2>
                    <p className="text-slate-600">
                        With a 1.4% interest rate, Resale mortgage payments are heavily weighted toward <strong>principal reduction</strong>.
                        In contrast, a 3.5-year wait for a New Launch results in massive rental outflow that yields zero equity.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glass-card">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">MONTHLY RENT (2026 AVG)</label>
                            <div className="flex items-center gap-4 mt-2">
                                <input
                                    type="range"
                                    min="3000"
                                    max="8000"
                                    step="100"
                                    value={rent}
                                    onChange={(e) => setRent(Number(e.target.value))}
                                    className="slider flex-1"
                                />
                                <span className="font-bold text-emerald-600 w-16">${rent.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="glass-card">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">WAIT TIME (TOP)</label>
                            <div className="flex items-center gap-4 mt-2">
                                <input
                                    type="range"
                                    min="2"
                                    max="5"
                                    step="0.5"
                                    value={wait}
                                    onChange={(e) => setWait(Number(e.target.value))}
                                    className="slider flex-1"
                                />
                                <span className="font-bold text-cyan-600 w-16">{wait}y</span>
                            </div>
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-6 text-white text-center shadow-xl">
                            <p className="text-xs font-bold text-slate-400 uppercase">Sunk Cost vs Resale Principal</p>
                            <p className="text-4xl font-black text-red-500 mt-2">${totalSunkCost.toLocaleString()}</p>
                            <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">
                                The "Rental Burn" is often forgotten. By the time a New Launch completes, a Resale owner has already converted ~$120k of debt into home equity.
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="glass-card h-full">
                            <div id="waterfallPlot" className="w-full h-full min-h-[400px]"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Equity Forecast */}
            <section id="equity" className="py-20 bg-emerald-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-black">2026 Equity Projection</h2>
                            <p className="text-slate-600 mt-2">Net worth comparison at 1.4% mortgage interest rate.</p>
                        </div>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <span className="text-xs font-bold text-slate-500">Resale (Immediate Equity)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                                <span className="text-xs font-bold text-slate-500">New Launch (Rental Adjusted)</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-2">
                        <div id="equityForecast" className="w-full h-[500px]"></div>
                    </div>
                </div>
            </section>

            {/* Summary Verdict */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white border border-slate-200 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-4">Choose Resale If...</h3>
                        <ul className="space-y-4 text-slate-600 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>You want to lock in a 1.4% rate on a full loan immediately to maximize principal reduction.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>You need family space now and refuse to pay "dead money" to a landlord.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>You value a lower entry price PSF ($1,700s) as a safety buffer.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="p-8 bg-slate-900 text-white rounded-2xl">
                        <h3 className="text-2xl font-bold mb-4">Choose New Launch If...</h3>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-500 font-bold">✓</span>
                                <span>You have free alternative accommodation (e.g., staying with parents).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-500 font-bold">✓</span>
                                <span>You prioritize high-efficiency "Harmonized" layouts over pure square footage.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-500 font-bold">✓</span>
                                <span>You prefer the progressive payment cashflow model over immediate full mortgage.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>




        </div>
    );
}
