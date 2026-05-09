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

      {/* Development Details */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-playfair font-bold text-[#1A202C] mb-4">A Winning Combination</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover a prime location surrounded by greenery, bringing you closer to the city while 
            offering an integrated lifestyle with direct links to Thomson Plaza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#f6f7f8] p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#C5A059]">info</span> Fact Sheet
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Address</span>
                <span className="font-semibold">Bright Hill Drive</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Site Area</span>
                <span className="font-semibold">~540,434 SQFT</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Land Price</span>
                <span className="font-semibold">$1,178 psf ppr</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Developers</span>
                <span className="font-semibold">Tier 1 Developers</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm h-64 md:h-auto">
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
          <div className="mb-10">
            <h2 className="text-3xl font-playfair font-bold text-[#1A202C] mb-4">Unobstructed Panoramic Views</h2>
            <p className="text-gray-600">
              Enjoy breathtaking, elevated scenery from the comfort of your home. 
              The surroundings feature pristine greenery and landed enclaves.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative group">
            <img 
              src="/thomson-reserve/thomson-reserve_p15_img3.png" 
              alt="Panoramic View" 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <p className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full italic">
              *Estimated view for illustration only
            </p>
          </div>
        </div>
      </section>

      {/* Advantage Section */}
      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <span className="material-symbols-outlined text-[#C5A059] text-5xl mb-4">trending_up</span>
        <h2 className="text-3xl font-playfair font-bold text-[#1A202C] mb-6">Strong Entry Price Advantage</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-lg">
          Acquired at an attractive land price of $1,178 psf ppr. Compared to recent developments 
          further from the city, Thomson Reserve presents a remarkable opportunity with a highly 
          competitive expected entry price.
        </p>
        <button className="bg-[#1A202C] text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-[#1A202C]/20 hover:brightness-110 transition-all">
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
