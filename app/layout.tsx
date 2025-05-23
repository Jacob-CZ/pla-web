import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Footer from "@/components/Footer"

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
})
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
})

export const metadata: Metadata = {
	title: "Povodí Labe, státní podnik",
	description: "Oficiální webové stránky Povodí Labe, státní podnik",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen min-w-full bg-[#F5F5F5]`}
			>
				{children}
			</body>
		</html>
	)
}
