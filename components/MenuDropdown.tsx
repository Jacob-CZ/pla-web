import React, { Children, ReactNode, useState } from "react"
import { ChevronDown } from "lucide-react"

interface DropdownMenuProps {
	children: ReactNode
}

function DropdownMenuHHH({ children }: DropdownMenuProps) {
	const [isOpen, setIsOpen] = useState(false)

	const menuItems = [
		"Informace o Povodí",
		"Profil",
		"Orgány",
		"Organizační struktura",
		"Výroční zprávy",
		"Publicita",
		"Adresy a kontakty, DS",
		"Tel. seznam",
	]

	return (
		<div className="relative inline-block">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center justify-between w-full px-4 py-3 gap-2"
			>
				{children}
				<ChevronDown
					className={`w-4 h-4 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute gap-1 grid top-full left-0 w-40 text-xs  overflow-hidden z-50 translate-y-5">
					{menuItems.map((item, index) => (
						<button
							key={index}
							className="w-full px-3 py-2 bg-primary text-white text-left hover:bg-blue-700 transition-colors   last:border-b-0 font-medium"
							onClick={() => {
								console.log(`Clicked: ${item}`)
								setIsOpen(false)
							}}
						>
							{item}
						</button>
					))}
				</div>
			)}

			{/* Overlay to close dropdown when clicking outside */}
			{isOpen && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => setIsOpen(false)}
				/>
			)}
		</div>
	)
}

export default DropdownMenuHHH
