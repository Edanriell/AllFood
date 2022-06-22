import { getResource } from "../services/requests";
import image0 from "../../img/cards/img1-lg.png";
import image1 from "../../img/cards/img2.png";
import image2 from "../../img/cards/img3-lg.png";
import image3 from "../../img/cards/img4.png";
import image4 from "../../img/cards/img5.png";
import image5 from "../../img/cards/img6.png";
import image6 from "../../img/cards/img7-lg.png";

export default class Cards {
	static images = [
		{ itemId: 0, imageSrc: image0 },
		{ itemId: 2, imageSrc: image1 },
		{ itemId: 4, imageSrc: image2 },
		{ itemId: 5, imageSrc: image3 },
		{ itemId: 6, imageSrc: image4 },
		{ itemId: 8, imageSrc: image5 },
		{ itemId: 9, imageSrc: image6 }
	];

	constructor({ container, triggerBtn }) {
		this.container = document.querySelector(container);
		this.trigger = document.querySelector(triggerBtn);
		this.cardsFetched = 0;
		this.cardsPerCycle = 1;
		this.totalCardsInDb = this.calculateCards();
		this.calculateCards = this.calculateCards.bind(this);
	}

	init() {
		getResource("http://localhost:3000/Items")
			.then(cards => this.renderCards(cards))
			.catch(error => {
				if (error.name === "NetworkError") {
					this.displayErrorMessage("Пожалуйста, проверьте подключение к интернету");
				} else if (error instanceof TypeError) {
					this.displayErrorMessage(
						"Извините, похоже что-то не так с нашим сервером! Попробуйте снова позже."
					);
				} else {
					this.displayErrorMessage(error);
				}
			});
	}

	calculateCards() {
		getResource("http://localhost:3000/Items")
			.then(cards => {
				this.totalCardsInDb = cards.length;
			})
			.catch(error => {
				console.log(error);
				this.totalCardsInDb = null;
			});
	}

	renderCards(cards) {
		for (let i = 0; i < this.cardsPerCycle; i++) {
			const {
				itemId,
				itemSize,
				itemClass,
				itemImageWidth,
				itemImageHeight,
				itemAltText,
				itemName,
				itemDescription,
				itemLikes,
				itemTimeToCook,
				itemCalories
			} = cards[this.cardsFetched];
			const card = document.createElement("li");
			if (itemSize === "large") {
				card.classList.add(itemClass, "fade-in-fwd");
				card.innerHTML = `
        <article class="page-main__catalog__content__item">
        <a href="#" class="page-main__catalog__content__item__link">
          <h3 class="page-main__catalog__content__item__name">
            ${itemName}
          </h3>
          <img
            src="${this.findItemImage(itemId, Cards.images)}"
            alt="${itemAltText}"
            width="${itemImageWidth}"
            height="${itemImageHeight}"
            class="page-main__catalog__content__item__image"
          />
          <p class="page-main__catalog__content__item__description">
            ${itemDescription};
          </p>
          <dl class="page-main__catalog__content__item__info">
            <dt
              class="page-main__catalog__content__item__info__heart-icon"
            >
              <span class="visually-hidden">лайков</span>
            </dt>
            <dd
              class="
                page-main__catalog__content__item__info__total-hearts
              "
            >
              ${itemLikes}
            </dd>
            <dt
              class="page-main__catalog__content__item__info__clock-icon"
            >
              <span class="visually-hidden">время приготовления</span>
            </dt>
            <dd
              class="
                page-main__catalog__content__item__info__time-to-cook
              "
            >
              ${itemTimeToCook}
            </dd>
            <dt
              class="page-main__catalog__content__item__info__energy-icon"
            >
              <span class="visually-hidden">калорийность блюда</span>
            </dt>
            <dd
              class="
                page-main__catalog__content__item__info__total-calories
              "
            >
              ${itemCalories}
            </dd>
          </dl>
        </a>
      </article>
        `;
			} else if (itemSize === "medium") {
				card.classList.add(itemClass, "fade-in-fwd");
				card.innerHTML = `
        <article class="page-main__catalog__content__item">
        <a href="#" class="page-main__catalog__content__item__link">
          <h3 class="page-main__catalog__content__item__name">
            Стейк из лосося
          </h3>
          <img
            src="${this.findItemImage(itemId, Cards.images)}"
            alt="${itemAltText}"
            width="${itemImageWidth}"
            height="${itemImageHeight}"
            class="page-main__catalog__content__item__image"
          />
          <p class="page-main__catalog__content__item__description">
            ${itemDescription}
          </p>
          <dl class="page-main__catalog__content__item__info">
            <dt
              class="page-main__catalog__content__item__info__heart-icon"
            >
              <span class="visually-hidden">лайков</span>
            </dt>
            <dd
              class="
                page-main__catalog__content__item__info__total-hearts
              "
            >
              ${itemLikes}
            </dd>
            <dt
              class="page-main__catalog__content__item__info__clock-icon"
            >
              <span class="visually-hidden">время приготовления</span>
            </dt>
            <dd
              class="
                page-main__catalog__content__item__info__time-to-cook
              "
            >
              ${itemTimeToCook}
            </dd>
            <dt
              class="page-main__catalog__content__item__info__energy-icon"
            >
              <span class="visually-hidden">калорийность блюда</span>
            </dt>
            <dd
              class="
                page-main__catalog__content__item__info__total-calories
              "
            >
              ${itemCalories}
            </dd>
          </dl>
        </a>
      </article>
        `;
			} else {
				card.classList.add(itemClass, "fade-in-fwd");
				card.innerHTML = `
        <article class="page-main__catalog__content__item">
        <a href="#" class="page-main__catalog__content__item__link">
          <h3 class="page-main__catalog__content__item__name">
            ${itemName}
          </h3>
          <p class="page-main__catalog__content__item__description">
            ${itemDescription}
          </p>
          <dl class="page-main__catalog__content__item__info">
            <dt
              class="page-main__catalog__content__item__info__heart-icon"
            >
              <span class="visually-hidden">лайков</span>
            </dt>
            <dd
              class="
                page-main__catalog__content__item__info__total-hearts
              "
            >
              ${itemLikes}
            </dd>
            <dt
              class="page-main__catalog__content__item__info__clock-icon"
            >
              <span class="visually-hidden">время приготовления</span>
            </dt>
            <dd
              class="
                page-main__catalog__content__item__info__time-to-cook
              "
            >
              ${itemTimeToCook}
            </dd>
            <dt
              class="page-main__catalog__content__item__info__energy-icon"
            >
              <span class="visually-hidden">калорийность блюда</span>
            </dt>
            <dd
              class="
                page-main__catalog__content__item__info__total-calories
              "
            >
              ${itemCalories}
            </dd>
          </dl>
        </a>
      </article>
        `;
			}
			this.container.appendChild(card);
			this.cardsFetched++;
		}
	}

	displayErrorMessage(errorText) {
		if (!document.querySelector(".message")) {
			const error = document.createElement("div");
			error.classList.add("message", "error", "fade-in-fwd");
			error.innerHTML = `
        <p class="error__text">Ошибка</p>- ${errorText}
      `;
			this.container.appendChild(error);
			setTimeout(() => {
				error.classList.remove("fade-in-fwd");
				error.classList.add("fade-out-bck");
				setTimeout(() => {
					error.remove();
				}, 700);
			}, 8000);
		}
	}

	waitAndFetchElements(interval, max = Infinity) {
		function until(time) {
			// eslint-disable-next-line no-promise-executor-return
			return new Promise(resolve => setTimeout(resolve, time - Date.now()));
		}
		return {
			startTime: Date.now(),
			count: 1,
			async next() {
				if (this.count > max) {
					return { done: true };
				}
				const targetTime = this.startTime + this.count * interval;
				await until(targetTime);
				return { value: this.count++ };
			},
			[Symbol.asyncIterator]() {
				return this;
			}
		};
	}

	getCardsOnClick() {
		this.trigger.addEventListener("click", () => {
			(async () => {
				for await (const tick of this.waitAndFetchElements(200, 4)) {
					if (this.cardsFetched === this.totalCardsInDb) {
						this.disableTrigger();
						return;
					}
					this.init();
					console.log(tick);
					console.log(this.totalCardsInDb);
				}
			})();
		});
	}

	disableTrigger() {
		this.trigger.setAttribute("disabled", true);
		this.trigger.style.cssText = "filter: grayscale(100%)";
		this.trigger.style.transition = "all 0.2s linear";
		this.trigger.style.cursor = "not-allowed";
	}

	findItemImage(id, images) {
		const image = images
			.filter(cardImage => {
				return cardImage.itemId === id;
			})
			.map(url => {
				return url.imageSrc;
			})
			.join();
		return image;
	}
}
