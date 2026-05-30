"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";


const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
    display: "swap",
});

type SubAreaData = {
    id: string;
    title: string;
    label: string;
    element: string;
    desc: string;
    features: string[];
    benefit: string;
    radar: number[];
    bar: number[];
};

const subAreaData: Record<string, SubAreaData> = {
    "serangoon": {
        id: "serangoon", title: "Serangoon & Bartley", label: "Phoenix Area",
        element: "Fire / Phoenix",
        desc: "Known as the 'Phoenix' formation, this area mimics a bird taking flight. In Feng Shui, the Phoenix represents the South and Fire. Topographically, the hills here favor those seeking reputation, fame, and rapid personal growth.",
        features: ["Rising terrain (Phoenix Wings)", "Active 'Qi' circulation", "High visibility ridge", "Education focus"],
        benefit: "Reputation & Social Status",
        radar: [40, 90, 30, 50, 20], // Wood, Fire, Earth, Metal, Water
        bar: [6, 7, 9, 8, 9] // Wealth, Health, Career, Relations, Academic
    },
    "pasir_ris": {
        id: "pasir_ris", title: "Pasir Ris", label: "Green Dragon Tail",
        element: "Wood / Sunrise",
        desc: "Located at the end of the Eastern (Green) Dragon, Pasir Ris benefits from Wood energy—growth and flexibility. Its coastal location allows for a 'cleansing' of energy, promoting health and peaceful family living.",
        features: ["Seafront frontage", "Eastern growth energy", "Nature-rich environment", "Refreshing coastal Qi"],
        benefit: "Health & Vitality",
        radar: [95, 30, 40, 20, 75],
        bar: [7, 10, 7, 9, 8]
    },
    "dairy_farm": {
        id: "dairy_farm", title: "Dairy Farm", label: "Central Spine",
        element: "Earth / Stability",
        desc: "Situated at the foot of Bukit Timah, the 'Dragon Heart' of Singapore. This area provides unparalleled 'Mountain Backing,' which in Feng Shui translates to immense stability, protection, and Nobleman (Gui Ren) luck.",
        features: ["Bukit Timah hill backing", "Strong Earth foundation", "Central Dragon support", "Secluded valley pocket"],
        benefit: "Stability & Support",
        radar: [60, 20, 100, 40, 30],
        bar: [6, 10, 8, 9, 7]
    },
    "lakeside": {
        id: "lakeside", title: "Lakeside", label: "Western Pearl",
        element: "Metal / Accumulation",
        desc: "Where the Western Dragon (Metal) meets the waters of Jurong Lake. This creates a 'Bright Hall' where energy gathers. The lake acts as a wealth storage, making it ideal for those focused on asset accumulation.",
        features: ["Jurong Lake storage", "Flat expansive 'Ming Tang'", "Metal energy of industry", "Wealth catchment"],
        benefit: "Future Prosperity",
        radar: [40, 50, 50, 95, 85],
        bar: [9, 7, 8, 7, 7]
    },
    "great_world": {
        id: "great_world", title: "Great World City", label: "Jade Belt",
        element: "Water / Wealth",
        desc: "Nestled in a 'Jade Belt' curve of the Singapore River. Properties on the concave side of the river are said to be 'hugged' by wealth energy, promoting fluid financial growth and high-end lifestyle luck.",
        features: ["Meandering river bend", "Concave 'Embrace' line", "Low-lying wealth basin", "Smooth 'Qi' flow"],
        benefit: "Wealth & Fluid Assets",
        radar: [50, 30, 30, 70, 100],
        bar: [10, 8, 9, 8, 7]
    },
    "tanjong_pagar": {
        id: "tanjong_pagar", title: "Tanjong Pagar", label: "Dragon's Head",
        element: "Metal / Power",
        desc: "The Dragon's Head of the Southern line, diving into the sea. This is a high-Yang, high-intensity area suited for leadership, authority, and massive financial transactions. It represents the height of commerce.",
        features: ["Downward dragon plunge", "Intense commercial Yang", "Sea-facing wealth flow", "Historic power center"],
        benefit: "Power & Command",
        radar: [20, 85, 30, 100, 70],
        bar: [10, 5, 10, 6, 6]
    }
};

export default function DragonsClient({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
    const [selectedZone, setSelectedZone] = useState<string>("serangoon");
    const [chartsLoaded, setChartsLoaded] = useState(false);

    const radarChartRef = useRef<HTMLCanvasElement>(null);
    const barChartRef = useRef<HTMLCanvasElement>(null);

    const radarChartInstance = useRef<any>(null);
    const barChartInstance = useRef<any>(null);

    // Fix for navigation race condition: check if Chart is already loaded
    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).Chart) {
            setChartsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (chartsLoaded && typeof window !== "undefined" && (window as any).Chart) {
            const Chart = (window as any).Chart;
            Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

            const data = subAreaData[selectedZone];

            // --- Radar Chart ---
            if (radarChartRef.current) {
                if (radarChartInstance.current) radarChartInstance.current.destroy();
                const ctxRadar = radarChartRef.current.getContext('2d');
                if (ctxRadar) {
                    radarChartInstance.current = new Chart(ctxRadar, {
                        type: 'radar',
                        data: {
                            labels: ['Wood', 'Fire', 'Earth', 'Metal', 'Water'],
                            datasets: [{
                                label: 'Element Balance',
                                data: data.radar,
                                backgroundColor: 'rgba(37, 99, 235, 0.15)',
                                borderColor: '#2563eb',
                                borderWidth: 1.5,
                                pointRadius: 2,
                                pointBackgroundColor: '#2563eb'
                            }]
                        },
                        options: {
                            maintainAspectRatio: false,
                            scales: {
                                r: { beginAtZero: true, max: 100, ticks: { display: false }, grid: { color: '#f1f5f9' } }
                            },
                            plugins: { legend: { display: false } }
                        }
                    });
                }
            }

            // --- Bar Chart ---
            if (barChartRef.current) {
                if (barChartInstance.current) barChartInstance.current.destroy();
                const ctxBar = barChartRef.current.getContext('2d');
                if (ctxBar) {
                    barChartInstance.current = new Chart(ctxBar, {
                        type: 'bar',
                        data: {
                            labels: ['Wealth', 'Health', 'Career', 'Relations', 'Acad.'],
                            datasets: [{
                                label: 'Auspicious Index',
                                data: data.bar,
                                backgroundColor: '#1e293b',
                                borderRadius: 4
                            }]
                        },
                        options: {
                            indexAxis: 'y',
                            maintainAspectRatio: false,
                            scales: {
                                x: { beginAtZero: true, max: 10, ticks: { display: false }, grid: { display: false } },
                                y: { grid: { display: false }, ticks: { font: { size: 10, weight: '600' } } }
                            },
                            plugins: { legend: { display: false } }
                        }
                    });
                }
            }
        }
    }, [chartsLoaded, selectedZone]);

    const activeData = subAreaData[selectedZone];

    return (
        <div className={`min-h-screen bg-[#F8FAFC] text-[#1E293B] ${plusJakartaSans.variable} font-sans`}>
            <Script
                src="https://cdn.jsdelivr.net/npm/chart.js"
                strategy="afterInteractive"
                onLoad={() => setChartsLoaded(true)}
            />

            <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">

                {/* Header */}
                <header className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6 mb-8 pt-20"> {/* Added pt-20 to clear generic header */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Singapore Geomancy Atlas</h1>
                            <p className="text-slate-500 mt-2 text-lg">Researching the Five Dragons and regional landform formations.</p>
                        </div>
                        <div className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-sm self-start md:self-auto">
                            Interactive Research
                        </div>
                    </div>

                    {/* The Five Dragons Introduction */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">The Five Dragons of the Lion City</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                According to Landform Feng Shui, Singapore&apos;s prosperity is driven by five &quot;Dragon Veins&quot; (energy lines) that radiate from the &quot;Dragon Heart&quot; located at Bukit Timah. These veins follow the island&apos;s natural topography, influencing the character and fortune of the districts they pass through.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 border-l-4 border-blue-500 bg-white shadow-sm rounded-r-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Central Dragon</span>
                                    <p className="text-sm font-bold text-slate-800">Wealth & Status</p>
                                </div>
                                <div className="p-4 border-l-4 border-emerald-500 bg-white shadow-sm rounded-r-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Eastern Dragon</span>
                                    <p className="text-sm font-bold text-slate-800">Intelligence & Growth</p>
                                </div>
                                <div className="p-4 border-l-4 border-amber-500 bg-white shadow-sm rounded-r-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Western Dragon</span>
                                    <p className="text-sm font-bold text-slate-800">Stability & Industry</p>
                                </div>
                                <div className="p-4 border-l-4 border-rose-500 bg-white shadow-sm rounded-r-lg">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Southern Dragon</span>
                                    <p className="text-sm font-bold text-slate-800">Authority & Commerce</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Overlay */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-slate-200">
                            <Image
                                src="/images/singapore-dragon-map.png"
                                alt="Singapore Dragon Map Overlay"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-md text-[10px] font-bold text-slate-500 border border-slate-200">
                                CONCEPTUAL GEOMANCY OVERLAY
                            </div>
                        </div>
                    </section>
                </header>

                {/* Dynamic Sub-Area Nav */}
                <div className="mb-12">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Select Sub-Area for Detailed Analysis</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {Object.values(subAreaData).map((zone) => (
                            <button
                                key={zone.id}
                                onClick={() => setSelectedZone(zone.id)}
                                className={`p-3 flex flex-col items-center justify-center text-center rounded-lg border transition-all duration-200 ${selectedZone === zone.id
                                    ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-md transform scale-105'
                                    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                                    }`}
                            >
                                <span className={`text-[10px] font-bold uppercase mb-0.5 ${selectedZone === zone.id ? 'text-blue-700' : 'text-slate-700'}`}>
                                    {zone.title}
                                </span>
                                <span className={`text-[9px] font-semibold ${selectedZone === zone.id ? 'text-blue-500' : 'text-slate-400'}`}>
                                    {zone.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Analysis Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">

                    {/* Left: Textual Insights */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">{activeData.title}</h2>
                                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase rounded-full border border-blue-100">
                                    {activeData.element}
                                </span>
                            </div>

                            <div className="prose prose-slate prose-sm max-w-none mb-8">
                                <p className="text-slate-600 leading-relaxed text-base">
                                    {activeData.desc}
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-slate-100">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Geomantic Site Features</h4>
                                <ul className="space-y-2">
                                    {activeData.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-lg border-b-4 border-blue-500">
                            <h4 className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">Dominant Energy Trait</h4>
                            <p className="text-2xl font-bold">{activeData.benefit}</p>
                        </div>
                    </div>

                    {/* Right: Visual Metrics */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-6 tracking-widest">Wu Xing (Elements) Balance</h3>
                            <div className="w-full h-[300px] relative">
                                <canvas ref={radarChartRef}></canvas>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-6 tracking-widest">Auspicious Index (1-10)</h3>
                            <div className="w-full h-[300px] relative">
                                <canvas ref={barChartRef}></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer - Moved above CTA */}
                <footer className="mt-20 mb-20 pt-12 border-t border-slate-200">
                    <div className="bg-blue-50/50 rounded-2xl p-10 text-center max-w-3xl mx-auto border border-blue-100">
                        <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-4">Notice of Interpretation</p>
                        <p className="text-sm text-slate-600 leading-relaxed italic mb-8">
                            This analysis is provided for <strong>entertainment and light reading purposes only</strong>. Landform Feng Shui is a traditional belief system; these interpretations are not scientifically proven and should not be used as the definitive basis for property or life decisions.
                        </p>
                        <div className="h-px bg-blue-200 w-24 mx-auto mb-8"></div>
                        <p className="text-slate-900 font-bold text-lg">
                            Whatever your choice of location, we wish you immense success, health, and happiness in your journey!
                        </p>
                    </div>
                </footer>


            </div>

        </div>
    );
}
