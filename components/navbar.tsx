"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const profileItems = [
	{ title: "Informace o Povodí", href: "#" },
	{ title: "Profil", href: "#" },
	{ title: "Orgány", href: "#" },
	{ title: "Organizační struktura", href: "#" },
	{ title: "Výroční zprávy", href: "#" },
	{ title: "Publicita", href: "#" },
	{ title: "Adresy a kontakty, DS", href: "#" },
	{ title: "Tel. seznam", href: "#" },
]

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<nav className="bg-primary text-white py-2">
			<div className="container mx-auto flex items-center justify-between">
				{/* Mobile Menu Trigger */}
				<div className="lg:hidden flex items-center gap-2">
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								className="text-white hover:bg-primary-700"
							>
								<Menu className="h-6 w-6 mr-2" />
								Menu
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="bg-primary text-white w-64"
						>
							<div className="py-4">
								<Link
									href="/"
									className="block py-2 px-4 hover:bg-primary-700"
								>
									Domů
								</Link>
								{profileItems.map((item) => (
									<Link
										href={item.href}
										key={item.title}
										className="block py-2 px-4 hover:bg-primary-700"
									>
										{item.title}
									</Link>
								))}
								<Link
									href="#"
									className="block py-2 px-4 hover:bg-primary-700"
								>
									Volná pracovní místa
								</Link>
								<Link
									href="#"
									className="block py-2 px-4 hover:bg-primary-700"
								>
									Povinná publicita
								</Link>
								<Link
									href="#"
									className="block py-2 px-4 hover:bg-primary-700"
								>
									Kontakty
								</Link>
							</div>
						</SheetContent>
					</Sheet>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden lg:block">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<Link href="/" legacyBehavior passHref>
									<NavigationMenuLink className="px-4 py-2 hover:bg-primary-700 rounded-md transition">
										Domů
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

							{/* Logo in the middle */}
							<NavigationMenuItem className="">
								<div className="">
									<Link href="/">
										<motion.div
											whileHover={{ scale: 1.05 }}
											transition={{
												type: "spring",
												stiffness: 400,
												damping: 10,
											}}
										>
											<Image
												src="/PLA.png"
												alt="Povodí Labe"
												width={80}
												height={80}
												className="bg-white p-1 "
											/>
										</motion.div>
									</Link>
								</div>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent hover:bg-primary-700">
									Profil firmy
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[400px] gap-1 p-2 md:grid-cols-2">
										{profileItems.map((item) => (
											<li key={item.title}>
												<NavigationMenuLink asChild>
													<Link
														href={item.href}
														className="block select-none space-y-1 rounded-md p-3 leading-none hover:bg-accent hover:text-accent-foreground no-underline outline-none transition-colors"
													>
														<div className="text-sm font-medium">
															{item.title}
														</div>
													</Link>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<Link href="/test" legacyBehavior passHref>
									<NavigationMenuTrigger className="bg-transparent hover:bg-primary-700">
										Profil firmy
									</NavigationMenuTrigger>
								</Link>

								<NavigationMenuContent>
									<ul className="grid w-[400px] gap-1 p-2 md:grid-cols-2">
										{profileItems.map((item) => (
											<li key={item.title}>
												<NavigationMenuLink asChild>
													<Link
														href={item.href}
														className="block select-none space-y-1 rounded-md p-3 leading-none hover:bg-accent hover:text-accent-foreground no-underline outline-none transition-colors"
													>
														<div className="text-sm font-medium">
															{item.title}
														</div>
													</Link>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<Link href="#" legacyBehavior passHref>
									<NavigationMenuLink className="px-4 py-2 hover:bg-primary-700 rounded-md transition">
										Povinná publicita
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<Link href="#" legacyBehavior passHref>
									<NavigationMenuLink className="px-4 py-2 hover:bg-primary-700 rounded-md transition">
										Kontakty
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				{/* Search Form */}
				<div className="hidden lg:flex items-center pr-4">
					<div className="flex">
						<Input
							type="search"
							placeholder="Hledat"
							className="bg-white text-primary min-w-40 h-8 rounded-none border-none"
						/>
						<Button
							type="submit"
							className="hover:bg-gray-100 text-primary rounded-none h-8 border-none bg-gray-200"
						>
							<Search className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</nav>
	)
}
