export default class Filter {
	constructor({ trigger, itemList, itemsContainer }) {
		this.triggerBtns = document.querySelectorAll(trigger);
		this.items = document.querySelectorAll(itemList);
		this.container = document.querySelector(itemsContainer);
		this.sortItems = this.sortItems.bind(this);
		this.sortByLikes = this.sortByLikes.bind(this);
		this.sortByCalories = this.sortByCalories.bind(this);
		this.sortByTime = this.sortByTime.bind(this);
	}

	init() {
		this.triggerBtns[0].addEventListener("click", e => {
			this.sortItems("likes");
			this.changeButtonStyles(e);
		});
		this.triggerBtns[1].addEventListener("click", e => {
			this.sortItems("calories");
			this.changeButtonStyles(e);
		});
		this.triggerBtns[2].addEventListener("click", e => {
			this.sortItems("time");
			this.changeButtonStyles(e);
		});
		this.triggerBtns[3].addEventListener("click", () => {
			this.fix();
		});
	}

	sortItems(sortBy) {
		const items = document.querySelectorAll(".page-main__catalog__content li"); // fix
		const itemsArr = Array.from(items);

		if (sortBy === "likes") {
			this.items.forEach(item => item.remove());
			const sorted = itemsArr.sort(this.sortByLikes);
			for (const element of sorted) {
				this.container.append(element);
			}
		} else if (sortBy === "calories") {
			this.items.forEach(item => item.remove());
			const sorted = itemsArr.sort(this.sortByCalories);
			for (const element of sorted) {
				this.container.append(element);
			}
		} else if (sortBy === "time") {
			this.items.forEach(item => item.remove());
			const sorted = itemsArr.sort(this.sortByTime);
			for (const element of sorted) {
				this.container.append(element);
			}
		}
	}

	sortByLikes(a, b) {
		const likeA = a.querySelector("dl .page-main__catalog__content__item__info__total-hearts");
		const likeC = this.clearStringFromDigits(likeA.textContent);
		const likeB = b.querySelector("dl .page-main__catalog__content__item__info__total-hearts");
		const likeD = this.clearStringFromDigits(likeB.textContent);
		if (likeC > likeD) return -1;
		if (likeC === likeD) return 0;
		if (likeC < likeD) return 1;
	}

	sortByCalories(a, b) {
		const calorieA = a.querySelector(
			"dl .page-main__catalog__content__item__info__total-calories"
		);
		const calorieC = this.clearStringFromDigits(calorieA.textContent);
		const calorieB = b.querySelector(
			"dl .page-main__catalog__content__item__info__total-calories"
		);
		const calorieD = this.clearStringFromDigits(calorieB.textContent);
		if (calorieC > calorieD) return -1;
		if (calorieC === calorieD) return 0;
		if (calorieC < calorieD) return 1;
	}

	sortByTime(a, b) {
		const timeA = a.querySelector("dl .page-main__catalog__content__item__info__time-to-cook");
		const timeC = this.clearStringFromDigits(timeA.textContent);
		const timeB = b.querySelector("dl .page-main__catalog__content__item__info__time-to-cook");
		const timeD = this.clearStringFromDigits(timeB.textContent);
		if (timeC > timeD) return -1;
		if (timeC === timeD) return 0;
		if (timeC < timeD) return 1;
	}

	changeButtonStyles(e) {
		for (const trigger of this.triggerBtns) {
			if (
				trigger === e.target &&
				trigger.classList.contains(
					"page-main__settings__sort-and-search__sort__option__btn__active"
				)
			) {
				e.target.classList.remove(
					"page-main__settings__sort-and-search__sort__option__btn__active"
				);
				this.resetSort();
				return;
				// eslint-disable-next-line no-else-return
			} else if (
				trigger.classList.contains(
					"page-main__settings__sort-and-search__sort__option__btn__active"
				)
			) {
				trigger.classList.remove(
					"page-main__settings__sort-and-search__sort__option__btn__active"
				);
			}
		}
		e.target.classList.add("page-main__settings__sort-and-search__sort__option__btn__active");
	}

	resetSort() {
		this.items.forEach(item => item.remove());
		const test = this.items;
		for (const img of test) {
			this.container.append(img);
		}
	}

	clearStringFromDigits(string) {
		return +string.replace(/([^0-9])+/g, "");
	}
}
