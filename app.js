let btn = document.querySelector(".btn");
let list = document.querySelector(" header ul");
let byte = document.querySelector(".byte");

btn.addEventListener("click", (event) => {
	event.preventDefault();
	if (list.classList.contains("shown")) {
		btn.classList.remove("shown");
		btn.classList.add("unshown");
		byte.classList.remove("shown");
		byte.classList.add("unshown");
	} else {
		btn.classList.remove("unshown");
		btn.classList.add("shown");
		setTimeout(function () {
			byte.classList.add("shown");
			byte.classList.remove("unshown");
		}, 1000);
	}
	list.classList.toggle("shown");
});

// the timer section
let days = document.querySelector(".days_number");
let hours = document.querySelector(".hours_number");
let minutes = document.querySelector(".minutes_number");
let seconds = document.querySelector(".seconds_number");
let futurDate = new Date("19 fe 2023 6:27 pm");

let futurDateMillSeconds = futurDate.getTime();

class update {
	updateSeconds(seconds_number) {
		if (+seconds_number < 10) {
			seconds.innerText = `0${seconds_number} secs`;
		} else {
			seconds.innerText = `${seconds_number} secs`;
		}
	}
	updateminutes(minutes_number) {
		if (+minutes_number < 10) {
			minutes.innerText = `0${minutes_number} mins`;
		} else {
			minutes.innerText = `${minutes_number} mins`;
		}
	}

	updateHours(hours_number) {
		if (+hours_number < 10) {
			hours.innerText = `0${hours_number} hours`;
		} else {
			hours.innerText = `${hours_number} hours`;
		}
	}

	updateDays(days_number) {
		if (+days_number < 10) {
			days.innerText = `0${days_number} days`;
		} else {
			days.innerText = `${days_number} days`;
		}
	}
}
let timer = setInterval(function () {
	let currentDateMillSeconds = Date.now();
	let updateInstense = new update();
	let diffrence = futurDateMillSeconds - currentDateMillSeconds;
	let day = 1000 * 60 * 60 * 24;
	let hour = 1000 * 60 * 60;
	let minute = 1000 * 60;
	let daysNum = Math.floor(diffrence / day);
	let hoursNum = Math.floor((diffrence - daysNum * day) / hour);
	let minutesNum = Math.floor((diffrence - daysNum * day - hoursNum * hour) / minute);
	let secsNum = Math.floor((diffrence - daysNum * day - hoursNum * hour - minutesNum * minute) / 1000);
	if ((daysNum == "0" && hoursNum == "0" && minutesNum == "0" && secsNum == "0") || daysNum < 0) {
		updateInstense.updateDays(0);
		updateInstense.updateHours(0);
		updateInstense.updateminutes(0);
		updateInstense.updateSeconds(0);
		clearInterval(timer);
	} else {
		updateInstense.updateDays(daysNum);
		updateInstense.updateHours(hoursNum);
		updateInstense.updateminutes(minutesNum);
		updateInstense.updateSeconds(secsNum);
	}
}, 1000);

// the header on loaded
let main = document.querySelector("section.main");

window.addEventListener("load", function () {
	main.classList.add("loaded");
});

// nav bar section show and hide on scroll

let header = document.querySelector("header ");

document.onscroll = function () {
	const width = window.innerWidth;
	if (width > 768) {
		let newScroll = window.pageYOffset;
		let oldScroll = header.getAttribute("scroll");
		if (newScroll > oldScroll && newScroll > 150) {
			header.classList.add("opacity-0");
		} else {
			header.classList.remove("opacity-0");
		}
		header.setAttribute("scroll", newScroll);
	} else {
		header.classList.remove("opacity-0");
	}
};
// speakers section

// change the selected circle part

let right_flech = document.querySelectorAll(".right-flech");
let left_flech = document.querySelectorAll(".left-flech");

let fleches = [...Array.from(right_flech), ...Array.from(left_flech)];

fleches.forEach(function (ele) {
	let third_card = document.querySelector(".third_card");
	ele.addEventListener("click", (event) => {
		if (event.currentTarget.classList.contains("right-flech")) {
			third_card.classList.add("card_animated");
			setTimeout(() => {
				updateSpeaker("right");
			}, 1500);
			setTimeout(() => {
				third_card.classList.remove("card_animated");
			}, 1700);
		} else {
			third_card.classList.add("card_animated");
			setTimeout(() => {
				updateSpeaker("left");
			}, 1500);
			setTimeout(() => {
				third_card.classList.remove("card_animated");
			}, 1700);
		}
	});
});

function updateSpeaker(direction) {
	let circles = document.querySelectorAll(".filled");
	let current_circle = document.querySelector(".filled.sellected");
	let current_id = localStorage.getItem("current_id") || current_circle.getAttribute("id");

	if (direction == "right") {
		if (+current_id < 4) {
			current_id++;
			localStorage.setItem("current_id", current_id);
		} else {
			current_id = 1;
			localStorage.setItem("current_id", current_id);
		}
	} else if (direction === "left") {
		if (+current_id > 1) {
			current_id--;
			localStorage.setItem("current_id", current_id);
		} else {
			current_id = 4;
			localStorage.setItem("current_id", current_id);
		}
	}
	circles.forEach((ele) => {
		if (+ele.getAttribute("id") == current_id) {
			ele.classList.add("sellected");
			ele.setAttribute("fill", "#FFCF27");
		} else {
			ele.classList.remove("sellected");
			ele.setAttribute("fill", "transparent");
		}
	});
	returnSpeaker(current_id);
}

// get the current speaker after loading the page
updateSpeaker();

// speakers cards sectoin

let cards = document.querySelector(".cards");
const first_card = document.querySelector(".first_card");
const second_card = document.querySelector(".second_card");
const third_card = document.querySelector(".third_card");

// speakers cards part

let speakers_cards = document.querySelectorAll(".card");

function returnSpeaker(id) {
	let url = "./speakers.json";

	fetch(url)
		.then((resolved) => {
			return resolved.json();
		})
		.then(function (data) {
			const newSpeaker = findNewSpeaker(data, id);
			updateCardsContent(newSpeaker);
		});
}

function updateCardsContent(newSpeaker) {
	third_card.innerHTML = `<img src='${newSpeaker.img}' />`;
	second_card.innerHTML = `
			<div class="text w-full flex flex-col justify-start items-start">
								<h4 class="text-[#542E30] text-[26px] md:text-[18px] font-[600]">Name :</h4>
								<p class="name_content text-[#AB6468] text-[22px] md:text-[18px]">${newSpeaker.name}</p>
								<h4 class="text-[#542E30] text-[26px] md:text-[18px] font-[600]">Domain :</h4>
								<p class="name_content text-[#AB6468] text-[22px] md:text-[18px]">${newSpeaker.domain}</p>
							</div>`;
}

function findNewSpeaker(data, id) {
	return data.find((element) => {
		return element.id == id;
	});
}

// start agenda section

let days_number = document.querySelectorAll(".day_number span");
let agenda_timer = document.querySelectorAll(".agenda_timer");

Array.from(days_number).forEach((ele) => {
	ele.addEventListener("click", () => {
		Array.from(agenda_timer).forEach((element) => {
			element.classList.add("rotated");
		});
		setTimeout(() => {
			Array.from(agenda_timer).forEach((element) => {
				element.classList.remove("rotated");
			});
		}, 2000);
		days_number.forEach((day) => {
			if (day === ele) {
				day.classList.remove("unselected");
				day.classList.add("selected");
			} else {
				day.classList.add("unselected");
				day.classList.remove("selected");
			}
		});
	});
});

// footer date section
let year_span = document.querySelector(".year");

let year = new Date().getFullYear();
year_span.innerText = year;
