document.addEventListener('DOMContentLoaded', function () {
	const menuLinks = document.querySelectorAll('.menu__link');
	const sections = document.querySelectorAll(
		'section, #home, #juegos, #aplicaciones, #about, #en_destaque, #novedades'
	);

	function checkActiveSection() {
		let current = '';
		const scrollPosition = window.scrollY + 100;

		if (window.scrollY < 150) {
			current = 'home';
		} else {
			sections.forEach((section) => {
				if (!section.getAttribute('id')) return;

				const sectionTop = section.offsetTop - 150;
				const sectionHeight = section.offsetHeight;
				const sectionId = section.getAttribute('id');

				if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
					current = sectionId;
				}
			});
		}

		menuLinks.forEach((link) => {
			link.classList.remove('activo');
			const href = link.getAttribute('href').substring(1);
			if (href === current) {
				link.classList.add('activo');
			}
		});
	}

	menuLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			const clickedSection = this.getAttribute('href').substring(1);

			menuLinks.forEach((link) => link.classList.remove('activo'));
			this.classList.add('activo');

			setTimeout(checkActiveSection, 500);
		});
	});

	console.log(
		'Sections found:',
		Array.from(sections).map((s) => s.getAttribute('id'))
	);

	checkActiveSection();

	let isScrolling;
	window.addEventListener('scroll', function () {
		window.clearTimeout(isScrolling);

		isScrolling = setTimeout(checkActiveSection, 50);
	});
});
