import fetchHierarchy from "@/lib/db/fetchHierarchy"

export default async function HierarchyPage() {
	const data = await fetchHierarchy()

	return (
		<div>
			<h1>Hierarchical Data</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
