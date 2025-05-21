import VerticalMenu from "@/components/cms/MulitilevelMenu"
import TopNavBar, { TopNavBarExample } from "@/components/cms/NavBar"
import { menuItems } from "@/lib/data/cms/mock"
import fetchHierarchy from "@/lib/db/fetchHierarchy"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
export default async function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	const { data: profile } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user?.id || "")
		.single()
	if (!profile) {
		return redirect("/login")
	}
	if (!profile.is_admin) {
		return <div>Access Denied</div>
	}
	const { data: main_cat_data, error } = await supabase
		.from("main_categories")
		.select("*")

	return (
		<>
			<TopNavBar
				navItems={main_cat_data || undefined}
				userAvatar={{
					fallback: "JD",
				}}
			/>
			{children}
		</>
	)
}
