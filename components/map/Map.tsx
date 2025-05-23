"use client"

import React, { useRef, useEffect } from "react"
import "leaflet/dist/leaflet.css"

import L from "leaflet"

import styles from "./map.module.css"

import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk"
import { renderToString } from "react-dom/server"

// Demo React component for popup

interface MapProps {
	zoom?: number
	center?: { lat: number; lng: number }
	markers?: Array<{
		position: { lat: number; lng: number }
		popup?: string | React.ReactNode // Allow React component in popup
		icon?: {
			url: string
			width: number
			height: number
		}
	}>
	polylines?: Array<{
		points: Array<{ lat: number; lng: number }>
		color?: string
		weight?: number
	}>
}

const Map = ({
	zoom = 12,
	center = { lat: 50.0343, lng: 15.7814 }, // Pardubice coordinates
	markers = [
		{ position: { lat: 50.0343, lng: 15.7814 }, popup: "Pardubice" },
		{
			position: { lat: 50.0461, lng: 15.8022 },
			popup: "Pardubice Airport",
		},
	],
	polylines = [
		{
			points: [
				{ lat: 50.0343, lng: 15.7814 }, // Pardubice
				{ lat: 50.0461, lng: 15.8022 }, // Airport
			],
			color: "blue",
			weight: 3,
		},
	],
}: MapProps) => {
	useEffect(() => {
		// This is needed to fix Leaflet marker icons in Next.js

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: "/PLA.png",
			iconUrl: "/images/PLA.png",
			shadowUrl: "/images/PLA.png",
		})
	}, [])
	const mapContainer = useRef<HTMLDivElement>(null)
	const map = useRef<L.Map | null>(null)

	useEffect(() => {
		if (map.current) return // stops map from intializing more than once

		map.current = new L.Map(mapContainer.current || "", {
			center: L.latLng(center.lat, center.lng),
			zoom: zoom,
		})

		// Create a MapTiler Layer with custom style URL
		const mtLayer = new MaptilerLayer({
			apiKey: "CE5c5xQ7kvefWZgK0sbC",
			style: "https://api.maptiler.com/maps/0196f6bf-7e28-766e-822a-50bbc9ecc072/style.json", // Custom style URL
		}).addTo(map.current)

		// Add markers
		markers.forEach((marker) => {
			// Create custom icon if icon property is provided
			let markerObj

			if (marker.icon) {
				const customIcon = L.icon({
					iconUrl: marker.icon.url,
					iconSize: [marker.icon.width, marker.icon.height],
					iconAnchor: [marker.icon.width / 2, marker.icon.height / 2],
					popupAnchor: [0, -marker.icon.height / 2],
				})

				markerObj = L.marker(
					[marker.position.lat, marker.position.lng],
					{ icon: customIcon }
				).addTo(map.current!)
			} else {
				markerObj = L.marker([
					marker.position.lat,
					marker.position.lng,
				]).addTo(map.current!)
			}

			if (marker.popup) {
				// Handle both string and React component popups
				const popupContent =
					typeof marker.popup === "string"
						? marker.popup
						: renderToString(marker.popup as React.ReactElement)

				markerObj.bindPopup(popupContent)
			}
		})

		// Add polylines
		polylines.forEach((polyline) => {
			const latLngs = polyline.points.map((point) =>
				L.latLng(point.lat, point.lng)
			)

			L.polyline(latLngs, {
				color: polyline.color || "blue",
				weight: polyline.weight || 3,
			}).addTo(map.current!)
		})
	}, [center.lng, center.lat, zoom, markers, polylines])

	return (
		<div className={styles.mapWrap}>
			<div ref={mapContainer} className={styles.map} />
		</div>
	)
}

export default Map
