import Aktuality from "@/components/news"
import VHDInfo from "@/components/VHDInfo"
import NavigationMenu from "@/components/smallNavMenu"

export default function HomePage() {
	return (
		<div className="grid md:grid-cols-2 pt-2 px-16 gap-20 grid-cols-1">
			<Aktuality />
			<VHDInfo />
			{/* <NavigationMenu /> */}
		</div>
	)
}
