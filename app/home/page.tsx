import Aktuality from "@/components/news"
import VHDInfo from "@/components/VHDInfo"
import MapWrapper from "@/components/map/MapWrapper"

export default function HomePage() {
	return (
		<>
			<h2 className="text-5xl font-bold tracking-[0.2em] mb-6 px-16">
				AKTUALITY
			</h2>
			<div className="grid md:grid-cols-2 pt-2 px-16 gap-20 grid-cols-1">
				<Aktuality />
				<VHDInfo />
				{/* <div className="col-span-2 min-h-screen min-w-96">
				<MapWrapper />
			</div> */}
				{/* <NavigationMenu /> */}
			</div>
		</>
	)
}
