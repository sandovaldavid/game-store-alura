document.addEventListener('DOMContentLoaded', function () {
	const menuLinks = document.querySelectorAll('.menu__link');
	const sections = document.querySelectorAll('section, #home');

	function checkActiveSection() {
		let current = '';

		sections.forEach((section) => {
			const sectionTop = section.offsetTop - 100;
			const sectionHeight = section.offsetHeight;
			const sectionId = section.getAttribute('id');

			if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
				current = sectionId;
			}
		});

		menuLinks.forEach((link) => {
			link.classList.remove('activo');
			const href = link.getAttribute('href').substring(1);
			if (href === current) {
				link.classList.add('activo');
			}
		});
	}

	checkActiveSection();

	window.addEventListener('scroll', checkActiveSection);

	menuLinks.forEach((link) => {
		link.addEventListener('click', function () {
			menuLinks.forEach((item) => item.classList.remove('activo'));
			this.classList.add('activo');
		});
	});
});
