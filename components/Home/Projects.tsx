'use client';

import { useRef, JSX } from "react";
import Hyperspeed from "../Hyperspeed/Hyperspeed";
import { Badge } from "../ui/badge";

type Project = {
    title: string;
    description: string;
    usecase: string[]
};

const projects: Project[] = [
    {
        title: "Content Generation",
        description:
            "Automates the creation of daily digital content, including posts, videos, and images. Designed to save time while ensuring brand consistency and engagement across multiple platforms.",
        usecase: [
            "Marketing Campaigns",
            "Social Media Management",
            "Brand Awareness",
            "Audience Engagement",
        ],
    },
    {
        title: "Chatbot Assistant",
        description:
            "An AI-powered conversational assistant tailored for businesses. It can handle customer inquiries, manage scheduling, send reminders, and integrate with your business systems for a personalized experience.",
        usecase: [
            "Customer Support",
            "Appointment Scheduling",
            "Email & Notification Reminders",
            "Business Account Integration",
        ],
    },
    {
        title: "Extract Text from Images",
        description:
            "Leverages OCR technology to automatically extract and process text from images and scanned documents. Ideal for digitizing files, automating data entry, and enabling searchable archives.",
        usecase: [
            "Automated Data Entry",
            "Document Digitization",
            "Invoice Processing",
            "Searchable Archives",
        ],
    },
    {
        title: "AI Lead Generation",
        description:
            "An AI solution that automates finding and nurturing prospects by analyzing data, segmenting audiences, and personalizing outreach to boost leads and conversions.",
        usecase: [
            "Targeted Advertising",
            "Customer Segmentation",
            "Personalized Campaigns",
            "Sales Funnel Optimization",
            "B2B Prospecting",
        ],
    },
    {
        title: "Real-Time News Insights",
        description:
            "An AI-powered tool that aggregates, analyzes, and summarizes the latest news from trusted sources in real time. It delivers concise updates, highlights emerging trends, and extracts key insights.",
        usecase: [
            "Sports Analysis",
            "Crypto & Financial Markets",
            "Media Monitoring",
            "Trend & Sentiment Analysis",
        ],
    },
    // Add more projects as needed
];

export default function Projects({ id }: { id: string }): JSX.Element {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dx: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dx, behavior: "smooth" });
        }
    };

    return (
        <section className="relative h-[48rem] w-full overflow-hidden text-white" id={id}>
            {/* Hyperspeed as background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Hyperspeed />
            </div>

            {/* Foreground */}
            <div className="relative z-10 h-full container mx-auto flex flex-col justify-center">
                {/* Header row */}
                <div className="flex items-center justify-between w-full px-6 pt-12 pb-4">
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                    <div className="flex gap-2">
                        {/* Left Scroll Button */}
                        <button
                            type="button"
                            aria-label="Scroll Left"
                            onClick={() => scroll(-(scrollRef.current?.offsetWidth ?? 400) * 0.8)}
                            className="rounded-full bg-white/15 border border-white/20 hover:bg-white/25 p-2 transition active:scale-95 shadow hover:cursor-pointer"
                        >
                            {/* Left chevron SVG */}
                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.25 19.25L8.75 12L15.25 4.75" />
                            </svg>
                        </button>
                        {/* Right Scroll Button */}
                        <button
                            type="button"
                            aria-label="Scroll Right"
                            onClick={() => scroll((scrollRef.current?.offsetWidth ?? 400) * 0.8)}
                            className="rounded-full bg-white/15 border border-white/20 hover:bg-white/25 p-2 transition active:scale-95 shadow hover:cursor-pointer"
                        >
                            {/* Right chevron SVG */}
                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.75 4.75L15.25 12L8.75 19.25" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Horizontally scrollable Project Cards */}
                <div
                    ref={scrollRef}
                    // className="flex flex-row gap-6 w-full max-w-full mx-auto overflow-x-auto h-[30rem] rounded-2xl shadow-lg px-6 py-8 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent"
                    className="flex flex-row gap-6 w-full max-w-full mx-auto overflow-x-auto h-[30rem] rounded-2xl shadow-lg px-6 py-8 scrollbar-hide"
                    tabIndex={0}
                    aria-label="Projects List"
                >
                    {projects.map((project, idx) => (
                        <div
                            key={project.title + idx}
                            className="min-w-[19rem] max-w-[22rem] bg-white/10 border border-white/10 rounded-xl p-6 shadow-lg flex-shrink-0 transition hover:scale-[1.03] hover:bg-white/20"
                        >
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-1">{project.title}</h3>
                                    <p className="text-base text-white/80">{project.description}</p>
                                </div>
                                {project.usecase.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.usecase.map((uc, ucIdx) => (
                                            <Badge
                                                key={uc + ucIdx}
                                                variant="outline"
                                                className="bg-white/20 border-white/30 text-white"
                                            >
                                                {uc}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}