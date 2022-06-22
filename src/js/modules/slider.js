export default class Slider {
	constructor({
		sliderWrapper,
		sliderItems,
		btnPrev,
		btnNext,
		autoPlayEnabled,
		autoPlayInterval,
		slideIndicatorContainer
	}) {
		this.wrapper = document.querySelector(sliderWrapper);
		this.items = document.querySelector(sliderItems);
		this.prev = document.querySelector(btnPrev);
		this.next = document.querySelector(btnNext);
		this.indicatorContainer = document.querySelector(slideIndicatorContainer);
		this.autoPlay = autoPlayEnabled;
		this.interval = autoPlayInterval;
		this.posX1 = 0;
		this.posX2 = 0;
		this.posInitial = null;
		this.posFinal = null;
		this.threshold = 100;
		this.slides = this.items.querySelectorAll(".page-main__slider__slides__slide");
		this.slidesLength = this.slides.length;
		this.slideSize = this.items.querySelectorAll(
			".page-main__slider__slides__slide"
		)[0].offsetWidth;
		// eslint-disable-next-line prefer-destructuring
		this.firstSlide = this.slides[0];
		this.lastSlide = this.slides[this.slidesLength - 1];
		this.cloneFirst = this.firstSlide.cloneNode(true);
		this.cloneLast = this.lastSlide.cloneNode(true);
		this.index = 0;
		this.allowShift = true;
		this.dragStart = this.dragStart.bind(this);
		this.dragAction = this.dragAction.bind(this);
		this.dragEnd = this.dragEnd.bind(this);
		this.shiftSlide = this.shiftSlide.bind(this);
		this.checkIndex = this.checkIndex.bind(this);
		this.init = this.init.bind(this);
		this.shiftSlideOnIndicatorClick = this.shiftSlideOnIndicatorClick.bind(this);
	}

	init() {
		this.items.appendChild(this.cloneFirst);
		this.items.insertBefore(this.cloneLast, this.firstSlide);
		this.wrapper.classList.add("page-main__slider__loaded");

		this.items.onmousedown = this.dragStart;

		this.items.addEventListener("touchstart", () => {
			this.dragStart();
		});
		this.items.addEventListener("touchend", () => {
			this.dragEnd();
		});
		this.items.addEventListener("touchmove", () => {
			this.dragAction();
		});

		this.prev.addEventListener("click", evt => {
			this.shiftSlide(-1);
			this.disableButtons(evt);
		});
		this.next.addEventListener("click", evt => {
			this.shiftSlide(1);
			this.disableButtons(evt);
		});

		this.createIndicators();

		if (this.autoPlay) {
			this.autoShiftSlide();
		}

		this.wrapper.addEventListener("mouseenter", () => {
			clearInterval(this.autoPlay);

			this.toggleControls({
				classOnMouseoverPrev: "page-main__slider__controls__prev-slide-btn__mouseover",
				classOnMouseoverNext: "page-main__slider__controls__next-slide-btn__mouseover",
				classOnMouseoutPrev: "page-main__slider__controls__prev-slide-btn__mouseout",
				classOnMouseoutNext: "page-main__slider__controls__next-slide-btn__mouseout"
			});
		});
		this.wrapper.addEventListener("mouseleave", () => {
			if (this.autoPlay) {
				this.autoShiftSlide();
			}
			this.toggleControls({
				classOnMouseoverPrev: "page-main__slider__controls__prev-slide-btn__mouseover",
				classOnMouseoverNext: "page-main__slider__controls__next-slide-btn__mouseover",
				classOnMouseoutPrev: "page-main__slider__controls__prev-slide-btn__mouseout",
				classOnMouseoutNext: "page-main__slider__controls__next-slide-btn__mouseout"
			});
		});

		this.items.addEventListener("transitionend", () => {
			this.checkIndex();
		});
		this.shiftSlideOnIndicatorClick();
	}

	dragStart(e) {
		e = e || window.event;
		e.preventDefault();
		this.posInitial = this.items.offsetLeft;

		if (e.type === "touchstart") {
			this.posX1 = e.touches[0].clientX;
		} else {
			this.posX1 = e.clientX;
			document.onmouseup = this.dragEnd;
			document.onmousemove = this.dragAction;
		}
	}

	dragAction(e) {
		e = e || window.event;

		if (e.type === "touchmove") {
			this.posX2 = this.posX1 - e.touches[0].clientX;
			this.posX1 = e.touches[0].clientX;
		} else {
			this.posX2 = this.posX1 - e.clientX;
			this.posX1 = e.clientX;
		}
		this.items.style.left = `${this.items.offsetLeft - this.posX2}px`;
	}

	dragEnd() {
		this.posFinal = this.items.offsetLeft;
		if (this.posFinal - this.posInitial < -this.threshold) {
			this.shiftSlide(1, "drag");
		} else if (this.posFinal - this.posInitial > this.threshold) {
			this.shiftSlide(-1, "drag");
		} else {
			this.items.style.left = `${this.posInitial}px`;
		}

		document.onmouseup = null;
		document.onmousemove = null;
	}

	shiftSlide(dir, action) {
		this.items.style.transition = null; // clear think
		this.items.classList.add("page-main__slider__slides__shift");
		console.log(`${this.posX1} shift x1`);
		console.log(`${this.posX2} shift x2`);
		console.log(`${this.posInitial} shift posInitial`);
		console.log(`${this.posFinal} shift posfinal`);
		if (this.allowShift) {
			if (!action) {
				this.posInitial = this.items.offsetLeft;
			}

			if (dir === 1) {
				this.items.style.left = `${this.posInitial - this.slideSize}px`;
				this.index++;
				this.changeIndicator(
					".page-main__slider__dots__dot",
					"page-main__slider__dots__dot__active"
				);
				this.showSlideDescription(
					".page-main__slider__slides__slide__description",
					"page-main__slider__slides__slide__description__animate"
				);
			} else if (dir === -1) {
				this.items.style.left = `${this.posInitial + this.slideSize}px`;
				this.index--;
				this.changeIndicator(
					".page-main__slider__dots__dot",
					"page-main__slider__dots__dot__active"
				);
				this.showSlideDescription(
					".page-main__slider__slides__slide__description",
					"page-main__slider__slides__slide__description__animate"
				);
			}
		}
	}

	checkIndex() {
		this.items.classList.remove("page-main__slider__slides__shift");

		if (this.index === -1) {
			this.items.style.left = `${-(this.slidesLength * this.slideSize)}px`;
			this.index = this.slidesLength - 1;
		}

		if (this.index === this.slidesLength) {
			this.items.style.left = `${-(1 * this.slideSize)}px`;
			this.index = 0;
		}

		this.allowShift = true;
	}

	toggleControls({
		classOnMouseoverPrev,
		classOnMouseoverNext,
		classOnMouseoutPrev,
		classOnMouseoutNext
	}) {
		if (
			!this.prev.classList.contains(classOnMouseoverPrev) &&
			!this.next.classList.contains(classOnMouseoverNext)
		) {
			this.prev.classList.add(classOnMouseoverPrev);
			this.next.classList.add(classOnMouseoverNext);
			this.prev.classList.remove(classOnMouseoutPrev);
			this.next.classList.remove(classOnMouseoutNext);
		} else if (
			this.prev.classList.contains(classOnMouseoverPrev) &&
			this.next.classList.contains(classOnMouseoverNext)
		) {
			this.prev.classList.remove(classOnMouseoverPrev);
			this.next.classList.remove(classOnMouseoverNext);
			this.prev.classList.add(classOnMouseoutPrev);
			this.next.classList.add(classOnMouseoutNext);
		}
	}

	autoShiftSlide() {
		this.autoPlay = setInterval(() => {
			this.shiftSlide(1);
		}, this.interval);
	}

	createIndicators() {
		for (let i = 0; i < this.slidesLength; i++) {
			const dotContainer = document.createElement("li");
			const dot = document.createElement("button");
			dot.style.transition = "all 0.25s linear"; // change
			const span = document.createElement("span");
			span.classList.add("visually-hidden");
			span.innerText = `Слайд номер ${i}`;
			dot.append(span);
			dot.classList.add(
				"page-main__slider__dots__dot",
				"page-main__slider__dots__dot__inactive"
			);
			dotContainer.append(dot);
			this.indicatorContainer.append(dotContainer);
		}
	}

	changeIndicator(indicators, activeClass) {
		// make active attribute
		const slideIndicators = document.querySelectorAll(indicators);
		for (const indicator of slideIndicators) {
			indicator.classList.remove(activeClass);
		}
		if (this.index === this.slidesLength) {
			slideIndicators[0].classList.add(activeClass);
		} else if (this.index === -1) {
			slideIndicators[this.slidesLength - 1].classList.add(activeClass);
		} else {
			slideIndicators[this.index].classList.add(activeClass);
		}
	}

	shiftSlideOnIndicatorClick() {
		const indicators = document.querySelectorAll(".page-main__slider__dots__dot");
		for (const [index, indicator] of indicators.entries()) {
			indicator.addEventListener("click", () => {
				this.items.style.left = `${-(this.slideSize * (index + 1))}px`;
				this.items.style.transition = "all .2s ease-out";
				if (index === 0) {
					this.index = this.slidesLength;
				} else {
					this.index = index;
				}
				this.changeIndicator(
					".page-main__slider__dots__dot",
					"page-main__slider__dots__dot__active"
				);
				this.showSlideDescription(
					".page-main__slider__slides__slide__description",
					"page-main__slider__slides__slide__description__animate"
				);
				setTimeout(() => {
					this.items.style.transition = null;
				}, 2000);
			});
		}
	}

	showSlideDescription(selector, activeClass) {
		const description = document.querySelectorAll(selector);
		for (const text of description) {
			text.classList.remove(activeClass);
		}
		if (this.index === this.slidesLength) {
			description[1].classList.add(activeClass);
		} else if (this.index === 0) {
			description[1].classList.add(activeClass);
		} else if (this.index === -1) {
			description[this.slidesLength].classList.add(activeClass);
		} else {
			description[this.index + 1].classList.add(activeClass);
		}
	}

	disableButtons(evt) {
		evt.target.setAttribute("disabled", true);
		setTimeout(() => {
			evt.target.removeAttribute("disabled");
		}, 200);
	}
}
