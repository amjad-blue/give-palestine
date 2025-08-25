document.addEventListener('DOMContentLoaded', init)
function init() {
	headerHeight()
	handleHomePage()
	handleAboutPageStepper()
	handleProductModal()
	handleStoryLightGallery()
	handleVideosLightGallery()
	handleNewsLightGallery()
	handleFaqPage()
	handleRegionsPage()
}

function handleRegionsPage() {
	if (document.querySelector(".regions-page")){
		gsap.timeline()
			.to(".map-image", {
				opacity: 1,
				delay: 0.3,
				ease: "power2.out"
			})
			.to(".regions-page .regions-section .map-item", {
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.4,
				ease: "power2.out"
			});
	}
}

function handleFaqPage() {
	if (document.querySelector(".faq-page")) {
		document.querySelectorAll('.faq-header')?.forEach(header => {
			header.addEventListener('click', () => {
				const item = header.closest('.faq-item');
				const allItems = document.querySelectorAll('.faq-item');
				allItems.forEach(i => {
					if (i !== item) i.classList.remove('is-open');
				});
				item.classList.toggle('is-open');
			});
		});
	}
}

function handleAboutPageStepper(){
	if (document.querySelector('.about-page')){
		document.querySelectorAll(".about-page .story-section .step-item").forEach(item => {
			item.addEventListener("mouseenter", () => {
				document.querySelector(".about-page .story-section .step-item.active")?.classList.remove('active');
				item.classList.add('active');
			})

			item.addEventListener("mouseleave", () => {
				setTimeout(() => {

					item.classList.remove('active');
				}, 250)
			})

		})
	}
}

function addLightGalleryForMediaCards() {
	const cards = document.querySelectorAll(".media-cards .card");

	if (cards.length >= 2) {
		cards[1].classList.add("featured-tall"); // 2nd card
	}

	if (cards.length >= 3) {
		cards[2].classList.add("featured-wide"); // 3rd card
	}

	lightGallery(document.querySelector('.media-cards'), {
		selector: 'a',
		animateThumb: true,
		zoomFromOrigin: false,
		allowMediaOverlap: true,
		toggleThumb: true,
	});
}

function handleCounterUpNumbers() {
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const el = entry.target;
				const target = parseInt(el.dataset.target, 10);
				if (isNaN(target)) return;

				const hasPercentage = el.classList.contains('percentage'); // optional condition
				let start = 0;
				const duration = 2000;
				const startTime = performance.now();

				function updateCounter(currentTime) {
					const elapsed = currentTime - startTime;
					const progress = Math.min(elapsed / duration, 1);
					const currentVal = Math.floor(progress * target);

					el.textContent = `${currentVal.toLocaleString()}${hasPercentage ? "%" : ""}`;

					if (progress < 1) {
						requestAnimationFrame(updateCounter);
					}
				}

				requestAnimationFrame(updateCounter);
				observer.unobserve(el);
			}
		});
	}, {
		threshold: 0.6
	});

	document.querySelectorAll(".section-stats .card .card-number").forEach(el => {
		observer.observe(el);
	});
}

function handleStoryLightGallery() {
	if (document.querySelector(".story-inner-page .cards-wrapper")) {
		lightGallery(document.querySelector('.story-inner-page .cards-wrapper'), {
			selector: 'a',
			animateThumb: true,
			zoomFromOrigin: false,
			allowMediaOverlap: true,
			toggleThumb: true,
		});
	}
}

function handleNewsLightGallery() {
	if (document.querySelector(".content-inner-page .cards-wrapper")) {
		lightGallery(document.querySelector('.content-inner-page .cards-wrapper'), {
			selector: 'a',
			animateThumb: true,
			zoomFromOrigin: false,
			allowMediaOverlap: true,
			toggleThumb: true,
		});

		lightGallery(document.querySelector('.content-inner-page .details-inner'), {
			selector: 'a',
			animateThumb: true,
			zoomFromOrigin: false,
			allowMediaOverlap: true,
			toggleThumb: true,
		});
	}
}

function handleVideosLightGallery() {
	if (document.querySelector(":is(.video-page, .gallery-page)")) {
		lightGallery(document.querySelector(':is(.video-page, .gallery-page) .cards-wrapper'), {
			selector: 'a',
			animateThumb: true,
			zoomFromOrigin: false,
			allowMediaOverlap: true,
			toggleThumb: true,
		});
	}
}

function handleButtonHover(){
	document.querySelectorAll('.button').forEach(btn => {
		const text = btn.textContent.trim();

		// Clear existing content
		btn.textContent = '';

		// Create wrapper span
		const wrapper = document.createElement('span');
		wrapper.className = 'button-text-wrapper';

		// Create two spans with same text
		const span1 = document.createElement('span');
		const span2 = document.createElement('span');

		span1.className = 'button-text original';
		span2.className = 'button-text clone';

		span1.textContent = text;
		span2.textContent = text;

		wrapper.appendChild(span1);
		wrapper.appendChild(span2);
		btn.appendChild(wrapper);
	});

}

function headerHeight() {
	document.documentElement.style.setProperty("--header-height", `${document.querySelector('.header').scrollHeight}px`)
}

function handleHomePage() {
	handleButtonHover()

	if (document.querySelector('.homepage'))  {
	 new Swiper(".hero-swiper", {
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '"></span>';
				},
			},
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: true,
			// },
			keyboard: {
				enabled: true,
			},
		});

		// partners-swiper
		new Swiper(".partners-swiper", {
			slidesPerView: "auto",
			spaceBetween: 20,
			loop: true,
			loopedSlides: 6,
			breakpoints: {
				640: { slidesPerView: 3 },
				1024: { slidesPerView: 5 },
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			keyboard: {
				enabled: true,
			},
		});



		const btn = document.querySelector(".button-play");
		const videoElement = document.querySelector('.swiper-slide .video');
		const muteBtn = document.querySelector(".mute-sound");

		function toggleVideo() {
			if (videoElement.paused) {
				videoElement.play();
				btn.classList.add("button-active");   // ensure active
			} else {
				videoElement.pause();
				btn.classList.remove("button-active"); // ensure inactive
			}
		}

// button click
		btn.addEventListener("click", toggleVideo);

// video click
		videoElement.addEventListener("click", toggleVideo);


		muteBtn.addEventListener("click", () => {
			videoElement.muted = !videoElement.muted;
			if (videoElement.muted) {
				muteBtn.classList.add("muted");
			} else {
				muteBtn.classList.remove("muted");
			}
		});

		addLightGalleryForMediaCards()
		handleCounterUpNumbers()

	}
	if (document.querySelector('.service-inner-page'))  {
		addLightGalleryForMediaCards()
	}

}

function handleProductModal() {
	const page = document.querySelector(':is(.service-inner-page, .products-page)');
	if (!page) return;

	const modal = document.querySelector('#custom_modal');
	const overlay = document.querySelector('#custom_overlay');
	const closeBtn = document.querySelector('.modal .close-btn');

	// Attach once to overlay
	overlay.addEventListener('click', closeModal);
	closeBtn.addEventListener('click', closeModal);

	// Add click events to all product cards
	const products = page.querySelectorAll('.section-products .card');
	products.forEach(product => {
		product.addEventListener('click', (e) => {
			e.preventDefault();
			modal.classList.toggle('active');
			overlay.classList.toggle('active');
		});
	});

	function closeModal() {
		modal.classList.remove('active');
		overlay.classList.remove('active');
	}
}


//.products-page .section-products .card
