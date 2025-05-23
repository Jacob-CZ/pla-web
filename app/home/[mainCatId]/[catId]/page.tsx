import Markdown from "@/components/Markdown"
import { createClient } from "@/lib/supabase/server"

export default async function page({
	params,
}: {
	params: { mainCatId: string; catId: string }
}) {
	console.log("params", params)
	const supabase = createClient()

	// First get the category ID from the slug
	const { data: category, error: categoryError } = await supabase
		.from("categories")
		.select("id")
		.eq("slug", params.catId)
		.single()

	if (categoryError || !category) {
		console.error("Category not found:", categoryError)
		return <div>Category not found</div>
	}

	// Then get the CMS items with that category_id
	const { data: cmsItems, error: cmsError } = await supabase
		.from("cms_items")
		.select(
			`
			*,
			category:category_id(id, slug)
		`
		)
		.eq("category_id", category.id)
		.order("created_at", { ascending: false })
	console.log("cmsItems", cmsItems)

	if (cmsError) {
		console.error("Error fetching content:", cmsError)
		return <div>Error loading content</div>
	}

	if (!cmsItems || cmsItems.length === 0) {
		return <div>No content available for this category</div>
	}

	// Use the first item or you could display a list of all items
	const mainContent = cmsItems[0]

	return (
		<div>
			<h1 className="w-full bg-primary text-2xl text-white px-10">
				{mainContent.title}
			</h1>
			<div className="bg-[#F1F2F9] px-10 py-4">
				<Markdown>{mainContent.content}</Markdown>
			</div>
			{/* If you want to show multiple items */}
			{cmsItems.length > 1 && (
				<div className="mt-8">
					<h2 className="text-xl font-semibold mb-4">
						More content in this category
					</h2>
					<div className="space-y-4">
						{cmsItems.slice(1).map((item) => (
							<div key={item.id} className="p-4 border rounded">
								<h3 className="font-medium">{item.title}</h3>
								<p className="text-sm text-gray-500">
									{new Date(
										item.created_at
									).toLocaleDateString()}
								</p>
								<Markdown>
									{item.content.substring(0, 150)}
								</Markdown>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
