"use server";

import { supabase } from "@/lib/supabaseClient";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);



async function verifyRecaptcha(token: string | null) {
    if (!token) return false;

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        console.error("RECAPTCHA_SECRET_KEY is not defined");
        // Fail open or closed? Closed is safer, but if config is missing, it breaks app.
        // Let's assume configuration is required.
        return false;
    }

    try {
        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${secretKey}&response=${token}`,
        });

        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error("Recaptcha verification error:", error);
        return false;
    }
}

export async function submitRegistration(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const consent = formData.get("consent") === "on";
    const recaptchaToken = formData.get("g-recaptcha-response") as string;

    if (!name || !email || !phone) {
        return { error: "Please fill in all required fields." };
    }

    if (!consent) {
        return { error: "You must consent to receive updates." };
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
        return { error: "Recaptcha verification failed. Please try again." };
    }

    try {
        const { error } = await supabase
            .from(process.env.SUPABASE_LEADS_TABLE_NAME || "leads")
            .insert([{ name, email, phone, source: "registration_form" }]);

        if (error) {
            console.error("Supabase error:", error);
            return { error: "Failed to submit. Please try again later." };
        }

        return { success: true };
    } catch (err) {
        console.error("Submission error:", err);
        return { error: "An unexpected error occurred." };
    }
}

export async function submitContactQuery(formData: FormData) {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const preferences = formData.get("preferences") as string;
    const recaptchaToken = formData.get("g-recaptcha-response") as string;

    if (!name || !phone) {
        return { error: "Please fill in all required fields." };
    }

    // Server-side Phone Validation
    const sgPhoneRegex = /^[89]\d{7}$/;
    if (!sgPhoneRegex.test(phone.replace(/\s+/g, ""))) {
        return { error: "Please enter a valid Singapore mobile number." };
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
        return { error: "Recaptcha verification failed. Please try again." };
    }

    try {
        // Note: 'preferences' column must be added to the Supabase table manually if it doesn't exist
        const { error } = await supabase
            .from(process.env.SUPABASE_LEADS_TABLE_NAME || "leads")
            .insert([{ name, phone, preferences, source: "contact_form" }]);

        if (error) {
            console.error("Supabase error:", error);
            return { error: "Failed to submit. Please try again later." };
        }

        // Send Email Notification
        await resend.emails.send({
            from: "hi@notifications.bluebed.ai",
            to: ["danielkoh@bluebed.ai", "daniel.wkoh@yahoo.com.sg"],
            subject: `New Contact Form Submission: ${name}`,
            html: `
        <h2>New Lead from Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Preferences:</strong><br/>${preferences || "N/A"}</p>
      `,
        });

        return { success: true };
    } catch (err) {
        console.error("Submission error:", err);
        return { error: "An unexpected error occurred." };
    }
}
