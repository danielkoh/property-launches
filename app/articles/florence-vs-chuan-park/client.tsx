"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Define a type for the Chart.js instance attached to window or elements
// We'll use 'any' for simplicity as we are loading via CDN
type ChartInstance = any;



export default function FlorenceVsChuanPark({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
    const [chartsLoaded, setChartsLoaded] = useState(false);

    // Fix for navigation race condition: check if Chart is already loaded
    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).Chart) {
            setChartsLoaded(true);
        }
    }, []);

    // Refs for canvas elements
    const priceTrendChartRef = useRef<HTMLCanvasElement>(null);
    const comparisonChartRef = useRef<HTMLCanvasElement>(null);
    const radarChartRef = useRef<HTMLCanvasElement>(null);

    // Refs for chart instances to destroy them on cleanup
    const priceTrendChartInstance = useRef<ChartInstance>(null);
    const comparisonChartInstance = useRef<ChartInstance>(null);
    const radarChartInstance = useRef<ChartInstance>(null);

    useEffect(() => {
        if (chartsLoaded && typeof window !== "undefined" && (window as any).Chart) {
            const Chart = (window as any).Chart;

            // --- UTILITY: Label Wrapping ---
            const wrapLabels = (labels: string[], maxChars: number = 16) => {
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

            // --- GLOBAL CHART CONFIG ---
            Chart.defaults.font.family = "'Inter', sans-serif";
            Chart.defaults.color = '#475569';
            Chart.defaults.scale.grid.color = '#E2E8F0';

            // --- CHART 1: PRICE TRENDS (Line) ---
            if (priceTrendChartRef.current) {
                if (priceTrendChartInstance.current) priceTrendChartInstance.current.destroy();
                const ctxTrend = priceTrendChartRef.current.getContext('2d');
                if (ctxTrend) {
                    priceTrendChartInstance.current = new Chart(ctxTrend, {
                        type: 'line',
                        data: {
                            labels: ['2019', '2020', '2021', '2022', '2023', '2024 (Est)'],
                            datasets: [
                                {
                                    label: 'D19 OCR Average PSF',
                                    data: [1350, 1380, 1500, 1650, 1780, 1850],
                                    borderColor: '#3B82F6', // Blue 500
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    borderWidth: 3,
                                    tension: 0.4,
                                    fill: true,
                                    pointBackgroundColor: '#fff',
                                    pointBorderColor: '#3B82F6',
                                    pointRadius: 5
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: true, position: 'top' },
                                tooltip: {
                                    callbacks: {
                                        title: function (tooltipItems: any) {
                                            const item = tooltipItems[0];
                                            let label = item.chart.data.labels[item.dataIndex];
                                            if (Array.isArray(label)) return label.join(' ');
                                            return label;
                                        },
                                        label: function (context: any) {
                                            return 'Avg PSF: $' + context.parsed.y;
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: false,
                                    suggestedMin: 1000
                                }
                            }
                        }
                    });
                }
            }

            // --- CHART 2: COMPARISON (Bar) ---
            if (comparisonChartRef.current) {
                if (comparisonChartInstance.current) comparisonChartInstance.current.destroy();
                const ctxComp = comparisonChartRef.current.getContext('2d');
                const rawLabelsComp = ['Florence Launch (2019)', 'Florence Current', 'Chuan Park (Est Launch)'];
                if (ctxComp) {
                    comparisonChartInstance.current = new Chart(ctxComp, {
                        type: 'bar',
                        data: {
                            labels: wrapLabels(rawLabelsComp),
                            datasets: [{
                                label: 'Price per Square Foot (SGD)',
                                data: [1450, 1850, 2600],
                                backgroundColor: [
                                    '#93C5FD', // Light Blue
                                    '#3B82F6', // Primary Blue
                                    '#F59E0B'  // Amber (Highlight New Launch)
                                ],
                                borderRadius: 6
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        title: function (tooltipItems: any) {
                                            const item = tooltipItems[0];
                                            let label = item.chart.data.labels[item.dataIndex];
                                            if (Array.isArray(label)) return label.join(' ');
                                            return label;
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: { beginAtZero: true }
                            }
                        }
                    });
                }
            }

            // --- CHART 3: RADAR SCORING ---
            if (radarChartRef.current) {
                if (radarChartInstance.current) radarChartInstance.current.destroy();
                const ctxRadar = radarChartRef.current.getContext('2d');
                if (ctxRadar) {
                    radarChartInstance.current = new Chart(ctxRadar, {
                        type: 'radar',
                        data: {
                            labels: wrapLabels(['MRT Proximity', 'Facilities Scale', 'Entry Price', 'Rental Yield', 'Scarcity']),
                            datasets: [
                                {
                                    label: 'Florence Residences',
                                    data: [7, 10, 8, 8, 6],
                                    fill: true,
                                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                    borderColor: '#3B82F6',
                                    pointBackgroundColor: '#3B82F6',
                                    pointBorderColor: '#fff',
                                    pointHoverBackgroundColor: '#fff',
                                    pointHoverBorderColor: '#3B82F6'
                                },
                                {
                                    label: 'Chuan Park',
                                    data: [10, 7, 5, 7, 9], // Lower score for entry price means distinctively expensive
                                    fill: true,
                                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                                    borderColor: '#F59E0B',
                                    pointBackgroundColor: '#F59E0B',
                                    pointBorderColor: '#fff',
                                    pointHoverBackgroundColor: '#fff',
                                    pointHoverBorderColor: '#F59E0B'
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            elements: {
                                line: { borderWidth: 3 }
                            },
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        title: function (tooltipItems: any) {
                                            const item = tooltipItems[0];
                                            let label = item.chart.data.labels[item.dataIndex];
                                            if (Array.isArray(label)) return label.join(' ');
                                            return label;
                                        }
                                    }
                                }
                            },
                            scales: {
                                r: {
                                    angleLines: { color: '#E2E8F0' },
                                    grid: { color: '#E2E8F0' },
                                    pointLabels: {
                                        font: { size: 12, weight: '600' }
                                    },
                                    suggestedMin: 0,
                                    suggestedMax: 10
                                }
                            }
                        }
                    });
                }
            }
        }

        return () => {
            // Cleanup charts
            if (priceTrendChartInstance.current) priceTrendChartInstance.current.destroy();
            if (comparisonChartInstance.current) comparisonChartInstance.current.destroy();
            if (radarChartInstance.current) radarChartInstance.current.destroy();
        };
    }, [chartsLoaded]);

    return (
        <div className="font-sans text-slate-800 bg-slate-50 min-h-screen">
            <Script
                src="https://cdn.jsdelivr.net/npm/chart.js"
                strategy="afterInteractive"
                onLoad={() => setChartsLoaded(true)}
            />

            <style jsx global>{`
        /* Chart Container Styling - Responsive & Constrained */
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px; /* Max width to prevent stretching */
            height: 350px;    /* Base height */
            margin: 0 auto;   /* Center horizontally */
        }
        
        @media (max-width: 640px) {
            .chart-container {
                height: 300px;
            }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8; 
        }

        .card-hover {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
      `}</style>
            <div className="antialiased font-inter">

                {/* Hero Section */}
                <header className="bg-slate-900 text-white pt-16 pb-24 px-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-blue-400 to-amber-500"></div>
                    <div className="max-w-6xl mx-auto text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                            District 19 Analysis
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-200 font-light max-w-3xl mx-auto">
                            Unlocking Capital Appreciation in Singapore's Heartland. <br />
                            <span className="font-semibold text-amber-400">Florence Residences</span> vs. <span className="font-semibold text-amber-400">Chuan Park</span>.
                        </p>
                    </div>
                    {/* Abstract Decorative Circles */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-500 rounded-full opacity-10 blur-3xl"></div>
                </header>

                {/* Main Content Grid */}
                <main className="max-w-6xl mx-auto -mt-16 px-4 pb-20 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">

                    {/* INTRO CARD */}
                    <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-lg p-8 border-l-8 border-amber-500 card-hover">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Why District 19?</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            District 19 (Hougang, Punggol, Sengkang, Serangoon) has evolved from a sleepy residential belt into a high-growth corridor. The primary catalyst is the <strong>Cross Island Line (CRL)</strong>, which will transform Hougang into a major interchange. D19 offers a &quot;sweet spot&quot; of affordability compared to the Core Central Region (CCR), while offering significant upside potential due to infrastructure development and decentralization.
                        </p>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">Upcoming CRL</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">Mature Amenities</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">High Rental Demand</span>
                        </div>
                    </div>

                    {/* CHART: PRICE TRENDS */}
                    <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-md p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-slate-800">D19 Price Evolution (PSF)</h3>
                            <p className="text-sm text-slate-500">Average PSF growth trend over the last 5 years, highlighting the resilience of the region.</p>
                        </div>
                        <div className="chart-container">
                            <canvas ref={priceTrendChartRef} id="priceTrendChart"></canvas>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-sm font-medium text-slate-600 bg-slate-100 py-2 rounded">
                                Key Takeaway: Steady upward trajectory driven by new launches setting new price benchmarks.
                            </p>
                        </div>
                    </div>

                    {/* CASE STUDY 1: FLORENCE RESIDENCES */}
                    <div className="col-span-1 bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
                        <div className="bg-blue-600 p-4">
                            <h3 className="text-white font-bold text-lg">The Florence Residences</h3>
                            <p className="text-blue-100 text-sm">The Mega-Club Condo</p>
                        </div>
                        <div className="p-6 flex-grow">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">🏢</span>
                                    <div>
                                        <strong className="block text-slate-800">Scale Advantage</strong>
                                        <span className="text-sm text-slate-600">1,410 units allow for low maintenance fees and massive facilities (128 total).</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">🚆</span>
                                    <div>
                                        <strong className="block text-slate-800">Connectivity</strong>
                                        <span className="text-sm text-slate-600">Walk to Hougang MRT (NE Line) & Future CRL Interchange.</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">📈</span>
                                    <div>
                                        <strong className="block text-slate-800">Performance</strong>
                                        <span className="text-sm text-slate-600">Launched ~$1,450 psf (2019). Current resale avg ~$1,850+ psf. Significant paper gains for early entrants.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 p-4 border-t border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Strategy</span>
                            <p className="text-sm font-semibold text-blue-600">Volume Play & Infrastructure Growth</p>
                        </div>
                    </div>

                    {/* CASE STUDY 2: CHUAN PARK */}
                    <div className="col-span-1 bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
                        <div className="bg-amber-500 p-4">
                            <h3 className="text-white font-bold text-lg">Chuan Park (New Launch)</h3>
                            <p className="text-amber-100 text-sm">The Location Premium</p>
                        </div>
                        <div className="p-6 flex-grow">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">📍</span>
                                    <div>
                                        <strong className="block text-slate-800">Prime Location</strong>
                                        <span className="text-sm text-slate-600">Doorstep to Lorong Chuan MRT (Circle Line). 1 stop to NEX/Serangoon.</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">💎</span>
                                    <div>
                                        <strong className="block text-slate-800">Scarcity Factor</strong>
                                        <span className="text-sm text-slate-600">Lack of new major launches in the immediate Lorong Chuan vicinity for years.</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">💰</span>
                                    <div>
                                        <strong className="block text-slate-800">Entry Price</strong>
                                        <span className="text-sm text-slate-600">Estimated launch &gt;$2,600 psf. Higher entry but potential for &quot;first-mover&quot; in a refreshed precinct.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 p-4 border-t border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Strategy</span>
                            <p className="text-sm font-semibold text-amber-600">Scarcity & Convenience Premium</p>
                        </div>
                    </div>

                    {/* CHART: ENTRY PRICE COMPARISON */}
                    <div className="col-span-1 md:col-span-1 bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Entry Price Comparison (PSF)</h3>
                        <p className="text-xs text-slate-500 mb-4">Comparing historical launch prices vs. estimated new launch benchmarks.</p>
                        <div className="chart-container">
                            <canvas ref={comparisonChartRef} id="comparisonChart"></canvas>
                        </div>
                    </div>

                    {/* CHART: ATTRIBUTE SCORING (RADAR) */}
                    <div className="col-span-1 md:col-span-1 bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Attribute Scoring</h3>
                        <p className="text-xs text-slate-500 mb-4">Relative strengths of the two developments.</p>
                        <div className="chart-container">
                            <canvas ref={radarChartRef} id="radarChart"></canvas>
                        </div>
                    </div>

                    {/* RISKS SECTION */}
                    <div className="col-span-1 md:col-span-2 bg-slate-900 text-white rounded-xl shadow-lg p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-amber-500">Risk Assessment</h2>
                            <span className="text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-full mt-2 md:mt-0">Critical Factors</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Risk 1 */}
                            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <h4 className="font-bold text-lg mb-2 text-blue-400">Policy Risk</h4>
                                <p className="text-sm text-slate-300">Additional Buyer&apos;s Stamp Duty (ABSD) hikes dampening foreign investment and investor demand, potentially slowing resale velocity.</p>
                            </div>
                            {/* Risk 2 */}
                            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <h4 className="font-bold text-lg mb-2 text-blue-400">Interest Rates</h4>
                                <p className="text-sm text-slate-300">&quot;Higher for longer&quot; interest rate environment increases holding costs, impacting net rental yields and buyer affordability.</p>
                            </div>
                            {/* Risk 3 */}
                            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <h4 className="font-bold text-lg mb-2 text-blue-400">Supply Glut</h4>
                                <p className="text-sm text-slate-300">With several mega-developments in D19 (e.g., Riverfront, Affinity, Florence) hitting TOP around the same time, rental competition is fierce.</p>
                            </div>
                        </div>
                    </div>

                    {/* TIMELINE: CATALYSTS */}
                    <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-md p-8">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">Future Catalysts Timeline</h3>
                        <div className="relative border-l-4 border-blue-200 ml-4 space-y-8">

                            {/* Event 1 */}
                            <div className="relative pl-8">
                                <div className="absolute -left-3 top-0 bg-blue-500 h-6 w-6 rounded-full border-4 border-white"></div>
                                <h4 className="font-bold text-lg text-slate-800">2024-2025</h4>
                                <p className="text-slate-600">The Chuan Park Launch. Sets a new pricing benchmark for the district, potentially pulling up resale prices of surrounding older condos.</p>
                            </div>

                            {/* Event 2 */}
                            <div className="relative pl-8">
                                <div className="absolute -left-3 top-0 bg-amber-500 h-6 w-6 rounded-full border-4 border-white"></div>
                                <h4 className="font-bold text-lg text-slate-800">2030 (Estimated)</h4>
                                <p className="text-slate-600">Cross Island Line (Phase 1) Completion. Hougang becomes a major interchange, significantly boosting connectivity for Florence Residences.</p>
                            </div>

                            {/* Event 3 */}
                            <div className="relative pl-8">
                                <div className="absolute -left-3 top-0 bg-slate-400 h-6 w-6 rounded-full border-4 border-white"></div>
                                <h4 className="font-bold text-lg text-slate-800">2030+</h4>
                                <p className="text-slate-600">Paya Lebar Airbase Relocation. Long-term removal of height restrictions and redevelopment of the area, benefiting the wider D19 region.</p>
                            </div>

                        </div>
                    </div>

                </main>




            </div>
        </div>
    );
}
