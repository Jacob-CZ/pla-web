import NavigationMenu, { NavigationItem } from "@/components/smallNavMenu"
import fetchHierarchy from "@/lib/db/fetchHierarchy"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function Layout({
	params,
	children,
}: {
	children: React.ReactNode
	params: { mainCatId: string }
}) {
	const hierearchy = await fetchHierarchy({ category_slug: params.mainCatId })
	const supabase = createClient()
	const { data, error } = await supabase
		.from("main_categories")
		.select("*")
		.eq("slug", params.mainCatId)
		.single()
	if (!data) redirect("/home")
	return (
		<main className="px-10 mt-4">
			<h1 className="text-3xl font-bold tracking-[0.2em] mb-6">
				{data.name.toUpperCase()}
			</h1>
			<div className="grid md:grid-cols-4 grid-cols-1 ">
				<div className="col-span-1">
					<NavigationMenu
						items={hierearchy}
						slug={params.mainCatId}
					/>
				</div>
				<div className="md:col-span-3 col-span-1">{children}</div>
			</div>
		</main>
	)
}
