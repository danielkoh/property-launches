"use client";

import MortgageEstimator from "./MortgageEstimator";
import StampDutyCalculator from "./StampDutyCalculator";
import InvestmentRoiCalculator from "./InvestmentRoiCalculator";
import ResaleRoiCalculator from "./ResaleRoiCalculator";
import ProgressionPlanner from "./ProgressionPlanner";
import EcViabilityCalculator from "./EcViabilityCalculator";
import HouseholdIncomeCalculator from "./HouseholdIncomeCalculator";
import ContactForm from "./ContactForm";
import { useState, useEffect } from "react";


export default function HomeClient() {
    const [isMortgageEstimatorOpen, setIsMortgageEstimatorOpen] = useState(false);
    const [isStampDutyCalculatorOpen, setIsStampDutyCalculatorOpen] = useState(false);
    const [isInvestmentRoiCalculatorOpen, setIsInvestmentRoiCalculatorOpen] = useState(false);
    const [isResaleRoiCalculatorOpen, setIsResaleRoiCalculatorOpen] = useState(false);
    const [isProgressionPlannerOpen, setIsProgressionPlannerOpen] = useState(false);
    const [isEcViabilityCalculatorOpen, setIsEcViabilityCalculatorOpen] = useState(false);
    const [isHouseholdIncomeCalculatorOpen, setIsHouseholdIncomeCalculatorOpen] = useState(false);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (!hash) return;

            if (hash === "#roi-calculator") {
                setIsInvestmentRoiCalculatorOpen(true);
            } else if (hash === "#mortgage-estimator") {
                setIsMortgageEstimatorOpen(true);
            } else if (hash === "#stamp-duty-calculator") {
                setIsStampDutyCalculatorOpen(true);
            } else if (hash === "#progression-planner") {
                setIsProgressionPlannerOpen(true);
            } else if (hash === "#ec-calculator") {
                setIsEcViabilityCalculatorOpen(true);
            } else if (hash === "#household-income-calculator") {
                setIsHouseholdIncomeCalculatorOpen(true);
            }
        };

        // Check on mount
        handleHashChange();

        // Listen for hash changes
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const trackEvent = (action: string, category: string, label: string) => {
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", action, {
                event_category: category,
                event_label: label,
            });
        }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark text-[#111418] dark:text-white font-display">
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-solid border-[#f0f2f4] dark:border-gray-800 px-6 lg:px-12 py-3">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-3xl">apartment</span>
                            <h2 className="text-[#111418] dark:text-white text-xl font-extrabold leading-tight tracking-tight">
                                New<span className="text-primary">Launch</span>
                            </h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <a
                                className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1.5"
                                href="#featured-launches"
                            >
                                <span className="material-symbols-outlined text-lg">rocket_launch</span>{" "}
                                Featured Launches
                            </a>
                            <a
                                className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1.5"
                                href="#investment-tools"
                            >
                                <span className="material-symbols-outlined text-lg">query_stats</span>{" "}
                                Investment Tools
                            </a>
                            <div className="relative group py-2">
                                <a
                                    className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                                    href="/articles"
                                >
                                    <span className="material-symbols-outlined text-lg">article</span>{" "}
                                    Market Insights
                                    <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">keyboard_arrow_down</span>
                                </a>
                                <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block pt-2 w-72 z-50">
                                    <div className="bg-white dark:bg-background-dark border border-[#f0f2f4] dark:border-gray-800 rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-1 duration-200">
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
                                href="#vvip-registration"
                            >
                                <span className="material-symbols-outlined text-lg">verified</span>{" "}
                                VVIP Registration
                            </a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="#vvip-registration"
                            className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:brightness-110 transition-all cursor-pointer"
                            onClick={() => trackEvent("conversion", "engagement", "chat_now_header")}
                        >
                            <span className="material-symbols-outlined text-lg">chat</span>{" "}
                            Chat now
                        </a>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section id="featured-launches" className="bg-white dark:bg-background-dark py-10 lg:py-14 px-6 lg:px-12 border-b border-gray-100 dark:border-gray-800">
                    <div className="max-w-[1280px] mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div>
                                <div className="flex items-center gap-2 text-primary mb-2">
                                    <span className="material-symbols-outlined">analytics</span>
                                    <span className="text-sm font-bold uppercase tracking-widest">
                                        Market Insights
                                    </span>
                                </div>
                                <h2 className="text-3xl font-black">Featured New Launches</h2>
                                <p className="text-gray-500">
                                    New launches that even I feel like buying.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer">
                                    <span className="material-symbols-outlined">arrow_back</span>
                                </button>
                                <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer">
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <a
                                href="/dunearn-house"
                                className="block group bg-background-light dark:bg-gray-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/20 transition-all shadow-sm cursor-pointer"
                                onClick={() => trackEvent("navigation", "engagement", "view_project_dunearn_house")}
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        alt="Dunearn House"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        src="/dunearn-house/page_01.png"
                                    />
                                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px]">
                                            schedule
                                        </span>{" "}
                                        Target Preview: July 2026
                                    </div>
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                                        D11 • 99 Years
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-1">Dunearn House</h3>
                                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">
                                            location_on
                                        </span>{" "}
                                        Dunearn Road / Swiss Club Subzone
                                    </p>
                                    <div className="flex justify-between items-center py-4 border-y border-gray-200 dark:border-gray-700">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold">
                                                Starting From
                                            </p>
                                            <p className="text-lg font-black text-primary">
                                                TBD
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase font-bold">
                                                Status
                                            </p>
                                            <p className="text-lg font-black">Register Interest</p>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-3 bg-white dark:bg-gray-700 text-[#111418] dark:text-white rounded-lg font-bold text-sm border border-gray-200 dark:border-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 cursor-pointer">
                                        <span className="material-symbols-outlined text-sm">
                                            app_registration
                                        </span>{" "}
                                        View Project Details
                                    </button>
                                </div>
                            </a>

                            <a
                                href="/thomson-reserve"
                                className="block group bg-background-light dark:bg-gray-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/20 transition-all shadow-sm cursor-pointer"
                                onClick={() => trackEvent("navigation", "engagement", "view_project_thomson_reserve")}
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        alt="Thomson Reserve"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        src="/thomson-reserve/thomson-reserve_p26_img1.jpeg"
                                    />
                                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px]">
                                            schedule
                                        </span>{" "}
                                        Target Preview: Sep / Oct 2026
                                    </div>
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                                        D20 • 99 Years
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-1">Thomson Reserve</h3>
                                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">
                                            location_on
                                        </span>{" "}
                                        Bright Hill Drive
                                    </p>
                                    <div className="flex justify-between items-center py-4 border-y border-gray-200 dark:border-gray-700">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold">
                                                Starting From
                                            </p>
                                            <p className="text-lg font-black text-primary">
                                                TBD
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase font-bold">
                                                Status
                                            </p>
                                            <p className="text-lg font-black">Register Interest</p>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-3 bg-white dark:bg-gray-700 text-[#111418] dark:text-white rounded-lg font-bold text-sm border border-gray-200 dark:border-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 cursor-pointer">
                                        <span className="material-symbols-outlined text-sm">
                                            app_registration
                                        </span>{" "}
                                        View Project Details
                                    </button>
                                </div>
                            </a>

                            {/* Linked Pinery Residences Here if we want to add it as a card, but adhering to mockup first */}

                            {/* Linked Pinery Residences Here if we want to add it as a card, but adhering to mockup first */}
                            <a
                                href="/pinery"
                                className="block group bg-background-light dark:bg-gray-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/20 transition-all shadow-sm cursor-pointer"
                                onClick={() => trackEvent("navigation", "engagement", "view_project_pinery")}
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        alt="Pinery Residences"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        src="/hero.png"
                                    />
                                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px]">
                                            schedule
                                        </span>{" "}
                                        Preview Soon
                                    </div>
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                                        D18 • 99 Years
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-1">Pinery Residences</h3>
                                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">
                                            location_on
                                        </span>{" "}
                                        Tampines Street 94
                                    </p>
                                    <div className="flex justify-between items-center py-4 border-y border-gray-200 dark:border-gray-700">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold">
                                                Starting From
                                            </p>
                                            <p className="text-lg font-black text-primary">
                                                TBD
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase font-bold">
                                                Status
                                            </p>
                                            <p className="text-lg font-black">Register Interest</p>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-3 bg-white dark:bg-gray-700 text-[#111418] dark:text-white rounded-lg font-bold text-sm border border-gray-200 dark:border-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 cursor-pointer">
                                        <span className="material-symbols-outlined text-sm">
                                            app_registration
                                        </span>{" "}
                                        View Project Details
                                    </button>
                                </div>
                            </a>
                            <div className="group bg-background-light dark:bg-gray-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/20 transition-all shadow-sm cursor-pointer">
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        alt="Skyscraper facade"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        src="/arina.png"
                                    />
                                    <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-black uppercase px-2 py-1 rounded flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px]">
                                            priority_high
                                        </span>{" "}
                                        Star Buy
                                    </div>
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                                        D15, Freehold
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-1">Arina East</h3>
                                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">
                                            location_on
                                        </span>{" "}
                                        Tanjong Rhu Road
                                    </p>
                                    <div className="flex justify-between items-center py-4 border-y border-gray-200 dark:border-gray-700">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold">
                                                Starting From
                                            </p>
                                            <p className="text-lg font-black text-primary">
                                                $1,328,000
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase font-bold">
                                                Status
                                            </p>
                                            <p className="text-lg font-black">Available</p>
                                        </div>
                                    </div>
                                    <a
                                        href="https://96278266-arina-east-residences.eraprojects.sg/units"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full mt-6 py-3 bg-white dark:bg-gray-700 text-[#111418] dark:text-white rounded-lg font-bold text-sm border border-gray-200 dark:border-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 cursor-pointer"
                                        onClick={() => trackEvent("outbound_link", "engagement", "enquire_arina_price")}
                                    >
                                        <span className="material-symbols-outlined text-sm">
                                            payments
                                        </span>{" "}
                                        Enquire Price List
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="investment-tools" className="py-8 lg:py-10 px-6 lg:px-12 bg-background-light dark:bg-background-dark/50">
                    <div className="max-w-[1280px] mx-auto">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-2xl">
                                    calculate
                                </span>
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">
                                Investment &amp; Evaluation Tools
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border-2 border-primary hover:-translate-y-1 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                                    New Launch
                                </div>
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-3xl">
                                        trending_up
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-primary">New Launch ROI</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                    Simulate returns for New Launch based on progressive payment, SSD and projected growth.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsInvestmentRoiCalculatorOpen(true);
                                        window.location.hash = "roi-calculator";
                                        trackEvent("tool_usage", "engagement", "InvestmentRoiCalculator");
                                    }}
                                    className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer"
                                >
                                    Simulate ROI{" "}
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-3xl">
                                        home_work
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">Resale ROI</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                    Analyze potential returns for Resale properties with immediate rental income.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsResaleRoiCalculatorOpen(true);
                                        window.location.hash = "resale-roi-calculator";
                                        trackEvent("tool_usage", "engagement", "ResaleRoiCalculator");
                                    }}
                                    className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer"
                                >
                                    Analyze Resale{" "}
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-3xl">
                                        account_balance
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">Mortgage Estimator</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                    Calculate monthly repayments based on latest TDSR/MSR cooling
                                    measures.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsMortgageEstimatorOpen(true);
                                        window.location.hash = "mortgage-estimator";
                                        trackEvent("tool_usage", "engagement", "MortgageEstimator");
                                    }}
                                    className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer"
                                >
                                    Analyze Now{" "}
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-3xl">
                                        receipt
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">Stamp Duty Calculator</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                    Identify your exact Stamp Duty costs for multi-property
                                    portfolios.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsStampDutyCalculatorOpen(true);
                                        window.location.hash = "stamp-duty-calculator";
                                        trackEvent("tool_usage", "engagement", "StampDutyCalculator");
                                    }}
                                    className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer"
                                >
                                    Check Duties{" "}
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-3xl">
                                        calendar_today
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">Progression Planner</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                    Visualize payment timelines for BUC (Building Under
                                    Construction) units.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsProgressionPlannerOpen(true);
                                        window.location.hash = "progression-planner";
                                        trackEvent("tool_usage", "engagement", "ProgressionPlanner");
                                    }}
                                    className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer"
                                >
                                    Map Payments{" "}
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-3xl">
                                        fact_check
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">EC Viability Check</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                    Assess eligibility and affordability for Executive Condos (Income Ceiling, MSR).
                                </p>
                                <button
                                    onClick={() => {
                                        setIsEcViabilityCalculatorOpen(true);
                                        window.location.hash = "ec-calculator";
                                        trackEvent("tool_usage", "engagement", "EcViabilityCalculator");
                                    }}
                                    className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer"
                                >
                                    Check Eligibility{" "}
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-3xl">
                                        paid
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">Household Income Req.</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                    Determine the income needed to afford your dream home under TDSR rules.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsHouseholdIncomeCalculatorOpen(true);
                                        window.location.hash = "household-income-calculator";
                                        trackEvent("tool_usage", "engagement", "HouseholdIncomeCalculator");
                                    }}
                                    className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer"
                                >
                                    Check Income{" "}
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section >
                <section className="bg-white dark:bg-background-dark py-10 lg:py-14 px-6 lg:px-12">
                    <div className="max-w-[1280px] mx-auto">
                        <div className="grid lg:grid-cols-12 gap-12 items-center bg-gray-50 dark:bg-gray-800/40 rounded-[2.5rem] p-8 lg:p-16 border border-gray-100 dark:border-gray-700">
                            <div className="lg:col-span-8 flex flex-col gap-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                                    <span className="material-symbols-outlined text-sm">groups</span>
                                    Join Our Community
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-black text-[#111418] dark:text-white leading-[1.1] tracking-tight">
                                    Curated <span className="text-primary">Developer Deals</span>{" "}
                                    Direct to Your Phone
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                                    Be part of Daniel's property investor community.
                                    Receive (near) instant notifications on price drops, fire sales, and
                                    VVIP preview slots.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <a
                                        href="https://t.me/danielproperty_sg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 bg-[#0088cc] text-white px-8 py-4 rounded-xl font-black text-lg shadow-xl hover:brightness-110 transition-all cursor-pointer"
                                        onClick={() => trackEvent("conversion", "engagement", "join_telegram_hero")}
                                    >
                                        <span className="material-symbols-outlined">send</span>
                                        Join Telegram Channel
                                    </a>
                                    <div className="flex flex-col justify-center">
                                        <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                            Hot
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-x-8 gap-y-3 mt-4">
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                                        <span className="material-symbols-outlined text-primary text-lg">
                                            local_offer
                                        </span>
                                        Direct Developer Pricing
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                                        <span className="material-symbols-outlined text-primary text-lg">
                                            verified_user
                                        </span>
                                        0% Agent Commission
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                                        <span className="material-symbols-outlined text-primary text-lg">
                                            assignment_turned_in
                                        </span>
                                        Verified Project Lists
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-4 flex justify-center lg:justify-end">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 w-full max-w-[320px] text-center">
                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 mb-4 border-2 border-dashed border-gray-200 dark:border-gray-700 aspect-square flex items-center justify-center relative overflow-hidden group">
                                        <img
                                            alt="QR Code"
                                            className="w-full h-full object-contain"
                                            src="/telegram_qr.jpg"
                                        />
                                    </div>
                                    <p className="text-primary font-black text-xl mb-1 flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">
                                            qr_code_scanner
                                        </span>{" "}
                                        Scan to Join
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="vvip-registration" className="py-10 lg:py-14 px-6 lg:px-12 bg-gray-50 dark:bg-background-dark">
                    <div className="max-w-[1280px] mx-auto bg-white dark:bg-gray-800/30 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
                        <div className="grid lg:grid-cols-2">
                            <div className="p-8 lg:p-16 bg-primary text-white flex flex-col justify-center">
                                <h2 className="text-4xl font-black mb-6">Lets Chat</h2>
                                <p className="text-white/80 text-lg mb-10">
                                    We can send you brochures and unit availability if you want, but we
                                    are more than happy to sit down with you to discuss your goals in
                                    real estate ownership
                                </p>
                                <div className="space-y-6">
                                </div>
                            </div>
                            <div className="p-8 lg:p-16">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </section>
            </main >
            <footer className="bg-[#111418] text-white py-8 lg:py-12 px-6 lg:px-12 border-t border-gray-800">
                <div className="max-w-[1280px] mx-auto">
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
            <MortgageEstimator
                isOpen={isMortgageEstimatorOpen}
                onClose={() => {
                    setIsMortgageEstimatorOpen(false);
                    // Clear hash without scrolling
                    window.history.replaceState(null, "", window.location.pathname);
                }}
            />
            <StampDutyCalculator
                isOpen={isStampDutyCalculatorOpen}
                onClose={() => {
                    setIsStampDutyCalculatorOpen(false);
                    window.history.replaceState(null, "", window.location.pathname);
                }}
            />
            <InvestmentRoiCalculator
                isOpen={isInvestmentRoiCalculatorOpen}
                onClose={() => {
                    setIsInvestmentRoiCalculatorOpen(false);
                    window.history.replaceState(null, "", window.location.pathname);
                }}
            />
            <ResaleRoiCalculator
                isOpen={isResaleRoiCalculatorOpen}
                onClose={() => {
                    setIsResaleRoiCalculatorOpen(false);
                    window.history.replaceState(null, "", window.location.pathname);
                }}
            />
            <ProgressionPlanner
                isOpen={isProgressionPlannerOpen}
                onClose={() => {
                    setIsProgressionPlannerOpen(false);
                    window.history.replaceState(null, "", window.location.pathname);
                }}
            />
            <EcViabilityCalculator
                isOpen={isEcViabilityCalculatorOpen}
                onClose={() => {
                    setIsEcViabilityCalculatorOpen(false);
                    window.history.replaceState(null, "", window.location.pathname);
                }}
            />
            <HouseholdIncomeCalculator
                isOpen={isHouseholdIncomeCalculatorOpen}
                onClose={() => {
                    setIsHouseholdIncomeCalculatorOpen(false);
                    window.history.replaceState(null, "", window.location.pathname);
                }}
            />
        </div >
    );
}
