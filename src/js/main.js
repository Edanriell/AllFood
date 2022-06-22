import "../sass/main.sass";

import Slider from "./modules/slider";
import Filter from "./modules/filter";
import Loader from "./modules/loader";
import Scroll from "./modules/scroll";
import Forms from "./modules/forms";

window.addEventListener("DOMContentLoaded", () => {
	const slider = new Slider({
		sliderWrapper: ".page-main__slider",
		sliderItems: ".page-main__slider__slides",
		btnPrev: ".page-main__slider__controls__prev-slide-btn",
		btnNext: ".page-main__slider__controls__next-slide-btn",
		slideIndicatorContainer: ".page-main__slider__dots",
		autoPlayEnabled: true,
		autoPlayInterval: 10000
	});

	const filter = new Filter({
		trigger: ".page-main__settings__sort-and-search__sort__option__btn",
		itemsContainer: ".page-main__catalog__content",
		itemList: ".page-main__catalog__content li"
	});

	const loader = new Loader({
		container: ".page-main__catalog__content",
		triggerBtn: ".page-main__catalog__load-more"
	});

	const scroll = new Scroll({
		scrollContainer: "main"
	});

	const form = new Forms({
		triggerForm: "#form",
		databaseName: "emails"
	});

	form.init();

	slider.init();

	filter.init();

	loader.getCardsOnClick();

	scroll.init();
});
