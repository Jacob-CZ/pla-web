import MapComponent from "@/components/map/SBMap"
import MapWrapper from "@/components/map/MapWrapper"
import Aktuality from "@/components/news"
import VHDInfo from "@/components/VHDInfo"
import Link from "next/link"

export default function HomePage() {
	return (
		<>
			<h2 className="text-5xl font-bold tracking-[0.2em] mb-6 px-16">
				AKTUALITY
			</h2>
			<div className="grid md:grid-cols-2 pt-2 px-16 gap-20 grid-cols-1">
				<Aktuality />
				<VHDInfo />
				<div className="container mx-auto px-4 py-8">
					<div className="mb-6">
						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							Map Points
						</h1>
						<div className="flex gap-4">
							<Link
								href="/home/add-point"
								className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
							>
								Add New Point
							</Link>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<MapComponent height="600px" />
					</div>
				</div>
				{/* <NavigationMenu /> */}
			</div>
		</>
	)
}
