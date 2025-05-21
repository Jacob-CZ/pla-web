import VerticalMenu from "@/components/cms/MulitilevelMenu"
import fetchHierarchy from "@/lib/db/fetchHierarchy"

export default async function page({
	params,
	children,
}: {
	params: { slug: string }
	children: React.ReactNode
}) {
	const data = await fetchHierarchy({ category_slug: params.slug })
	return (
		<div className="grid grid-cols-4 p-4 gap-4">
			<div className="col-span-1">
				<VerticalMenu items={data} category_slug={params.slug} />
			</div>
			<main className="col-span-3">{children}</main>
		</div>
	)
}
