/* eslint-disable no-undef */
const input = document.querySelector('#nick');
const colors = document.querySelectorAll('.accent');
const playbtn = document.querySelector('#play');
const createbtn = document.querySelector('#create-new');

/* eslint-enable no-undef*/
console.log(colors);
input.focus();
const user = new User('', 'white');
colors.forEach((color) => {
	color.addEventListener('click', () => {
		console.log(color);
		user.color = color.style.backgroundColor;
		input.style.color = user.color;
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
