import Footer from "@/components/Footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { MobileTilesMenu } from "@/components/mobile-tiles-menu"
import { Navbar } from "@/components/navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto max-w-7xl">
			<Navbar />
			<HeroCarousel />
			<MobileTilesMenu />
			<div>{children}</div>
			<Footer />
		</div>
	)
}
