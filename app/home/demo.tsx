const DemoPopup: React.FC<{
	title: string
	description: string
}> = ({ title = "test", description = "dagds" }) => (
	<div className="custom-popup">
		<h3 className="font-bold text-lg text-blue-600">{title}</h3>
		<p className="mt-2">{description}</p>
		<div className="mt-3 p-2 bg-gray-100 rounded">
			<p className="text-sm text-gray-700">
				This is a React component popup!
			</p>
		</div>
		<button
			className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
			onClick={() => alert("test")}
		>
			Learn More
		</button>
	</div>
)
export default DemoPopup
