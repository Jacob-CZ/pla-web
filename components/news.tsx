// components/Aktuality.tsx
import Image from "next/image"

const newsItems = [
	{
		id: 1,
		image: "/dam.png",
		title: "„At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id",
		isBold: true,
	},
	{
		id: 2,
		image: "/dam.png",
		title: "„At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et",
		isBold: false,
	},
	{
		id: 3,
		image: "/dam.png",
		title: "„At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et",
		isBold: false,
	},
	{
		id: 4,
		image: "/dam.png",
		title: "„At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et",
		isBold: false,
	},
	{
		id: 5,
		image: "/dam.png",
		title: "„At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et",
		isBold: false,
	},
]

export default function Aktuality() {
	return (
		<div className=" mx-auto">
			<div className="space-y-4">
				{newsItems.map(({ id, image, title, isBold }) => (
					<div key={id} className={`flex gap-4 bg-[#e7e9f5] `}>
						<div className="relative h-20 w-fit flex-shrink-0">
							<Image
								src={image}
								alt="News image"
								width={80}
								height={80}
								style={{
									objectFit: "contain",
									width: "auto",
									height: "100%",
								}}
							/>
						</div>
						<p
							className={`text-xs ${
								isBold
									? "font-bold text-gray-800"
									: "text-gray-700"
							}`}
						>
							{title}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}
