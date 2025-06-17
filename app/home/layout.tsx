import Footer from "@/components/Footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { MobileTilesMenu } from "@/components/mobile-tiles-menu"
import { Navbar } from "@/components/navbar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	const supabase = createClient()
	const { data: sliders } = await supabase.from("slider_images").select("*")
	return (
		<div className="mx-auto max-w-7xl">
			<Navbar />
			<HeroCarousel slides={sliders || []} />
			<MobileTilesMenu />
			<div>{children}</div>
			<Footer />
		</div>
	)
}
