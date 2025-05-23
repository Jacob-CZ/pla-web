"use client"
import dynamic from "next/dynamic"
import DemoPopup from "@/app/home/demo"

const Map = dynamic(() => import("@/components/map/Map"), {
	ssr: false,
})

const markers = [
	{ position: { lat: 50.0343, lng: 15.7814 }, popup: "Pardubice" },
	{
		position: { lat: 50.0461, lng: 15.8022 },
		popup: DemoPopup({ title: "test", description: "dagds" }),
		icon: {
			url: "/PLA.png",
			width: 50,
			height: 50,
		},
	},
]

const polylines = [
	{
		points: [
			{ lat: 50.0343, lng: 15.7814 }, // Pardubice
			{ lat: 50.0461, lng: 15.8022 }, // Airport
		],
		color: "blue",
		weight: 3,
	},
]

export default function MapWrapper() {
	return <Map markers={markers} polylines={polylines} />
}
