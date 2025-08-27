// app/components/HeroSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SliderLogo from "./SliderLogo";

const NAV_LINKS: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
];
export const Hero: React.FC = () => {

    const handleNavClick = (href: string) => (e: React.MouseEvent) => {
        console.log(href);
        // For in-page navigation
        if (href.startsWith("#")) {
            e.preventDefault();
            const id = href.slice(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
        // For home link, scroll to top
        if (href === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <section>
            <div className="relative bg-black text-white px-4 py-12 mx-8 border-t-16 border-t-black">
                {/* Background animation layer */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-yellow-700/60 via-black/5 to-slate-900 animate-pulse rounded-4xl mb-4" />

                {/* Navbar */}
                <header className="relative z-10">
                    <nav className="grid grid-cols-3 items-center max-w-6xl mx-auto">
                        {/* Left: Logo */}
                        <div className="flex items-center bg-transparent pl-2 text-2xl font-semibold">
                            tenghuey.dev
                        </div>

                        {/* Center: Nav links with black bg and borders */}
                        <div
                            className={cn(
                                "flex justify-center gap-8 items-center"
                            )}
                        >
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-medium transition-colors hover:text-yellow-400"
                                    onClick={handleNavClick(link.href)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right: CTA */}
                        <div className="flex justify-end items-center bg-transparent pr-2">
                            <Button asChild size="lg" className="bg-yellow-900 hover:bg-yellow-700 disabled:opacity-50 hover:scale-[1.1]" disabled>
                                <Link href="#">Dashboard</Link>
                            </Button>
                        </div>
                    </nav>
                </header>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center pt-32 pb-24">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Welcome to our AI Labs</h1>
                    <p className="max-w-xl mx-auto text-lg md:text-xl text-white/80 mb-8">
                        AI tools made for you. Simple, adaptable, and ready to personalize to your needs.
                    </p>
                    {/* <Button size="lg" className="bg-yellow-900 hover:bg-yellow-700">
                        See Projects
                    </Button> */}
                </div>
            </div>

            <div>
                <SliderLogo />
            </div>


        </section>
    );
};

export default Hero;