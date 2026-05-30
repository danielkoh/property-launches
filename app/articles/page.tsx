import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Property Market Articles & Analysis | New Launch Singapore",
    description: "Deep dive analysis into Singapore's property market, featured developments, and capital appreciation strategies.",
};

export default function ArticlesIndex() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a192f] text-slate-900 dark:text-white font-sans flex flex-col justify-between">
            <div>
                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0a192f]/95 backdrop-blur-md border-b border-solid border-[#f0f2f4] dark:border-gray-800 px-6 lg:px-12 py-3">
                    <div className="max-w-[1280px] mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-10">
                            <a href="/" className="flex items-center gap-2 text-primary font-bold">
                                <span className="material-symbols-outlined text-3xl">apartment</span>
                                <h2 className="text-[#111418] dark:text-white text-xl font-extrabold leading-tight tracking-tight">
                                    New<span className="text-primary">Launch</span>
                                </h2>
                            </a>
                            <nav className="hidden md:flex items-center gap-8">
                                <a
                                    className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1.5"
                                    href="/#featured-launches"
                                >
                                    <span className="material-symbols-outlined text-lg">rocket_launch</span>{" "}
                                    Featured Launches
                                </a>
                                <a
                                    className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1.5"
                                    href="/#investment-tools"
                                >
                                    <span className="material-symbols-outlined text-lg">query_stats</span>{" "}
                                    Investment Tools
                                </a>
                                <div className="relative group py-2">
                                    <a
                                        className="text-sm font-semibold text-primary transition-colors flex items-center gap-1 cursor-pointer"
                                        href="/articles"
                                    >
                                        <span className="material-symbols-outlined text-lg">article</span>{" "}
                                        Market Insights
                                        <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">keyboard_arrow_down</span>
                                    </a>
                                    <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block pt-2 w-72 z-50">
                                        <div className="bg-white dark:bg-slate-950 border border-[#f0f2f4] dark:border-gray-800 rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                            <div className="px-4 py-1.5 border-b border-[#f0f2f4] dark:border-gray-800">
                                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                                    Featured Analysis
                                                </p>
                                            </div>
                                            <div className="max-h-[300px] overflow-y-auto">
                                                <a href="/articles/the-five-dragons-of-singapore" className="flex flex-col px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left transition-colors">
                                                    <span className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">The Five Dragons of Singapore</span>
                                                    <span className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">Landform Geomancy Atlas</span>
                                                </a>
                                                <a href="/articles/ocr-strata-landed-phenom" className="flex flex-col px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left transition-colors">
                                                    <span className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">OCR Strata Landed Phenom</span>
                                                    <span className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">How Sellers Secured Up to $1.45M</span>
                                                </a>
                                                <a href="/articles/resale-vs-new-launch" className="flex flex-col px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left transition-colors">
                                                    <span className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">Resale vs. New Launch</span>
                                                    <span className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">Upgrader&apos;s Equity Comparison</span>
                                                </a>
                                                <a href="/articles/florence-vs-chuan-park" className="flex flex-col px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left transition-colors">
                                                    <span className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">Florence vs. Chuan Park</span>
                                                    <span className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">District 19 Capital Gains</span>
                                                </a>
                                                <a href="/articles/d19-sub-areas-analysis" className="flex flex-col px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left transition-colors">
                                                    <span className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">D19 Sub-Area Matrix</span>
                                                    <span className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">Hougang, Serangoon, Sengkang Matrix</span>
                                                </a>
                                            </div>
                                            <div className="border-t border-[#f0f2f4] dark:border-gray-800 mt-1 pt-1">
                                                <a href="/articles" className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-xs font-bold text-primary transition-colors">
                                                    <span>All Insights & Analysis</span>
                                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a
                                    className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1.5"
                                    href="/#vvip-registration"
                                >
                                    <span className="material-symbols-outlined text-lg">verified</span>{" "}
                                    VVIP Registration
                                </a>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href="/#vvip-registration"
                                className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:brightness-110 transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-lg">chat</span>{" "}
                                Chat now
                            </a>
                        </div>
                    </div>
                </header>

                <main className="pt-16 pb-20 px-6 lg:px-20">
                    <div className="max-w-[1000px] mx-auto">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        Market Insights & Analysis
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-blue-200 max-w-2xl">
                        In-depth research, comparative studies, and data-driven perspectives on Singapore&apos;s real estate landscape.
                    </p>
                </div>

                {/* SECTION 1: MARKET OUTLOOK */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        Market Outlook
                    </h2>
                    <div className="grid grid-cols-1 gap-8">
                        {/* 2026 Macro Forecast (Featured) */}


                        {/* The Five Dragons */}
                        <Link
                            href="/articles/the-five-dragons-of-singapore"
                            className="group block bg-slate-50 dark:bg-[#112240] rounded-2xl overflow-hidden border border-slate-100 dark:border-[#233554] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <div className="grid md:grid-cols-2 h-full">
                                <div className="h-64 md:h-auto bg-slate-900 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black"></div>
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("/images/singapore-dragon-map.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <div className="relative z-10 text-center p-6">
                                        <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-blue-500/30">
                                            Landform Feng Shui
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-2">The 5 Dragons</h3>
                                        <p className="text-slate-400 text-sm">Geomancy Atlas of Singapore</p>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        The Five Dragons of Singapore
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                                        Explore the &quot;Dragon Veins&quot; that shape the prosperity of Singapore&apos;s districts. From the &quot;Phoenix&quot; of Serangoon to the &quot;Central Spine&quot; of Bukit Timah, see how landform energy influences wealth and stability.
                                    </p>
                                    <div className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400">
                                        View Interactive Map <span className="material-symbols-outlined text-sm ml-1">explore</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* SECTION 2: DEEP DIVE ANALYSIS */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                        <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                        Comparative Analysis
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* The OCR Strata Landed Phenom */}
                        <Link
                            href="/articles/ocr-strata-landed-phenom"
                            className="group block bg-slate-50 dark:bg-[#112240] rounded-2xl overflow-hidden border border-slate-100 dark:border-[#233554] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 md:col-span-2 animate-[fade-in_0.5s_ease-out]"
                        >
                            <div className="grid md:grid-cols-2 h-full">
                                <div className="h-64 md:h-auto bg-slate-800 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-amber-950/70 opacity-90 z-0"></div>
                                    <div className="absolute inset-0 opacity-40 z-10" style={{ backgroundImage: 'url("/images/ocr-strata-landed-hero.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <div className="relative z-20 text-center p-6">
                                        <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-amber-500/30">
                                            Landed & ROI Focus
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-2">Up to $1.45M Gains</h3>
                                        <p className="text-slate-300 text-xs tracking-wider">Short-Term Outperformance Secrets</p>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <span className="inline-block w-fit px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-full mb-4">
                                        Interactive Calculator & Data Table
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        The OCR Strata Landed Phenom: How a &quot;Stagnant&quot; Asset Class Netted Buyers Up to $1.45M in 3 Years
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                                        Does strata landed housing really yield stagnant, low returns? Check our deep micro-market analysis of OCR transaction logs exposing actual sellers who secured $700k to $1.45M in pure profit in 3-5 years.
                                    </p>
                                    <div className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400">
                                        Read Deep-Dive Analysis <span className="material-symbols-outlined text-sm ml-1">trending_up</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Resale vs New Launch */}
                        <Link
                            href="/articles/resale-vs-new-launch"
                            className="group block bg-slate-50 dark:bg-[#112240] rounded-2xl overflow-hidden border border-slate-100 dark:border-[#233554] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 md:col-span-2"
                        >
                            <div className="grid md:grid-cols-2 h-full">
                                <div className="h-64 md:h-auto bg-slate-800 relative overflow-hidden flex items-center justify-center">
                                    {/* Abstract Visualization of "The Gap" */}
                                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#0f172a_25%,transparent_25%,transparent_75%,#0f172a_75%,#0f172a)] bg-[length:20px_20px]"></div>
                                    <div className="relative z-10 text-center p-6">
                                        <div className="flex items-center justify-center gap-4 text-white font-bold text-lg mb-2">
                                            <span className="text-emerald-400">Resale</span>
                                            <span className="text-slate-500">vs</span>
                                            <span className="text-red-400">New Launch</span>
                                        </div>
                                        <div className="text-5xl font-black text-white">$189k</div>
                                        <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">Potential Sunk Cost</div>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <span className="inline-block w-fit px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-full mb-4">
                                        Interactive Calculator
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        The Upgrader&apos;s Dilemma: Resale vs. New Launch
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                                        Should you wait 3-4 years for a New Launch or buy Resale today? Use our interactive calculator to see how &quot;dead money&quot; (rent) impacts your 5-year equity.
                                    </p>
                                    <div className="flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                        Start Calculation <span className="material-symbols-outlined text-sm ml-1">calculate</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Florence vs Chuan Park */}
                        <Link
                            href="/articles/florence-vs-chuan-park"
                            className="group block bg-slate-50 dark:bg-[#112240] rounded-2xl overflow-hidden border border-slate-100 dark:border-[#233554] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <div className="h-48 bg-gradient-to-r from-blue-600 to-amber-500 relative">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="absolute bottom-0 left-0 p-6">
                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full mb-2">
                                        District 19 Focus
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    Florence Residences vs. Chuan Park
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                                    A comparative detailed analysis of a mega-scale development versus a prime location new launch.
                                </p>
                                <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                                    Read Analysis <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                                </div>
                            </div>
                        </Link>

                        {/* D19 Sub-Area Analysis */}
                        <Link
                            href="/articles/d19-sub-areas-analysis"
                            className="group block bg-slate-50 dark:bg-[#112240] rounded-2xl overflow-hidden border border-slate-100 dark:border-[#233554] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <div className="h-48 bg-gradient-to-r from-rose-600 to-indigo-600 relative">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="absolute bottom-0 left-0 p-6">
                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full mb-2">
                                        Market Strategy
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h2 className="text-2xl font-bold mb-3 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                                    D19 Sub-Area Matrix: Livability vs. Growth
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                                    SWOT analysis of Hougang/Kovan, Serangoon, Punggol, Bartley, and Sengkang.
                                </p>
                                <div className="flex items-center text-sm font-medium text-rose-600 dark:text-rose-400">
                                    Read Analysis <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                </div>
            </main>
            </div>

            {/* Footer */}
            <footer className="bg-[#111418] text-white py-8 lg:py-12 px-6 lg:px-12 border-t border-gray-800">
                <div className="max-w-[1280px] mx-auto text-left">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <div className="max-w-xs">
                            <div className="flex flex-col gap-1 mb-6">
                                <h5 className="font-bold text-white mb-2">
                                    About Us
                                </h5>
                                <p className="font-bold text-gray-200">
                                    DANIEL KOH
                                </p>
                                <p className="text-sm text-gray-500 mb-4">CEA NO. : R073362I</p>
                                <h3 className="text-xl font-bold text-white">
                                    ERA Realty Network Pte Ltd
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Licence number: L3002382K
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed mb-6">
                                ERA APAC Centre, 450 Lorong 6 Toa Payoh, Singapore 319394
                            </p>
                            <a
                                className="text-primary font-bold hover:underline block mb-6"
                                href="https://www.era.com.sg"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                www.era.com.sg
                            </a>
                        </div>
                        <div className="flex flex-col gap-4 text-left">
                            <h5 className="font-bold text-white mb-2">
                                Market Insights
                            </h5>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li>
                                    <a href="/articles" className="hover:text-primary transition-colors flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">article</span> All Insights & Analysis
                                    </a>
                                </li>
                                <li>
                                    <a href="/articles/the-five-dragons-of-singapore" className="hover:text-primary transition-colors flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">explore</span> The Five Dragons of Singapore
                                    </a>
                                </li>
                                <li>
                                    <a href="/articles/ocr-strata-landed-phenom" className="hover:text-primary transition-colors flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">trending_up</span> OCR Strata Landed Phenom
                                    </a>
                                </li>
                                <li>
                                    <a href="/articles/resale-vs-new-launch" className="hover:text-primary transition-colors flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">calculate</span> Resale vs. New Launch
                                    </a>
                                </li>
                                <li>
                                    <a href="/articles/florence-vs-chuan-park" className="hover:text-primary transition-colors flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">swap_horiz</span> Florence vs. Chuan Park
                                    </a>
                                </li>
                                <li>
                                    <a href="/articles/d19-sub-areas-analysis" className="hover:text-primary transition-colors flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">grid_view</span> D19 Sub-Area Matrix
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-6 justify-end text-left md:text-right">
                            <div className="flex items-center gap-4 md:justify-end">
                                <a
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold"
                                    href="https://www.facebook.com/profile.php?id=61585740746558"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    title="Follow us on Facebook"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    Facebook Page
                                </a>
                            </div>
                            <div>
                                <a
                                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                                    href="https://bluebed.ai/privacy-policy"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Privacy Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
