/* eslint-disable no-undef */
const input = document.querySelector('#nick');
const accents = document.querySelectorAll('.accent');
const playbtn = document.querySelector('#play');
const createbtn = document.querySelector('#create-new');

/* eslint-enable no-undef*/
console.log(accents);
input.focus();
const user = new User('', 'teal');
accents.forEach((accent) => {
	accent.addEventListener('click', () => {
		console.log(accent);
		user.accent = accent.style.backgroundColor;
		input.style.color = user.accent;
	});
});

playbtn.addEventListener('click', () => {
	user.name = input.value.trim();
	if (user.name) {
		console.log(user.name);
	}
});

createbtn.addEventListener('click', () => {
	user.name = input.value.trim();
	if (user.name) {
		console.log(user.name);
	}
});
