"use client"
import { ForwardRefEditor } from "@/components/cms/editor/ForwardRefEditor"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Tables } from "@/lib/supabase/db.types"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { useEffect, useRef, useState } from "react"
import { v4 } from "uuid"

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

			// First get the category ID from the slug
			const { data: category, error: categoryError } = await supabase
				.from("categories")
				.select("id")
				.eq("slug", props.category_slug)
				.single()

			if (categoryError || !category) {
				console.error("Category not found:", categoryError)
				return <div>Category not found</div>
			}

			// Then get the CMS items with that category_id
			const { data: cms_data, error: cmsError } = await supabase
				.from("cms_items")
				.select(
					`
						*,
						category:category_id(id, slug)
					`
				)
				.eq("category_id", category.id)
				.order("created_at", { ascending: false })
			while (!editorRef.current) {
				await new Promise((resolve) => setTimeout(resolve, 100))
			}
			if (false) {
				const { data: cms_insert_data, error } = await supabase
					.from("cms_items")
					.insert({
						category_id: category!.id,
						content: "New doc",
						title: "New Item",
						is_html: false,
						slug: v4(),
					})
				console.log("error", error)
			}
			if (!cms_data) return
			setData(cms_data[0])
			editorRef.current?.setMarkdown(cms_data[0].content || "")
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
