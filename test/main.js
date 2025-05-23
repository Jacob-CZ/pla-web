// Simple script to handle basic interactivity

document.addEventListener("DOMContentLoaded", function () {
	console.log("Page loaded successfully!")

	// Responsive handling for images
	function updateImageContainers() {
		const containers = document.querySelectorAll(".news-image-container")
		containers.forEach((container) => {
			const img = container.querySelector("img")
			if (img) {
				img.style.maxWidth = "100%"
			}
		})
	}

	// Initialize
	updateImageContainers()

	// Update on window resize
	window.addEventListener("resize", updateImageContainers)
})
