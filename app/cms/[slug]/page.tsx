import Editor from "@/components/cms/editor/Editor"
import VerticalMenu from "@/components/cms/MulitilevelMenu"
import fetchHierarchy from "@/lib/db/fetchHierarchy"

export default async function page({ params }: { params: { slug: string } }) {
	const data = await fetchHierarchy({ category_slug: params.slug })
	return
}
