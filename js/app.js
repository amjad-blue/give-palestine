document.addEventListener('DOMContentLoaded', init)
function init() {
	headerHeight()
	handleHomePage()
}

function headerHeight() {
	document.documentElement.style.setProperty("--header-height", `${document.querySelector('.header').scrollHeight}px`)
}

function handleHomePage() {
if (document.querySelector('.homepage')) {
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
}
}
