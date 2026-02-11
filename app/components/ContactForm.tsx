"use client";

import { useActionState, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { submitContactQuery } from "../actions";

const initialState = {
    success: false,
    error: "",
};

export default function ContactForm() {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [state, formAction, isPending] = useActionState(
        async (prevState: any, formData: FormData) => {
            // 1. Client-side Phone Validation
            const phone = formData.get("phone") as string;
            const sgPhoneRegex = /^[89]\d{7}$/;
            if (!sgPhoneRegex.test(phone.replace(/\s+/g, ""))) {
                return { success: false, error: "Please enter a valid Singapore mobile number (starts with 8 or 9, 8 digits)." };
            }

            // 2. reCAPTCHA Execution
            if (executeRecaptcha) {
                try {
                    const token = await executeRecaptcha("contact_submit");
                    formData.append("g-recaptcha-response", token);
                } catch (error) {
                    console.error("Recaptcha execution failed", error);
                    // Depending on strictness, you might want to fail here or proceed.
                    // Proceeding allows submission if captcha fails to load/execute, which can be a fallback.
                    // But usually you want to ensure it works.
                }
            }

            const result = await submitContactQuery(formData);
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
                    event_label: "contact_form_submit",
                });
            }
        }
    }, [state.success]);

    if (state.success) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-[#111418] dark:text-white mb-2">
                    Message Sent!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Thanks for reaching out. I'll be in touch shortly.
                </p>
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-6">
            {state.error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                    {state.error}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs">
                            person
                        </span>{" "}
                        Full Name
                    </label>
                    <input
                        name="name"
                        required
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
                        name="phone"
                        required
                        className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm outline-none transition-all"
                        placeholder="8123 4567"
                        type="tel"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs">
                        description
                    </span>{" "}
                    What are you looking for?
                </label>
                <textarea
                    name="preferences"
                    className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm outline-none transition-all resize-none h-32"
                    placeholder="Describe what you are looking for in a property..."
                ></textarea>
            </div>
            <button
                disabled={isPending}
                className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg hover:brightness-110 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                type="submit"
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending...
                    </span>
                ) : (
                    <>
                        <span className="material-symbols-outlined">send</span>{" "}
                        Register for VVIP Access
                    </>
                )}
            </button>
            <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[10px]">
                    lock
                </span>{" "}
                No spam. Your privacy is our priority. Terms and conditions apply.
            </p>
        </form>
    );
}
