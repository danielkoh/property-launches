"use client";

import { useState } from "react";

interface NumberFieldProps {
    value: number;
    onChange: (value: number) => void;
    /** Show thousands separators when not focused (use for currency). */
    format?: boolean;
    /** Allow a decimal point (use for rates/percentages). */
    decimal?: boolean;
    min?: number;
    max?: number;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    id?: string;
    "aria-label"?: string;
}

/**
 * Controlled numeric input that behaves like a real money/number field:
 * - Clearing the field shows an empty box (never snaps back to "0").
 * - Mobile-friendly numeric / decimal keypads via inputMode.
 * - Optional thousands separators for currency, applied on blur.
 * - Uses a text input so the scroll-wheel can't accidentally change values.
 */
export default function NumberField({
    value,
    onChange,
    format = false,
    decimal = false,
    min,
    max,
    disabled,
    placeholder,
    className = "",
    id,
    ...rest
}: NumberFieldProps) {
    const [focused, setFocused] = useState(false);
    const [draft, setDraft] = useState("");

    const formatNumber = (n: number) =>
        format ? n.toLocaleString("en-US") : String(n);

    // While editing, show exactly what the user typed; otherwise show the
    // formatted value (and let a placeholder show through when the value is 0).
    const display = focused
        ? draft
        : value === 0 && placeholder
            ? ""
            : formatNumber(value);

    const handleChange = (raw: string) => {
        const cleaned = raw.replace(/,/g, "");

        // Allow intermediate states while typing.
        if (cleaned === "" || cleaned === "-" || cleaned === "." || cleaned === "-.") {
            setDraft(cleaned);
            onChange(0);
            return;
        }

        const pattern = decimal ? /^-?\d*\.?\d*$/ : /^-?\d*$/;
        if (!pattern.test(cleaned)) return; // reject invalid keystrokes

        setDraft(cleaned);
        const num = Number(cleaned);
        if (!Number.isNaN(num)) onChange(num);
    };

    return (
        <input
            {...rest}
            id={id}
            type="text"
            inputMode={decimal ? "decimal" : "numeric"}
            disabled={disabled}
            placeholder={placeholder}
            value={display}
            onFocus={(e) => {
                setFocused(true);
                setDraft(value === 0 && placeholder ? "" : String(value));
                const el = e.currentTarget;
                requestAnimationFrame(() => el.select());
            }}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={() => {
                setFocused(false);
                let num = Number(draft.replace(/,/g, ""));
                if (Number.isNaN(num) || draft.trim() === "") num = 0;
                if (min !== undefined && num < min) num = min;
                if (max !== undefined && num > max) num = max;
                onChange(num);
            }}
            className={className}
        />
    );
}
