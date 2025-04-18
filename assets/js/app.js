document.addEventListener('DOMContentLoaded', async function () {
	let config;
	try {
		const response = await fetch('./assets/js/app-config.json');
		if (!response.ok) {
			throw new Error('No se pudo cargar el archivo de configuración');
		}
		config = await response.json();
	} catch (error) {
		console.error('Error al cargar la configuración:', error);
		config = {
			modal: {
				id: 'disclaimerModal',
				closeButtonId: 'closeModal',
				acceptButtonId: 'acceptModal',
				showOnLoad: true,
			},
			menu: {
				toggleId: 'menuToggle',
				menuListId: 'menuLista',
				mobileBreakpoint: 480,
				icons: {
					open: 'fa-bars',
					close: 'fa-times',
				},
			},
		};
	}

	initModal(config.modal);

	initMobileMenu(config.menu);
});

function initModal(modalConfig) {
	const modal = document.getElementById(modalConfig.id);
	if (!modal) return;

	const closeButton = document.getElementById(modalConfig.closeButtonId);
	const acceptButton = document.getElementById(modalConfig.acceptButtonId);

	if (modalConfig.showOnLoad) {
		const hasAcceptedDisclaimer = localStorage.getItem('disclaimerAccepted');
		if (!hasAcceptedDisclaimer) {
			modal.style.display = 'flex';
		}
	}

	function closeModal() {
		modal.style.display = 'none';
		localStorage.setItem('disclaimerAccepted', 'true');
	}

	if (closeButton) {
		closeButton.addEventListener('click', closeModal);
	}

	if (acceptButton) {
		acceptButton.addEventListener('click', closeModal);
	}

	window.addEventListener('click', function (event) {
		if (event.target === modal) {
			closeModal();
		}
	});
}

function initMobileMenu(menuConfig) {
	const menuToggle = document.getElementById(menuConfig.toggleId);
	const menuLista = document.getElementById(menuConfig.menuListId);

	if (!menuToggle || !menuLista) return;

	menuToggle.addEventListener('click', function () {
		menuLista.classList.toggle('show');

		const icon = menuToggle.querySelector('i');
		if (icon) {
			if (menuLista.classList.contains('show')) {
				icon.classList.remove('fas', menuConfig.icons.open);
				icon.classList.add('fas', menuConfig.icons.close);
			} else {
				icon.classList.remove('fas', menuConfig.icons.close);
				icon.classList.add('fas', menuConfig.icons.open);
			}
		}
	});

	const menuLinks = menuLista.querySelectorAll('.menu__link');
	menuLinks.forEach((link) => {
		link.addEventListener('click', function () {
			if (window.innerWidth <= menuConfig.mobileBreakpoint) {
				menuLista.classList.remove('show');

				const icon = menuToggle.querySelector('i');
				if (icon) {
					icon.classList.remove('fas', menuConfig.icons.close);
					icon.classList.add('fas', menuConfig.icons.open);
				}
			}
		});
	});

	const sections = document.querySelectorAll('section');
	const navLinks = document.querySelectorAll('.menu__link');

	window.addEventListener('scroll', function () {
		let current = '';

		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (pageYOffset >= sectionTop - sectionHeight / 3) {
				current = section.getAttribute('id');
			}
		});

		navLinks.forEach((link) => {
			link.classList.remove('activo');
			if (link.getAttribute('href').slice(1) === current) {
				link.classList.add('activo');
			}
		});
	});
}
