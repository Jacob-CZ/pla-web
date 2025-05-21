// components/Footer.jsx
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
	return (
		<footer className="bg-[#6DAD4F] text-white p-4 mt-12 px-16">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
				{/* Logo and Company Info */}
				<div className="flex flex-col items-start mb-4 md:mb-0">
					<div className="flex items-center">
						<div className="mr-2">
							<Image
								src="/pla.png"
								alt="Povodi Labe Logo"
								width={100}
								height={60}
								className=""
							/>
						</div>
						<div className="text-[0.60rem]">
							<p className="font-bold">
								Povodí Labe, státní podnik
							</p>
							<p>Víta Nejedlého 951/8, Slezské předměstí</p>
							<p>500 03 Hradec Králové</p>
						</div>
					</div>
				</div>

				{/* Company Details */}
				<div className="mb-4 md:mb-0 text-[0.60rem]">
					<p>IČO: 70890005</p>
					<p>DIČ: CZ70890005</p>
					<div className="mt-2">
						<p>Tel.: +420 495 088 111</p>
						<p>
							E-mail:{" "}
							<a
								href="mailto:podatelna@pla.cz"
								className="hover:underline"
							>
								podatelna@pla.cz
							</a>
						</p>
						<p>IDDS: DBYT8G2</p>
					</div>
				</div>

				{/* Office Hours and Services */}
				<div className="mb-4 md:mb-0 text-[0.60rem]">
					<p className="font-bold">
						Podatelna v sídle státního podniku - provozní doba 7:00
						- 15:00 hod, v pracovní dny.
					</p>

					<div className="mt-2">
						<p className="font-bold">Vodohospodářský dispečink</p>
						<p className="text-xs">
							(kontakt v době při hlášení havárií čistoty vody a
							informace o aktuální hydrologické situaci a vodních
							stavech)
						</p>
						<p>
							tel.: +420 495 088 720, 730, e-mail:{" "}
							<a
								href="mailto:vhd@pla.cz"
								className="hover:underline"
							>
								vhd@pla.cz
							</a>
						</p>
					</div>
				</div>

				{/* Navigation Links */}
				<div className="text-xs font-bold">
					<Link
						href="/kontakty"
						className="block hover:underline mb-1"
					>
						Kontakty
					</Link>
					<Link
						href="/mapa-stranek"
						className="block hover:underline mb-1"
					>
						Mapa stránek
					</Link>
					<Link
						href="/pouziti-cookies"
						className="block hover:underline"
					>
						Použití cookies
					</Link>
				</div>
			</div>
		</footer>
	)
}
