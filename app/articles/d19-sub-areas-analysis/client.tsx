"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
    display: "swap",
});



export default function D19SubAreaAnalysis({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
    const [chartsLoaded, setChartsLoaded] = useState(false);

    // Fix for navigation race condition: check if Chart is already loaded
    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).Chart) {
            setChartsLoaded(true);
        }
    }, []);

    // Refs for canvas elements
    const scatterChartRef = useRef<HTMLCanvasElement>(null);
    const radarChartRef = useRef<HTMLCanvasElement>(null);
    const priceBarChartRef = useRef<HTMLCanvasElement>(null);

    // Refs for chart instances
    const scatterChartInstance = useRef<any>(null);
    const radarChartInstance = useRef<any>(null);
    const priceBarChartInstance = useRef<any>(null);

    useEffect(() => {
        if (chartsLoaded && typeof window !== "undefined" && (window as any).Chart) {
            const Chart = (window as any).Chart;

            // --- UTILITY: Label Wrapping ---
            const wrapLabels = (labels: string[], maxChars: number = 14) => {
                return labels.map(label => {
                    if (label.length <= maxChars) return label;
                    const words = label.split(' ');
                    const lines = [];
                    let currentLine = words[0];

                    for (let i = 1; i < words.length; i++) {
                        if ((currentLine + " " + words[i]).length <= maxChars) {
                            currentLine += " " + words[i];
                        } else {
                            lines.push(currentLine);
                            currentLine = words[i];
                        }
                    }
                    lines.push(currentLine);
                    return lines;
                });
            }

            // Global Chart Defaults
            Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
            Chart.defaults.color = '#64748b';

            // --- CHART 1: MASTER SCATTER ---
            if (scatterChartRef.current) {
                if (scatterChartInstance.current) scatterChartInstance.current.destroy();
                const ctxScatter = scatterChartRef.current.getContext('2d');
                if (ctxScatter) {
                    scatterChartInstance.current = new Chart(ctxScatter, {
                        type: 'scatter',
                        data: {
                            datasets: [
                                { label: 'Bartley', data: [{ x: 8.5, y: 7.3 }], backgroundColor: '#E11D48', pointRadius: 12 },
                                { label: 'Serangoon', data: [{ x: 9.6, y: 6.9 }], backgroundColor: '#0D9488', pointRadius: 12 },
                                { label: 'Hougang/Kovan', data: [{ x: 8.9, y: 8.7 }], backgroundColor: '#6366F1', pointRadius: 15 },
                                { label: 'Sengkang', data: [{ x: 7.9, y: 7.2 }], backgroundColor: '#7C3AED', pointRadius: 12 },
                                { label: 'Punggol', data: [{ x: 7.3, y: 9.5 }], backgroundColor: '#F59E0B', pointRadius: 12 }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: { title: { display: true, text: 'Current Livability Score (1-10)', font: { weight: '800', size: 10 } }, min: 6, max: 10, grid: { color: '#F1F5F9' } },
                                y: { title: { display: true, text: 'Growth potential (1-10)', font: { weight: '800', size: 10 } }, min: 6, max: 10, grid: { color: '#F1F5F9' } }
                            },
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        title: function (items: any) { return items[0].dataset.label; }
                                    }
                                }
                            }
                        }
                    });
                }
            }

            // --- CHART 2: MASTER RADAR (5 AREAS) ---
            if (radarChartRef.current) {
                if (radarChartInstance.current) radarChartInstance.current.destroy();
                const ctxRadar = radarChartRef.current.getContext('2d');
                if (ctxRadar) {
                    radarChartInstance.current = new Chart(ctxRadar, {
                        type: 'radar',
                        data: {
                            labels: wrapLabels(['Transit Nodes', 'Food Culture', 'Future Jobs', 'Top Schools', 'Heritage Aura']),
                            datasets: [
                                {
                                    label: 'Hougang/Kovan',
                                    data: [9, 10, 8, 7, 9],
                                    borderColor: '#6366F1',
                                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                                    borderWidth: 3,
                                    pointRadius: 2
                                },
                                {
                                    label: 'Serangoon',
                                    data: [10, 9, 5, 10, 7],
                                    borderColor: '#0D9488',
                                    backgroundColor: 'rgba(13, 148, 136, 0.05)',
                                    borderWidth: 2,
                                    pointRadius: 1
                                },
                                {
                                    label: 'Punggol',
                                    data: [7, 7, 10, 5, 6],
                                    borderColor: '#F59E0B',
                                    backgroundColor: 'rgba(245, 158, 11, 0.05)',
                                    borderWidth: 2,
                                    pointRadius: 1
                                },
                                {
                                    label: 'Bartley',
                                    data: [7, 6, 4, 9, 8],
                                    borderColor: '#E11D48',
                                    backgroundColor: 'rgba(225, 29, 72, 0.05)',
                                    borderWidth: 2,
                                    pointRadius: 1
                                },
                                {
                                    label: 'Sengkang',
                                    data: [8, 8, 7, 6, 5],
                                    borderColor: '#7C3AED',
                                    backgroundColor: 'rgba(124, 58, 237, 0.05)',
                                    borderWidth: 2,
                                    pointRadius: 1
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        title: function (items: any) {
                                            let label = items[0].chart.data.labels[items[0].dataIndex];
                                            return Array.isArray(label) ? label.join(' ') : label;
                                        }
                                    }
                                }
                            },
                            scales: {
                                r: {
                                    angleLines: { color: '#334155' },
                                    grid: { color: '#334155' },
                                    pointLabels: { color: '#94A3B8', font: { size: 10, weight: '600' } },
                                    ticks: { display: false, backdropColor: 'transparent' },
                                    suggestedMin: 0,
                                    suggestedMax: 10
                                }
                            }
                        }
                    });
                }
            }

            // --- CHART 3: PRICE BAR ---
            if (priceBarChartRef.current) {
                if (priceBarChartInstance.current) priceBarChartInstance.current.destroy();
                const ctxBar = priceBarChartRef.current.getContext('2d');
                if (ctxBar) {
                    priceBarChartInstance.current = new Chart(ctxBar, {
                        type: 'bar',
                        data: {
                            labels: wrapLabels(['Bartley', 'Hougang/Kovan', 'Serangoon', 'Sengkang', 'Punggol']),
                            datasets: [{
                                label: 'Avg Resale PSF (SGD)',
                                data: [1980, 1870, 1840, 1580, 1520],
                                backgroundColor: ['#E11D48', '#6366F1', '#0D9488', '#7C3AED', '#F59E0B'],
                                borderRadius: 10,
                                barThickness: 50
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        title: function (items: any) {
                                            let label = items[0].chart.data.labels[items[0].dataIndex];
                                            return Array.isArray(label) ? label.join(' ') : label;
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: { beginAtZero: true, suggestedMax: 2200, grid: { color: '#F1F5F9' } },
                                x: { grid: { display: false } }
                            }
                        }
                    });
                }
            }
        }

        return () => {
            if (scatterChartInstance.current) scatterChartInstance.current.destroy();
            if (radarChartInstance.current) radarChartInstance.current.destroy();
            if (priceBarChartInstance.current) priceBarChartInstance.current.destroy();
        };
    }, [chartsLoaded]);

    return (
        <div className={`min-h-screen bg-[#F8FAFC] text-[#1E293B] ${plusJakartaSans.variable} font-sans`}>
            <Script
                src="https://cdn.jsdelivr.net/npm/chart.js"
                strategy="afterInteractive"
                onLoad={() => setChartsLoaded(true)}
            />

            {/* Custom Styles adapted to CSS-in-JS/Tailwind */}
            <style jsx global>{`
                .chart-container {
                    position: relative;
                    width: 100%;
                    max-width: 800px;
                    height: 400px;
                    margin: 0 auto;
                }
                @media (max-width: 768px) {
                    .chart-container {
                        height: 320px;
                    }
                }
                .glass-card {
                    background: rgba(255, 255, 255, 1);
                    border: 1px solid #E2E8F0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .glass-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                }
                .swot-badge {
                    font-size: 0.65rem;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    padding: 2px 8px;
                    border-radius: 4px;
                    display: inline-block;
                    margin-bottom: 0.25rem;
                }
                .legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-right: 6px; }
            `}</style>

            {/* Header Section */}
            <header className="bg-slate-900 text-white pt-20 pb-40 px-6 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px] opacity-20 -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500 rounded-full blur-[120px] opacity-10 -ml-48 -mb-48"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
                    <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 rounded-full mb-6">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-200">2026 Comprehensive Review</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        District 19 Master Matrix
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                        Strategic analysis of the five sub-areas defining Singapore's North-East corridor. Comparative SWOT, Growth Potential, and Pricing.
                    </p>
                </div>
            </header>

            {/* Main Content Container */}
            <main className="max-w-6xl mx-auto px-6 -mt-24 pb-24 relative z-20">

                {/* 1. Master Scatter Map */}
                <section className="mb-12">
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-slate-100">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-slate-50 pb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">The Livability vs. Appreciation Map</h2>
                                <p className="text-slate-500 text-sm mt-1">Strategic positioning of all 5 hubs.</p>
                            </div>
                            <div className="flex flex-wrap gap-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                <span className="flex items-center"><span className="legend-dot bg-rose-500"></span> Bartley</span>
                                <span className="flex items-center"><span className="legend-dot bg-teal-500"></span> Serangoon</span>
                                <span className="flex items-center"><span className="legend-dot bg-indigo-500"></span> Hougang/Kovan</span>
                                <span className="flex items-center"><span className="legend-dot bg-purple-500"></span> Sengkang</span>
                                <span className="flex items-center"><span className="legend-dot bg-amber-500"></span> Punggol</span>
                            </div>
                        </div>
                        <div className="chart-container">
                            <canvas ref={scatterChartRef} id="masterScatterChart"></canvas>
                        </div>
                    </div>
                </section>

                {/* 2. Master Radar Chart Section */}
                <section className="mb-16 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl border border-slate-800">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-4 text-white">Attribute Radar Matrix</h2>
                            <p className="text-slate-400 text-sm mb-10 leading-relaxed">
                                Comparing the structural DNA of all 5 sub-areas. **Hougang/Kovan** emerges as the balanced leader in transit and food, while **Punggol** takes the digital future lead.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                                    <span className="text-xs font-semibold text-slate-300">MRT Nodes Leader</span>
                                    <span className="text-xs font-bold text-teal-400">Serangoon</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                                    <span className="text-xs font-semibold text-slate-300">Growth Catalyst Leader</span>
                                    <span className="text-xs font-bold text-indigo-400">Hougang/Kovan</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                                    <span className="text-xs font-semibold text-slate-300">Digital Economy Leader</span>
                                    <span className="text-xs font-bold text-amber-400">Punggol</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="chart-container">
                                <canvas ref={radarChartRef} id="masterRadarChart"></canvas>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Regional SWOT Breakdown */}
                <div className="mb-10 px-2">
                    <h2 className="text-2xl font-bold text-slate-800">Regional SWOT Breakdown</h2>
                    <p className="text-slate-500 text-sm">Critical insights for selection across the 5 D19 hubs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

                    {/* HOUGANG/KOVAN */}
                    <div className="glass-card rounded-3xl overflow-hidden border-t-4 border-t-indigo-500 flex flex-col">
                        <div className="p-5 bg-indigo-50">
                            <h4 className="font-bold text-indigo-900">Hougang / Kovan</h4>
                            <span className="swot-badge bg-indigo-600 text-white mt-1">Interchange King</span>
                        </div>
                        <div className="p-6 space-y-4 text-xs leading-relaxed flex-grow">
                            <div>
                                <span className="swot-badge bg-green-100 text-green-700">Strengths</span>
                                <p className="text-slate-600">Rich food culture (Heartland Mall), landed enclave proximity, and mature amenities.</p>
                            </div>
                            <div>
                                <span className="swot-badge bg-blue-100 text-blue-700">Opportunities</span>
                                <p className="text-slate-800 font-bold">Cross Island Line (CRL) transformation turning Hougang MRT into a massive transport node.</p>
                            </div>
                            <div>
                                <span className="swot-badge bg-red-100 text-red-700">Threats</span>
                                <p className="text-slate-600">Lease decay in older Hougang central HDBs and condos potentially affecting valuation ceiling.</p>
                            </div>
                        </div>
                    </div>

                    {/* SERANGOON */}
                    <div className="glass-card rounded-3xl overflow-hidden border-t-4 border-t-teal-500 flex flex-col">
                        <div className="p-5 bg-teal-50">
                            <h4 className="font-bold text-teal-900">Serangoon Central</h4>
                            <span className="swot-badge bg-teal-600 text-white mt-1">Lifestyle Hub</span>
                        </div>
                        <div className="p-6 space-y-4 text-xs leading-relaxed flex-grow">
                            <div>
                                <span className="swot-badge bg-green-100 text-green-700">Strengths</span>
                                <p className="text-slate-600">Dual MRT line interchange, NEX Mall (the region's largest), and proximity to top schools.</p>
                            </div>
                            <div>
                                <span className="swot-badge bg-gray-100 text-gray-500">Weaknesses</span>
                                <p className="text-slate-600">High road congestion during peak hours and high price-to-rent entry barrier.</p>
                            </div>
                            <div>
                                <span className="swot-badge bg-blue-100 text-blue-700">Opportunities</span>
                                <p className="text-slate-600">Potential commercial rezoning increasing local job counts and rental demand.</p>
                            </div>
                        </div>
                    </div>

                    {/* PUNGGOL */}
                    <div className="glass-card rounded-3xl overflow-hidden border-t-4 border-t-amber-500 flex flex-col">
                        <div className="p-5 bg-amber-50">
                            <h4 className="font-bold text-amber-900">Punggol District</h4>
                            <span className="swot-badge bg-amber-600 text-white mt-1">Future Tech Hub</span>
                        </div>
                        <div className="p-6 space-y-4 text-xs leading-relaxed flex-grow">
                            <div>
                                <span className="swot-badge bg-green-100 text-green-700">Strengths</span>
                                <p className="text-slate-600">Waterfront lifestyle and the Punggol Digital District (PDD) infrastructure.</p>
                            </div>
                            <div>
                                <span className="swot-badge bg-blue-100 text-blue-700">Opportunities</span>
                                <p className="text-slate-800 font-bold">New SIT Campus and JTC tech firms moving in will create high-quality tenant demand.</p>
                            </div>
                            <div>
                                <span className="swot-badge bg-red-100 text-red-700">Threats</span>
                                <p className="text-slate-600">High future resale supply from MOP-ing HDB units may compress price growth initially.</p>
                            </div>
                        </div>
                    </div>

                    {/* BARTLEY */}
                    <div className="glass-card rounded-3xl overflow-hidden border-t-4 border-t-rose-500 flex flex-col">
                        <div className="p-5 bg-rose-50">
                            <h4 className="font-bold text-rose-900">Bartley Enclave</h4>
                            <span className="swot-badge bg-rose-600 text-white mt-1">City Fringe</span>
                        </div>
                        <div className="p-6 space-y-4 text-xs leading-relaxed flex-grow">
                            <div>
                                <span className="swot-badge bg-green-100 text-green-700">Strengths</span>
                                <p className="text-slate-600">Elite schools (Maris Stella/Cedar Girls), exclusivity, and short travel to CBD.</p>
                            </div>
                            <div>
                                <span className="swot-badge bg-blue-100 text-blue-700">Opportunities</span>
                                <p className="text-slate-600">Bidadari estate spillover benefits and Defu Industrial rejuvenation.</p>
                            </div>
                        </div>
                    </div>

                    {/* SENGKANG */}
                    <div className="glass-card rounded-3xl overflow-hidden border-t-4 border-t-purple-500 flex flex-col">
                        <div className="p-5 bg-purple-50">
                            <h4 className="font-bold text-purple-900">Sengkang Family</h4>
                            <span className="swot-badge bg-purple-600 text-white mt-1">Value Player</span>
                        </div>
                        <div className="p-6 space-y-4 text-xs leading-relaxed flex-grow">
                            <div>
                                <span className="swot-badge bg-green-100 text-green-700">Strengths</span>
                                <p className="text-slate-600">High density of modern family amenities and the new Sengkang Grand Mall.</p>
                            </div>
                            <div>
                                <span className="swot-badge bg-blue-100 text-blue-700">Opportunities</span>
                                <p className="text-slate-600">Stable rental demand from the growing Sengkang General Hospital medical hub.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Price Benchmark Chart */}
                <section className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100">
                    <h3 className="text-xl font-bold mb-8 text-slate-800">Average Entry PSF (Leasehold Condos)</h3>
                    <div className="chart-container">
                        <canvas ref={priceBarChartRef} id="priceBenchmarkChart"></canvas>
                    </div>
                    <div className="mt-8 bg-slate-50 p-4 rounded-xl text-center">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pricing data updated for 2025 Market benchmarks</p>
                    </div>
                </section>



            </main>


        </div >
    );
}
