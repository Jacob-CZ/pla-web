// app/add-point/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { addMapPoint } from "@/lib/map"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"
import { useEffect } from "react"

// Component to handle map clicks and update coordinates
const LocationSelector = ({
	onLocationSelect,
}: {
	onLocationSelect: (lat: number, lng: number) => void
}) => {
	const map = useMapEvents({
		click(e) {
			const { lat, lng } = e.latlng
			onLocationSelect(lat, lng)
		},
	})
	return null
}

export default function AddPointPage() {
	const router = useRouter()
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		latitude: "",
		longitude: "",
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [selectedLocation, setSelectedLocation] = useState<
		[number, number] | null
	>(null)

	// Fix Leaflet icon issue
	useEffect(() => {
		delete (L.Icon.Default.prototype as any)._getIconUrl
		L.Icon.Default.mergeOptions({
			iconRetinaUrl:
				"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
			iconUrl:
				"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
			shadowUrl:
				"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
		})
	}, [])

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))

		// Update selected location when coordinates are manually entered
		if (name === "latitude" || name === "longitude") {
			const lat =
				name === "latitude"
					? parseFloat(value)
					: parseFloat(formData.latitude)
			const lng =
				name === "longitude"
					? parseFloat(value)
					: parseFloat(formData.longitude)

			if (!isNaN(lat) && !isNaN(lng)) {
				setSelectedLocation([lat, lng])
			} else {
				setSelectedLocation(null)
			}
		}
	}

	const handleLocationSelect = (lat: number, lng: number) => {
		setFormData((prev) => ({
			...prev,
			latitude: lat.toFixed(6),
			longitude: lng.toFixed(6),
		}))
		setSelectedLocation([lat, lng])
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		try {
			// Validate required fields
			if (
				!formData.name.trim() ||
				!formData.latitude ||
				!formData.longitude
			) {
				throw new Error("Name, latitude, and longitude are required")
			}

			// Validate coordinates
			const lat = parseFloat(formData.latitude)
			const lng = parseFloat(formData.longitude)

			if (isNaN(lat) || isNaN(lng)) {
				throw new Error("Latitude and longitude must be valid numbers")
			}

			if (lat < -90 || lat > 90) {
				throw new Error("Latitude must be between -90 and 90")
			}

			if (lng < -180 || lng > 180) {
				throw new Error("Longitude must be between -180 and 180")
			}

			const newPoint = {
				name: formData.name.trim(),
				description: formData.description.trim() || undefined,
				latitude: lat,
				longitude: lng,
			}

			const result = await addMapPoint(newPoint)

			if (result) {
				router.push("/")
			} else {
				throw new Error("Failed to add point")
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred")
		} finally {
			setLoading(false)
		}
	}

	const getCurrentLocation = () => {
		if (!navigator.geolocation) {
			setError("Geolocation is not supported by this browser")
			return
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude
				const lng = position.coords.longitude
				setFormData((prev) => ({
					...prev,
					latitude: lat.toString(),
					longitude: lng.toString(),
				}))
				setSelectedLocation([lat, lng])
			},
			(error) => {
				setError("Unable to retrieve your location")
			}
		)
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			<div className="mb-6">
				<Link
					href="/"
					className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
				>
					← Back to Map
				</Link>
				<h1 className="text-3xl font-bold text-gray-900">
					Add New Point
				</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Form Section */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-xl font-semibold mb-4">
						Point Details
					</h2>
					<form onSubmit={handleSubmit} className="space-y-6">
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
								{error}
							</div>
						)}

						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Point Name *
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Enter point name"
							/>
						</div>

						<div>
							<label
								htmlFor="description"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Description
							</label>
							<textarea
								id="description"
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								rows={3}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Enter description (optional)"
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="latitude"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Latitude *
								</label>
								<input
									type="number"
									step="any"
									id="latitude"
									name="latitude"
									value={formData.latitude}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="e.g., 37.7749"
								/>
							</div>

							<div>
								<label
									htmlFor="longitude"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Longitude *
								</label>
								<input
									type="number"
									step="any"
									id="longitude"
									name="longitude"
									value={formData.longitude}
									onChange={handleInputChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="e.g., -122.4194"
								/>
							</div>
						</div>

						<div className="flex gap-2">
							<button
								type="button"
								onClick={getCurrentLocation}
								className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
							>
								Use Current Location
							</button>
						</div>

						<div className="flex gap-4 pt-4">
							<button
								type="submit"
								disabled={loading}
								className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md transition-colors"
							>
								{loading ? "Adding..." : "Add Point"}
							</button>
							<Link
								href="/"
								className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md transition-colors"
							>
								Cancel
							</Link>
						</div>
					</form>
				</div>

				{/* Map Section */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-xl font-semibold mb-4">
						Select Location
					</h2>
					<p className="text-sm text-gray-600 mb-4">
						Click on the map to select the location for your new
						point
					</p>
					<div className="h-96 w-full rounded-lg overflow-hidden">
						<MapContainer
							center={selectedLocation || [50.0343, 15.7814]} // Default to Pardubice
							zoom={10}
							style={{ height: "100%", width: "100%" }}
							className="rounded-lg"
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							{selectedLocation && (
								<Marker position={selectedLocation}></Marker>
							)}
							<LocationSelector
								onLocationSelect={handleLocationSelect}
							/>
						</MapContainer>
					</div>
					{selectedLocation && (
						<div className="mt-4 p-3 bg-blue-50 rounded-md">
							<p className="text-sm text-blue-800">
								Selected coordinates:{" "}
								{selectedLocation[0].toFixed(6)},{" "}
								{selectedLocation[1].toFixed(6)}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
