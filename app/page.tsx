
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <header className="fixed top-0 z-50 w-full bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-forest-green/10 px-4 md:px-10 lg:px-40 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-primary size-8">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <g clipPath="url(#clip0_6_330)">
                <path
                  clipRule="evenodd"
                  d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_6_330">
                  <rect fill="white" height="48" width="48"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-forest-green dark:text-primary text-xl font-extrabold leading-tight tracking-tight">
            Pinery Residences
          </h2>
        </div>
        <nav className="hidden md:flex flex-1 justify-center gap-10">
          <a
            className="text-sm font-semibold text-forest-green dark:text-white hover:text-primary transition-colors"
            href="#location"
          >
            Location
          </a>
          <a
            className="text-sm font-semibold text-forest-green dark:text-white hover:text-primary transition-colors"
            href="#lifestyle"
          >
            Lifestyle
          </a>
          <a
            className="text-sm font-semibold text-forest-green dark:text-white hover:text-primary transition-colors"
            href="#developer"
          >
            Developer
          </a>
          <a
            className="text-sm font-semibold text-forest-green dark:text-white hover:text-primary transition-colors"
            href="#units"
          >
            Unit Types
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="bg-primary hover:bg-primary/90 text-forest-green px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20 cursor-pointer">
            Register Now
          </button>
        </div>
      </header>

      <section className="relative h-[65vh] md:h-screen flex items-center justify-start overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 hero-overlay z-10"></div>
          {/* Using img tag with external URL as per plan. For Next.js Image, we'd need to configure domains. keeping it simple for now as requested. */}
          <img
            alt="Pinery Residences Exterior"
            className="w-full h-full object-cover object-right-bottom"
            src="/hero.png"
          />
        </div>
        <div className="relative z-20 px-4 md:px-10 lg:px-40 max-w-4xl">
          <span className="inline-block text-gold-accent font-bold tracking-widest uppercase mb-4 text-sm">
            Now Launching in Singapore
          </span>
          <h1 className="text-white text-3xl md:text-7xl font-black leading-[1.1] tracking-tight mb-6">
            Experience <span className="text-primary">Elevated Living</span> at
            Pinery Residences
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10 hidden md:block">
            A sanctuary of luxury nestled in the heart of Singapore’s green
            corridor. Discover exclusive amenities and prime connectivity in a
            biophilic masterpiece.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              className="bg-primary hover:bg-primary/90 text-forest-green px-8 py-4 rounded-lg font-bold transition-transform hover:-translate-y-1 block"
              href="#register"
            >
              Download E-Brochure
            </a>
            <a
              className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-bold backdrop-blur-sm transition-all block"
              href="#units"
            >
              View Unit Plans
            </a>
          </div>
        </div>
      </section>

      <section
        className="py-24 px-4 md:px-10 lg:px-40 bg-white dark:bg-background-dark"
        id="location"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-forest-green dark:text-white text-3xl md:text-4xl font-bold mb-6">
              Strategic Location
            </h2>
            <div className="w-16 h-1 bg-gold-accent mb-8"></div>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Situated in Tampines, one of the most popular locations in Eastern
              Singapore, Pinery Residences offers a wealth of amenities at your
              doorstep. Enjoy the ultimate convenience of living right above the
              MRT and within 1km of popular primary schools.
            </p>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">location_city</span>
                </div>
                <div>
                  <h4 className="font-bold text-forest-green dark:text-white">
                    Prime Location
                  </h4>
                  <p className="text-sm text-slate-500">
                    Located in the heart of one of Singapore’s most popular towns
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <h4 className="font-bold text-forest-green dark:text-white">
                    Elite Education
                  </h4>
                  <p className="text-sm text-slate-500">
                    Within 1KM to St Hilda’s Primary and close to many good schools
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">train</span>
                </div>
                <div>
                  <h4 className="font-bold text-forest-green dark:text-white">
                    Integrated Hub
                  </h4>
                  <p className="text-sm text-slate-500">
                    Integrated with Tampines West MRT, mall, community plaza and childcare
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 dark:border-forest-green/20">
            <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800 relative">
              <img
                alt="Map View of Singapore Area"
                className="w-full h-full object-cover"
                src="/location.png"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-10 lg:px-40 bg-background-light dark:bg-slate-900/30">
        <div className="text-center mb-16">
          <h2 className="text-forest-green dark:text-white text-3xl md:text-4xl font-bold mb-4">
            Positioned for Success
          </h2>
          <div className="w-20 h-1 bg-gold-accent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group p-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300">
            <div className="text-primary mb-6">
              <span className="material-symbols-outlined text-5xl">
                apartment
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Residential Units
            </h3>
            <p className="text-forest-green dark:text-primary leading-relaxed font-bold text-2xl">
              588 Modern Homes
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
              Thoughtfully designed for exclusive living
            </p>
          </div>
          <div className="group p-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300">
            <div className="text-primary mb-6">
              <span className="material-symbols-outlined text-5xl">
                storefront
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Commercial Space
            </h3>
            <p className="text-forest-green dark:text-primary leading-relaxed font-bold text-2xl">
              Est. 120,000 sqft
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
              Premium retail and dining integration
            </p>
          </div>
          <div className="group p-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300">
            <div className="text-primary mb-6">
              <span className="material-symbols-outlined text-5xl">
                calendar_month
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Estimated TOP
            </h3>
            <p className="text-forest-green dark:text-primary leading-relaxed font-bold text-2xl">
              April 2030
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
              Move into the future of luxury
            </p>
          </div>

          <div className="group p-10 rounded-xl bg-forest-green border border-gold-accent hover:shadow-2xl transition-all duration-300 md:col-span-2 lg:col-span-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="text-forest-green bg-gold-accent p-6 rounded-full shadow-lg shrink-0">
                <span className="material-symbols-outlined text-4xl">
                  trending_up
                </span>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                  Potential Entry Price Advantage
                </h3>
                <p className="text-white/90 leading-relaxed text-lg max-w-2xl">
                  Developer secured land at attractive <span className="font-bold text-gold-accent text-xl">$1,004 psf ppr</span>, offering significant value potential for early buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section
        className="py-24 px-4 md:px-10 lg:px-40 bg-forest-green text-white"
        id="developer"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-gold-accent font-bold tracking-widest uppercase text-sm mb-4 block">
            Joint Venture
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
            HOI HUP SUNWAY TAMPINES
          </h2>
          <div className="w-20 h-1 bg-gold-accent mx-auto mb-10"></div>
          <p className="text-white/80 text-xl mb-12 leading-relaxed">
            A strategic partnership between
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <a
              className="group bg-white/10 hover:bg-white/20 border border-white/20 p-8 rounded-xl transition-all hover:-translate-y-1 block w-full md:w-auto min-w-[280px]"
              href="https://www.hoihup.com/Portfolio/Residential"
              rel="noopener noreferrer"
              target="_blank"
            >
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold-accent transition-colors">
                Hoi Hup Realty
              </h3>
              <div className="text-gold-accent text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                View Portfolio
                <span className="material-symbols-outlined text-sm">
                  open_in_new
                </span>
              </div>
            </a>
            <a
              className="group bg-white/10 hover:bg-white/20 border border-white/20 p-8 rounded-xl transition-all hover:-translate-y-1 block w-full md:w-auto min-w-[280px]"
              href="https://sunwaymcl.com.sg/our-masterpieces"
              rel="noopener noreferrer"
              target="_blank"
            >
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold-accent transition-colors">
                Sunway Property
              </h3>
              <div className="text-gold-accent text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                View Portfolio
                <span className="material-symbols-outlined text-sm">
                  open_in_new
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section
        className="py-24 px-4 md:px-10 lg:px-40 bg-white"
        id="units"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-forest-green text-3xl md:text-4xl font-bold mb-4">
              Unit Mix
            </h2>

          </div>
        </div>
        <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gold-accent/30">
          <img
            alt="Pinery Residences Unit Mix"
            className="w-full h-auto object-cover"
            src="/unit_mix.png"
          />
        </div>
      </section>

      <section
        className="py-24 px-4 md:px-10 lg:px-40 bg-forest-green relative overflow-hidden"
        id="register"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Register for Early Access & E-Brochure
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Be the first to receive exclusive pricing, floor plans, and priority
              viewing slots for the upcoming VVIP preview. Join the waitlist for
              Singapore's most anticipated residential launch.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
                <span>Direct Developer Discounts</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
                <span>Priority VVIP Showsuite Access</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
                <span>Full Digital E-Brochure & Floor Plans</span>
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-background-dark p-8 md:p-12 rounded-2xl shadow-2xl border border-white/10">
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-forest-green focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Enter your name"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-forest-green focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="email@example.com"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Phone Number
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-forest-green focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="+65 XXXX XXXX"
                  type="tel"
                />
              </div>
              <div className="flex items-start gap-3 mt-2">
                <input
                  className="mt-1 rounded border-slate-300 text-primary focus:ring-primary"
                  type="checkbox"
                />
                <label className="text-xs text-slate-500 leading-tight">
                  I consent to receive marketing updates and communications
                  regarding Pinery Residences via Email, SMS and Phone Call.
                </label>
              </div>
              <button
                className="bg-primary hover:bg-primary/90 text-forest-green font-black py-4 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-4 cursor-pointer"
                type="submit"
              >
                GET VVIP ACCESS NOW
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-2">
                No spam. Your privacy is our priority. Terms and conditions
                apply.
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-slate-50 dark:bg-background-dark py-16 px-4 md:px-10 lg:px-40 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-primary text-2xl font-black">PINERY</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              An iconic residential development representing the pinnacle of
              luxury architecture in Singapore. Developed by Landmark Group.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">share</span>
              </a>
              <a
                className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1 justify-end max-w-2xl">
            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-forest-green dark:text-white">
                Property
              </h5>
              <a className="text-sm text-slate-500 hover:text-primary" href="#">
                Master Plan
              </a>
              <a className="text-sm text-slate-500 hover:text-primary" href="#">
                Amenities
              </a>
              <a className="text-sm text-slate-500 hover:text-primary" href="#">
                E-Brochure
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-forest-green dark:text-white">
                Legal
              </h5>
              <a className="text-sm text-slate-500 hover:text-primary" href="#">
                Privacy Policy
              </a>
              <a className="text-sm text-slate-500 hover:text-primary" href="#">
                Disclaimer
              </a>
              <a className="text-sm text-slate-500 hover:text-primary" href="#">
                Agency License
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-forest-green dark:text-white">
                Support
              </h5>
              <a className="text-sm text-slate-500 hover:text-primary" href="#">
                Sales Team
              </a>
              <a className="text-sm text-slate-500 hover:text-primary" href="#">
                Viewing Request
              </a>
              <a className="text-sm text-slate-500 hover:text-primary" href="#">
                FAQ
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2024 Pinery Residences Singapore. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[12px]">
              verified
            </span>
            <span>CEA Reg No: L3008022J / R064321A</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
