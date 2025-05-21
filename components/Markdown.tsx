import { cn } from "@/lib/utils"
import MarkdownComponent, { Options } from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
export default function Markdown(
	props: Readonly<Options> & { className?: string }
) {
	const { className, ..._props } = props
	return (
		<div className={cn(className, " prose-sm md:prose-base editor prose")}>
			<MarkdownComponent
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				{..._props}
			></MarkdownComponent>
		</div>
	)
}
