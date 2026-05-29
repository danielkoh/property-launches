'use client';

import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';

export default function ThomsonReservePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111418] font-inter pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] flex items-end pb-8">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/thomson-reserve/thomson-reserve_p26_img1.jpeg" 
            alt="Thomson Reserve Hero" 
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101922] to-transparent opacity-80" />
        </div>

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 w-full p-6 z-50">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-white hover:text-white transition-colors backdrop-blur-md bg-black/40 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-black/60 border border-white/20"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to launches
          </a>
        </div>
        <div className="relative z-10 px-6 w-full max-w-5xl mx-auto">
          <span className="inline-block bg-primary text-white text-[10px] font-black uppercase px-2 py-1 rounded mb-4">
            Target Preview: Sep / Oct 2026
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 shadow-sm">
            Thomson Reserve
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium">
            Modern Singapore Luxury at Bright Hill Drive
          </p>
        </div>
      </section>

      {/* Highlights / Tabs */}
      <section className="px-6 py-8 max-w-5xl mx-auto -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-xl border border-gray-100 flex flex-wrap md:flex-nowrap gap-4 justify-between items-center text-center">
          <div className="flex-1 min-w-[45%] md:min-w-0">
            <span className="material-symbols-outlined text-primary text-3xl mb-1">apartment</span>
            <h3 className="font-bold text-lg">1,268 Units</h3>
            <p className="text-xs text-gray-500">Premium Living</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200"></div>
          <div className="flex-1 min-w-[45%] md:min-w-0">
            <span className="material-symbols-outlined text-primary text-3xl mb-1">train</span>
            <h3 className="font-bold text-lg">Doorstep MRT</h3>
            <p className="text-xs text-gray-500">Upper Thomson (TE8)</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200"></div>
          <div className="flex-1 min-w-[45%] md:min-w-0">
            <span className="material-symbols-outlined text-primary text-3xl mb-1">school</span>
            <h3 className="font-bold text-lg">Within 1KM</h3>
            <p className="text-xs text-gray-500">Ai Tong School</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200"></div>
          <div className="flex-1 min-w-[45%] md:min-w-0">
            <span className="material-symbols-outlined text-primary text-3xl mb-1">park</span>
            <h3 className="font-bold text-lg">Panoramic Views</h3>
            <p className="text-xs text-gray-500">Nature & Greenery</p>
          </div>
        </div>
      </section>

      {/* Fact Sheet */}
      <section className="px-6 py-6 max-w-5xl mx-auto">
          <div className="bg-white p-5 md:p-6 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2.5 text-[#1A202C]">
              <span className="material-symbols-outlined text-primary text-2xl">info</span> Project Fact Sheet
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              <div className="border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 px-2">
                <p className="text-xs text-gray-500 mb-0.5">Developer</p>
                <p className="font-semibold text-stone-800">UOL Group, SingLand & CapitaLand Development</p>
              </div>
              <div className="border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 px-2">
                <p className="text-xs text-gray-500 mb-0.5">Site Area</p>
                <p className="font-semibold text-stone-850">~540,434 SQFT</p>
              </div>
              <div className="px-2">
                <p className="text-xs text-gray-500 mb-0.5">Tenure</p>
                <p className="font-semibold text-stone-850">99 Years Leasehold</p>
              </div>
            </div>
          </div>
      </section>

      {/* Location & Lifestyle Details */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-stone-900 mb-4 tracking-tight">Seamless Connectivity & Lifestyle</h2>
            <p className="text-gray-600 mb-4 text-base leading-relaxed">
              With <strong>Upper Thomson MRT (TE8) at your doorstep</strong>, the city is closer than ever. Enjoy a direct and effortless commute—just 5 stops to the Orchard shopping belt, and 9 to 11 stops to the CBD and Marina Bay. 
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Embrace an integrated lifestyle with a direct link to Thomson Plaza for all your dining and retail needs, while remaining surrounded by the pristine greenery of the nearby MacRitchie Reservoir.
            </p>
            <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border-l-4 border-primary">
              <h4 className="font-bold text-stone-900 dark:text-white mb-1.5 flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-primary">school</span> Elite Education: Ai Tong School
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Thomson Reserve is situated <strong>within 1KM to Ai Tong School</strong>, one of Singapore's most popular primary schools. Families residing within 1KM stand a significantly better chance during the highly competitive registration phases.
              </p>
            </div>
            <div className="text-left mt-2">
              <button
                onClick={() => {
                  const element = document.getElementById('register');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover border-b border-primary hover:border-primary-hover pb-0.5 transition-all cursor-pointer"
              >
                👉 Request Distance Check & Priority Ai Tong Registration Guidelines
              </button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[300px]">
            <img 
              src="/thomson-reserve/thomson-reserve_p10_img3.png" 
              alt="Location Map" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Unobstructed Views Section */}
      <section className="px-6 py-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-stone-900 mb-2 tracking-tight">Unobstructed Panoramic Views</h2>
            <p className="text-gray-500 text-xs">
              Enjoy breathtaking, elevated scenery from the comfort of your home. 
              The surroundings feature pristine greenery and landed enclaves.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative group">
              <img src="/thomson-reserve/thomson-reserve_p20_img2.png" alt="Panoramic View 1" className="w-full h-44 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative group">
              <img src="/thomson-reserve/thomson-reserve_p17_img2.png" alt="Panoramic View 2" className="w-full h-44 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative group">
              <img src="/thomson-reserve/thomson-reserve_p23_img3.jpeg" alt="Panoramic View 3" className="w-full h-44 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative group">
              <img src="/thomson-reserve/thomson-reserve_p19_img2.png" alt="Panoramic View 4" className="w-full h-44 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
          <p className="text-center text-gray-400 text-[10px] mt-4 italic">
            *Disclaimer: All views are estimated and for illustration purposes only. They do not represent actual guaranteed views from Thomson Reserve.
          </p>
        </div>
      </section>

      {/* Developer Track Record Section */}
      <section className="px-6 py-10 bg-[#f8f9fa] border-y border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-stone-900 mb-4 tracking-tight">A Premium Development By UOL, SingLand & CapitaLand Development</h2>
          <p className="text-gray-500 max-w-3xl mx-auto mb-6 text-xs leading-relaxed">
            Crafted by UOL Group, Singapore Land Group (SingLand), and CapitaLand Development, renowned developers with an exceptional track record of delivering iconic, high-quality residences across Singapore. Their stellar portfolio includes:
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {['Watten House', 'Upperhouse', 'Parktown Residence', "J'den", 'Lydenwoods', 'Skye at Holland'].map((project) => (
              <span key={project} className="bg-white border border-primary/30 text-stone-900 px-4 py-2 rounded-full shadow-sm text-xs font-semibold">
                {project}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="px-6 py-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold text-stone-900 mb-2 tracking-tight">World-Class Facilities</h2>
              <p className="text-gray-500 text-xs leading-relaxed">
                Thomson Reserve is designed as a sanctuary of wellness and recreation. 
                From the grand clubhouse to the competitive tennis courts, every amenity 
                is crafted to elevate your daily living experience.
              </p>
            </div>
            <div className="bg-[#f8f9fa] px-4 py-1.5 rounded-2xl border border-gray-100 hidden md:block">
              <span className="text-primary font-bold text-xs uppercase tracking-wider">Estimated 1,268 Units</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-lg">
                <img src="/thomson-reserve/thomson-reserve_p13_img5.png" alt="Swimming Pool" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-base text-stone-900">Leisure & Lap Pools</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Dive into tranquility with our expansive swimming pool and dedicated kids' play zone.</p>
            </div>
            <div className="space-y-3">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-lg">
                <img src="/thomson-reserve/thomson-reserve_p14_img2.png" alt="Clubhouse" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-base text-stone-900">The Grand Clubhouse</h4>
              <p className="text-gray-500 text-xs leading-relaxed">A social hub for residents, featuring multi-purpose function rooms and a state-of-the-art gym.</p>
            </div>
            <div className="space-y-3">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-lg">
                <img src="/thomson-reserve/thomson-reserve_p14_img3.png" alt="Tennis Court" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-base text-stone-900">Active Sports Zones</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Stay active with full-sized tennis courts, multi-purpose courts, and outdoor fitness corners.</p>
            </div>
          </div>

          <div className="mt-10 bg-[#1A202C] rounded-[30px] p-6 md:p-8 text-white relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">Nature at Your Doorstep</span>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">Bordered by Windsor Nature Park</h3>
                <p className="text-gray-300 text-xs leading-relaxed mb-6">
                  Step out of your home and into the pristine greenery of Windsor Nature Park and MacRitchie Reservoir. 
                  Enjoy seamless access to some of Singapore's most beautiful nature trails and fresh air.
                </p>
                <div className="flex gap-4">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-primary">Direct</span>
                        <span className="text-[10px] text-gray-400 uppercase">Nature Access</span>
                    </div>
                    <div className="w-px h-8 bg-gray-750"></div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-primary">Panoramic</span>
                        <span className="text-[10px] text-gray-400 uppercase">Greenery Views</span>
                    </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                <img src="/thomson-reserve/thomson-reserve_p12_img2.png" alt="Nature Surroundings" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantage Section */}
      <section className="px-6 py-10 max-w-5xl mx-auto text-center">
        <span className="material-symbols-outlined text-primary text-4xl mb-2">trending_up</span>
        <h2 className="text-2xl font-extrabold text-stone-900 mb-4 tracking-tight">Strong Entry Price Advantage</h2>
        <div className="bg-white p-5 md:p-6 rounded-3xl shadow-xl border border-gray-100 max-w-4xl mx-auto text-left mb-6">
            <p className="text-gray-500 mb-4 text-xs leading-relaxed text-center">
              Acquired at an incredibly attractive land price of <strong>$1,178 psf ppr</strong>, Thomson Reserve offers significant upside potential compared to current market benchmarks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FAFAFA] p-4 rounded-2xl border border-gray-200">
                    <h4 className="font-bold text-stone-900 mb-1.5 text-sm">Benchmark Resale Prices</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-1.5">Nearby completed developments are already transacting at significant premiums:</p>
                    <ul className="text-xs text-gray-600 space-y-1 font-medium">
                        <li>• <strong>Jadescape:</strong> Avg ~$2,356 PSF</li>
                        <li>• <strong>Thomson Three:</strong> Avg ~$2,210 PSF</li>
                    </ul>
                </div>
                <div className="bg-[#FAFAFA] p-4 rounded-2xl border border-gray-200">
                    <h4 className="font-bold text-stone-900 mb-1.5 text-sm">Future Growth Benchmarks</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-1.5">Comparisons to recent sites and sub-sales show a clear value gap:</p>
                    <ul className="text-xs text-gray-600 space-y-1 font-medium">
                        <li>• <strong>Lentor Site:</strong> Acquired at $1,278 PSF PPR</li>
                        <li>• <strong>Lentor Modern:</strong> Sub-sales up to $2,568 PSF</li>
                    </ul>
                </div>
            </div>
            <p className="text-stone-900 font-bold text-center mt-6 text-sm">
              Thomson Reserve stands as one of the most attractively priced new launches in the Rest of Central Region (RCR).
            </p>
            <div className="text-center mt-3">
              <button
                onClick={() => {
                  const element = document.getElementById('register');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover border-b border-primary hover:border-primary-hover pb-0.5 transition-all cursor-pointer"
              >
                👉 Download Thomson Reserve vs Lentor PSF Price Comparison Sheet
              </button>
            </div>
        </div>
        <button 
            onClick={() => {
                const element = document.getElementById('register');
                element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-primary text-white font-bold py-2.5 px-6 rounded-full shadow-lg shadow-primary/20 hover:brightness-110 transition-all text-xs"
        >
          Get Price Updates
        </button>
      </section>

      {/* Register Section */}
      <section
        className="py-14 px-4 md:px-10 lg:px-40 bg-[#1A202C] relative overflow-hidden"
        id="register"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">
                    Register for Early Access & E-Brochure
                </h2>
                <p className="text-white/70 text-xs mb-6 leading-relaxed">
                    Register for early access to receive exclusive project information,
                    floor plans, and an invitation to view the showflat. Be among the
                    first to explore Thomson Reserve.
                </p>
                <ul className="space-y-3 text-xs">
                    <li className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-sm">
                            check_circle
                        </span>
                        <span>Digital E-Brochure & Floor Plans</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-sm">
                            check_circle
                        </span>
                        <span>Book a visit to Show Flat</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-sm">
                            check_circle
                        </span>
                        <span>Developer pricing</span>
                    </li>
                </ul>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
                <RegistrationForm />
            </div>
        </div>
      </section>

      {/* Sticky Bottom CTA for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-stone-900/95 border-t border-stone-200 dark:border-stone-800 p-3 shadow-lg flex items-center justify-between gap-3 backdrop-blur-md">
        <a
          href="https://wa.me/6596278266?text=Hi%20Daniel!%20I%20am%20interested%20in%20Thomson%20Reserve.%20Could%20we%20chat%3F"
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
