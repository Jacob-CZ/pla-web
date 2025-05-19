"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

const tileItems = [
	{ title: "Aktuální informace", href: "#" },
	{ title: "Pro žadatele", href: "#" },
	{ title: "Zakázky a majetek", href: "#" },
	{ title: "Info pro veřejnost", href: "#" },
	{ title: "Odborná veřejnost", href: "#" },
]

export function MobileTilesMenu() {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => setIsOpen(!isOpen)

	return (
		<nav className="md:hidden bg-primary text-white">
			<Button
				variant="ghost"
				onClick={toggleMenu}
				className="w-full flex items-center justify-center gap-2 text-white hover:bg-primary-700 py-4"
			>
				<Menu className="h-6 w-6" />
				<span>Rozcestník</span>
			</Button>

			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="list-none m-0 p-0 w-full overflow-hidden"
					>
						{tileItems.map((item, index) => (
							<motion.li
								key={item.title}
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: index * 0.1 }}
							>
								<Link
									href={item.href}
									className="block py-3 px-4 border-b border-primary-700 hover:bg-primary-700 transition-colors"
								>
									{item.title}
								</Link>
							</motion.li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</nav>
	)
}
