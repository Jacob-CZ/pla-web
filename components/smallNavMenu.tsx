"use client"
import React, { useState } from "react"
import Link from "next/link"

export interface NavigationItem {
	label?: string
	name?: string
	slug: string
	id?: string | number
	children?: NavigationItem[]
}

interface NavigationMenuProps {
	items: NavigationItem[]
	className?: string
	labelField?: keyof NavigationItem
	hrefField?: keyof NavigationItem
	childrenField?: string
	slug: string
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
	items = [],
	className = "w-64",
	labelField = "label",
	slug,
}) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	// Helper function to get the label from an item
	const getItemLabel = (item: NavigationItem): string => {
		return (
			(item[labelField] as string) ||
			(item.name as string) ||
			(item.label as string) ||
			"Unnamed"
		)
	}

	// Helper function to get the href from an item
	const getItemHref = (
		item: NavigationItem,
		parent?: NavigationItem
	): string => {
		return (
			"/home/" +
			slug +
			"/" +
			(parent && parent?.slug ? parent?.slug + "/" : "") +
			item.slug
		)
	}

	// Helper function to get children items
	const getChildren = (item: NavigationItem): NavigationItem[] => {
		return item["children"] as NavigationItem[]
	}

	return (
		<nav className={className}>
			<div className="flex flex-col gap-2">
				{items.map((item, index) => {
					const children = getChildren(item)
					const hasChildren = children && children.length > 0

					return (
						<div key={item.id || index} className="">
							<div
								className="min-h-10 flex items-center justify-between bg-primary hover:bg-blue-800 text-white p-3 px-8"
								onClick={() =>
									setOpenIndex(
										openIndex === index ? null : index
									)
								}
							>
								{!hasChildren ? (
									<Link
										href={getItemHref(item)}
										className="font-medium text-sm w-full"
									>
										{getItemLabel(item)}
									</Link>
								) : (
									<p className="font-medium text-sm w-full cursor-pointer">
										{getItemLabel(item)}
									</p>
								)}
							</div>

							{hasChildren && openIndex === index && (
								<div className="py-2 translate-x-8">
									<div className="bg-gray-100 flex gap-2 flex-col">
										{children.map((subItem, subIndex) => (
											<Link
												key={subItem.id || subIndex}
												href={getItemHref(subItem)}
												className="font-medium text-sm w-full min-h-10 flex items-center justify-between bg-primary hover:bg-blue-800 text-white p-2 px-8"
											>
												{getItemLabel(subItem)}
											</Link>
										))}
									</div>
								</div>
							)}
						</div>
					)
				})}
			</div>
		</nav>
	)
}

export default NavigationMenu
