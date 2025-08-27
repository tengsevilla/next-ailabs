
'use client';

import { animate, motion, useMotionValue } from 'framer-motion';
import React, { CSSProperties, useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import Image from 'next/image';

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}



type InfiniteSliderProps = {
    children: React.ReactNode;
    gap?: number;
    speed?: number;
    speedOnHover?: number;
    direction?: 'horizontal' | 'vertical';
    reverse?: boolean;
    className?: string;
};

function InfiniteSlider({
    children,
    gap = 16,
    speed = 100,
    speedOnHover,
    direction = 'horizontal',
    reverse = false,
    className,
}: InfiniteSliderProps) {
    const [currentSpeed, setCurrentSpeed] = useState(speed);
    const [ref, { width, height }] = useMeasure();
    const translation = useMotionValue(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [key, setKey] = useState(0);

    useEffect(() => {
        let controls;
        const size = direction === 'horizontal' ? width : height;
        if (size === 0) return;

        const contentSize = size + gap;
        const from = reverse ? -contentSize / 2 : 0;
        const to = reverse ? 0 : -contentSize / 2;

        const distanceToTravel = Math.abs(to - from);
        const duration = distanceToTravel / currentSpeed;

        if (isTransitioning) {
            const remainingDistance = Math.abs(translation.get() - to);
            const transitionDuration = remainingDistance / currentSpeed;
            controls = animate(translation, [translation.get(), to], {
                ease: 'linear',
                duration: transitionDuration,
                onComplete: () => {
                    setIsTransitioning(false);
                    setKey((prevKey) => prevKey + 1);
                },
            });
        } else {
            controls = animate(translation, [from, to], {
                ease: 'linear',
                duration: duration,
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0,
                onRepeat: () => {
                    translation.set(from);
                },
            });
        }

        return () => controls?.stop();
    }, [key, translation, currentSpeed, width, height, gap, isTransitioning, direction, reverse]);

    const hoverProps = speedOnHover
        ? {
            onHoverStart: () => {
                setIsTransitioning(true);
                setCurrentSpeed(speedOnHover);
            },
            onHoverEnd: () => {
                setIsTransitioning(true);
                setCurrentSpeed(speed);
            },
        }
        : {};

    return (
        <div className={cn('overflow-hidden', className)}>
            <motion.div
                className="flex w-max"
                style={{
                    ...(direction === 'horizontal' ? { x: translation } : { y: translation }),
                    gap: `${gap}px`,
                    flexDirection: direction === 'horizontal' ? 'row' : 'column',
                }}
                ref={ref}
                {...hoverProps}>
                {children}
                {children}
            </motion.div>
        </div>
    );
}


export type BlurredInfiniteSliderProps = InfiniteSliderProps & {
    fadeWidth?: number;
    containerClassName?: string;
};

export function BlurredInfiniteSlider({
    children,
    fadeWidth = 80,
    containerClassName,
    ...sliderProps
}: BlurredInfiniteSliderProps) {

    const maskStyle: CSSProperties = {
        maskImage: `linear-gradient(to right, transparent, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent)`,
        WebkitMaskImage: `linear-gradient(to right, transparent, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent)`,
    };

    return (
        <div
            className={cn('relative w-full', containerClassName)}
            style={maskStyle}
        >
            <InfiniteSlider {...sliderProps}>{children}</InfiniteSlider>
        </div>
    );
}


const LOGOS = [
    { src: "/svgs/vercel.svg", alt: "Vercel Logo", label: "Vercel", height: 24 },
    { src: "/svgs/railway.svg", alt: "Railway Logo", label: "Railway", height: 24 },
    { src: "/svgs/n8n.svg", alt: "n8n Logo", label: "n8n", height: 24 },
    { src: "/svgs/openai.svg", alt: "OpenAI Logo", label: "OpenAI", height: 24 },
    { src: "/svgs/googlegemini.svg", alt: "Google Gemini Logo", label: "Gemini", height: 24 },
    { src: "/svgs/elevenlabs.svg", alt: "ElevenLabs Logo", label: "ElevenLabs", height: 24 },
    { src: "/svgs/mistralai.svg", alt: "Mistral AI Logo", label: "Mistral AI", height: 24 },
    { src: "/svgs/perplexity.svg", alt: "Perplexity Logo", label: "Perplexity", height: 24 },
    // { src: "/svgs/google.svg", alt: "Google Logo", label: "Google", height: 24 },
    // { src: "/svgs/telegram.svg", alt: "Telegram Logo", label: "Telegram", height: 24 },
];

export default function SliderLogo() {
    return (
        <div className="flex items-center justify-center">
            <section className="overflow-hidden py-6">
                <div className="m-auto max-w-7xl px-6">

                    <div className="flex flex-col items-center md:flex-row">

                        <div className="flex-shrink-0 text-center md:text-right md:max-w-44 md:border-r md:border-gray-200 dark:md:border-gray-800 md:pr-6">
                            <p className="text-md font-semibold text-white">
                                Our techonolgies
                            </p>
                        </div>

                        <div className="w-full py-6 md:w-auto md:flex-1">
                            <BlurredInfiniteSlider
                                speedOnHover={20}
                                speed={40}
                                gap={112}
                                fadeWidth={80}
                            >
                                {LOGOS.map((logo) => (
                                    <div key={logo.src} className="flex flex-col items-center">
                                        <Image
                                            className="mx-auto w-fit invert brightness-0"
                                            src={logo.src}
                                            alt={logo.alt}
                                            height={logo.height}
                                            width={logo.height * 4}
                                            style={{ color: 'white', height: `${logo.height}px`, width: 'auto' }}
                                            unoptimized
                                        />
                                        <span className="mt-2 text-sm text-white">{logo.label}</span>
                                    </div>
                                ))}
                            </BlurredInfiniteSlider>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}