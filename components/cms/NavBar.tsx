"use client"
import React from "react"
import Link from "next/link"
import { Menu, Search, Bell } from "lucide-react"
import Image from "next/image"

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Define types for our navigation items
export type NavItem = {
	id?: number | string
	label?: string
	name?: string // Added for compatibility with new shape
	slug?: string // Added for compatibility with new shape
	created_at?: string // Added for compatibility with new shape
	icon?: React.ReactNode
	children?: NavItem[]
}

export type UserMenuOption = {
	label: string
	href?: string
	onClick?: () => void
	icon?: React.ReactNode
}

export type TopNavBarProps = {
	logo?: React.ReactNode
	navItems?: NavItem[]
	userMenuOptions?: UserMenuOption[]
	showSearch?: boolean
	showNotifications?: boolean
	showUserMenu?: boolean
	userAvatar?: {
		src?: string
		alt?: string
		fallback: string
	}
	className?: string
}

export default function TopNavBar({
	navItems = [],
	showSearch = true,
	showNotifications = true,
	showUserMenu = true,
	userAvatar = {
		src: undefined,
		alt: "User avatar",
		fallback: "U",
	},
	className = "",
}: TopNavBarProps) {
	// Helper function to get the display label
	const getItemLabel = (item: NavItem): string => {
		return item.label || item.name || "Unnamed"
	}

	// Helper function to get the item href
	const getItemHref = (item: NavItem): string => {
		return "/cms/" + (item.slug ? `/${item.slug}` : "#")
	}

	return (
		<header className={`w-full bg-white border-b shadow-sm ${className}`}>
			<div className="container mx-auto px-4 flex items-center justify-between h-16">
				{/* Mobile menu toggle */}
				<div className="lg:hidden flex items-center">
					<Button variant="ghost" size="icon">
						<Menu className="h-5 w-5" />
					</Button>
				</div>

				<div className="flex items-center h-full">
					<Image
						src="/PLA.png"
						alt="Logo"
						width={100}
						height={32}
						style={{ objectFit: "contain", maxHeight: "32px" }}
					/>
				</div>

				{/* Navigation */}
				<div className="hidden lg:flex items-center space-x-1">
					<NavigationMenu>
						<NavigationMenuList>
							{navItems.map((item, index) =>
								item.children && item.children.length > 0 ? (
									<NavigationMenuItem key={item.id || index}>
										<NavigationMenuTrigger>
											{getItemLabel(item)}
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
												{item.children.map(
													(child, childIndex) => (
														<li
															key={
																child.id ||
																childIndex
															}
														>
															<NavigationMenuLink
																asChild
															>
																<Link
																	href={getItemHref(
																		child
																	)}
																	className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
																>
																	<div className="flex items-center">
																		{child.icon && (
																			<span className="mr-2">
																				{
																					child.icon
																				}
																			</span>
																		)}
																		<div className="text-sm font-medium leading-none">
																			{getItemLabel(
																				child
																			)}
																		</div>
																	</div>
																</Link>
															</NavigationMenuLink>
														</li>
													)
												)}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								) : (
									<NavigationMenuItem key={item.id || index}>
										<Link
											href={getItemHref(item)}
											legacyBehavior
											passHref
										>
											<NavigationMenuLink className="flex items-center px-4 py-2 text-sm font-medium">
												{item.icon && (
													<span className="mr-2">
														{item.icon}
													</span>
												)}
												{getItemLabel(item)}
											</NavigationMenuLink>
										</Link>
									</NavigationMenuItem>
								)
							)}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				{/* Right side items */}
				<div className="flex items-center space-x-4">
					{/* Search */}
					{showSearch && (
						<div className="hidden md:flex relative w-64">
							<Input
								type="text"
								placeholder="Search..."
								className="pl-8 pr-4 py-2 rounded-md"
							/>
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
						</div>
					)}

					{/* Notifications */}
					{showNotifications && (
						<Button
							variant="ghost"
							size="icon"
							className="relative"
						>
							<Bell className="h-5 w-5" />
							<span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
						</Button>
					)}

					{/* User menu */}
					{showUserMenu && (
						<Link
							href="/cms/login"
							className="flex items-center space-x-2"
						>
							<Avatar>
								<AvatarImage
									src={userAvatar.src}
									alt={userAvatar.alt}
								/>
								<AvatarFallback>
									{userAvatar.fallback}
								</AvatarFallback>
							</Avatar>
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}

// Update the example usage with the new structure
export function TopNavBarExample() {
	const exampleNavItems: NavItem[] = [
		{ id: 1, name: "Dashboard", slug: "dashboard" },
		{
			id: 2,
			name: "Products",
			slug: "products",
			children: [
				{ id: 21, name: "Overview", slug: "products" },
				{ id: 22, name: "Analytics", slug: "products/analytics" },
				{ id: 23, name: "Inventory", slug: "products/inventory" },
				{ id: 24, name: "Settings", slug: "products/settings" },
			],
		},
		{
			id: 3,
			name: "Resources",
			slug: "resources",
			children: [
				{ id: 31, name: "Documentation", slug: "resources/docs" },
				{ id: 32, name: "Help Center", slug: "resources/help" },
				{ id: 33, name: "Guides", slug: "resources/guides" },
				{ id: 34, name: "API Reference", slug: "resources/api" },
			],
		},
		{ id: 4, name: "Pricing", slug: "pricing" },
	]

	const userMenuOptions: UserMenuOption[] = [
		{ label: "Profile", href: "/profile" },
		{ label: "Settings", href: "/settings" },
		{ label: "Billing", href: "/billing" },
		{ label: "Help & Support", href: "/support" },
		{ label: "Log out", onClick: () => console.log("Logged out") },
	]

	return (
		<div className="bg-gray-50">
			<TopNavBar
				navItems={exampleNavItems}
				userMenuOptions={userMenuOptions}
				userAvatar={{
					fallback: "JD",
				}}
				onMobileMenuToggle={() => console.log("Mobile menu toggled")}
			/>
		</div>
	)
}
