import Aktuality from "@/components/news"
import VHDInfo from "@/components/VHDInfo"
import MapWrapper from "@/components/map/MapWrapper"

export default function HomePage() {
	return (
		<div className="grid md:grid-cols-2 pt-2 px-16 gap-20 grid-cols-1">
			<Aktuality />
			<VHDInfo />
			<div className="col-span-2 min-h-screen min-w-96">
				<MapWrapper />
			</div>
			{/* <NavigationMenu /> */}
		</div>
	)
}
