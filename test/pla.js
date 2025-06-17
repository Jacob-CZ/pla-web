// nativni Vanilla JavaScript
document.addEventListener("DOMContentLoaded", function () {
	/* CAROUSEL */
	const slideTime = 4000
	const slide = document.getElementById("carouselSlide")
	const dotsContainer = document.getElementById("carouselDots")
	const title = document.getElementById("carouselTitle")

	const slides = [
		{ image: "./bg-1.jpg", title: "SEČSKÁ PŘEHRADA" },
		{ image: "./slider/bg-2.jpg", title: "LES KRÁLOVSTVÍ" },
		{ image: "./slider/bg-3.jpg", title: "PŘEHRADA PAŘÍŽOV" },
	]

	let currentIndex = 0
	let intervalId = null
	let isPaused = false

	// 1. Vygeneruj puntíky
	slides.forEach((_, i) => {
		const dot = document.createElement("span")
		dot.classList.add("dot")
		dot.dataset.index = i
		if (i === 0) dot.classList.add("active")
		dotsContainer.appendChild(dot)
	})

	// 2. Vyber vygenerované puntíky
	let dots = dotsContainer.querySelectorAll(".dot")

	// 3. Zobraz snímek
	function showSlide(index) {
		const { image, title: slideTitle } = slides[index]
		slide.style.backgroundImage = `url('${image}')`
		title.textContent = slideTitle

		dots.forEach((dot) => dot.classList.remove("active"))
		if (dots[index]) dots[index].classList.add("active")

		currentIndex = index
	}

	function nextSlide() {
		let nextIndex = (currentIndex + 1) % slides.length
		showSlide(nextIndex)
	}

	function startCarousel() {
		intervalId = setInterval(() => {
			if (!isPaused) nextSlide()
		}, slideTime)
	}

	function resetCarouselTimer() {
		clearInterval(intervalId)
		intervalId = setInterval(() => {
			if (!isPaused) nextSlide()
		}, slideTime)
	}

	// 4. Kliknutí na puntík
	dots.forEach((dot) => {
		dot.addEventListener("click", () => {
			const index = parseInt(dot.getAttribute("data-index"))
			showSlide(index)
			resetCarouselTimer() // reset casovace po kliknuti na puntik
		})
	})

	// 5. Hover na pozadí (pauza)
	slide.addEventListener("mouseenter", () => {
		isPaused = true
	})
	slide.addEventListener("mouseleave", () => {
		isPaused = false
	})

	// Init
	showSlide(0)
	startCarousel()

	function updateCarouselHeight() {
		const wrapper = document.querySelector(".page-wrapper")
		const navbar = document.querySelector(".navbar")
		const carousel = document.querySelector(".hero-carousel")
		const captionBox = document.querySelector(".hero-caption-box") // nadpis
		const tilesMenu = document.querySelector(".tiles-menu") // dlaždice

		if (!wrapper || !navbar || !carousel) return

		const maxWidth = Math.min(wrapper.offsetWidth, 1400)
		const goldenRatioHeight = maxWidth * 0.618

		const navbarHeight = navbar.offsetHeight || 0
		const captionHeight = captionBox?.offsetHeight || 0
		const tilesHeight = tilesMenu?.offsetHeight || 0

		const staticBottomPart = Math.max(captionHeight, tilesHeight) // obvykle se překrývají
		const desiredCarouselHeight =
			goldenRatioHeight - navbarHeight - staticBottomPart
		const finalHeight = Math.max(desiredCarouselHeight, 250) // pojistka

		carousel.style.setProperty("--carousel-height", `${finalHeight}px`)

		console.log("🧮 Výpočet:")
		console.log("Šířka:", maxWidth)
		console.log("Cíl (golden ratio):", goldenRatioHeight)
		console.log("navbar:", navbarHeight)
		console.log("spodní část (dlaždice/nadpis):", staticBottomPart)
		console.log("Výška carouselu:", finalHeight)
	}

	updateCarouselHeight()
	window.addEventListener("resize", updateCarouselHeight)
})

// jQuery
$(function () {
	/* DROPDOWN MENU */
	const dropdowns = $(".navbar .dropdown")
	let clickLocked = false

	function enableHover() {
		dropdowns.off("mouseenter mouseleave")

		dropdowns.on("mouseenter", function () {
			if (clickLocked || window.innerWidth < 992) return

			const $dropdown = $(this)
			const $menu = $dropdown.find(".dropdown-menu")
			const $link = $dropdown.children(".nav-link")

			$dropdown.addClass("show")
			$menu.addClass("show")
			$link.addClass("hover-highlight")

			// Registrace mouseleave, ale jen na desktopu
			$dropdown.off("mouseleave").on("mouseleave", function () {
				if (clickLocked || window.innerWidth < 992) return

				$dropdown.removeClass("show")
				$menu.removeClass("show")
				$link.removeClass("hover-highlight")
			})
		})

		dropdowns.on("mouseleave", function () {
			if (clickLocked) return

			$(this).removeClass("show")
			$(this).find(".dropdown-menu").removeClass("show")
			$(this).children(".nav-link").removeClass("hover-highlight")
		})
	}

	function disableHover() {
		dropdowns.off("mouseenter mouseleave")
		dropdowns.removeClass("show").find(".dropdown-menu").removeClass("show")
		dropdowns.find(".nav-link").removeClass("hover-highlight")
	}

	function handleResize() {
		if (window.innerWidth >= 992) {
			enableHover()
		} else {
			disableHover()
		}
	}

	// Klikání na rodičovský prvek – funguje na desktopu i mobilu
	$(".navbar .dropdown > .nav-link").on("click", function (e) {
		const $dropdown = $(this).closest(".dropdown")
		const $menu = $dropdown.find(".dropdown-menu")
		const $link = $dropdown.children(".nav-link")

		const isOpen = $dropdown.hasClass("show")

		// Zavřít vše
		dropdowns.removeClass("show")
		dropdowns.find(".dropdown-menu").removeClass("show")
		dropdowns.find(".nav-link").removeClass("hover-highlight")

		if (!isOpen) {
			// Otevřít právě kliknutý
			$dropdown.addClass("show")
			$menu.addClass("show")
			$link.addClass("hover-highlight")

			clickLocked = true
		} else {
			clickLocked = false
		}

		// Odstranění focusu, jinak zůstává barva
		$link.trigger("blur")

		// Odblokování hoveru při opuštění oblasti
		if (window.innerWidth >= 992) {
			$dropdown.off("mouseleave").on("mouseleave", function (e) {
				setTimeout(() => {
					const isStillHovered = $dropdown.is(":hover")
					if (!isStillHovered && clickLocked) {
						clickLocked = false
						$dropdown.removeClass("show")
						$menu.removeClass("show")
						$link.removeClass("hover-highlight")
					}
				}, 200)
			})
		}

		e.preventDefault()
		e.stopImmediatePropagation()
	})

	// Inicializace
	handleResize()
	$(window).on("resize", handleResize)
})
