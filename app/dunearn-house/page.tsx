'use client';

import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';

export default function DunearnHousePage() {
  const [activeTab, setActiveTab] = useState('overview');

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-[#111418] font-inter pb-24 dark:bg-background-dark dark:text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] flex items-end pb-8 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/dunearn-house/page_01.png" 
            alt="Dunearn House Hero Facade" 
            fetchPriority="high"
            className="w-full h-full object-cover brightness-75 transition-transform duration-10000 ease-out scale-100 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e141b] to-transparent opacity-85" />
        </div>

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 w-full p-6 z-50">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors backdrop-blur-md bg-black/40 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg border border-white/20"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Launches
          </a>
        </div>
        <div className="relative z-10 px-6 w-full max-w-5xl mx-auto">
          <span className="inline-block bg-primary text-white text-[10px] font-black uppercase px-2.5 py-1 rounded mb-4 tracking-wider">
            Target Preview: July 2026 (Estimated)
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">
            Dunearn House <span className="font-medium text-lg md:text-xl text-primary block mt-1">(达恩. 豪庭)</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl leading-relaxed">
            Calculated Entry Price, Premium District 11 Living, and First-Mover Turf City Advantage
          </p>
        </div>
      </section>

      {/* Floating Interactive Sub-Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between overflow-x-auto whitespace-nowrap gap-6 scrollbar-none">
          <div className="flex gap-4 md:gap-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'location-schools', label: 'Location & Schools' },
              { id: 'growth-nature', label: 'Growth & Nature' },
              { id: 'price-advantage', label: 'Price Advantage' },
              { id: 'developers', label: 'Developers' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`text-sm font-bold pb-1.5 border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button 
            onClick={() => {
              const element = document.getElementById('register');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg font-bold text-xs shadow-md shadow-primary/20 hover:brightness-110 transition-all cursor-pointer"
          >
            Register Interest
          </button>
        </div>
      </div>

      {/* Highlights / Tabs Content */}
      <section id="overview" className="px-6 py-8 max-w-5xl mx-auto relative z-20">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-wrap md:flex-nowrap gap-4 justify-between items-center text-center">
          <div className="flex-1 min-w-[45%] md:min-w-0">
            <span className="material-symbols-outlined text-primary text-3xl mb-1">apartment</span>
            <h3 className="font-bold text-lg dark:text-white">380 Units</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Exclusive & Private</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex-1 min-w-[45%] md:min-w-0">
            <span className="material-symbols-outlined text-primary text-3xl mb-1">train</span>
            <h3 className="font-bold text-lg dark:text-white">4-Min Walk</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Sixth Avenue MRT (DTL)</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex-1 min-w-[45%] md:min-w-0">
            <span className="material-symbols-outlined text-primary text-3xl mb-1">school</span>
            <h3 className="font-bold text-lg dark:text-white">Elite Belt</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">MGS & Nanyang Primary</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex-1 min-w-[45%] md:min-w-0">
            <span className="material-symbols-outlined text-primary text-3xl mb-1">trending_up</span>
            <h3 className="font-bold text-lg dark:text-white">First-Mover</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Turf City Transformation</p>
          </div>
        </div>
      </section>

      {/* Fact Sheet & Overview Images */}
      <section className="px-6 py-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Details Column */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-800 p-5 md:p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2.5 text-slate-800 dark:text-white">
              <span className="material-symbols-outlined text-primary text-2xl">info</span> Project Fact Sheet
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
                <p className="text-xs text-gray-500 mb-1">Developer</p>
                <p className="font-semibold text-sm">Frasers Property, CSC Land & Sekisui House</p>
              </div>
              <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p className="font-semibold text-sm">Dunearn Road / Swiss Club Subzone (D11)</p>
              </div>
              <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
                <p className="text-xs text-gray-500 mb-1">Tenure</p>
                <p className="font-semibold text-sm">99-year Leasehold (commencing 30 Sep 2025)</p>
              </div>
              <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
                <p className="text-xs text-gray-500 mb-1">Site Area</p>
                <p className="font-semibold text-sm">13,491.9 sqm / 145,255.6 sqft (Plot Ratio 2.4)</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-500 mb-2">Calculated Unit Mix Strategy</p>
                <div className="flex gap-4 text-xs">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg flex-1 text-center">
                    <span className="block font-bold text-primary">46%</span>
                    <span className="text-gray-500">2BR (530 - 680 sqft)</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg flex-1 text-center">
                    <span className="block font-bold text-primary">25%</span>
                    <span className="text-gray-500">3BR (870 - 1010 sqft)</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg flex-1 text-center">
                    <span className="block font-bold text-primary">29%</span>
                    <span className="text-gray-500">4BR (1180 - 1380 sqft)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Infographics Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 bg-white aspect-[4/3]">
              <img 
                src="/dunearn-house/page_04.jpg" 
                alt="Development Details Summary" 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 bg-white aspect-[4/3]">
              <img 
                src="/dunearn-house/page_05.jpg" 
                alt="Unit Mix Chart" 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section: Location & Schools */}
      <section id="location-schools" className="px-6 py-10 max-w-5xl mx-auto scroll-mt-20">
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-primary mb-1">
            <span className="material-symbols-outlined text-lg">location_on</span>
            <span className="text-xs font-bold uppercase tracking-widest">Connectivity & Schools</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Elite Education Belt & Smart Transit Hub</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-12">
          <div className="md:col-span-6 flex flex-col gap-6">
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              Living along Dunearn Road means transit is completely straightforward. A <strong>4-minute walk to Sixth Avenue MRT</strong> connects you directly to the Downtown Line. You are just a single stop from the future Cross Island Line interchange at King Albert Park.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              For parents, this location simplifies school registration. Dunearn House sits directly in a highly prized education belt. Access to premium institutions is straightforward, offering a massive structural advantage for family-oriented tenancy and capital protection.
            </p>
            <div className="bg-[#f0f4f8] dark:bg-slate-900/60 p-5 rounded-2xl border-l-4 border-primary">
              <h4 className="font-bold text-slate-800 dark:text-white mb-1.5 flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-primary">school</span> Elite School Proximity
              </h4>
              <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <li>• <strong>Primary</strong>: Methodist Girls’ School (Primary), Nanyang Primary School, Raffles Girls' Primary School, Henry Park Primary School.</li>
                <li>• <strong>Secondary/Tertiary</strong>: Hwa Chong Institution, Nanyang Girls’ High School, NJC, NUS.</li>
                <li>• <strong>International</strong>: Swiss School, Holland International, ACS (International).</li>
              </ul>
            </div>
            <div className="text-left mt-2">
              <button
                onClick={() => scrollToSection('register')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover border-b border-primary hover:border-primary-hover pb-0.5 transition-all cursor-pointer"
              >
                👉 Request Distance Verification & Priority Registration Info
              </button>
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 dark:border-gray-700 aspect-[4/3]">
              <img 
                src="/dunearn-house/page_07.jpg" 
                alt="Connectivity Infographic" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 dark:border-gray-700 aspect-[4/3]">
              <img 
                src="/dunearn-house/page_08.jpg" 
                alt="Education Belt Map" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="md:col-span-6 order-1 md:order-2">
            <h3 className="text-xl font-bold mb-4">Master-Planned Accessibility</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
              Driving is equally simple. You are 3 minutes from the Pan Island Expressway (PIE). Popular neighborhood enclaves like One Holland Village are reachable in 10 minutes, while Orchard Road and Dempsey Hill are an easy 12-minute drive.
            </p>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 bg-white aspect-[4/3]">
              <img 
                src="/dunearn-house/page_02.jpg" 
                alt="Location Map" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section: Growth & Nature */}
      <section id="growth-nature" className="px-6 py-12 bg-slate-50 dark:bg-background-dark/30 border-y border-gray-100 dark:border-gray-800 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-1.5 text-primary mb-1">
              <span className="material-symbols-outlined text-lg">park</span>
              <span className="text-xs font-bold uppercase tracking-widest">Growth & Nature</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">The Bukit Timah Turf City Transformation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
            <div className="md:col-span-6">
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
                Dunearn House offers a highly strategic **First-Mover Advantage** in the upcoming Bukit Timah Turf City transformation. The region is earmarked for a massive master-planned injection of 15,000 to 20,000 new private and public homes.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
                Active investors understand that entering early—prior to the main build-out of a precinct—is where structural capital buffer is created. The masterplan dictates a pedestrian-friendly, car-lite environment where 22 historic heritage buildings and 40 hectares of greenery will be fully integrated.
              </p>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="font-bold text-sm mb-2 text-slate-800 dark:text-white">A Transformed Green Network</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Step into the restored Rail Corridor or the upcoming 1.4km Elevated Linear Park along the Bukit Timah-Rochor Green Corridor. It combines city utility with deep, quiet natural surroundings.
                </p>
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 dark:border-gray-700 aspect-[4/3]">
                <img 
                  src="/dunearn-house/page_11.jpg" 
                  alt="Turf City Transformation Map" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3">
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img src="/dunearn-house/page_09.jpg" alt="10-min Amenities" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-base">10-Min Concept</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Enjoy immediate neighborhood convenience with easy dining, retail, and childcare accessibility.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3">
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img src="/dunearn-house/page_10.jpg" alt="Nature Highlights" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-base">Lush Greenery</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Proximity to Bukit Timah Nature Reserve, the historic railway, and protected heritage trees.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3">
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img src="/dunearn-house/page_03.jpg" alt="Estimated Views" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-base">Panoramic Views</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Elevated view potential over private landed estates and lush green reserves from upper storeys.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Price Advantage */}
      <section id="price-advantage" className="px-6 py-12 max-w-5xl mx-auto scroll-mt-20">
        <div className="mb-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-primary mb-1">
            <span className="material-symbols-outlined text-lg">trending_up</span>
            <span className="text-xs font-bold uppercase tracking-widest">Entry-Price Math</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">The Land Cost Advantage</h2>
          <p className="text-gray-500 mt-2">
            A precise capital layout analysis based on District 10/11 resale and bid benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-8">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h4 className="font-bold text-slate-800 dark:text-white text-base mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500">verified</span> Calculated Land Safety Buffer
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                Dunearn House was secured at a land bid of **$1,410 psf ppr**. Compared directly to adjacent and subsequent government land sale plots in District 10 and 11—some transacting at **$1,625 psf ppr** or higher—early buyers start with a massive, pre-calculated margin.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                By locking in a lower underlying land basis, the developer has the flexibility to offer highly competitive launch prices. This creates pricing protection against resale benchmarks.
              </p>
            </div>
            <div className="bg-[#FAFBFD] dark:bg-slate-900/60 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-slate-800 dark:text-white text-xs mb-2">Early 2026 Comparable Transactions (D10/11)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-500 dark:text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 text-slate-700 dark:text-white font-bold">
                      <th className="py-2">Project</th>
                      <th className="py-2">Sale Price</th>
                      <th className="py-2">Size (sqft)</th>
                      <th className="py-2">PSF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
                    <tr>
                      <td className="py-2 text-slate-800 dark:text-white">The Tessarina</td>
                      <td className="py-2">$4,118,000</td>
                      <td className="py-2">1,615</td>
                      <td className="py-2 text-primary font-black">$2,550</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-800 dark:text-white">Fourth Avenue Res.</td>
                      <td className="py-2">$3,050,000</td>
                      <td className="py-2">1,119</td>
                      <td className="py-2 text-primary font-black">$2,726</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-800 dark:text-white">The Sixth Avenue Res.</td>
                      <td className="py-2">$3,200,000</td>
                      <td className="py-2">1,356</td>
                      <td className="py-2 text-primary font-black">$2,360</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-800 dark:text-white">Sixth Avenue Ville</td>
                      <td className="py-2">$3,508,000</td>
                      <td className="py-2">1,755</td>
                      <td className="py-2 text-primary font-black">$1,999</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 italic">*Data retrieved from real transaction records; for educational illustration.</p>
            </div>
            <div className="text-left">
              <button
                onClick={() => scrollToSection('register')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover border-b border-primary hover:border-primary-hover pb-0.5 transition-all cursor-pointer"
              >
                👉 Request Detailed Safety Buffer Calculations Spreadsheet
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 dark:border-gray-700 aspect-[4/3]">
              <img 
                src="/dunearn-house/page_06.jpg" 
                alt="Land Price Advantage Analysis" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 dark:border-gray-700 aspect-[4/3]">
              <img 
                src="/dunearn-house/page_17.jpg" 
                alt="Investment Analysis & Preview Details" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section: Developers */}
      <section id="developers" className="px-6 py-12 bg-slate-50 dark:bg-background-dark/30 border-t border-gray-100 dark:border-gray-800 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-1.5 text-primary mb-1">
              <span className="material-symbols-outlined text-lg">domain</span>
              <span className="text-xs font-bold uppercase tracking-widest">Developer Track Record</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">Phoenix Dunearn Consortium</h2>
            <p className="text-gray-500 mt-1 text-sm">A high-performance partnership of three industry leading builders.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-base mb-1.5 text-slate-800 dark:text-white">Frasers Property</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                  A household brand with deep expertise in luxury real estate. Renowned for structural integrity and high-end residential design.
                </p>
                <div className="flex flex-wrap gap-1">
                  {['Riviere', 'Sky Eden@Bedok', 'The Orie'].map((p) => (
                    <span key={p} className="text-[9px] bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <img src="/dunearn-house/page_13.jpg" alt="Frasers Track Record" className="w-full h-20 object-cover rounded-lg" loading="lazy" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-base mb-1.5 text-slate-800 dark:text-white">CSC Land Group</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                  Backed by CSCEC, bringing world-class engineering execution. Celebrated for highly functional layouts and value optimization.
                </p>
                <div className="flex flex-wrap gap-1">
                  {['Twin VEW', 'Grand Dunman', 'Verdale'].map((p) => (
                    <span key={p} className="text-[9px] bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <img src="/dunearn-house/page_14.jpg" alt="CSC Track Record" className="w-full h-20 object-cover rounded-lg" loading="lazy" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-base mb-1.5 text-slate-800 dark:text-white">Sekisui House</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                  Japan’s leading homebuilder, famous for the concept of "Slow Living." Focuses on sustainable design and precision build techniques.
                </p>
                <div className="flex flex-wrap gap-1">
                  {['One Holland Village', 'Hillhaven', 'Seaside Res.'].map((p) => (
                    <span key={p} className="text-[9px] bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <img src="/dunearn-house/page_15.jpg" alt="Sekisui Track Record" className="w-full h-20 object-cover rounded-lg" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="sm:w-1/3 flex justify-center">
              <img 
                src="/dunearn-house/page_12.jpg" 
                alt="Consortium Logos" 
                className="max-h-12 object-contain"
                loading="lazy"
              />
            </div>
            <div className="sm:w-2/3">
              <h4 className="font-bold text-xs mb-0.5 text-slate-800 dark:text-white">Strict Construction Delivery</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                By pooling together luxury design, institutional engineering capability, and Japanese precision building, the consortium guarantees top-tier execution with absolute layout discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* R.A.R.E. Selling Points Section */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700 text-center">
          <h3 className="text-xl font-black mb-2">Core Selling Points Summary</h3>
          <p className="text-gray-500 text-xs max-w-2xl mx-auto mb-6">
            A structural look at the factors that drive capital protection and organic tenant demand.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg max-w-3xl mx-auto">
            <img 
              src="/dunearn-house/page_16.jpg" 
              alt="R.A.R.E. Selling Points" 
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Register Section */}
      <section
        className="py-14 px-4 md:px-10 lg:px-40 bg-[#0e141b] relative overflow-hidden"
        id="register"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div className="text-white">
                <span className="inline-block bg-primary text-white text-[10px] font-black uppercase px-2 py-0.5 rounded mb-3">
                  VVIP Launch Phase
                </span>
                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                    Get Early Access & Calculated Layout Options
                </h2>
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                    Register for early priority access to receive exclusive developer pricing updates, detailed floor plans, and a direct showflat invitation. Connect with our advisory to review the numerical layout analysis.
                </p>
                <ul className="space-y-3 text-xs font-semibold">
                    <li className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-sm">
                            check_circle
                        </span>
                        <span>Complete Digital E-Brochure & Numerical Floor Plans</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-sm">
                            check_circle
                        </span>
                        <span>Direct VVIP Showflat Booking & Allocation Priority</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-sm">
                            check_circle
                        </span>
                        <span>Direct Developer Base Pricing & Safety Buffer Calculations</span>
                    </li>
                </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-2xl">
                <RegistrationForm />
            </div>
        </div>
      </section>

      {/* Sticky Bottom CTA for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-stone-900/95 border-t border-stone-200 dark:border-stone-800 p-3 shadow-lg flex items-center justify-between gap-3 backdrop-blur-md">
        <a
          href="https://wa.me/6596278266?text=Hi%20Daniel!%20I%20am%20interested%20in%20Dunearn%20House.%20Could%20we%20chat%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-center rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#25D366]/10 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">chat</span> WhatsApp advisory
        </a>
        <button
          onClick={() => {
            const element = document.getElementById('register');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex-1 py-3 px-4 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-xs shadow-md shadow-primary/20 transition-all cursor-pointer"
        >
          Register for VVIP
        </button>
      </div>
    </div>
  );
}
