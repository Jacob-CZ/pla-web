"use client"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { CSSProperties } from "react"

// Define the styles to constrain the map
const mapContainerStyle: CSSProperties = {
	height: "500px", // Set a fixed height
	width: "100%", // Use full width of parent
	maxWidth: "100%", // Prevent horizontal overflow
	position: "relative",
}

export default function MapReact() {
	return (
		<div style={{ width: "100%", overflow: "hidden" }}>
			<MapContainer
				center={[51.505, -0.09]}
				zoom={13}
				scrollWheelZoom={false}
				style={mapContainerStyle}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
}
