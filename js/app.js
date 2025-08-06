document.addEventListener('DOMContentLoaded', init)
function init() {
	headerHeight()
	handleHomePage()
	handleProductModal()
	handleStoryLightGallery()
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

function handleButtonHover(){
	document.querySelectorAll('.primary-button').forEach(btn => {
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
			autoplay: {
				delay: 100000,
				disableOnInteraction: true,
			},
			keyboard: {
				enabled: true,
			},
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
