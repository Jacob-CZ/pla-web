"use client"
import React, { useState } from "react"
import Link from "next/link"

interface NavigationItem {
	label: string
	href: string
	items?: NavigationItem[]
}

const NavigationMenu: React.FC = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const menuItems: NavigationItem[] = [
		{
			label: "Správní členění",
			href: "/spravni-cleneni",
			items: [
				{ label: "Správní členění 1", href: "/spravni-cleneni/1" },
				{ label: "Správní členění 2", href: "/spravni-cleneni/2" },
				{ label: "Správní členění 3", href: "/spravni-cleneni/3" },
			],
		},
		{
			label: "Stavy a průtoky",
			href: "/stavy-a-prutoky",
			items: [
				{ label: "Stavy a průtoky 1", href: "/stavy-a-prutoky/1" },
				{ label: "Stavy a průtoky 2", href: "/stavy-a-prutoky/2" },
			],
		},
		{ label: "Hladina vody v nádržích", href: "/hladina-vody" },
		{ label: "Srážkoměrné stanice", href: "/srazkomerne-stanice" },
		{ label: "Jakost vody v nádržích", href: "/jakost-vody" },
		{ label: "Labská vodní cesta", href: "/labska-vodni-cesta" },
		{ label: "Záplavová území", href: "/zaplavova-uzemi" },
		{ label: "Sucho / Povodně", href: "/sucho-povodne" },
		{ label: "PPO", href: "/ppo" },
	]

	return (
		<nav className="w-64 ">
			<div className="flex flex-col gap-2">
				{menuItems.map((item, index) => (
					<div key={index} className="">
						{/* Main menu item */}
						<div
							className="h-10 flex items-center justify-between bg-primary hover:bg-blue-800 text-white p-3 px-8 cursor-pointer"
							onClick={() =>
								setOpenIndex(openIndex === index ? null : index)
							}
						>
							<Link
								href={item.href}
								className="font-medium text-sm w-full"
							>
								{item.label}
							</Link>
						</div>

						{/* Submenu items - show when parent is open */}
						{item.items && openIndex === index && (
							<div className=" py-2 translate-x-8">
								<div className="bg-gray-100 flex gap-2 flex-col">
									{item.items.map((subItem, subIndex) => (
										<Link
											key={subIndex}
											href={subItem.href}
											className="h-10 flex items-center justify-between bg-primary hover:bg-blue-800 text-white p-3 px-8 cursor-pointer"
										>
											{subItem.label}
										</Link>
									))}
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</nav>
	)
}

export default NavigationMenu
