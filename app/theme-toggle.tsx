"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const dark = stored ? stored === "dark" : prefersDark;
        setIsDark(dark);
        applyTheme(dark);
    }, []);

    const applyTheme = (dark: boolean) => {
        const html = document.documentElement;
        if (dark) {
            html.classList.add("dark");
            html.classList.remove("light");
        } else {
            html.classList.add("light");
            html.classList.remove("dark");
        }
        localStorage.setItem("theme", dark ? "dark" : "light");
    };

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        applyTheme(newDark);
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="fixed z-10 bottom-4 right-4 p-1 cursor-pointer rounded-lg bg-background border transition-colors shadow-md"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? <Sun size={10} /> : <Moon size={10} />}
        </button>
    );
}
