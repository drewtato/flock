let birb = document.createElement('img');
birb.src = 'img/float.png';
birb.classList.add(['birb']);

async function spawnBirb(top = Math.floor(Math.random() * 200 - 50)) {
	let flock = document.getElementById('flock');
	let b = birb.cloneNode(true);
	
	b.style.setProperty('--top', top + 'vh');
	b.style.setProperty('--left', -Math.floor(Math.random() * 100) + 'px');
	b.style.setProperty('--end', Math.floor(Math.random() * 800 - 600) + 'px');
	b.style.setProperty('--speed', Math.random() * 2 + 6 + 's');
	
	flock.append(b);
	
	let timeout = false;
	setTimeout(() => timeout = true, 4000);
	let flaps = [Math.random() * 100 + 150, 100];
	await sleep(Math.random() * flaps[0]);
	while (!timeout) {
		b.src = 'img/flap.png';
		await sleep(flaps[1]);
		b.src = 'img/float.png';
		await sleep(flaps[0]);
	}
	
	flock.removeChild(b);
}

function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	}).then(() => ms);
}

async function removeScroll() {
	window.removeEventListener('wheel', removeScroll);
	window.removeEventListener('touchmove', removeScroll);
	let scroll = document.getElementById('scroll');
	scroll.classList.add('fade');
	await sleep(1000);
	document.body.removeChild(scroll);
}

async function main() {
	window.addEventListener('wheel', () => spawnBirb());
	window.addEventListener('touchmove', () => spawnBirb());
	await sleep(1000);
	spawnBirb(Math.floor(Math.random() * 5 + 25));
	await sleep(50);
	spawnBirb(Math.floor(Math.random() * 5 + 30));
	await sleep(30);
	spawnBirb(Math.floor(Math.random() * 5 + 40));
	await sleep (2000);
	window.addEventListener('wheel', removeScroll);
	window.addEventListener('touchmove', removeScroll);
}

document.addEventListener('DOMContentLoaded', main);