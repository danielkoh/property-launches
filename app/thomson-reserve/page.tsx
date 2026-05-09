'use client';

import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';

export default function ThomsonReservePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111418] font-inter pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-end pb-12">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/thomson-reserve/thomson-reserve_p26_img1.jpeg" 
            alt="Thomson Reserve Hero" 
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101922] to-transparent opacity-80" />
        </div>
        <div className="relative z-10 px-6 w-full max-w-5xl mx-auto">
          <span className="inline-block bg-[#C5A059] text-white text-[10px] font-black uppercase px-2 py-1 rounded mb-4">
            Target Preview: Sep / Oct 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-2 shadow-sm">
            Thomson Reserve
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium">
            Modern Singapore Luxury at Bright Hill Drive
          </p>
        </div>
      </section>

      {/* Highlights / Tabs */}
      <section className="px-6 py-12 max-w-5xl mx-auto -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 flex flex-wrap md:flex-nowrap gap-4 justify-between items-center text-center">
          <div className="flex-1 min-w-[45%] md:min-w-0">
            <span className="material-symbols-outlined text-[#C5A059] text-4xl mb-2">apartment</span>
            <h3 className="font-bold text-xl">1,268 Units</h3>
            <p className="text-sm text-gray-500">Premium Living</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-200"></div>
          <div className="flex-1 min-w-[45%] md:min-w-0">
            <span className="material-symbols-outlined text-[#C5A059] text-4xl mb-2">train</span>
            <h3 className="font-bold text-xl">Doorstep MRT</h3>
            <p className="text-sm text-gray-500">Upper Thomson</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-200"></div>
          <div className="flex-1 min-w-[45%] md:min-w-0">
            <span className="material-symbols-outlined text-[#C5A059] text-4xl mb-2">school</span>
            <h3 className="font-bold text-xl">Within 1KM</h3>
            <p className="text-sm text-gray-500">Ai Tong School</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-200"></div>
          <div className="flex-1 min-w-[45%] md:min-w-0">
            <span className="material-symbols-outlined text-[#C5A059] text-4xl mb-2">park</span>
            <h3 className="font-bold text-xl">Panoramic Views</h3>
            <p className="text-sm text-gray-500">Nature & Greenery</p>
          </div>
        </div>
      </section>

      {/* Fact Sheet */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#1A202C]">
              <span className="material-symbols-outlined text-[#C5A059] text-3xl">info</span> Project Fact Sheet
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 px-4">
                <p className="text-sm text-gray-500 mb-1">Project Name</p>
                <p className="font-semibold text-lg">Thomson Reserve</p>
              </div>
              <div className="border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 px-4">
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <p className="font-semibold text-lg">Bright Hill Drive</p>
              </div>
              <div className="border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 px-4">
                <p className="text-sm text-gray-500 mb-1">Site Area</p>
                <p className="font-semibold text-lg">~540,434 SQFT</p>
              </div>
              <div className="px-4">
                <p className="text-sm text-gray-500 mb-1">Estimated TOP</p>
                <p className="font-semibold text-lg">TBC</p>
              </div>
            </div>
          </div>
      </section>

      {/* Location & Lifestyle Details */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-playfair font-bold text-[#1A202C] mb-6">Seamless Connectivity & Lifestyle</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              With <strong>Upper Thomson MRT at your doorstep</strong>, the city is closer than ever. Enjoy a direct and effortless commute—just 5 stops to the Orchard shopping belt, and 9 to 11 stops to the CBD and Marina Bay. 
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Embrace an integrated lifestyle with a direct link to Thomson Plaza for all your dining and retail needs, while remaining surrounded by the pristine greenery of the nearby MacRitchie Reservoir.
            </p>
            <div className="bg-[#f6f7f8] p-6 rounded-2xl border-l-4 border-[#C5A059]">
              <h4 className="font-bold text-[#1A202C] mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#C5A059]">school</span> Elite Education: Ai Tong School
              </h4>
              <p className="text-sm text-gray-600">
                Thomson Reserve is situated <strong>within 1KM to Ai Tong School</strong>, one of Singapore's most popular primary schools. Based on recent ballot history, families residing within 1KM stand a significantly better chance during the highly competitive registration phases.
              </p>
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
      <section className="px-6 py-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-[#1A202C] mb-4">Unobstructed Panoramic Views</h2>
            <p className="text-gray-600 text-lg">
              Enjoy breathtaking, elevated scenery from the comfort of your home. 
              The surroundings feature pristine greenery and landed enclaves.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative group">
              <img src="/thomson-reserve/thomson-reserve_p20_img2.png" alt="Panoramic View 1" className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative group">
              <img src="/thomson-reserve/thomson-reserve_p17_img2.png" alt="Panoramic View 2" className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative group">
              <img src="/thomson-reserve/thomson-reserve_p23_img3.jpeg" alt="Panoramic View 3" className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative group">
              <img src="/thomson-reserve/thomson-reserve_p19_img2.png" alt="Panoramic View 4" className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-6 italic">
            *Disclaimer: All views are estimated and for illustration purposes only. They do not represent actual guaranteed views from Thomson Reserve.
          </p>
        </div>
      </section>

      {/* Developer Track Record Section */}
      <section className="px-6 py-20 bg-[#f8f9fa] border-y border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold text-[#1A202C] mb-6">A Premium Development By UOL, SingLand, CapitaLand & Kheng Leong Co.</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-10 text-lg">
            Crafted by UOL Group, Singapore Land Group (SingLand), CapitaLand Development, and Kheng Leong Co., renowned developers with an exceptional track record of delivering iconic, high-quality residences across Singapore. Their stellar portfolio includes highly sought-after projects:
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['Watten House', 'Upperhouse', 'Parktown Residence', "J'den", 'Lydenwoods', 'Skye at Holland'].map((project) => (
              <span key={project} className="bg-white border border-[#C5A059]/30 text-[#1A202C] px-6 py-3 rounded-full shadow-sm font-semibold">
                {project}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Advantage Section */}
      <section className="px-6 py-20 max-w-5xl mx-auto text-center">
        <span className="material-symbols-outlined text-[#C5A059] text-5xl mb-4">trending_up</span>
        <h2 className="text-3xl font-playfair font-bold text-[#1A202C] mb-6">Strong Entry Price Advantage</h2>
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 max-w-4xl mx-auto text-left mb-10">
            <p className="text-gray-600 mb-8 text-lg leading-relaxed text-center">
              Acquired at an incredibly attractive land price of <strong>$1,178 psf ppr</strong>, Thomson Reserve offers significant upside potential. 
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-gray-200">
                    <h4 className="font-bold text-[#1A202C] mb-3 text-lg">Compared to Recent Sites</h4>
                    <p className="text-gray-600 leading-relaxed">A recent site in Lentor (3 MRT stations further from the city) was acquired at a much higher land rate of <strong>$1,278 psf ppr</strong>.</p>
                </div>
                <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-gray-200">
                    <h4 className="font-bold text-[#1A202C] mb-3 text-lg">Compared to Sub-Sale</h4>
                    <p className="text-gray-600 leading-relaxed">Lentor Modern sub-sale transactions have already achieved <strong>$2,588 psf</strong> (for non-harmonized space), which translates to an estimated <strong>$2,717 psf</strong> for harmonized layouts.</p>
                </div>
            </div>
            <p className="text-[#1A202C] font-semibold text-center mt-10 text-xl">
              Thomson Reserve will undoubtedly be one of the most attractively priced new launches in the Rest of Central Region (RCR).
            </p>
        </div>
        <button 
            onClick={() => {
                const element = document.getElementById('register');
                element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#1A202C] text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-[#1A202C]/20 hover:brightness-110 transition-all text-lg"
        >
          Get Price Updates
        </button>
      </section>

      {/* Register Section */}
      <section
        className="py-24 px-4 md:px-10 lg:px-40 bg-[#1A202C] relative overflow-hidden"
        id="register"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
                <h2 className="text-4xl md:text-5xl font-black mb-6 font-playfair">
                    Register for Early Access & E-Brochure
                </h2>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                    Register for early access to receive exclusive project information,
                    floor plans, and an invitation to view the showflat. Be among the
                    first to explore Thomson Reserve.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#C5A059]">
                            check_circle
                        </span>
                        <span>Digital E-Brochure & Floor Plans</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#C5A059]">
                            check_circle
                        </span>
                        <span>Book a visit to Show Flat</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#C5A059]">
                            check_circle
                        </span>
                        <span>Developer pricing</span>
                    </li>
                </ul>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
                <RegistrationForm />
            </div>
        </div>
      </section>


    </div>
  );
}
