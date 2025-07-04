"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface SlideImage {
	url: string
	label: string
}

interface HeroCarouselProps {
	slides: SlideImage[]
}

const tileItems = [
	{ title: "Aktuální informace", href: "/home/aktualni-informace" },
	{ title: "Pro žadatele", href: "/home/pro-zadatele" },
	{ title: "Zakázky a majetek", href: "/home/zakazky-a-majetek" },
	{ title: "Info pro veřejnost", href: "/home/info-pro-verejnost" },
	{ title: "Odborná veřejnost", href: "/home/odborna-verejnost" },
]

export function HeroCarousel({ slides }: HeroCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)
	const slideTime = 4000

	const startCarousel = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
		}

		intervalRef.current = setInterval(() => {
			if (!isPaused) {
				setCurrentIndex((prev) => (prev + 1) % slides.length)
			}
		}, slideTime)
	}

	const resetCarouselTimer = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
		}
		startCarousel()
	}

	const handleDotClick = (index: number) => {
		setCurrentIndex(index)
		resetCarouselTimer()
	}

	useEffect(() => {
		startCarousel()
		updateCarouselHeight()

		window.addEventListener("resize", updateCarouselHeight)

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
			window.removeEventListener("resize", updateCarouselHeight)
		}
	}, [isPaused])

	return (
		<section
			className="relative overflow-hidden h-[50vh] md:h-[60vh]"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			{/* Mobile Logo */}
			<div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 lg:hidden">
				<Link href="/">
					<Image
						src="/PLA.png"
						alt="Povodí Labe"
						width={100}
						height={100}
						className="bg-white p-1"
					/>
				</Link>
			</div>

			{/* Carousel Slides - Modified for cross-fade transition */}
			<AnimatePresence initial={false}>
				<motion.div
					key={currentIndex}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
					className="absolute inset-0"
					style={{
						backgroundImage: `url('${slides[currentIndex].url}')`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
			</AnimatePresence>

			{/* Content Container */}
			<div className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row items-end">
				{/* Tiles Menu - Desktop */}
				<div className="hidden md:flex w-full justify-between bg-white text-white gap-1">
					{tileItems.map((item, index) => (
						<div
							key={index}
							className="flex-1 text-center py-4  transition-colors flex items-center justify-center p-2 bg-primary"
						>
							<Link href={item.href}>
								{item.title.replace(
									/\s*<br\s*\/>\s*/i,
									"<br/>"
								)}
							</Link>
						</div>
					))}
				</div>

				{/* Caption Box */}
				<div className="w-full  text-center text-white py-4">
					<motion.h1
						key={`title-${currentIndex}`}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="text-2xl md:text-2xl font-bold mb-2"
					>
						{slides[currentIndex].label}
					</motion.h1>

					{/* Carousel Dots */}
					<div className="flex justify-center gap-2 mt-2">
						{slides.map((_, index) => (
							<button
								key={index}
								onClick={() => handleDotClick(index)}
								className={`w-3 h-3 rounded-full transition-colors ${
									index === currentIndex
										? "bg-white"
										: "bg-gray-400"
								}`}
								aria-label={`Slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
function updateCarouselHeight() {}
