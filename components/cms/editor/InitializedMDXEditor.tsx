"use client"
// InitializedMDXEditor.tsx
import React, { ForwardedRef } from "react"
import {
	AdmonitionDirectiveDescriptor,
	MDXEditor,
	UndoRedo,
	codeBlockPlugin,
	codeMirrorPlugin,
	diffSourcePlugin,
	directivesPlugin,
	frontmatterPlugin,
	headingsPlugin,
	imagePlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	markdownShortcutPlugin,
	quotePlugin,
	sandpackPlugin,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
	Separator,
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	CreateLink,
	DiffSourceToggleWrapper,
	InsertImage,
	ListsToggle,
	KitchenSinkToolbar,
	MDXEditorMethods,
	MDXEditorProps,
} from "@mdxeditor/editor"
import {
	YoutubeDirectiveDescriptor,
	virtuosoSampleSandpackConfig,
} from "./_boilerplate"
import "@mdxeditor/editor/style.css"
import { createClient } from "@/lib/supabase/client"
import { v4 } from "uuid"

// Only import this to the next file
export default function InitializedMDXEditor({
	editorRef,
	...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
	return (
		<MDXEditor
			plugins={[
				toolbarPlugin({
					toolbarContents: () => <KitchenSinkToolbar />,
				}),
				listsPlugin(),
				quotePlugin(),
				headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
				linkPlugin(),
				linkDialogPlugin(),
				imagePlugin({
					imageUploadHandler: async (file) => {
						const supabase = createClient()
						const { data, error } = await supabase.storage
							.from("image")
							.upload(`${v4() + file.name}`, file)
						if (error) {
						}
						if (data) {
							const { data: publicUrl } = supabase.storage
								.from("image")
								.getPublicUrl(data.path)
							return publicUrl.publicUrl
						}
						return ""
					},
				}),
				tablePlugin(),
				thematicBreakPlugin(),
				frontmatterPlugin(),
				codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
				sandpackPlugin({
					sandpackConfig: virtuosoSampleSandpackConfig,
				}),
				codeMirrorPlugin({
					codeBlockLanguages: {
						js: "JavaScript",
						css: "CSS",
						txt: "text",
						tsx: "TypeScript",
					},
				}),
				directivesPlugin({
					directiveDescriptors: [
						YoutubeDirectiveDescriptor,
						AdmonitionDirectiveDescriptor,
					],
				}),
				diffSourcePlugin({
					viewMode: "rich-text",
					diffMarkdown: "boo",
				}),
				markdownShortcutPlugin(),
			]}
			{...props}
			ref={editorRef}
		/>
	)
}
export const ConditionalToolbar = () => {
	const [outsideState, setOutsideState] = React.useState("foo")
	return (
		<>
			<button
				onClick={() => {
					setOutsideState("bar")
				}}
			>
				Toggle outside state
			</button>
			{outsideState}
			<MDXEditor
				markdown={"hello world"}
				plugins={[
					toolbarPlugin({
						toolbarContents: () => (
							<>
								<DiffSourceToggleWrapper>
									{outsideState}
									<UndoRedo />
									<BoldItalicUnderlineToggles />
									<ListsToggle />
									<Separator />
									<BlockTypeSelect />
									<CreateLink />
									<InsertImage />
									<Separator />
								</DiffSourceToggleWrapper>
							</>
						),
					}),
					listsPlugin(),
					quotePlugin(),
					headingsPlugin(),
					linkPlugin(),
					linkDialogPlugin(),
					imagePlugin(),
					tablePlugin(),
					thematicBreakPlugin(),
					frontmatterPlugin(),
					// codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
					// sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
					// codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text' } }),
					directivesPlugin({
						directiveDescriptors: [
							YoutubeDirectiveDescriptor,
							AdmonitionDirectiveDescriptor,
						],
					}),
					diffSourcePlugin({
						viewMode: "rich-text",
						diffMarkdown: "boo",
					}),
					markdownShortcutPlugin(),
				]}
			/>
		</>
	)
}

export const SimpleToolbar = () => {
	return (
		<MDXEditor
			markdown={"hello world"}
			plugins={[
				toolbarPlugin({
					toolbarContents: () => (
						<>
							<UndoRedo />
							<Separator />
						</>
					),
				}),
				listsPlugin(),
				quotePlugin(),
				headingsPlugin(),
				linkPlugin(),
				linkDialogPlugin(),
				imagePlugin(),
				tablePlugin(),
				thematicBreakPlugin(),
				frontmatterPlugin(),
				codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
				sandpackPlugin({
					sandpackConfig: virtuosoSampleSandpackConfig,
				}),
				codeMirrorPlugin({
					codeBlockLanguages: {
						js: "JavaScript",
						css: "CSS",
						txt: "text",
					},
				}),
				directivesPlugin({
					directiveDescriptors: [
						YoutubeDirectiveDescriptor,
						AdmonitionDirectiveDescriptor,
					],
				}),
				diffSourcePlugin({
					viewMode: "rich-text",
					diffMarkdown: "boo",
				}),
				markdownShortcutPlugin(),
			]}
		/>
	)
}
