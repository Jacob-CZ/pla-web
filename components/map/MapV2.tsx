"use client"
import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

const DATA_URL =
	"https://services1.arcgis.com/ZszVN9lBVA5x4VmX/arcgis/rest/services/vodomerne_stanice/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"

export default function MapComponent() {
	const [geoData, setGeoData] = useState(null)

	useEffect(() => {
		fetch(DATA_URL)
			.then((res) => res.json())
			.then((data) => setGeoData(data))
			.catch((err) => console.error("Failed to load GeoJSON:", err))
	}, [])

	const onEachFeature = (feature, layer) => {
		const props = feature.properties
		const popupContent = `
      <strong>${props.nm || "Bez názvu"}</strong><br/>
      ID: ${props.id}<br/>
      Tok: ${props.tok_nm}<br/>
      Plocha stan.: ${props.plo_sta ?? "—"} km²<br/>
      QD: ${props.qd} | TD: ${props.td} | PD: ${props.pd}
    `
		layer.bindPopup(popupContent)
	}

	const center = [50.75, 15.5] // fallback center

	return (
		<MapContainer
			center={center}
			zoom={10}
			style={{ height: "100vh", width: "100%" }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; OpenStreetMap contributors"
			/>
			{geoData && (
				<GeoJSON data={geoData} onEachFeature={onEachFeature} />
			)}
		</MapContainer>
	)
}
