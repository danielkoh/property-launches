"use client";

import MortgageEstimator from "./components/MortgageEstimator";
import StampDutyCalculator from "./components/StampDutyCalculator";
import InvestmentRoiCalculator from "./components/InvestmentRoiCalculator";
import { useState } from "react";


export default function Home() {
  const [isMortgageEstimatorOpen, setIsMortgageEstimatorOpen] = useState(false);
  const [isStampDutyCalculatorOpen, setIsStampDutyCalculatorOpen] = useState(false);
  const [isInvestmentRoiCalculatorOpen, setIsInvestmentRoiCalculatorOpen] = useState(false);





  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark text-[#111418] dark:text-white font-display">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-solid border-[#f0f2f4] dark:border-gray-800 px-6 lg:px-20 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl">apartment</span>
              <h2 className="text-[#111418] dark:text-white text-xl font-extrabold leading-tight tracking-tight">
                LaunchPortal<span className="text-primary">SG</span>
              </h2>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a
                className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1.5"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">rocket_launch</span>{" "}
                Latest Launches
              </a>
              <a
                className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1.5"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">query_stats</span>{" "}
                Investment Tools
              </a>
              <a
                className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1.5"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">verified</span>{" "}
                VVIP Registration
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:brightness-110 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-lg">chat</span>{" "}
              WhatsApp Enquiry
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-white dark:bg-background-dark pt-12 pb-20 px-6 lg:px-20 border-b border-gray-100 dark:border-gray-800">
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
        <section className="py-16 px-6 lg:px-20 bg-background-light dark:bg-background-dark/50">
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
                  onClick={() => setIsMortgageEstimatorOpen(true)}
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
                  onClick={() => setIsStampDutyCalculatorOpen(true)}
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
                    trending_up
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">Investment ROI</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  Simulate potential returns given variables like interest rates,
                  holding period, and expected rate of capital gain
                </p>
                <button
                  onClick={() => setIsInvestmentRoiCalculatorOpen(true)}
                  className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer"
                >
                  Simulate Returns{" "}
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
                <a
                  className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                  href="#"
                >
                  Map Payments{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section >
        <section className="bg-white dark:bg-background-dark py-20 px-6 lg:px-20">
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
              <div className="group bg-background-light dark:bg-gray-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/20 transition-all shadow-sm cursor-pointer">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    alt="Luxury condo"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeo87zCNlu6HGuRLMrBXdpiZYPeEMO0-e1YUmRCwyHP5WS6AsGYg-iOZvzk1Nm_sNur1tNL1Ev6tMDwxpI-O9PeOV9hpwyCMSzIHYSRc03oEDYFjzxHZRRXcE5jcozcbca7t7fEHMBsX7SJoJ3Pg1-TfinJuFdzOJvkz3A-DkCVSWah1F3Ga0kkq-a3ayNOj9vhfY5VbMzxI4uptC4qv8OooPR27RPddcVXx57-LMX_xI3J2n9ZSLfXekzfIbsstz5YIif8T-DXgaq"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase px-2 py-1 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">
                      bolt
                    </span>{" "}
                    Selling Fast
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                    D15 • Freehold
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">The Continuum</h3>
                  <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>{" "}
                    Thiam Siew Avenue
                  </p>
                  <div className="flex justify-between items-center py-4 border-y border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">
                        Starting From
                      </p>
                      <p className="text-lg font-black text-primary">
                        $1,680,000
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase font-bold">
                        Units Left
                      </p>
                      <p className="text-lg font-black">12%</p>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-3 bg-white dark:bg-gray-700 text-[#111418] dark:text-white rounded-lg font-bold text-sm border border-gray-200 dark:border-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">
                      floor
                    </span>{" "}
                    View Floor Plans
                  </button>
                </div>
              </div>

              {/* Linked Pinery Residences Here if we want to add it as a card, but adhering to mockup first */}

              <a href="/pinery" className="block group bg-background-light dark:bg-gray-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/20 transition-all shadow-sm cursor-pointer">
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
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2J-5tONEq5hi5a3_5TxakHkDZORREywWKU0dY9yQU_hPLnhB6bhnUvPlvzoCN2DFDCxmbGRXTjRL1WWN06IkGGRZBBSilmWI53O3AA5V2ostDhwluKETHigJMZvgEmdEoTpr1wwVAytLxoMxqx-AQZ0pkD1P988mPlGpQ_jpM3E-e5hoBdgGdYDfzqB5J2Thsej1SKFIL-oxOnDhYWiq82yrHTMOkSo5aWWAnpVxHgROrXcLJBJgTsoXK0n_FegWiODDbkxX1sIJl"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-black uppercase px-2 py-1 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">
                      priority_high
                    </span>{" "}
                    Limited Units
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                    D11 • Freehold
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Watten House</h3>
                  <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>{" "}
                    Watten Estate
                  </p>
                  <div className="flex justify-between items-center py-4 border-y border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">
                        Starting From
                      </p>
                      <p className="text-lg font-black text-primary">
                        $3,200,000
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase font-bold">
                        Remaining
                      </p>
                      <p className="text-lg font-black">8 Units</p>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-3 bg-white dark:bg-gray-700 text-[#111418] dark:text-white rounded-lg font-bold text-sm border border-gray-200 dark:border-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">
                      payments
                    </span>{" "}
                    Enquire Price List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 lg:px-20 bg-gray-50 dark:bg-background-dark">
          <div className="max-w-[1280px] mx-auto bg-white dark:bg-gray-800/30 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-16 bg-primary text-white flex flex-col justify-center">
                <h2 className="text-4xl font-black mb-6">Consult a Specialist</h2>
                <p className="text-white/80 text-lg mb-10">
                  Our consultants provide floor plans, e-brochures, and latest
                  unit availability. Get your direct developer pricing today.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl">
                        call
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-bold uppercase tracking-widest">
                        Hotline
                      </p>
                      <p className="text-lg font-bold">+65 6123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl">
                        mail
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-bold uppercase tracking-widest">
                        Email
                      </p>
                      <p className="text-lg font-bold">vip@launchportal.sg</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-16">
                <form action="#" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs">
                          person
                        </span>{" "}
                        Full Name
                      </label>
                      <input
                        className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm outline-none transition-all"
                        placeholder="John Doe"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs">
                          smartphone
                        </span>{" "}
                        Mobile Number
                      </label>
                      <input
                        className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm outline-none transition-all"
                        placeholder="+65"
                        type="tel"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs">
                        home_work
                      </span>{" "}
                      Project Interest
                    </label>
                    <select className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm outline-none transition-all appearance-none">
                      <option>Select a project</option>
                      <option>The Continuum (D15)</option>
                      <option>Lentoria (D26)</option>
                      <option>Watten House (D11)</option>
                      <option>Pinery Residences (D18)</option>
                    </select>
                  </div>
                  <button
                    className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg hover:brightness-110 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 cursor-pointer"
                    type="submit"
                  >
                    <span className="material-symbols-outlined">send</span>{" "}
                    Register for VVIP Access
                  </button>
                  <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">
                      lock
                    </span>{" "}
                    Your data is secured in accordance with PDPA regulations.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main >
      <footer className="bg-[#111418] text-white py-16 px-6 lg:px-20 border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
            <div className="max-w-xs">
              <div className="flex flex-col gap-1 mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">
                  Daniel works under
                </p>
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
            <div className="flex flex-col gap-6 justify-end text-left sm:text-right">
              <div>
                <h5 className="font-bold text-white mb-2">
                  About Us
                </h5>
                <p className="font-bold text-gray-200">
                  DANIEL KOH
                </p>
                <p className="text-sm text-gray-500">CEA NO. : R073362I</p>
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
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>
              Copyright 2026 ERA Realty Network Pte Ltd. (CEA Licence No.
              L3002382K). All Rights Reserved
            </p>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[12px]">
                verified
              </span>
              <span>CEA Reg No: L3002382K / R073362I</span>
            </div>
          </div>

        </div>
      </footer>
      <MortgageEstimator
        isOpen={isMortgageEstimatorOpen}
        onClose={() => setIsMortgageEstimatorOpen(false)}
      />
      <StampDutyCalculator
        isOpen={isStampDutyCalculatorOpen}
        onClose={() => setIsStampDutyCalculatorOpen(false)}
      />
      <InvestmentRoiCalculator
        isOpen={isInvestmentRoiCalculatorOpen}
        onClose={() => setIsInvestmentRoiCalculatorOpen(false)}
      />
    </div >
  );
}
