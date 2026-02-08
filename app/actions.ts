"use server";

import { supabase } from "@/lib/supabaseClient";

export async function submitRegistration(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const consent = formData.get("consent") === "on";

    if (!name || !email || !phone) {
        return { error: "Please fill in all required fields." };
    }

    if (!consent) {
        return { error: "You must consent to receive updates." };
    }

    try {
        const { error } = await supabase
            .from(process.env.SUPABASE_LEADS_TABLE_NAME || "leads")
            .insert([{ name, email, phone }]);

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
