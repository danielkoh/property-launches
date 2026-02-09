
import Image from "next/image";
import RegistrationForm from "../components/RegistrationForm";

export default function PineryHome() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <header className="fixed top-0 z-50 w-full bg-white/90 dark:bg-pinery-dark/90 backdrop-blur-md border-b border-forest-green/10 px-4 md:px-10 lg:px-40 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4 z-50">
                        <img
                            alt="Pinery Residences Logo"
                            className="h-9 w-auto object-contain"
                            src="/logo.png"
                        />
                    </div>
                </div>
                <nav className="hidden md:flex flex-1 justify-center gap-10">
                    <a
                        className="text-sm font-semibold text-forest-green dark:text-white hover:text-pinery-primary transition-colors"
                        href="#location"
                    >
                        Location
                    </a>
                    <a
                        className="text-sm font-semibold text-forest-green dark:text-white hover:text-pinery-primary transition-colors"
                        href="#lifestyle"
                    >
                        Lifestyle
                    </a>
                    <a
                        className="text-sm font-semibold text-forest-green dark:text-white hover:text-pinery-primary transition-colors"
                        href="#developer"
                    >
                        Developer
                    </a>
                    <a
                        className="text-sm font-semibold text-forest-green dark:text-white hover:text-pinery-primary transition-colors"
                        href="#units"
                    >
                        Unit Types
                    </a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="bg-pinery-primary hover:bg-pinery-primary/90 text-forest-green px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-pinery-primary/20 cursor-pointer">
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

                    <h1 className="text-white text-3xl md:text-7xl font-black leading-[1.1] tracking-tight mb-6">
                        Experience <span className="text-pinery-primary">Convenience & Value</span>{" "}
                        at Pinery Residences
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10 hidden md:block">
                        Direct access to MRT, situated above a retail mall, and within 1km
                        of top primary schools. The smart choice for modern living.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            className="bg-pinery-primary hover:bg-pinery-primary/90 text-forest-green px-8 py-4 rounded-lg font-bold transition-transform hover:-translate-y-1 block"
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
                className="py-24 px-4 md:px-10 lg:px-40 bg-white dark:bg-pinery-dark"
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
                                <div className="bg-pinery-primary/10 p-2 rounded-lg text-pinery-primary">
                                    <span className="material-symbols-outlined">location_city</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-forest-green dark:text-white">
                                        Tampines Street 94
                                    </h4>
                                    <p className="text-sm text-slate-500">
                                        Located in one of Singapore’s most popular towns
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-pinery-primary/10 p-2 rounded-lg text-pinery-primary">
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
                                <div className="bg-pinery-primary/10 p-2 rounded-lg text-pinery-primary">
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
                        <div className="text-pinery-primary mb-6">
                            <span className="material-symbols-outlined text-5xl">
                                apartment
                            </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                            Residential Units
                        </h3>
                        <p className="text-forest-green dark:text-pinery-primary leading-relaxed font-bold text-2xl">
                            588 Modern Homes
                        </p>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
                            Thoughtfully designed for exclusive living
                        </p>
                    </div>
                    <div className="group p-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300">
                        <div className="text-pinery-primary mb-6">
                            <span className="material-symbols-outlined text-5xl">
                                storefront
                            </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                            Commercial Space
                        </h3>
                        <p className="text-forest-green dark:text-pinery-primary leading-relaxed font-bold text-2xl">
                            Est. 120,000 sqft
                        </p>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
                            Premium retail and dining integration
                        </p>
                    </div>
                    <div className="group p-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300">
                        <div className="text-pinery-primary mb-6">
                            <span className="material-symbols-outlined text-5xl">
                                calendar_month
                            </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                            Estimated TOP
                        </h3>
                        <p className="text-forest-green dark:text-pinery-primary leading-relaxed font-bold text-2xl">
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
                <div className="absolute top-0 right-0 w-96 h-96 bg-pinery-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="text-white">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">
                            Register for Early Access & E-Brochure
                        </h2>
                        <p className="text-white/70 text-lg mb-8 leading-relaxed">
                            Register for early access to receive exclusive project information,
                            floor plans, and an invitation to view the showflat. Be among the
                            first to explore Singapore's most anticipated residential launch.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-pinery-primary">
                                    check_circle
                                </span>
                                <span>Digital E-Brochure & Floor Plans</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-pinery-primary">
                                    check_circle
                                </span>
                                <span>Book a visit to Show Flat</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-pinery-primary">
                                    check_circle
                                </span>
                                <span>Developer pricing</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-pinery-dark p-8 md:p-12 rounded-2xl shadow-2xl border border-white/10">
                        <RegistrationForm />
                    </div>
                </div>
            </section>

            <footer className="bg-slate-50 dark:bg-pinery-dark py-16 px-4 md:px-10 lg:px-40 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
                    <div className="max-w-xs">
                        <div className="flex flex-col gap-1 mb-6">
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">
                                Appointed Marketing Agency
                            </p>
                            <h3 className="text-xl font-bold text-forest-green dark:text-white">
                                ERA Realty Network Pte Ltd
                            </h3>
                            <p className="text-sm text-slate-500">
                                Licence number: L3002382K
                            </p>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6">
                            ERA APAC Centre, 450 Lorong 6 Toa Payoh, Singapore 319394
                        </p>
                        <a
                            className="text-pinery-primary font-bold hover:underline block mb-6"
                            href="https://www.era.com.sg"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            www.era.com.sg
                        </a>
                    </div>
                    <div className="flex flex-col gap-6 justify-end text-left sm:text-right">
                        <div>
                            <h5 className="font-bold text-forest-green dark:text-white mb-2">
                                About Us
                            </h5>
                            <p className="font-bold text-slate-700 dark:text-slate-200">
                                DANIEL KOH
                            </p>
                            <p className="text-sm text-slate-500">CEA NO. : R073362I</p>
                        </div>
                        <div>
                            <a
                                className="text-sm text-slate-500 hover:text-pinery-primary transition-colors"
                                href="https://bluebed.ai/privacy-policy"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
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
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 leading-relaxed text-justify">
                        Disclaimer: ERA Realty Network Pte Ltd is the appointed marketing
                        agency for Pinery Residences. This website is independently managed
                        by ERA marketing agents and is not the official website of the
                        developer. All content is provided for general information purposes
                        only. Our role is to share updated project information and assist
                        with arranging showflat appointments. Buyers do not pay any
                        commission; all fees are paid directly by the developer. This site
                        may contain forward-looking statements that involve assumptions,
                        risks, and uncertainties. While every effort is made to ensure
                        accuracy, neither the developer nor ERA Realty Network Pte Ltd shall
                        be held liable for any inaccuracies, omissions, or changes. To the
                        fullest extent permitted by law, all information, visuals, and
                        illustrations are not contractual and may differ from the final
                        product. Artist impressions are for illustration purposes only. ERA
                        Realty Network Pte Ltd shall not be liable for any special, direct,
                        indirect, incidental, or consequential damages arising from the use
                        of the information provided on this website. ERA Realty Network Pte
                        Ltd reserves the right to update, modify, or remove any content at
                        any time without prior notice. We are committed to providing the
                        latest updates for this development and will continue to work
                        closely with the developer and partners to ensure information
                        remains current and reliable.
                    </p>
                </div>
            </footer>
        </div>
    );
}
