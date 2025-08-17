import marquee from 'https://cdn.jsdelivr.net/npm/vanilla-marquee/dist/vanilla-marquee.js';

document.addEventListener('DOMContentLoaded', () => {
	const el = document.querySelector('.partners-section .logos-wrapper');
	const instance = new marquee(el, {
		pauseOnHover: true,
		gap:80,
		speed: 50,
		duplicated: true,
		direction: 'ltr'
	});
});
