"use client";

import { useActionState, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { submitRegistration } from "../actions";

const initialState = {
    success: false,
    error: "",
};

export default function RegistrationForm() {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [state, formAction, isPending] = useActionState(
        async (prevState: any, formData: FormData) => {
            if (executeRecaptcha) {
                try {
                    const token = await executeRecaptcha("registration_submit");
                    formData.append("g-recaptcha-response", token);
                } catch (error) {
                    console.error("Recaptcha execution failed", error);
                }
            }

            const result = await submitRegistration(formData);
            if (result.error) {
                return { success: false, error: result.error };
            }
            return { success: true, error: "" };
        },
        initialState
    );

    useEffect(() => {
        if (state.success) {
            if (typeof window !== "undefined" && (window as any).gtag) {
                (window as any).gtag("event", "generate_lead", {
                    event_category: "conversion",
                    event_label: "registration_form_submit",
                });
            }
        }
    }, [state.success]);

    if (state.success) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-pinery-primary/20 p-4 rounded-full text-pinery-primary mb-4">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-forest-green dark:text-white mb-2">
                    Registration Successful!
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                    Thank you for registering. Our sales team will contact you shortly with
                    the exclusive project information.
                </p>
            </div>
        );
    }

    return (
        <form action={formAction} className="flex flex-col gap-5">
            {state.error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                    {state.error}
                </div>
            )}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Full Name
                </label>
                <input
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-forest-green focus:ring-2 focus:ring-pinery-primary focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                    type="text"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Email Address
                </label>
                <input
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-forest-green focus:ring-2 focus:ring-pinery-primary focus:border-transparent outline-none transition-all"
                    placeholder="email@example.com"
                    type="email"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Phone Number
                </label>
                <input
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-forest-green focus:ring-2 focus:ring-pinery-primary focus:border-transparent outline-none transition-all"
                    placeholder="+65 XXXX XXXX"
                    type="tel"
                    required
                />
            </div>
            <div className="flex items-start gap-3 mt-2">
                <input
                    name="consent"
                    className="mt-1 rounded border-slate-300 text-pinery-primary focus:ring-pinery-primary"
                    type="checkbox"
                    required
                />
                <label className="text-xs text-slate-500 leading-tight">
                    I consent to receive marketing updates and communications
                </label>
            </div>
            <button
                disabled={isPending}
                className="bg-pinery-primary hover:bg-pinery-primary/90 text-forest-green font-black py-4 rounded-lg shadow-lg shadow-pinery-primary/20 transition-all active:scale-[0.98] mt-4 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                type="submit"
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-forest-green border-t-transparent rounded-full animate-spin"></span>
                        SUBMITTING...
                    </span>
                ) : (
                    "GET VVIP ACCESS NOW"
                )}
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-2">
                No spam. Your privacy is our priority. Terms and conditions apply.
            </p>
        </form>
    );
}
