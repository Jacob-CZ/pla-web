import { Navbar } from "@/components/navbar"
import { HeroCarousel } from "@/components/hero-carousel"
import { MobileTilesMenu } from "@/components/mobile-tiles-menu"
import Image from "next/image"
import Aktuality from "@/components/news"
import VHDInfo from "@/components/VHDInfo"
import NavigationMenu from "@/components/smallNavMenu"

export default function HomePage() {
	return (
		<div className="mx-auto max-w-7xl">
			<Navbar />
			<HeroCarousel />
			<MobileTilesMenu />
			<div></div>
			{/* <Image
				className="w-full h-fit absolute"
				src={"/images/bg.png"}
				width={1000}
				height={200}
			/> */}
			<div className="grid grid-cols-2 pt-2 px-16 gap-20">
				<Aktuality />
				<VHDInfo />
				<NavigationMenu />
			</div>
		</div>
	)
}
