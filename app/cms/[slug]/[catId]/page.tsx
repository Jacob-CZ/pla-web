import Editor from "@/components/cms/editor/Editor"

export default function page({
	params,
}: {
	params: { slug: string; catId: string }
}) {
	return <Editor prose="lg" category_slug={params.slug} />
}
