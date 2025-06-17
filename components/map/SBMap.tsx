// components/MapComponent.tsx
"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { MapPoint, getMapPoints } from "@/lib/map"
import "leaflet/dist/leaflet.css"
import icon from "@/public/image.png"
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet"
import L from "leaflet"
interface MapComponentProps {
	height?: string
	center?: [number, number]
	zoom?: number
}

const LocationFinderDummy = () => {
	const map = useMapEvents({
		click(e) {
			console.log(e.latlng)
		},
	})
	return null
}

const MapComponent: React.FC<MapComponentProps> = ({
	height = "500px",
	center = [50.0343, 15.7814], // Pardubice coordinates
	zoom = 10,
}) => {
	const [points, setPoints] = useState<MapPoint[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Need to run this after component mount
		delete L.Icon.Default.prototype._getIconUrl

		// Use absolute URLs for the marker icons
		L.Icon.Default.mergeOptions({
			iconRetinaUrl:
				"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
			iconUrl:
				"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
			shadowUrl:
				"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
		})
	}, [])
	useEffect(() => {
		const fetchPoints = async () => {
			try {
				setLoading(true)
				const fetchedPoints = await getMapPoints()
				setPoints(fetchedPoints)
				setError(null)
			} catch (err) {
				setError("Failed to load map points")
				console.error("Error fetching points:", err)
			} finally {
				setLoading(false)
			}
		}

		fetchPoints()
	}, [])

	if (loading) {
		return (
			<div
				className="flex items-center justify-center"
				style={{ height }}
			>
				<div className="text-gray-600">Loading map...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div
				className="flex items-center justify-center"
				style={{ height }}
			>
				<div className="text-red-600">{error}</div>
			</div>
		)
	}

	return (
		<div style={{ height, width: "100%" }}>
			<MapContainer
				center={center}
				zoom={zoom}
				style={{ height: "100%", width: "100%" }}
				className="rounded-lg"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{points.map((point) => (
					<Marker
						key={point.id}
						position={[point.latitude, point.longitude]}
					>
						<Popup>
							<div className="p-2">
								<h3 className="font-semibold text-lg">
									{point.name}
								</h3>
								{point.description && (
									<p className="text-gray-600 mt-1">
										{point.description}
									</p>
								)}
								<p className="text-sm text-gray-500 mt-2">
									Added:{" "}
									{new Date(
										point.created_at
									).toLocaleDateString()}
								</p>
							</div>
						</Popup>
					</Marker>
				))}
				<LocationFinderDummy />
			</MapContainer>
		</div>
	)
}

export default MapComponent
