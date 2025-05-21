"use client"
import React, { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"

// Updated to match the provided data structure
export type MenuItem = {
	id: string
	name: string // Changed from label to name
	slug?: string // Added slug
	created_at?: string // Added created_at
	previous_category_id?: string | null // Added previous_category_id
	href?: string
	icon?: React.ReactNode
	children?: MenuItem[]
}

interface VerticalMenuProps {
	items: MenuItem[]
	className?: string
	labelField?: keyof MenuItem // Allow configuring which field to use as label
	category_slug: string // Added category_slug
}

interface MenuItemComponentProps {
	item: MenuItem
	level: number
	labelField: keyof MenuItem
	slug?: string
}

export function MenuItemComponent({
	item,
	level,
	labelField,
	slug,
}: MenuItemComponentProps) {
	const [isOpen, setIsOpen] = useState(false)
	const hasChildren = item.children && item.children.length > 0

	// Use the specified label field or fall back to name/label
	const displayLabel = (item[labelField] as string) || item.name || "Unnamed"

	const toggleSubmenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<li className="w-full">
			<div
				className={`flex items-center justify-between px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors ${
					level > 0 ? "pl-" + (level * 4 + 4) : "pl-4"
				}`}
				onClick={hasChildren ? toggleSubmenu : undefined}
			>
				<Link
					href={"/cms/" + slug + "/" + item.slug}
					className={`flex items-center flex-grow ${
						hasChildren ? "cursor-pointer" : ""
					}`}
					onClick={(e) => hasChildren && e.preventDefault()}
				>
					{item.icon && <span className="mr-2">{item.icon}</span>}
					<span>{displayLabel}</span>
				</Link>
				{hasChildren && (
					<span className="flex items-center text-gray-500">
						{isOpen ? (
							<ChevronDown size={16} />
						) : (
							<ChevronRight size={16} />
						)}
					</span>
				)}
			</div>

			{hasChildren && isOpen && item.children && (
				<ul className="mt-1 mb-2">
					{item.children.map((child) => (
						<MenuItemComponent
							key={child.id}
							item={child}
							level={level + 1}
							labelField={labelField}
						/>
					))}
				</ul>
			)}
		</li>
	)
}

export default function VerticalMenu({
	items,
	className = "",
	labelField = "name", // Default to using "name" field as label
	category_slug,
}: VerticalMenuProps) {
	return (
		<nav
			className={`w-64 bg-white border rounded-lg shadow-sm ${className}`}
		>
			<ul className="py-2">
				{items.map((item) => (
					<MenuItemComponent
						slug={category_slug}
						key={item.id}
						item={item}
						level={0}
						labelField={labelField}
					/>
				))}
			</ul>
		</nav>
	)
}
