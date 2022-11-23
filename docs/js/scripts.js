// class Shop {
//     constructor (selectorShop, selectorBusket) {
//         this.busketBlock = document.querySelector(selectorBusket);
//         this.shopBlock = document.querySelector(selectorShop);
//         // this.basketCounter = this.busketBlock.querySelector(".basket-counter");
//         this.shopCards = this.shopBlock.children;
//         this.product = {};
//     }

//     addProduct() { // поставка продуктов в магазин
//         for(const [key, value] of Object.entries(this.shopCards)) { 
//             const nameProduct = value.querySelector('.works-photo__title').textContent;
//             const priceProduct = value.querySelector('.works-photo__price').textContent;
//             this.product[nameProduct] = {'price': parseInt(priceProduct), 'amount': 10};
//         }
//         console.log(this.product)
//     }
// }

// new Shop('.works-photo', '.basket').addProduct();

// /** Slider by Hashtag team
//  * .slider                                      - обов'язковий клас для слайдера
//  * .slider-container                            - обов'язковий клас для контейнера слайдів 
//  * id                                           - обов'язково задати id

// .(карточки слайдера)                            - обов'язкові стилі для єффекту FadeOut
//     opacity: 0
//     visibility: hidden
// .(карточки слайдера).active
//     opacity: 1
//     visibility: visible

// .left.slider_navigation                         - класи для заддяння стилів на кнопки
// .right.slider_navigation                
// .slider-dot                                     - клас для задання стилів на точки


//  * const sliderProps = {
//         isSlidesToScrollAll: false,               - cкролити одразу всі видимі слайди
//         gap: 20,                                - відстань між слайдами
//         isArrows: false,                          - наявність стрілочок
//         isAutoplay: true,                         - автоскролл
//         autoplaySpeed: 3000                     - швидкість автоскролла
//         isDots: false,                            - наявність точок знизу слайдера
//         distanceToDots: 0,                      - паддінг для відображення точок, якщо потрібен
//         baseCardWidth: widthSliderContainer,    - базова ширина карточок слайдера
//         transitionCard: "all .8s ease-in-out",  - єффект появи карточок
//         isEffectFadeOut: false                  - тип слайдера (з плавною появою, або скролом вбік)
//     }

//  * infinitySlider(selector, settings)
//         - selector - шлях до слайдера, 
//         - settings - нестанарні налаштування sliderProps
//  **/

class InfinitySlider {
    constructor(selector, settings = {}) {
        this.settings = {
            ...InfinitySlider.defaultSettings,
            ...settings
        };
        this.slider = document.querySelector(selector);
        this.positionCards = 0;
        this.sliderContainer = this.slider.querySelector(".slider-container");
        this.sliderCards = this.sliderContainer.children;
        this.realCardsLength = this.sliderCards.length;
        this.heightCards = 0;
        this.widthSliderContainer;
        this.cardsCount;
        this.widthCards;
        this.distanceCards;
        this.cloneCard;
        this.prevBtnSlider;
        this.nextBtnSlider;
        this.sliderInterval;
        this.maxHeight;
        this.sliderDots;
        this.touchPoint;
        // InfinitySlider.defaultSettings.baseCardWidth = this.widthSliderContainer;
    };

    static defaultSettings = {
        // isSlidesToScrollAll: false,
        gap: 0,
        isArrows: false,
        isDots: false,
        distanceToDots: 0,
        isAutoplay: false,
        autoplaySpeed: 3000,
        baseCardWidth: null,
        transitionCard: "all 1s ease-in-out",
        isEffectFadeOut: false
    };

    init() {
        this.widthSliderContainer = this.sliderContainer.getBoundingClientRect().width;

        if (this.settings.baseCardWidth == null) this.settings.baseCardWidth = this.widthSliderContainer

        this.slider.querySelectorAll(".clone").forEach(clone => {
            clone.remove();
        });

        if (localStorage[this.slider.id + "Interval"]) {
            clearInterval(localStorage[this.slider.id + "Interval"]);
        }

        this.slider.style.position = "relative";
        this.sliderContainer.style.overflow = "hidden";
        this.sliderContainer.style.position = "relative";
        this.sliderContainer.style.width = "100%";
        
        this.cardsCount = Math.floor(this.widthSliderContainer / (parseInt(this.settings.baseCardWidth) + this.settings.gap));
        if (this.cardsCount == 0) this.cardsCount = 1;
        this.distanceCards = this.settings.gap;
        this.widthCards = (this.widthSliderContainer - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount;
        this.positionCards = 0 - (this.distanceCards + this.widthCards);

        if (this.settings.isArrows) this.creationArrows();
        this.prevBtnSlider = this.slider.querySelector('.left.slider_navigation');
        this.nextBtnSlider = this.slider.querySelector('.right.slider_navigation');
        if (this.settings.isArrows && this.sliderCards.length <= this.cardsCount) {
            this.prevBtnSlider.style.display = "none";
            this.nextBtnSlider.style.display = "none";
        } else if (this.settings.isArrows) {
            this.prevBtnSlider.style.display = "block";
            this.nextBtnSlider.style.display = "block";
        }
        if (this.settings.isDots && this.realCardsLength > 1) {
            this.creationDots();
            this.sliderDots = document.querySelectorAll('.slider-dot');
            for (let i = 0; i < this.sliderCards.length; i++) {
                if (this.sliderCards[i].classList.contains("activeFade")) {
                    this.sliderDots[i].classList.remove("activeFade");
                    this.sliderCards[i].classList.remove("activeFade");
                }
            }
            this.sliderDots[0].classList.add("activeFade");
            this.sliderCards[0].classList.add("activeFade");
        }

        if (!this.settings.isEffectFadeOut) {
            this.creationClons();
            this.shuffleCard();
        }

        this.sliderCards = this.sliderContainer.children;
        this.heightCards = 0;
        for (let i = 0; i < this.sliderCards.length; i++) {
            this.sliderCards[i].style.width = this.widthCards + "px";
            this.sliderCards[i].style.position = "absolute";
            this.maxHeight = this.sliderCards[i].getBoundingClientRect().height;
            if (this.heightCards < this.maxHeight) {
                this.heightCards = this.maxHeight;
            }
            this.sliderCards[i].style.transition = 'none';
            setTimeout(() => {
                this.sliderCards[i].style.transition = this.settings.transitionCard;
            }, 1);
        }

        this.settings.isDots ? this.sliderContainer.style.height = this.heightCards + this.settings.distanceToDots + 'px' : this.sliderContainer.style.height = this.heightCards + 'px';
        
        this.sliderDots = document.querySelectorAll('.slider-dot');
        this.sliderDots.forEach(element => {
            element.onclick = () => {
                clearInterval(localStorage[this.slider.id + "Interval"]);
                for (let index = 0; index < this.realCardsLength; index++) {
                    this.sliderDots[index].classList.remove("activeFade");
                    this.sliderCards[index].classList.remove("activeFade");
                }
                this.sliderCards[element.dataset.order].classList.add("activeFade");
                element.classList.add("activeFade");
            }
        });
        if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
            this.startAutoPlay();
        }
        this.slider.addEventListener('touchend', () => {
            if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
                this.startAutoPlay();
            }
        });
        
        this.touchSlider = this.touchSlider.bind(this);

        this.slider.addEventListener('touchstart', (e) => {
            this.touchPoint = e.touches[0].pageX;
            this.slider.addEventListener('touchmove', this.touchSlider);
            clearInterval(localStorage[this.slider.id + "Interval"]);
        });

        this.slider.onmouseenter = () => {
            clearInterval(localStorage[this.slider.id + "Interval"]);
        };

        this.slider.onmouseleave = () => {
            if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
                this.startAutoPlay();
            }
        };
    }

    creationClons() {
        let counter = 1;
        do {
            this.cloneCard = this.sliderCards[this.sliderCards.length - counter].cloneNode(true);
            this.cloneCard.classList.add("clone");
            this.cloneCard.style.transition = 'none';
            this.sliderContainer.insertAdjacentElement("afterbegin", this.cloneCard);
            this.realCardsLength = this.sliderCards.length - this.slider.querySelectorAll('.clone').length
            counter++;
        } while (counter <= this.realCardsLength && this.settings.isSlidesToScrollAll);
        
        if (this.settings.isSlidesToScrollAll) {
            counter = 0;
            while (counter < this.realCardsLength) {
                this.cloneCard = this.sliderCards[counter].cloneNode(true);
                this.cloneCard.classList.add("clone");
                this.cloneCard.style.transition = 'none';
                this.sliderContainer.insertAdjacentElement("beforeend", this.cloneCard);
                counter++;            
            }
        }
    }


    creationArrows() {
        const areArrowsExist = this.slider.querySelectorAll('.slider_navigation').length;
        if (areArrowsExist < 1) {
            this.prevBtnSlider = document.createElement("span");
            this.nextBtnSlider = document.createElement("span");
            this.prevBtnSlider.className = "left slider_navigation";
            this.nextBtnSlider.className = "right slider_navigation";
            this.slider.insertAdjacentElement("afterbegin", this.prevBtnSlider);
            this.slider.insertAdjacentElement("beforeend", this.nextBtnSlider);

            let isClickUnabled = true;
            const clickUnabled = () => {
                isClickUnabled = false;
                setTimeout(() => {
                    isClickUnabled = true;
                }, (parseFloat(this.sliderCards[0].style.transitionDuration) * 1000));
            };

            this.prevBtnSlider.onclick = () => {
                if (isClickUnabled) {
                    this.changeSlide("left");
                    clickUnabled();
                }
            };
            this.nextBtnSlider.onclick = () => {
                if (isClickUnabled) {
                    this.changeSlide("right");
                    clickUnabled();
                }
            };
        }
    }

    creationDots() {
        const dotsContainer = this.slider.querySelector('.dots-container');
        if (!dotsContainer) {
            let dotContainer = document.createElement("div");
            dotContainer.style.position = "absolute";
            dotContainer.className = "dots-container";
            dotContainer.style.bottom = "0";
            this.slider.insertAdjacentElement("beforeend", dotContainer);
            for (let index = 0; index < this.realCardsLength; index++) {
                const slideDot = document.createElement("span");
                slideDot.className = "slider-dot";
                slideDot.dataset.order = index;
                dotContainer.insertAdjacentElement("beforeend", slideDot);
            }
        }
    }

    shuffleCard() {
        this.sliderCards = this.sliderContainer.children;
        this.positionCards = 0 - (this.distanceCards + this.widthCards);
        if (this.settings.isSlidesToScrollAll) {
            this.positionCards = 0 - (this.distanceCards + this.widthCards) * this.realCardsLength;
        }
        for (let i = 0; i < this.sliderCards.length; i++) {
            this.sliderCards[i].style.left = this.positionCards + 'px';
            this.positionCards += (this.distanceCards + this.widthCards);
        }
    }

    changeSlide(direction) {
        this.widthSliderContainer = this.sliderContainer.getBoundingClientRect().width;
        this.cardsCount = Math.floor(this.widthSliderContainer / (parseInt(this.settings.baseCardWidth) + this.settings.gap));
        if (this.cardsCount == 0) this.cardsCount = 1;
        this.widthCards = (this.widthSliderContainer - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount;
        this.sliderCards = this.sliderContainer.children;
        let slideIndex = 0;
        for (let i = 0; i < this.sliderCards.length; i++) {
            if (this.sliderCards[i].classList.contains("activeFade")) {
                slideIndex = i;
            }
        }
        if (direction == "left") {
            if (this.settings.isSlidesToScrollAll) {
                for (let index = 0; index < this.cardsCount; index++) {
                    this.sliderContainer.insertAdjacentElement("afterbegin", this.sliderCards[this.sliderCards.length - 1]);
                }
            } else if (this.settings.isEffectFadeOut) {
                setTimeout(() => this.sliderCards[slideIndex].classList.add("activeFade"), 800);
                setTimeout(() => this.sliderDots[slideIndex].classList.add("activeFade"), 800);
                this.sliderCards[slideIndex].classList.remove("activeFade");
                this.sliderDots[slideIndex].classList.remove("activeFade");
                this.sliderCards[slideIndex - 1] ? slideIndex-- : slideIndex = this.sliderCards.length - 1;
            } else {
                this.sliderCards[this.sliderCards.length - 1].remove();
                let cloneLast = this.sliderCards[this.sliderCards.length - 1].cloneNode(true);
                cloneLast.classList.add("clone");
                this.sliderContainer.insertAdjacentElement("afterbegin", cloneLast);
                this.sliderCards[1].classList.remove("clone");
            }
        } else if (direction == "right") {
            if (this.settings.isSlidesToScrollAll) {
                for (let index = 0; index < this.cardsCount; index++) {
                    this.sliderContainer.insertAdjacentElement("beforeend", this.sliderCards[0]);
                }
            } else if (this.settings.isEffectFadeOut) {
                setTimeout(() => this.sliderCards[slideIndex].classList.add("activeFade"), 800);
                setTimeout(() => this.sliderDots[slideIndex].classList.add("activeFade"), 800);
                this.sliderCards[slideIndex].classList.remove("activeFade");
                this.sliderDots[slideIndex].classList.remove("activeFade");
                this.sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
            } else {
                this.sliderCards[0].remove();
                let cloneFirst = this.sliderCards[0].cloneNode(true);
                cloneFirst.classList.add("clone");
                this.sliderContainer.insertAdjacentElement("beforeend", cloneFirst);
                this.sliderCards[this.sliderCards.length - 2].classList.remove("clone");
            }
        }
        if (!this.settings.isEffectFadeOut) this.shuffleCard();
    }

    startAutoPlay() {
        clearInterval(localStorage[this.slider.id + "Interval"]);
        if (this.settings.isEffectFadeOut) {
            let slideIndex = 0;
            for (let i = 0; i < this.sliderCards.length; i++) {
                if (this.sliderCards[i].classList.contains("activeFade")) {
                    slideIndex = i;
                }
            }
            const setActive = (index) => {
                setTimeout(() => this.sliderCards[index].classList.add("activeFade"), 1000);
                setTimeout(() => this.sliderDots[index].classList.add("activeFade"), 1000);
            }
            this.sliderInterval = setInterval(() => {
                this.sliderCards[slideIndex].classList.remove("activeFade");
                this.sliderDots[slideIndex].classList.remove("activeFade");
                this.sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
                setActive(slideIndex);
            }, this.settings.autoplaySpeed);
        } else {
            this.sliderInterval = setInterval(() => {
                this.changeSlide("right");
            }, this.settings.autoplaySpeed);
        }
        localStorage[this.slider.id + "Interval"] = this.sliderInterval;
    }

    touchSlider(e) {
        if ((this.touchPoint + 20) < e.touches[0].pageX) {
            this.changeSlide('left');
            this.slider.removeEventListener('touchmove', this.touchSlider);
        } else if ((this.touchPoint - 20) > e.touches[0].pageX) {
            this.changeSlide('right');
            this.slider.removeEventListener('touchmove', this.touchSlider);
        }
    }
}


const sliderBoys = new InfinitySlider(".slider", {
    isArrows: true,
    isSlidesToScrollAll: true,
    baseCardWidth: "263rem",
    gap: 20,
    isAutoplay:true,
    autoplaySpeed: 5000,
    transitionCard: "all 1.5s ease-in-out",
});

const sliderBrands = new InfinitySlider(".slider-brands", {
    gap: 45,
    isAutoplay: true,
    autoplaySpeed: 5000,
    baseCardWidth: "127rem",
    transitionCard: "all 1.3s ease-in-out",
});

const sliderReviews = new InfinitySlider(".reviews.slider", {
    isAutoplay: true,
    autoplaySpeed: 6000,
    isDots: true,
    distanceToDots: 40,
    isEffectFadeOut: true,
    transitionCard: "all 1s ease-in-out",
});

sliderBoys.init();
sliderBrands.init();
sliderReviews.init();

window.onresize = function () {
    sliderBoys.init();
    sliderBrands.init();
    sliderReviews.init();        
};

function confirmForm() {
    const messageSend = document.querySelector('#messageSend');
    const popapAccept = document.querySelector('.popap-accept');
    const popapDecl = document.querySelector('.popap-decline');
    const contactForm = document.querySelector('#contactForm');
    let userInfo = {};

    messageSend.onclick = function (e) {
        e.preventDefault();
        userInfo = {
            userName: document.querySelector('#userName').value,
            userMail: document.querySelector('#userMail').value,
            userTel: document.querySelector('#userTel').value,
            userCompany: document.querySelector('#userCompany').value,
            userMessage: document.querySelector('#userMessage').value
        };

        document.querySelector('.user-name').innerHTML = userInfo.userName;
        document.querySelector('.user-mail').innerHTML = userInfo.userMail;
        document.querySelector('.user-phone').innerHTML = userInfo.userTel;
        document.querySelector('.user-company').innerHTML = userInfo.userCompany;
        document.querySelector('.user-message').innerHTML = userInfo.userMessage;

    }
    popapDecl.onclick = function (e) {
        e.preventDefault();
        contactForm.classList.remove('open');
        bodyUnLock();
    }

    popapAccept.onclick = function (e) {
        e.preventDefault();
        if (localStorage.userMessage) {
            let userMessage = JSON.parse(localStorage.getItem("userMessage"));
            let rewrite = confirm("Rewrite your message? " + userMessage.userMessage);
            console.log(rewrite)
            if (rewrite) {
                localStorage.setItem("userMessage", JSON.stringify(userInfo));
            }
        } else {
            localStorage.setItem("userMessage", JSON.stringify(userInfo));
        }
        contactForm.classList.remove('open');
        bodyUnLock();
    }
    
}
// window.onload = function () {
    // const pos = new Promise((resolve, reject) => {
    //     navigator.geolocation.getCurrentPosition(resolve, reject);
    // }).then(resalt => {
    //     console.log(resalt);
    // })
    // return {
    //     long: pos.coords.longitude,
    //     lat: pos.coords.letitude
    // }
// }

// async function geo() {
//     await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     }).then(resalt => {
//         console.log(resalt);
//     })    
// }
// geo()
function parallaxEffect() {
    let parallaxStartPos,
        previousScroll = 0,
        scrollOffsetY = 1;
    const parallaxBG = document.querySelectorAll(".parallax");
    
    function moveBackground(e) { // на комп
        if (window.innerWidth > 1024) {
            let Y = e.pageY - window.pageYOffset - e.target.getBoundingClientRect().top + 1;
            let offsetX = 50 + (e.pageX / window.innerWidth * 20);
            let offsetY = 50 + (Y / window.innerHeight * 10);
            e.target.style.backgroundPosition = `${offsetX}% ${offsetY}%`;
        }
    }
    parallaxBG.forEach(element => {
        // element.style.backgroundPosition = `center`;
        // element.style.backgroundSize = `130% auto`;
        element.addEventListener("mousemove", function (e) { moveBackground(e); });
    });
}


// window.addEventListener('scroll', function() { // на планшет
//     let currentScroll = window.pageYOffset;
//     if (window.pageYOffset < window.innerHeight && window.innerWidth < 1024) {
//         if (currentScroll > previousScroll && scrollOffsetY < 99){
//             scrollOffsetY += 0.2;
//             homePage.style.backgroundPosition = `50% ${scrollOffsetY}%`;
//         } else if (scrollOffsetY > 1) {
//             scrollOffsetY -= 0.2;
//             homePage.style.backgroundPosition = `50% ${scrollOffsetY}%`;

//         }
//     }
//     previousScroll = currentScroll;
// });

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");
let unlock = true;
const timeout = 800;
if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        // const bodyPopap = popupLink.querySelectorAll(".popup_content");
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}
function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup_content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock && popupActive) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('section').offsetWidth + 'px';
    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});
// blog post 2
const blogShowMore = document.querySelector('.show-more');
const blogTwo = document.querySelector('.blog-post_two');
blogShowMore.addEventListener("click", function (e) {
    e.preventDefault()
    blogTwo.classList.toggle('active');
    if (blogTwo.classList.contains('active')) {
        blogShowMore.innerHTML = "Hide";
    } else {
        blogShowMore.innerHTML = "Read more";
    }
});

    // blogHide.addEventListener("click", function (e) {
    //     e.preventDefault()
    //     blogTwo.classList.remove('active');
    // });
window.onload = function () {
    savedLastVisit();
    shop();
    tripleClick();
    animBlockInScroll();
    confirmForm();
    parallaxEffect();
    const header = document.querySelector('.header');
    const arrowUp = document.querySelector('.arrow-up');
    const iconMenu = document.querySelector('.menu-icon');
    const homeMenuLinks = document.querySelectorAll(".scroll-to");
    const menuBody = document.querySelector('.menu-body');
    const homePage = document.querySelector(".home-page");


    let lastScrollTop = 0;

    homePage.style.height = window.innerHeight + "px";

    function navMenuBackground() {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            header.classList.add("header-hidden");
        } else {
            header.classList.remove("header-hidden");
        }
        lastScrollTop = st <= 0 ? 0 : st;

        if (window.pageYOffset > (window.innerHeight / 4)) {
            header.style.backgroundColor = "#c0301c";
        } else {
            header.style.backgroundColor = "transparent";
        }
        if (st > (window.innerHeight / 2)) {
            arrowUp.classList.add("active");
        } else {
            arrowUp.classList.remove("active");
        }

    }
    window.addEventListener(`scroll`, navMenuBackground);
    if (iconMenu) {
        iconMenu.addEventListener("click", function (e) {
            document.body.classList.toggle('lock');
            iconMenu.classList.toggle("open-menu");
            menuBody.classList.toggle("open-menu");
        });

    }

    if (homeMenuLinks.length > 0) {
        homeMenuLinks.forEach(link => {
            link.onclick = function (event) {
                event.preventDefault();
                onMenuLinkClick(this.getAttribute("href"));
            }
        });

        function onMenuLinkClick(href) {
            if (document.querySelector(href)) {
                const target = document.querySelector(href);
                let targetLocation = target.getBoundingClientRect().top + window.pageYOffset;

                if (!header.classList.contains("header-hidden") && targetLocation < window.pageYOffset) {
                    targetLocation = target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight;
                }

                if (iconMenu.classList.contains("open-menu")) {
                    document.body.classList.remove('lock');
                    iconMenu.classList.remove("open-menu");
                    menuBody.classList.remove("open-menu");
                }
                // scrollToBlock(href);
                window.scrollTo({
                    top: targetLocation,
                    behavior: "smooth"
                });
            }
        }
    }


}

// let patern = /url\(["']?(.+)["']?\)/g;

// анимация появления элементов при скролле
function animBlockInScroll() {
    const animItems = document.querySelectorAll(`._anim-items`);

    if (animItems.length > 0) {
        window.addEventListener(`scroll`, animOnScroll);
        window.addEventListener(`touchmove`, animOnScroll);
        window.addEventListener(`wheel`, animOnScroll);

        function animOnScroll() {
            animItems.forEach(element => {
                const animItem = element;
                const animItemHeight = animItem.offsetHeight;
                const animItemOffSet = offset(animItem).top;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }
                if ((window.pageYOffset > animItemOffSet - animItemPoint) && window.pageYOffset < (animItemOffSet + animItemHeight)) {
                    animItem.classList.add(`_active`);
                } else {
                    if (!(animItem.classList.contains(`_anim-no-hide`))) {
                        animItem.classList.remove(`_active`);
                    }
                }
            });
        }

        function offset(el) {
            const rect = el.getBoundingClientRect();
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }
        setTimeout(() => {
            animOnScroll();
        }, 300)
    }
}



// localStorage home page
function savedLastVisit() {
    let titleHome = document.querySelector(".title-home"),
        firstVisit,
        lastVisit,
        timeInSite;

    if (!localStorage.firstVisit || localStorage.firstVisit == "undefined") {
        localStorage.firstVisit = new Date();
        titleHome.innerText = "Welcome to STARTUP";
    }
    firstVisit = localStorage.firstVisit;

    if (!localStorage.lastVisit) {
        localStorage.lastVisit = firstVisit;
    }
    timeInSite = (new Date() - new Date(localStorage.lastVisit)) / 1000 / 60; // min
    let timeInSiteFirst = (new Date() - new Date(localStorage.firstVisit)) / 1000 / 60; // min
    if (timeInSiteFirst <= 5) {
        titleHome.innerText = "Welcome to STARTUP";
    } else if (timeInSite < 5) {
        titleHome.innerText = "glad to see you again";
    } else if (timeInSite >= 1440) {
        titleHome.innerText = "you were gone for a day, welcome to STARTUP";
    } else if (timeInSite >= 5) {
        titleHome.innerText = "welcome back to STARTUP";
    }

    window.onblur = function () {
        localStorage.lastVisit = new Date();
    }
    lastVisit = localStorage.lastVisit;
}
///////// shop
function shop() {
    const basketCounter = document.querySelector('.basket-counter');
    const productContainer = document.querySelector('.products-container');
    const notProduct = document.querySelector('.product-none');
    const btnCheckout = document.querySelector('.popap-checkout');
    const productHead = document.querySelector('.products-head');
    const totaPriceContainer = document.querySelector('.total-container');
    let basketItems = {};

    if (localStorage["basketItems"]) {
        basketItems = JSON.parse(localStorage["basketItems"]);
    }

    fetch("goods.json")
        .then(response => {
            return response.json();
        })
        .then(response => {
            for (const [key, value] of Object.entries(response)) {
                const shopBlock = document.querySelector('.shop-block');
                const shopCard = document.createElement('div');
                const imgShopCard = document.createElement('img');
                const cardDescription = document.createElement('div');
                const shopCardTitle = document.createElement('p');
                const shopCardPrice = document.createElement('p');
                const shopCardCategory = document.createElement('p');
                const shopCardButton = document.createElement('a');

                shopCard.className = "_anim-show photo-card";
                cardDescription.className = "works-description flex";
                shopCardTitle.className = "works-photo__title";
                shopCardPrice.className = "works-photo__price";
                shopCardCategory.className = "works-photo__description roboto";
                shopCardButton.className = "works-photo__btn roboto";
                imgShopCard.className = "works-img";
                imgShopCard.src = value.src;
                imgShopCard.alt = value.alt;
                shopCard.appendChild(imgShopCard);

                shopCardTitle.innerText = value.title;
                shopCardCategory.innerText = value.category;
                shopCardPrice.innerText = value.price + " $";
                shopCardButton.innerText = "add to card";
                shopCardButton.href = value.href;
                shopCardButton.dataset.id = key;

                cardDescription.appendChild(shopCardTitle);
                cardDescription.appendChild(shopCardPrice);
                cardDescription.appendChild(shopCardCategory);
                cardDescription.appendChild(shopCardButton);
                shopCard.appendChild(cardDescription);
                shopBlock.appendChild(shopCard);
            }
            const btnsCard = document.querySelectorAll(".works-photo__btn");
            filterCards();
            translateToCart(btnsCard);
        })

    function translateToCart(event) {
        event.forEach(btn => {
            btn.onclick = function (e) {
                e.preventDefault();

                const shopCard = btn.closest('.photo-card');
                let posCardTop = shopCard.getBoundingClientRect().top;
                let posCardLeft = shopCard.getBoundingClientRect().left;

                const basketShop = document.querySelector('.basket');

                let posBasketTop = basketShop.getBoundingClientRect().top;
                let posBasketLeft = basketShop.getBoundingClientRect().left;
                let cloneCard = shopCard.cloneNode(true);
                let srcClone,
                    altClone,
                    nameClone,
                    idClone,
                    priceClone,
                    amountClone;
                cloneCard.style.position = "fixed";
                cloneCard.style.transition = "all .5s ease";
                cloneCard.style.top = posCardTop + "px";
                cloneCard.style.left = posCardLeft + "px";
                document.body.appendChild(cloneCard);
                setTimeout(() => {
                    cloneCard.style.left = posBasketLeft - (shopCard.getBoundingClientRect().width / 10) + "px";
                    cloneCard.style.top = posBasketTop + "px";
                    cloneCard.style.width = (shopCard.getBoundingClientRect().width / 1.5) + "px";
                    setTimeout(() => {
                        cloneCard.style.width = (0) + "px";
                    }, 200);
                    setTimeout(() => {
                        cloneCard.remove();
                        srcClone = cloneCard.querySelector('.works-img').src;
                        altClone = cloneCard.querySelector('.works-img').alt;
                        nameClone = cloneCard.querySelector('.works-photo__title').innerHTML;
                        priceClone = cloneCard.querySelector('.works-photo__price').innerHTML;
                        idClone = cloneCard.querySelector('.works-photo__btn').dataset.id;
                        amountClone = 1;
                        if (idClone in basketItems) {
                            basketItems[idClone].amount++;
                        } else {
                            basketItems[idClone] = {
                                "src": srcClone,
                                "alt": altClone,
                                "name": nameClone,
                                "price": priceClone,
                                "amount": amountClone
                            };
                        }
                        localStorage["basketItems"] = JSON.stringify(basketItems);
                        showProductsInBusket();
                        updateCounter();
                    }, 300);
                }, 400);
            }
        });
    }
    updateCounter();
    showProductsInBusket();

    function showTotalPrice() {
        let sumPrice = 0;
        for (const [key, value] of Object.entries(basketItems)) {
            sumPrice += (value.amount * parseInt(value.price));
        }
        document.querySelector('.total-price-basket').innerHTML = sumPrice + " $";
    }

    function updateCounter() {
        if (Object.keys(basketItems).length == 0) {
            notProduct.style.display = "block";
            productHead.style.display = "none";
            totaPriceContainer.style.display = "none";
            btnCheckout.style.display = "none";
            basketCounter.style.opacity = "0";
        } else {
            notProduct.style.display = "none";
            productHead.style.display = "block";
            totaPriceContainer.style.display = "flex";
            btnCheckout.style.display = "inline-block";
            basketCounter.style.opacity = "1";
            basketCounter.innerHTML = Object.keys(basketItems).length;
        }
    }

    function showProductsInBusket() {
        let tableBody = '';
        for (const [key, value] of Object.entries(basketItems)) {
            tableBody += `
                <tr class="product" data-id="${key}">
                    <td class="photo-product">
                        <img src="${value.src}", alt="${value.alt}">
                    <td class="name-product">${value.name}</td>
                    <td class="price-product">${value.price}</td>
                    <td class="count-product">
                    <div class="flex">
                    <button class="delite-product"> - </button>
                    <input class="counter-product" type="number" value="${value.amount}">
                    <button class="add-product"> + </button>
                    </div>
                    </td>
                    <td class="total-price-product">${value.amount * parseInt(value.price)} $</td>
                    <td>
                        <button class="delite-products"> 
                            <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="100%" version="1.1" viewBox="0 0 24 24" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Icon"><path d="M4.251,9.031c-0,0 0.194,4.655 0.34,8.167c0.106,2.544 2.199,4.552 4.746,4.552c1.68,0 3.646,0 5.326,0c2.547,0 4.64,-2.008 4.746,-4.552c0.146,-3.512 0.34,-8.167 0.34,-8.167c0.018,-0.413 -0.304,-0.763 -0.718,-0.78c-0.413,-0.018 -0.763,0.304 -0.78,0.718c-0,-0 -0.194,4.655 -0.341,8.166c-0.072,1.741 -1.505,3.115 -3.247,3.115c-1.68,0 -3.646,0 -5.326,-0c-1.742,0 -3.175,-1.374 -3.247,-3.115c-0.147,-3.511 -0.341,-8.166 -0.341,-8.166c-0.017,-0.414 -0.367,-0.736 -0.78,-0.718c-0.414,0.017 -0.736,0.367 -0.718,0.78Z"/><path d="M7.459,5.25l0.374,-1.12c0.374,-1.123 1.425,-1.88 2.609,-1.88c0.944,0 2.172,0 3.116,0c1.184,-0 2.235,0.757 2.609,1.88l0.374,1.12l3.459,0c0.414,-0 0.75,0.336 0.75,0.75c0,0.414 -0.336,0.75 -0.75,0.75l-16,0c-0.414,-0 -0.75,-0.336 -0.75,-0.75c0,-0.414 0.336,-0.75 0.75,-0.75l3.459,0Zm7.5,0l-0.215,-0.645c-0.17,-0.511 -0.647,-0.855 -1.186,-0.855c-0.944,-0 -2.172,-0 -3.116,0c-0.539,-0 -1.016,0.344 -1.186,0.855l-0.215,0.645l5.918,0Z"/></g></svg>
                        </button>
                    </td>
                </tr>
            `;
        }
        showTotalPrice();
        productContainer.innerHTML = tableBody;
        const counterProducts = document.querySelectorAll('.counter-product');
        const addProducts = document.querySelectorAll('.add-product');
        const deliteProducts = document.querySelectorAll('.delite-product');
        const deliteAllProducts = document.querySelectorAll('.delite-products');

        deliteAllProduct(deliteAllProducts);
        counterProduct(counterProducts);
        deliteProduct(deliteProducts);
        addProduct(addProducts);
    }

    function addProduct(addProducts) {
        addProducts.forEach(element => {
            element.onclick = () => {
                const cart = element.closest('.product');
                const idCart = cart.dataset.id;
                const counterProduct = cart.querySelector('.counter-product');
                basketItems[idCart].amount++;
                counterProduct.value = basketItems[idCart].amount;
                cart.querySelector('.total-price-product').innerHTML = `${basketItems[idCart].amount * parseInt(basketItems[idCart].price)} $`;
                localStorage["basketItems"] = JSON.stringify(basketItems);
                showTotalPrice();
            };
        });
    }

    function deliteProduct(deliteProducts) {
        deliteProducts.forEach(element => {
            element.onclick = () => {
                const cart = element.closest('.product');
                const idCart = cart.dataset.id;
                const counterProduct = cart.querySelector('.counter-product');
                if (basketItems[idCart].amount > 1) {
                    basketItems[idCart].amount--;
                    cart.querySelector('.total-price-product').innerHTML = `${basketItems[idCart].amount * parseInt(basketItems[idCart].price)} $`;
                    counterProduct.value = basketItems[idCart].amount;
                    showTotalPrice();
                    localStorage["basketItems"] = JSON.stringify(basketItems);
                }
            };
        });
    }

    function deliteAllProduct(deliteAllProducts) {
        deliteAllProducts.forEach(element => {
            element.onclick = (e) => {
                const cart = element.closest('.product');
                const idCart = cart.dataset.id;
                delete basketItems[idCart];
                cart.remove();
                cart.style.display = "none"
                // showProductsInBusket();
                showTotalPrice();
                updateCounter();
                localStorage["basketItems"] = JSON.stringify(basketItems);
            };
        });
    }

    function counterProduct(counterProducts) {
        counterProducts.forEach(element => {
            element.addEventListener('input', function (e) {
                const cart = element.closest('.product');
                const idCart = cart.dataset.id;
                basketItems[idCart].amount = element.value;
                element.value = basketItems[idCart].amount;
                localStorage["basketItems"] = JSON.stringify(basketItems);
                cart.querySelector('.total-price-product').innerHTML = `${basketItems[idCart].amount * parseInt(basketItems[idCart].price)} $`;
                showTotalPrice();
                updateCounter();
            });
        });
    }

    function filterCards() {
        const cardsWorksPhoto = document.querySelectorAll('.photo-card');
        const worksMenu = document.querySelectorAll('.menu-category');
        let currentCategory;

        // let delayTimeAnim = 1.3;
        // for (let index = 0; index < cardsWorksPhoto.length; index++) {
        //     const element = cardsWorksPhoto[index]; 
        //     element.style.transition = `all .3s ease ${delayTimeAnim}s`;
        //     delayTimeAnim = delayTimeAnim + 0.2;
        // }

        if (localStorage["currentCategory"]) {
            filter(localStorage["currentCategory"], cardsWorksPhoto);
            worksMenu.forEach(element => {
                if (element.dataset.filter == localStorage["currentCategory"]) {
                    element.classList.add('active-category');
                }
            });
        }


        function filter(category, items) {
            items.forEach(item => {
                const categoryItem = item.querySelector(".works-photo__description").innerHTML.split(" ").includes(category);
                const isShowAll = category === 'all';
                if (!categoryItem && !isShowAll) {
                    item.classList.add('anim-card');
                } else {
                    item.classList.remove('anim-card');
                }
            });
        }

        worksMenu.forEach(element => {
            element.addEventListener('click', (e) => {
                worksMenu.forEach(el => {
                    el.classList.remove('active-category');
                });
                e.preventDefault();
                element.classList.add('active-category');
                currentCategory = element.dataset.filter;
                filter(currentCategory, cardsWorksPhoto);
                localStorage["currentCategory"] = currentCategory;
            })
        });
    }
}

// tripl click
function tripleClick() {
    const tripleClick = document.querySelector(".rock-solid svg")

    let timer;
    tripleClick.addEventListener("dblclick", function () {
        timer = setTimeout(function () {
            timer = null;
        }, 200);
    });

    tripleClick.addEventListener("click", function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
            changeInClick();
        }
    });

    function changeInClick() {
        const changeClicks = document.querySelectorAll(".services-card h3")
        changeClicks.forEach(element => {
            element.innerText = "Yeah, you did triple-click!!!"
        });
    }
}
// scroll

// let homeMenuLinks = document.querySelectorAll(".home-menu a"),
//     interval;
// const btnGetInTouch = document.querySelectorAll("a.btn-home.roboto");

// let hamburger = document.querySelector(".hamburger");
// let homeMenu = document.querySelector(".home-menu");
// let isMobile = false;

// hamburger.onclick = toggleMenu;

// window.onresize = function(event) {
//     isMobile = window.innerWidth < 768
// };

// window.dispatchEvent(new Event('resize'));

// function toggleMenu() {
//     homeMenu.classList.toggle ("active-burger");
//     hamburger.classList.toggle ("open");
// }
// let interval;
// function scrollToBlock(href) {
//     let target = document.querySelector(href),
//         targetLocation = target.getBoundingClientRect().top + window.pageYOffset, //положення цілі
//         currentPosition = window.pageYOffset, //поточна позиція
//         direction, //напрямок скролу
//         pixelScroll = 1, // швидкість скролу 
//         pixelsLeft; //залишилось пікселів до цілі
//     if (!header.classList.contains("header-hidden") && targetLocation < window.pageYOffset) {
//         targetLocation = target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight;
//     } 
//     if (targetLocation > currentPosition) {
//         direction = "down";
//     } else {
//         direction = "up";
//     }
//     clearInterval(interval);
//     interval = setInterval(()=> {
//         pixelsLeft = Math.abs(targetLocation - window.pageYOffset);
        
//         if (pixelScroll <= 50 && pixelsLeft > (window.innerHeight * 0.35)) {
//             pixelScroll *= 1.2;
//         } else if (pixelsLeft < (window.innerHeight * 0.35)  && pixelScroll > 3) {
//             pixelScroll *= 0.8;
//         }

//         if(direction == "down"){
//             window.scrollTo(0, window.pageYOffset + pixelScroll);
//         } else {
//             window.scrollTo(0, window.pageYOffset - pixelScroll);
//         }

//         if (Math.abs(window.pageYOffset - targetLocation) <= 3) {
//             window.scrollTo(0, targetLocation);
//             clearInterval(interval);
//         } else if (Math.abs(window.pageYOffset + window.innerHeight - document.body.getBoundingClientRect().height) < 5 ) {
//             clearInterval(interval);
//         }
//     }, 20)
// }

// homeMenuLinks.forEach(element => {
//     element.onclick = function (event) {
//         event.preventDefault();
//         scrollToBlock(this.getAttribute("href"));
//     } 
// });


/* ------------------------------------------------*/

// burger-menu and scroll

// function ajaxForm(form, method, requestURL) {
//     const promise = new Promise((resolve, reject) => {
//         const formData = new FormData(form);
//         return fetch(requestURL, {
//             method: method,
//             body: formData
//         }).then(response => {
//             form.reset();
//             return (response.ok) ? resolve(response) : reject(response)
//         })
//     });
//     return promise;
// }

// document.querySelector('#contactForms').onsubmit = function (e) { // id form
//     e.preventDefault();
//     ajaxForm(this, 'POST', '../docs/php/getStarted.php') // method, action
//         .then(response => response.text()) // все що після відправки
//         .then(response => {
//             console.log(response);
//         });
// }



// const basketCounter = document.querySelector('.basket-counter');
// const productContainer = document.querySelector('.products-container');
// const notProduct = document.querySelector('.product-none');
// const btnCheckout = document.querySelector('.popap-checkout');





// class Shop {
//     constructor(product = {}) {
//         this.product = product;
//     }

//     addProduct(name, price, amount) { // поставка продуктов в магазин
//         this.product[name] = {"price": price, "amount": amount};
//     }

//     productList(obj) { // вывод списка продуктов на экран
//         const products = document.querySelector('#products');
//         for (const [key, value] of Object.entries(obj)) { 
//             const product = document.createElement("a");
//             product.href = "#";
//             products.appendChild(product);
//             product.innerHTML = `${key} price ${value.price} uah (available ${value.amount})`;
//         }
//     }
// };

// class Basket {
//     constructor(items = {}) {
//         this.items = items;
//     }

//     addProduct(name, amount) { // добавить товар в корзину
//         if (shop.product[name] && amount <= shop.product[name].amount) {
//             if (this.items[name]) {
//                 let sumAmount = this.items[name].amount + amount;
//                 this.items[name] = {"price": shop.product[name].price, "amount": sumAmount};
//             } else {
//                 this.items[name] = {"price": shop.product[name].price, "amount": amount};
//             }
//             shop.product[name].amount = shop.product[name].amount - amount;
//             // console.log(`%c you have added ${amount} of ${name} to your basket`, 'color: #1E90FF' );
//             this.setTotalPrice();
//             showProductsInBusket ();
//             localStorage["basketItems"] = JSON.stringify(basket.items);
//         } else {
//             console.log("%c This item is out of stock", 'color: #8B0000');
//         }
//     }
//     setTotalPrice() { // общая сумма товаров в корзине
//         this.summPrise = 0;
//         for(const [key, value] of Object.entries(this.items)) { 
//             if (value.amount > 0) {
//                 let summ = value.price * value.amount;
//                 this.summPrise += summ;
//             }
//         }
//     }
//     removeProduct(name) { // удалить один товар из корзины
//         if (this.items[name]) {
//             shop.product[name].amount = shop.product[name].amount + this.items[name].amount;
//             delete this.items[name];
//             this.setTotalPrice();
//             localStorage["basketItems"] = JSON.stringify(basket.items);
//         }
//     }
//     remove() { // удалить все товары из корзины
//         for(const [key, value] of Object.entries(this.items)) { 
//             delete this.items[key];
//             shop.product[key].amount = shop.product[key].amount + value.amount;
//         }
//         localStorage["basketItems"] = JSON.stringify(basket.items);
//         this.setTotalPrice();
//     }

//     static updateCounter () {
//         const basketItems = Object.keys(basket.items);
//         if (basketItems.length == 0) {
//             notProduct.style.display = "block";
//             productContainer.style.display = "none";
//             btnCheckout.style.display = "none";
//             basketCounter.style.opacity = "0";
//         } else {
//             notProduct.style.display = "none";
//             productContainer.style.display = "block";
//             btnCheckout.style.display = "inline-block";
//             basketCounter.style.opacity = "1";
//             basketCounter.innerHTML = basketItems.length;
//         }
//     }
// }

// class Customer {
//     constructor(customers = {}) {
//         this.customers = customers;
//     }

//     addCustomer(name,  age) { // добавить покупателей
//         this.customers[name] = {"name": name, "age": age, "cash": rand(20, 200), "basket": new Basket()};
//     }

//     outputOnSelect() { // вывод покупателей в селект
//         const buyer = document.querySelector('#buyer');
//         const infoBuyer = document.querySelector('#infoBuyer');
//         for(const [key, value] of Object.entries(this.customers)) { 
//             const customerName = document.createElement("option");
//             buyer.appendChild(customerName);
//             customerName.innerHTML = `${key}, ${value.age} лет (${value.cash}uah)`;
//         }
//     }

//     payOff() {  // скупиться
//         if (this.age < 18 && this.basket.items.beer) {
//             console.log(`%c you can't by beer, you are not 18 `, 'color: #008000'); 
//             this.basket.removeProduct("beer");
//             this.basket.setTotalPrice();  
//         }
//         if (this.basket.summPrise <= this.cash) {
//             console.log(`%c you have successfully paid for the goods and purchased:`, 'color: #008000'); 
//             for(const [key, value] of Object.entries(this.basket.items)) { 
//                 console.log(`%c - ${key}`, 'color: #008000'); 
//             }    
//             this.cash = this.cash - this.basket.summPrise;
//             console.log(`%c the total amount of goods is ${this.basket.summPrise} uah account balance ${this.cash}`, 'color: #008000');             
//             this.basket.remove();
//         } else if (this.basket.summPrise > this.cash) {
//             console.log("%c You don't have enough money", 'color: #FF0000');
//             for(const [key, value] of Object.entries(this.basket.items)) { 
//                 shop.product[key].amount = shop.product[key].amount + value.amount;
//             } 
//         }
//     }
// }
// const shop = new Shop();
// const basket = new Basket();
// const deleteProduct = document.querySelectorAll('.delite-products svg');
// console.log(shop);

// if (localStorage["basketItems"] ) {
//     basket.items = JSON.parse(localStorage["basketItems"])
// }


// if (localStorage["shopProduct"] ) {
//     shop.product = JSON.parse(localStorage["shopProduct"])
// } else {
//     cardsWorksPhoto.forEach(element => {
//         const nameProduct = element.querySelector('.works-photo__title').textContent
//         const priceProduct = element.querySelector('.works-photo__price').textContent
//         element.querySelector('.works-photo__btn').dataset.item = nameProduct;
//         shop.addProduct(nameProduct, parseInt(priceProduct), rand(1, 10));
//     });
// }

// showProductsInBusket ();
// cardsWorksPhoto.forEach(element => {
//     const nameProduct = element.querySelector('.works-photo__title').textContent
//     element.querySelector('.works-photo__btn').onclick = function (e) {
//         e.preventDefault();
//         basket.addProduct(nameProduct, 1);
//         Basket.updateCounter();
//         localStorage["shopProduct"] = JSON.stringify(shop.product)
//     }
// });

// deleteProduct.forEach(element => {
//     element.onclick = function () {
//         let productsInBusket = document.querySelectorAll(".product");
//         basket.removeProduct(element.dataset.name);
//         productsInBusket.forEach(el => {
//             if (el.dataset.atr == element.dataset.name) {
//                 el.remove()
//             }
//         });
//         showProductsInBusket ()
//         console.log(basket.items);
//     }
// });
// localStorage["shopProduct"] = JSON.stringify(shop.product)


// Basket.updateCounter();

function rand(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}

// function showProductsInBusket () {
//     const productsContainer = document.querySelector(".products-container tbody");
//     // productsContainer.querySelectorAll(".clone").forEach(clone => {
//     //     clone.remove();
//     // });
//     let productsInBusket = document.querySelectorAll(".product"),
//         srcProduct,
//         nameProduct,
//         priceProduct,
//         amountProduct,
//         index = 0,
//         summPrise = 0,
//         totalSummPrise = 0;
//     for(const [key, value] of Object.entries(basket.items)) { 
//         cardsWorksPhoto.forEach(element => {
//             if(element.dataset.id == key) {
//                 srcProduct = element.querySelector("img").src;
//                 nameProduct = key;
//                 amountProduct = value.amount;
//                 priceProduct = element.querySelector('.works-photo__price').textContent;
//                 summPrise = parseInt(priceProduct) * amountProduct;
//                 totalSummPrise += summPrise;
//             }
//         });
//         productsInBusket = document.querySelectorAll(".product");
//         if (productsInBusket.length < Object.entries(basket.items).length) {
//             let clone = productsInBusket[0].cloneNode(true);
//             productsContainer.insertAdjacentElement("afterbegin",  clone);
//         }
//         productsInBusket = document.querySelectorAll(".product");
//         productsInBusket[index].dataset.atr = nameProduct;
//         productsInBusket[index].querySelector(".delite-products svg").dataset.name = nameProduct;
//         productsInBusket[index].querySelector("img").src = srcProduct;
//         productsInBusket[index].querySelector(".name-product").innerHTML = nameProduct;
//         productsInBusket[index].querySelector(".counter-product").innerHTML = amountProduct;
//         productsInBusket[index].querySelector(".price-product").innerHTML = priceProduct;
//         productsInBusket[index].querySelector(".total-price-product").innerHTML = summPrise + " $";
//         index++;
//     }
//     productsContainer.querySelector(".total-price-basket").innerHTML = totalSummPrise+ " $";
// }

// const cardsWorksPhoto = document.querySelectorAll('.photo-card');
// const basketCounter = document.querySelector('.basket-counter');
// const productContainer = document.querySelector('.products-container');
// const notProduct = document.querySelector('.product-none');
// const btnCheckout = document.querySelector('.popap-checkout');

// class Shop {
//     constructor (selectorShop, selectorBusket) {
//         this.busketBlock = document.querySelector(selectorBusket);
//         this.shopBlock = document.querySelector(selectorShop);
//         this.basketCounter = this.busketBlock.querySelector(".basket-counter");
//         this.shopCards = this.shopBlock.children;
//         this.product = {};
//     }

//     addProduct() { // поставка продуктов в магазин
//         for(const [key, value] of Object.entries(this.shopCards)) { 
//             const nameProduct = value.querySelector('.works-photo__title').textContent
//             const priceProduct = value.querySelector('.works-photo__price').textContent
//             this.product[nameProduct] = {'price': parseInt(priceProduct), 'amount': rand(1, 10)}
//         }
//         console.log(this.product)
//     }
// }

// new Shop('.works-photo', '.basket').addProduct();

// const homeBtn = document.querySelector('#getStarted');

// homeBtn.onclick = function (e) {
//     e.preventDefault();
    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", '../docs/php/getStarted.php', true);
    // xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    // xhr.onload = () => {
    //     homeBtn.innerHTML = xhr.responseText;
    // }
    // let params = `rol=admin`
    // xhr.send(params);
    // sendAjaxFetch ("POST", '../docs/php/getStarted.php', params = "rol=admin")
    //     .then(params => {
            // homeBtn.innerHTML = params;
            // console.log(params)
//         })
// }
// function sendAjaxFetch (method, url, params = null) {
//     const headers = {
        // "Content-Type": "aplication/json"
        // "Content-Type": "text/html"
        // "Content-Type": ""
        // "Content-Type": "application/x-www-form-urlencoded"
    // }
//     return fetch(url, {
//         method: method,
//         body: JSON.stringify(params),
//         // body: params,
//         headers: headers
//     }).then(response => { // переменная в которую вернулись данные
//         if (response.ok) return response.text()
//         return response.then(error => {})
//     })
// }

// function sendAjax (url) {
//     return fetch(url).then(data => {
//         return data
//     })
// }

// fetch('../docs/php/getStarted.php')
//     .then(data => {
//         return data;
//         console.log(data);
//     })

// const myPromise = new Promise ((resolve, reject) => {
//     console.log("prepair data...");
//     setTimeout(() => {
//         const becendData = {name: "Dmitriy", company: "Hashtag academy"}
//         resolve(becendData)
//     }, 2000);
// })


// myPromise.then((becendData) => {
//     return new Promise ((resolve, reject) => {
//         setTimeout(function() {
//             becendData.type = "Education"
//             resolve(becendData)
//         }, 2000);
//     })
// }).then((becendData) => {console.log('Promise done!')});

// function sendAjax (method, requestURL, params = null) {
//     return new Promise ((resolve, reject) => {
//         const xhr = new XMLHttpRequest()
//         xhr.open(method, requestURL)
//         xhr.responseType = "json"
//         xhr.onerror = () => {
//             reject(xhr.response)
//         }
//         xhr.onload = () => {
//             if(xhr.status == 200) {
//                 reject(xhr.reject)
//             } else {
//                 resolve(xhr.response)
//             }
//         }
//         xhr.send(params)
//     })
// }

// fetch('../docs/php/getStarted.php')
//     .then(data => {
//         return data.json()
//     })
    // .then(data => {
    //     console.log(data[0])
    // })


// let test = sendAjaxFetch("https://jsonplaceholder.typicode.com/users")
// console.log(test)
// // /** Slider by Hashtag team
// //  * .slider                                      - обов'язковий клас для слайдера
// //  * .slider-container                            - обов'язковий клас для контейнера слайдів 
// //  * id                                           - обов'язково задати id

// // .(карточки слайдера)                            - обов'язкові стилі для єффекту FadeOut
// //     opacity: 0
// //     visibility: hidden
// // .(карточки слайдера).active
// //     opacity: 1
// //     visibility: visible

// // .left.slider_navigation                         - класи для заддяння стилів на кнопки
// // .right.slider_navigation                
// // .slider-dot                                     - клас для задання стилів на точки


// //  * const sliderProps = {
// //         isSlidesToScrollAll: false,               - cкролити одразу всі видимі слайди
// //         gap: 20,                                - відстань між слайдами
// //         isArrows: false,                          - наявність стрілочок
// //         isAutoplay: true,                         - автоскролл
// //         autoplaySpeed: 3000                     - швидкість автоскролла
// //         isDots: false,                            - наявність точок знизу слайдера
// //         distanceToDots: 0,                      - паддінг для відображення точок, якщо потрібен
// //         baseCardWidth: widthSliderContainer,    - базова ширина карточок слайдера
// //         transitionCard: "all .8s ease-in-out",  - єффект появи карточок
// //         isEffectFadeOut: false                  - тип слайдера (з плавною появою, або скролом вбік)
// //     }
    
// //  * infinitySlider(selector, settings)
// //         - selector - шлях до слайдера, 
// //         - settings - нестанарні налаштування sliderProps
// //  **/

// // const sliderProps = {
// //     isArrows: true,
// //     isSlidesToScrollAll: true,
// //     baseCardWidth: "263rem",
// //     isAutoplay: true,
// //     gap: 20,
// //     autoplaySpeed: 5000,
// //     transitionCard: "all 1.5s ease-in-out",
// // };

// // const cleintBrandsProp = {
// //     gap: 45,
// //     isAutoplay: true,
// //     autoplaySpeed: 5000,
// //     transitionCard: "all 3s ease",
// //     baseCardWidth: "127rem",
// // };

// // const sliderReview = {
// //     isAutoplay: true,
// //     autoplaySpeed: 6000,
// //     isDots: true,
// //     distanceToDots: 40,
// //     isEffectFadeOut: true,
// //     transitionCard: "all .8s ease-in-out",
// // };

// // window.onresize = function () {
// //     infinitySlider(".slider", sliderProps);
// //     infinitySlider(".slider-brands", cleintBrandsProp);
// //     infinitySlider(".reviews.slider", sliderReview);
// // };

// // function infinitySlider(selector, settings) {  // selector - шлях до слайдера, settings - нестанарні налаштування
// //     let slider = document.querySelector(selector),
// //         positionCards = 0,
// //         sliderContainer = slider.querySelector(".slider-container"),
// //         widthSliderContainer = sliderContainer.getBoundingClientRect().width,
// //         sliderCards = sliderContainer.children,
// //         realCardsLength = sliderCards.length,
// //         heightCards = 0,
// //         cardsCount, widthCards, distanceCards, cloneCard, prevBtnSlider, nextBtnSlider, sliderInterval, maxHeight, sliderDots, touchPoint;
// //     const defaultSettings = {
// //         isSlidesToScrollAll: false,
// //         gap: 0,
// //         isArrows: false,
// //         isDots: false,
// //         distanceToDots: 0,
// //         isAutoplay: false,
// //         autoplaySpeed: 3000,
// //         baseCardWidth: widthSliderContainer,
// //         transitionCard: "all 1s ease-in-out",
// //         isEffectFadeOut: false
// //     };

// //     slider.querySelectorAll(".clone").forEach(clone => {
// //         clone.remove();
// //     });

// //     if (localStorage[slider.id + "Interval"]) {
// //         clearInterval(localStorage[slider.id + "Interval"]);
// //     } 
    
// //     slider.style.position = "relative";
// //     sliderContainer.style.overflow = "hidden";
// //     sliderContainer.style.position = "relative";
// //     sliderContainer.style.width = "100%";
// //     settings = {...defaultSettings, ...settings}; // берем всі аргументи обох об'єктів останній об'єкт в дужках в приоритеті

// //     cardsCount = Math.floor(widthSliderContainer / (parseInt(settings.baseCardWidth) + settings.gap));
// //     distanceCards = settings.gap;
// //     widthCards = (widthSliderContainer - ((cardsCount - 1) * distanceCards)) / cardsCount;
// //     positionCards = 0 - (distanceCards + widthCards);
// //     if (settings.isArrows) creationArrows ();
// //     prevBtnSlider = slider.querySelector('.left.slider_navigation');
// //     nextBtnSlider = slider.querySelector('.right.slider_navigation');
    
// //     if (settings.isArrows && sliderCards.length <= cardsCount) {
// //         prevBtnSlider.style.display = "none";
// //         nextBtnSlider.style.display = "none";
// //     } else if (settings.isArrows) {
// //         prevBtnSlider.style.display = "block";
// //         nextBtnSlider.style.display = "block";
// //     }
    
// //     if (settings.isDots && realCardsLength > 1) {
// //         creationDots ();
// //         sliderDots = document.querySelectorAll('.slider-dot')
// //         for (let i = 0; i < sliderCards.length; i++) {
// //             if (sliderCards[i].classList.contains("active")) {
// //                 sliderDots[i].classList.remove("active");
// //                 sliderCards[i].classList.remove("active");
// //             }
// //         }        
// //         sliderDots[0].classList.add("active");
// //         sliderCards[0].classList.add("active");
// //     }

// //     if (!settings.isEffectFadeOut) creationClons ();
    
// //     sliderCards = sliderContainer.children;
// //     for (let i = 0; i < sliderCards.length; i++) {
// //         sliderCards[i].style.width = widthCards + "px";
// //         sliderCards[i].style.position = "absolute";
// //         maxHeight = sliderCards[i].getBoundingClientRect().height;
// //         if (heightCards < maxHeight) {
// //             heightCards = maxHeight;
// //         }
// //         setTimeout(() => {
// //             sliderCards[i].style.transition = settings.transitionCard; 
// //         }, 1);
// //     }

// //     if (settings.isDots && realCardsLength > 1) {
// //         sliderContainer.style.height = heightCards + settings.distanceToDots + 'px';
// //     } else {
// //         sliderContainer.style.height = heightCards + 'px';
// //     }

// //     function creationClons () {
// //         let counter = 1;
// //         do {
// //             cloneCard = sliderCards[sliderCards.length - counter].cloneNode(true);
// //             cloneCard.classList.add("clone");
// //             cloneCard.style.transition = 'none';
// //             sliderContainer.insertAdjacentElement("afterbegin", cloneCard);
// //             counter++;
// //             realCardsLength = sliderCards.length - slider.querySelectorAll('.clone').length
// //         } while (counter <= realCardsLength && settings.isSlidesToScrollAll); 
        
// //         if (settings.isSlidesToScrollAll) {
// //             counter = 0;
// //             while (counter < realCardsLength) {
// //                 cloneCard = sliderCards[counter].cloneNode(true);
// //                 cloneCard.classList.add("clone");
// //                 cloneCard.style.transition = 'none';
// //                 sliderContainer.insertAdjacentElement("beforeend", cloneCard);
// //                 counter++;
// //             }
// //         }
// //     }

// //     function creationArrows () {
// //         const areArrowsExist = slider.querySelectorAll('.slider_navigation').length;
// //         if (areArrowsExist < 1) {
// //             prevBtnSlider = document.createElement("span");
// //             nextBtnSlider = document.createElement("span");
// //             prevBtnSlider.className = "left slider_navigation";
// //             nextBtnSlider.className = "right slider_navigation";
// //             slider.insertAdjacentElement("afterbegin", prevBtnSlider);
// //             slider.insertAdjacentElement("beforeend", nextBtnSlider);
            
// //             let isClickUnabled = true;
// //             const clickUnabled = () => {
// //                 isClickUnabled = false;
// //                 setTimeout(() => {
// //                     isClickUnabled = true;
// //                 }, (parseFloat(sliderCards[0].style.transitionDuration) * 1000)); 
// //                 console.log(parseFloat(sliderCards[0].style.transitionDuration))
// //             };

// //             prevBtnSlider.onclick = function () {
// //                 if (isClickUnabled) {
// //                     changeSlide("left");    
// //                     clickUnabled();
// //                 }
// //             }
// //             nextBtnSlider.onclick = function () {
// //                 if (isClickUnabled) {
// //                     changeSlide("right");
// //                     clickUnabled();
// //                 }
// //             }
// //         }
// //     }

// //     function creationDots () {
// //         const dotsContainer = slider.querySelector('.isDots-container');
// //         if (!dotsContainer) {
// //             let dotContainer = document.createElement("div");
// //             dotContainer.style.position = "absolute";
// //             dotContainer.className = "dots-container";
// //             dotContainer.style.bottom = "0";
// //             slider.insertAdjacentElement("beforeend", dotContainer);
// //             for (let index = 0; index < realCardsLength; index++) {
// //                 const slideDot = document.createElement("span");
// //                 slideDot.className = "slider-dot";
// //                 slideDot.dataset.order = index;
// //                 dotContainer.insertAdjacentElement("beforeend", slideDot);
// //             }
// //         }
// //     }

// //     function shuffleCard () {
// //         sliderCards = sliderContainer.children;
// //         positionCards = 0 - (distanceCards + widthCards); 
// //         if (settings.isSlidesToScrollAll) {
// //             positionCards = 0 - (distanceCards + widthCards) * realCardsLength; 
// //         } 
// //         for (let i = 0; i < sliderCards.length; i++) {
// //             sliderCards[i].style.left = positionCards + 'px';
// //             positionCards += (distanceCards + widthCards);
// //         }           
// //     }
    
// //     function changeSlide (direction) {
// //         widthSliderContainer = sliderContainer.getBoundingClientRect().width;
// //         cardsCount = Math.floor(widthSliderContainer / (parseInt(settings.baseCardWidth) + settings.gap));
// //         widthCards = (widthSliderContainer - ((cardsCount - 1) * distanceCards)) / cardsCount;
// //         sliderCards = sliderContainer.children;
// //         let slideIndex = 0;
// //         for (let i = 0; i < sliderCards.length; i++) {
// //             if (sliderCards[i].classList.contains("active")) {
// //                 slideIndex = i;
// //             }
// //         }
// //         if (direction == "left") {
// //             if (settings.isSlidesToScrollAll) {
// //                 for (let index = 0; index < cardsCount; index++) {
// //                     sliderContainer.insertAdjacentElement("afterbegin", sliderCards[sliderCards.length - 1]);                
// //                 }   
// //             } else if (settings.isEffectFadeOut) {
// //                 sliderCards[slideIndex].classList.remove("active");
// //                 sliderDots[slideIndex].classList.remove("active");
// //                 sliderCards[slideIndex - 1] ? slideIndex -= 1 : slideIndex = sliderCards.length - 1;
// //                 setTimeout(() => sliderCards[slideIndex].classList.add("active"), 1000);
// //                 setTimeout(() => sliderDots[slideIndex].classList.add("active"), 1000);
// //             } else {
// //                 sliderCards[sliderCards.length - 1].remove();
// //                 let cloneLast = sliderCards[sliderCards.length - 1].cloneNode(true);
// //                 cloneLast.classList.add("clone");
// //                 sliderContainer.insertAdjacentElement("afterbegin", cloneLast);
// //                 sliderCards[1].classList.remove("clone");
// //             }
// //         } else if (direction == "right") {
// //             if (settings.isSlidesToScrollAll) {
// //                 for (let index = 0; index < cardsCount; index++) {
// //                     sliderContainer.insertAdjacentElement("beforeend", sliderCards[0]);                
// //                 }  
// //             } else if (settings.isEffectFadeOut) {
// //                 sliderCards[slideIndex].classList.remove("active");
// //                 sliderDots[slideIndex].classList.remove("active");
// //                 sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
// //                 setTimeout(() => sliderCards[slideIndex].classList.add("active"), 1000);
// //                 setTimeout(() => sliderDots[slideIndex].classList.add("active"), 1000);
// //             } else {              
// //                 sliderCards[0].remove();
// //                 let cloneFirst = sliderCards[0].cloneNode(true);
// //                 cloneFirst.classList.add("clone");
// //                 sliderContainer.insertAdjacentElement("beforeend", cloneFirst);
// //                 sliderCards[sliderCards.length - 2].classList.remove("clone");
// //             }
// //         } 
// //         if (!settings.isEffectFadeOut) shuffleCard();    
// //     }

// //     function startAutoPlay () {
// //         clearInterval(localStorage[slider.id + "Interval"]);
// //         if (settings.isEffectFadeOut) {
// //             let slideIndex = 0;
// //             for (let i = 0; i < sliderCards.length; i++) {
// //                 if (sliderCards[i].classList.contains("active")) {
// //                     slideIndex = i;
// //                 }
// //             }
// //             const setActive = (index) => {
// //                 setTimeout(() => sliderCards[index].classList.add("active"), 1000);
// //                 setTimeout(() => sliderDots[index].classList.add("active"), 1000);
// //             }
// //             sliderInterval = setInterval(() => {
// //                 sliderCards[slideIndex].classList.remove("active");
// //                 sliderDots[slideIndex].classList.remove("active");
// //                 sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
// //                 setActive(slideIndex);
// //             }, settings.autoplaySpeed);
// //         } else {
// //             sliderInterval = setInterval(() => {
// //                 changeSlide ("right");
// //             }, settings.autoplaySpeed);
// //         }
// //         localStorage[slider.id + "Interval"] = sliderInterval;
// //     }

// //     function touchSlider (e) {
// //         if ((touchPoint + 20) < e.touches[0].pageX) {
// //             changeSlide('left');
// //             this.removeEventListener('touchmove', touchSlider);
// //         } else if ((touchPoint - 20) > e.touches[0].pageX) {
// //             changeSlide('right');
// //             this.removeEventListener('touchmove', touchSlider);
// //         }
// //     }

// //     slider.addEventListener('touchend', function () {
// //         if (settings.isAutoplay && realCardsLength > cardsCount) {
// //             startAutoPlay();
// //         }             
// //     });

// //     sliderDots = document.querySelectorAll('.slider-dot');
// //     sliderDots.forEach(element => {
// //         element.onclick = function () {
// //             clearInterval(localStorage[slider.id + "Interval"]);
// //             for (let index = 0; index < realCardsLength; index++) {
// //                 sliderDots[index].classList.remove("active");
// //                 sliderCards[index].classList.remove("active");   
// //             }
// //             sliderCards[element.dataset.order].classList.add("active");
// //             element.classList.add("active");
// //         }
// //     });

// //     if (settings.isAutoplay && realCardsLength > cardsCount) {
// //         startAutoPlay();
// //     } 

// //     slider.ontouchstart = function (e) {
// //         touchPoint = e.touches[0].pageX;
// //         this.addEventListener('touchmove', touchSlider);
// //         clearInterval(localStorage[slider.id + "Interval"]);
// //     };

// //     // slider.ontouchmove = function (e) {
// //     //     console.log(e)
// //     // };


// //     slider.onmouseenter = () => {
// //         clearInterval(localStorage[slider.id + "Interval"]);
// //     };
// //     slider.onmouseleave = () => {
// //         if (settings.isAutoplay && realCardsLength > cardsCount) {
// //             startAutoPlay();
// //         }
// //     };

// //     if (!settings.isEffectFadeOut) shuffleCard();    
// // }
// // // window.addEventListener('mousewheel', this.onWheel)
// // // window.addEventListener('wheel', this.onWheel)
// // // window.addEventListener('resize', _.debounce(this.onResize, 200))

// // // window.addEventListener('mousedown', this.onTouchDown)
// // // window.addEventListener('mousemove', this.onTouchMove)
// // // window.addEventListener('mouseup', this.onTouchUp)


// // /** Slider by Hashtag team
// //  * .slider                                      - обов'язковий клас для слайдера
// //  * .slider-container                            - обов'язковий клас для контейнера слайдів 
// //  * id                                           - обов'язково задати id

// // .(карточки слайдера)                            - обов'язкові стилі для єффекту FadeOut
// //     opacity: 0
// //     visibility: hidden
// // .(карточки слайдера).active
// //     opacity: 1
// //     visibility: visible

// // .left.slider_navigation                         - класи для заддяння стилів на кнопки
// // .right.slider_navigation                
// // .slider-dot                                     - клас для задання стилів на точки


// //  * const sliderProps = {
// //         isSlidesToScrollAll: false,               - cкролити одразу всі видимі слайди
// //         gap: 20,                                - відстань між слайдами
// //         isArrows: false,                          - наявність стрілочок
// //         isAutoplay: true,                         - автоскролл
// //         autoplaySpeed: 3000                     - швидкість автоскролла
// //         isDots: false,                            - наявність точок знизу слайдера
// //         distanceToDots: 0,                      - паддінг для відображення точок, якщо потрібен
// //         baseCardWidth: widthSliderContainer,    - базова ширина карточок слайдера
// //         transitionCard: "all .8s ease-in-out",  - єффект появи карточок
// //         isEffectFadeOut: false                  - тип слайдера (з плавною появою, або скролом вбік)
// //     }

// //  * infinitySlider(selector, settings)
// //         - selector - шлях до слайдера, 
// //         - settings - нестанарні налаштування sliderProps
// //  **/

// class InfinitySlider {
//     constructor(selector, settings = {}) {
//         this.slider = document.querySelector(selector);
//         this.positionCards = 0;
//         this.sliderContainer = this.slider.querySelector(".slider-container");
//         this.sliderCards = this.sliderContainer.children;
//         this.realCardsLength = this.sliderCards.length;
//         this.heightCards = 0;
//         this.widthSliderContainer;
//         this.cardsCount;
//         this.widthCards;
//         this.distanceCards;
//         this.cloneCard;
//         this.prevBtnSlider;
//         this.nextBtnSlider;
//         this.sliderInterval;
//         this.maxHeight;
//         this.sliderDots;
//         this.touchPoint;
//         // this.defaultSettings = {
//         //     isSlidesToScrollAll: false,
//         //     gap: 0,
//         //     isArrows: false,
//         //     isDots: false,
//         //     distanceToDots: 0,
//         //     isAutoplay: false,
//         //     autoplaySpeed: 3000,
//         //     baseCardWidth: this.widthSliderContainer,
//         //     transitionCard: "all 1s ease-in-out",
//         //     isEffectFadeOut: false
//         // };
//         // this.settings = {
//         //     ...this.defaultSettings,
//         //     ...settings
//         // };
//         InfinitySlider.defaultSettings.baseCardWidth = this.widthSliderContainer;
//         this.settings = {
//             ...InfinitySlider.defaultSettings,
//             ...settings
//         };
//     };

//     static defaultSettings = {
//         isSlidesToScrollAll: false,
//         gap: 0,
//         isArrows: false,
//         isDots: false,
//         distanceToDots: 0,
//         isAutoplay: false,
//         autoplaySpeed: 3000,
//         baseCardWidth: null,
//         transitionCard: "all 1s ease-in-out",
//         isEffectFadeOut: false
//     };

//     init() {
//         this.widthSliderContainer = this.sliderContainer.getBoundingClientRect().width;

//         if (this.settings.baseCardWidth == null) this.settings.baseCardWidth = this.widthSliderContainer

//         this.slider.querySelectorAll(".clone").forEach(clone => {
//             clone.remove();
//         });

//         if (localStorage[this.slider.id + "Interval"]) {
//             clearInterval(localStorage[this.slider.id + "Interval"]);
//         }

//         this.slider.style.position = "relative";
//         this.sliderContainer.style.overflow = "hidden";
//         this.sliderContainer.style.position = "relative";
//         this.sliderContainer.style.width = "100%";
        
//         this.cardsCount = Math.floor(this.widthSliderContainer / (parseInt(this.settings.baseCardWidth) + this.settings.gap));
//         if (this.cardsCount == 0) this.cardsCount = 1;
//         this.distanceCards = this.settings.gap;
//         this.widthCards = (this.widthSliderContainer - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount;
//         this.positionCards = 0 - (this.distanceCards + this.widthCards);

//         if (this.settings.isArrows) this.creationArrows();
//         this.prevBtnSlider = this.slider.querySelector('.left.slider_navigation');
//         this.nextBtnSlider = this.slider.querySelector('.right.slider_navigation');
//         if (this.settings.isArrows && this.sliderCards.length <= this.cardsCount) {
//             this.prevBtnSlider.style.display = "none";
//             this.nextBtnSlider.style.display = "none";
//         } else if (this.settings.isArrows) {
//             this.prevBtnSlider.style.display = "block";
//             this.nextBtnSlider.style.display = "block";
//         }
//         if (this.settings.isDots && this.realCardsLength > 1) {
//             this.creationDots();
//             this.sliderDots = document.querySelectorAll('.slider-dot')
//             for (let i = 0; i < this.sliderCards.length; i++) {
//                 if (this.sliderCards[i].classList.contains("activeFade")) {
//                     this.sliderDots[i].classList.remove("activeFade");
//                     this.sliderCards[i].classList.remove("activeFade");
//                 }
//             }
//             this.sliderDots[0].classList.add("activeFade");
//             this.sliderCards[0].classList.add("activeFade");
//         }

//         if (!this.settings.isEffectFadeOut) this.creationClons();
//         this.sliderCards = this.sliderContainer.children;
//         this.heightCards = 0;
//         for (let i = 0; i < this.sliderCards.length; i++) {
//             this.sliderCards[i].style.transition = 'none';
//             this.sliderCards[i].style.width = this.widthCards + "px";
//             this.sliderCards[i].style.position = "absolute";
//             this.maxHeight = this.sliderCards[i].getBoundingClientRect().height;
//             if (this.heightCards < this.maxHeight) {
//                 this.heightCards = this.maxHeight;
//             }
//             setTimeout(() => {
//                 this.sliderCards[i].style.transition = this.settings.transitionCard;
//             }, 1);
//         }

//         if (this.settings.isDots) {
//             this.sliderContainer.style.height = this.heightCards + this.settings.distanceToDots + 'px';
//         } else {
//             this.sliderContainer.style.height = this.heightCards + 'px';
//         }

//         this.slider.addEventListener('touchend', () => {
//             if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
//                 this.startAutoPlay();
//             }
//         });

//         this.sliderDots = document.querySelectorAll('.slider-dot');
//         this.sliderDots.forEach(element => {
//             element.onclick = () => {
//                 clearInterval(localStorage[this.slider.id + "Interval"]);
//                 for (let index = 0; index < this.realCardsLength; index++) {
//                     this.sliderDots[index].classList.remove("activeFade");
//                     this.sliderCards[index].classList.remove("activeFade");
//                 }
//                 this.sliderCards[element.dataset.order].classList.add("activeFade");
//                 element.classList.add("activeFade");
//             }
//         });

//         if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
//             this.startAutoPlay();
//         }
//         this.touchSlider = this.touchSlider.bind(this);

//         this.slider.ontouchstart = (e) => {
//             this.touchPoint = e.touches[0].pageX;
//             this.slider.addEventListener('touchmove', this.touchSlider);
//             clearInterval(localStorage[this.slider.id + "Interval"]);
//         };

//         this.slider.onmouseenter = () => {
//             clearInterval(localStorage[this.slider.id + "Interval"]);
//         };

//         this.slider.onmouseleave = () => {
//             if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
//                 this.startAutoPlay();
//             }
//         };
//         if (!this.settings.isEffectFadeOut) this.shuffleCard();
//     }

//     creationClons() {
//         let counter = 1;
//         do {
//             this.cloneCard = this.sliderCards[this.sliderCards.length - counter].cloneNode(true);
//             this.cloneCard.classList.add("clone");
//             this.cloneCard.style.transition = 'none';
//             this.sliderContainer.insertAdjacentElement("afterbegin", this.cloneCard);
//             counter++;
//             this.realCardsLength = this.sliderCards.length - this.slider.querySelectorAll('.clone').length
//         } while (counter <= this.realCardsLength && this.settings.isSlidesToScrollAll);

//         if (this.settings.isSlidesToScrollAll) {
//             counter = 0;
//             while (counter < this.realCardsLength) {
//                 this.cloneCard = this.sliderCards[counter].cloneNode(true);
//                 this.cloneCard.classList.add("clone");
//                 this.cloneCard.style.transition = 'none';
//                 this.sliderContainer.insertAdjacentElement("beforeend", this.cloneCard);
//                 counter++;
//             }
//         }
//     }


//     creationArrows() {
//         const areArrowsExist = this.slider.querySelectorAll('.slider_navigation').length;
//         if (areArrowsExist < 1) {
//             this.prevBtnSlider = document.createElement("span");
//             this.nextBtnSlider = document.createElement("span");
//             this.prevBtnSlider.className = "left slider_navigation";
//             this.nextBtnSlider.className = "right slider_navigation";
//             this.slider.insertAdjacentElement("afterbegin", this.prevBtnSlider);
//             this.slider.insertAdjacentElement("beforeend", this.nextBtnSlider);

//             let isClickUnabled = true;
//             const clickUnabled = () => {
//                 isClickUnabled = false;
//                 setTimeout(() => {
//                     isClickUnabled = true;
//                 }, (parseFloat(this.sliderCards[0].style.transitionDuration) * 1000));
//             };

//             this.prevBtnSlider.onclick = () => {
//                 if (isClickUnabled) {
//                     this.changeSlide("left");
//                     clickUnabled();
//                 }
//             };
//             this.nextBtnSlider.onclick = () => {
//                 if (isClickUnabled) {
//                     this.changeSlide("right");
//                     clickUnabled();
//                 }
//             };
//         }
//     }

//     creationDots() {
//         const dotsContainer = this.slider.querySelector('.dots-container');
//         if (!dotsContainer) {
//             let dotContainer = document.createElement("div");
//             dotContainer.style.position = "absolute";
//             dotContainer.className = "dots-container";
//             dotContainer.style.bottom = "0";
//             this.slider.insertAdjacentElement("beforeend", dotContainer);
//             for (let index = 0; index < this.realCardsLength; index++) {
//                 const slideDot = document.createElement("span");
//                 slideDot.className = "slider-dot";
//                 slideDot.dataset.order = index;
//                 dotContainer.insertAdjacentElement("beforeend", slideDot);
//             }
//         }
//     }

//     shuffleCard() {
//         this.sliderCards = this.sliderContainer.children;
//         this.positionCards = 0 - (this.distanceCards + this.widthCards);
//         if (this.settings.isSlidesToScrollAll) {
//             this.positionCards = 0 - (this.distanceCards + this.widthCards) * this.realCardsLength;
//         }
//         for (let i = 0; i < this.sliderCards.length; i++) {
//             this.sliderCards[i].style.left = this.positionCards + 'px';
//             this.positionCards += (this.distanceCards + this.widthCards);
//         }
//     }

//     changeSlide(direction) {
//         this.widthSliderContainer = this.sliderContainer.getBoundingClientRect().width;
//         this.cardsCount = Math.floor(this.widthSliderContainer / (parseInt(this.settings.baseCardWidth) + this.settings.gap));
//         if (this.cardsCount == 0) this.cardsCount = 1;
//         this.widthCards = (this.widthSliderContainer - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount;
//         this.sliderCards = this.sliderContainer.children;
//         let slideIndex = 0;
//         for (let i = 0; i < this.sliderCards.length; i++) {
//             if (this.sliderCards[i].classList.contains("activeFade")) {
//                 slideIndex = i;
//             }
//         }
//         if (direction == "left") {
//             if (this.settings.isSlidesToScrollAll) {
//                 for (let index = 0; index < this.cardsCount; index++) {
//                     this.sliderContainer.insertAdjacentElement("afterbegin", this.sliderCards[this.sliderCards.length - 1]);
//                 }
//             } else if (this.settings.isEffectFadeOut) {
//                 this.sliderCards[slideIndex].classList.remove("activeFade");
//                 this.sliderDots[slideIndex].classList.remove("activeFade");
//                 this.sliderCards[slideIndex - 1] ? slideIndex -= 1 : slideIndex = this.sliderCards.length - 1;
//                 setTimeout(() => this.sliderCards[slideIndex].classList.add("activeFade"), 1000);
//                 setTimeout(() => this.sliderDots[slideIndex].classList.add("activeFade"), 1000);
//             } else {
//                 this.sliderCards[this.sliderCards.length - 1].remove();
//                 let cloneLast = this.sliderCards[this.sliderCards.length - 1].cloneNode(true);
//                 cloneLast.classList.add("clone");
//                 this.sliderContainer.insertAdjacentElement("afterbegin", cloneLast);
//                 this.sliderCards[1].classList.remove("clone");
//             }
//         } else if (direction == "right") {
//             if (this.settings.isSlidesToScrollAll) {
//                 for (let index = 0; index < this.cardsCount; index++) {
//                     this.sliderContainer.insertAdjacentElement("beforeend", this.sliderCards[0]);
//                 }
//             } else if (this.settings.isEffectFadeOut) {
//                 this.sliderCards[slideIndex].classList.remove("activeFade");
//                 this.sliderDots[slideIndex].classList.remove("activeFade");
//                 this.sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
//                 setTimeout(() => this.sliderCards[slideIndex].classList.add("activeFade"), 1000);
//                 setTimeout(() => this.sliderDots[slideIndex].classList.add("activeFade"), 1000);
//             } else {
//                 this.sliderCards[0].remove();
//                 let cloneFirst = this.sliderCards[0].cloneNode(true);
//                 cloneFirst.classList.add("clone");
//                 this.sliderContainer.insertAdjacentElement("beforeend", cloneFirst);
//                 this.sliderCards[this.sliderCards.length - 2].classList.remove("clone");
//             }
//         }
//         if (!this.settings.isEffectFadeOut) this.shuffleCard();
//     }

//     startAutoPlay() {
//         clearInterval(localStorage[this.slider.id + "Interval"]);
//         if (this.settings.isEffectFadeOut) {
//             let slideIndex = 0;
//             for (let i = 0; i < this.sliderCards.length; i++) {
//                 if (this.sliderCards[i].classList.contains("activeFade")) {
//                     slideIndex = i;
//                 }
//             }
//             const setActive = (index) => {
//                 setTimeout(() => this.sliderCards[index].classList.add("activeFade"), 1000);
//                 setTimeout(() => this.sliderDots[index].classList.add("activeFade"), 1000);
//             }
//             this.sliderInterval = setInterval(() => {
//                 this.sliderCards[slideIndex].classList.remove("activeFade");
//                 this.sliderDots[slideIndex].classList.remove("activeFade");
//                 this.sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
//                 setActive(slideIndex);
//             }, this.settings.autoplaySpeed);
//         } else {
//             this.sliderInterval = setInterval(() => {
//                 this.changeSlide("right");
//             }, this.settings.autoplaySpeed);
//         }
//         localStorage[this.slider.id + "Interval"] = this.sliderInterval;
//     }

//     touchSlider(e) {
//         if ((this.touchPoint + 20) < e.touches[0].pageX) {
//             this.changeSlide('left');
//             this.slider.removeEventListener('touchmove', this.touchSlider);
//         } else if ((this.touchPoint - 20) > e.touches[0].pageX) {
//             this.changeSlide('right');
//             this.slider.removeEventListener('touchmove', this.touchSlider);
//         }
//     }
// }


// const sliderBoys = new InfinitySlider(".slider", {
//     isArrows: true,
//     isSlidesToScrollAll: true,
//     baseCardWidth: "263rem",
//     isAutoplay: true,
//     gap: 20,
//     autoplaySpeed: 5000,
//     transitionCard: "all 1.5s ease-in-out",
// });

// const sliderBrands = new InfinitySlider(".slider-brands", {
//     gap: 45,
//     isAutoplay: true,
//     autoplaySpeed: 5000,
//     transitionCard: "all 3s ease",
//     baseCardWidth: "127rem",
// });

// const sliderReviews = new InfinitySlider(".reviews.slider", {
//     isAutoplay: true,
//     autoplaySpeed: 6000,
//     isDots: true,
//     distanceToDots: 40,
//     isEffectFadeOut: true,
//     transitionCard: "all .8s ease-in-out",
// });

// sliderBoys.init();
// sliderBrands.init();
// sliderReviews.init();

// window.onresize = function () {
//     sliderBoys.init();
//     sliderBrands.init();
//     sliderReviews.init();        
// };