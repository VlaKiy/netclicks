
class DBService {
	getData = async (url) => {
		const res = await fetch(url);
		if(res.ok) {
			return res.json();
		} else {
			throw new Error(`Не удалось получить данные
				по адресу ${url}`)
		}
	}

	getTestData = async () => {
		return await this.getData('test.json')
	}
}

const renderCard = response => {
	console.log(response);
	response.results.forEach(item => {
		console.log(item);
	});
};

new DBService().getTestData().then(renderCard);

// меню

const leftMenu = document.querySelector('.left-menu'),
	hamburger = document.querySelector('.hamburger'),
	tvShowsList = document.querySelector('.tv-shows__list'),
	modal = document.querySelector('.modal');

// открытие/закрытие меню

hamburger.addEventListener('click', () => {
	leftMenu.classList.toggle('openMenu');
	hamburger.classList.toggle('open');
});

document.addEventListener('click', (event) => {
	if (!event.target.closest('.left-menu')) {
		leftMenu.classList.remove('openMenu');
		hamburger.classList.remove('open');
	}
});

leftMenu.addEventListener('click', event => {
	const target = event.target;
	const dropdown = target.closest('.dropdown');
	if (dropdown) {
		dropdown.classList.toggle('active');
		leftMenu.classList.add('openMenu');
		hamburger.classList.add('open');
	}
});

// Карточки

const img = document.querySelectorAll('img'); // берём все тэги img

img.forEach((item) => { // перебираем массив

	item.addEventListener('mouseover', event => { // добавляем событие наведения мышки
		const imgSrc = item.attributes['1'].value; // адрес картинки
		const imgBackdrop = item.attributes['2'].value; // back-drop картинки

		if(imgBackdrop) {
			item.setAttribute('src', imgBackdrop); // изменяем src на imgBackdrop
			item.setAttribute('data-backdrop', imgSrc); // изменяем imgBackdrop на src
		}
	});

	item.addEventListener('mouseout', event => { // добавляем событие наведения мышки
		const imgSrc = item.attributes['1'].value; // адрес картинки
		const imgBackdrop = item.attributes['2'].value; // back-drop картинки
		if(imgBackdrop) {
			item.setAttribute('data-backdrop', imgSrc); // изменяем imgBackdrop на src
			item.setAttribute('src', imgBackdrop); // изменяем src на imgBackdrop
		}
	});
});

// открытие модального окна

tvShowsList.addEventListener('click', event => {
	event.preventDefault();
	const target = event.target;
	const card = target.closest('.tv-card');

	if(card) {
		document.body.style.overflow = 'hidden';
		modal.classList.remove('hide');
	}
});

// закрытие

modal.addEventListener('click', () => {
	if(event.target.closest('.cross') ||
		event.target.classList.contains('modal')) {
		document.body.style.overflow = '';
		modal.classList.add('hide');
	}
});