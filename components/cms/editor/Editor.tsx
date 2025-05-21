"use client"
import { ForwardRefEditor } from "@/components/cms/editor/ForwardRefEditor"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Tables } from "@/lib/supabase/db.types"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { useEffect, useRef, useState } from "react"

interface EditorProps {
	prose: "lg" | "base" | "sm"
	category_slug: string
}
export default function Editor(props: EditorProps) {
	const editorRef = useRef<MDXEditorMethods>(null)
	const [data, setData] = useState<Tables<"cms_items"> | null>(null)
	useEffect(() => {
		async function fetchData() {
			const supabase = createClient()
			const { data, error } = await supabase
				.from("cms_items")
				.select(
					`
				*,
				categories:category_id (
					id,
					name,
					slug
				)
			`
				)
				.eq("categories.slug", props.category_slug)
				.single()
			while (!editorRef.current) {
				await new Promise((resolve) => setTimeout(resolve, 100))
			}
			if (!data) return
			setData(data)
			editorRef.current?.setMarkdown(data?.content || "")
		}
		fetchData()
	}, [])
	async function saveData() {
		if (!editorRef.current) return
		const markdown = editorRef.current.getMarkdown()
		const supabase = createClient()
		const { error } = await supabase
			.from("cms_items")
			.update({
				content: markdown,
			})
			.eq("id", data?.id || "")
	}
	return (
		<div className="relative">
			<ForwardRefEditor
				ref={editorRef}
				className={
					" outline-none  max-w-none bg-white editor prose prose-" +
					props.prose
				}
				markdown={"Loading..."}
			/>
			<Button onClick={() => saveData()}>save</Button>
		</div>
	)
}
