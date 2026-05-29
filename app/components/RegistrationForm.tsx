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
            <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="bg-primary/20 p-4 rounded-full text-primary mb-4">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-[#1c1917] dark:text-white mb-2">
                    Registration Successful!
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Thank you for registering. Our sales team will contact you shortly with
                    the exclusive project information.
                </p>
            </div>
        );
    }

    return (
        <form action={formAction} className="flex flex-col gap-4">
            {state.error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                    {state.error}
                </div>
            )}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Full Name
                </label>
                <input
                    name="name"
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 text-[#1c1917] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Enter your name"
                    type="text"
                    required
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Email Address
                </label>
                <input
                    name="email"
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 text-[#1c1917] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                    placeholder="email@example.com"
                    type="email"
                    required
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Phone Number
                </label>
                <input
                    name="phone"
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 text-[#1c1917] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                    placeholder="+65 XXXX XXXX"
                    type="tel"
                    required
                />
            </div>
            <div className="flex items-start gap-3 mt-1">
                <input
                    name="consent"
                    className="mt-1 rounded border-stone-350 text-primary focus:ring-primary"
                    type="checkbox"
                    required
                />
                <label className="text-[11px] text-stone-500 leading-tight">
                    I consent to receive marketing updates and communications
                </label>
            </div>
            <button
                disabled={isPending}
                className="bg-primary hover:bg-primary-hover text-white font-black py-3 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center text-sm"
                type="submit"
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        SUBMITTING...
                    </span>
                ) : (
                    "GET VVIP ACCESS NOW"
                )}
            </button>
            <p className="text-center text-[10px] text-stone-400 mt-1">
                No spam. Your privacy is our priority. Terms and conditions apply.
            </p>
        </form>
    );
}
