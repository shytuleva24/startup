/** Slider by Hashtag team
 * .slider                                      - обов'язковий клас для слайдера
 * .slider-container                            - обов'язковий клас для контейнера слайдів 
 * id                                           - обов'язково задати id

.(карточки слайдера)                            - обов'язкові стилі для єффекту FadeOut
    opacity: 0
    visibility: hidden
.(карточки слайдера).active
    opacity: 1
    visibility: visible

.left.slider_navigation                         - класи для заддяння стилів на кнопки
.right.slider_navigation                
.slider-dot                                     - клас для задання стилів на точки


 * const sliderProps = {
        isSlidesToScrollAll: false,               - cкролити одразу всі видимі слайди
        gap: 20,                                - відстань між слайдами
        isArrows: false,                          - наявність стрілочок
        isAutoplay: true,                         - автоскролл
        autoplaySpeed: 3000                     - швидкість автоскролла
        isDots: false,                            - наявність точок знизу слайдера
        distanceToDots: 0,                      - паддінг для відображення точок, якщо потрібен
        baseCardWidth: widthSliderContainer,    - базова ширина карточок слайдера
        transitionCard: "all .8s ease-in-out",  - єффект появи карточок
        isEffectFadeOut: false                  - тип слайдера (з плавною появою, або скролом вбік)
    }
    
 * infinitySlider(selector, settings)
        - selector - шлях до слайдера, 
        - settings - нестанарні налаштування sliderProps
 **/

const sliderProps = {
    isArrows: true,
    isSlidesToScrollAll: true,
    baseCardWidth: "263rem",
    isAutoplay: true,
    gap: 20,
    autoplaySpeed: 5000,
    transitionCard: "all 1.5s ease-in-out",
};

const cleintBrandsProp = {
    gap: 45,
    isAutoplay: true,
    autoplaySpeed: 5000,
    transitionCard: "all 3s ease",
    baseCardWidth: "127rem",
};

const sliderReview = {
    isAutoplay: true,
    autoplaySpeed: 6000,
    isDots: true,
    distanceToDots: 40,
    isEffectFadeOut: true,
    transitionCard: "all .8s ease-in-out",
};

window.onresize = function () {
    infinitySlider(".slider", sliderProps);
    infinitySlider(".slider-brands", cleintBrandsProp);
    infinitySlider(".reviews.slider", sliderReview);
};

function infinitySlider(selector, settings) {  // selector - шлях до слайдера, settings - нестанарні налаштування
    let slider = document.querySelector(selector),
        positionCards = 0,
        sliderContainer = slider.querySelector(".slider-container"),
        widthSliderContainer = sliderContainer.getBoundingClientRect().width,
        sliderCards = sliderContainer.children,
        realCardsLength = sliderCards.length,
        heightCards = 0,
        cardsCount, widthCards, distanceCards, cloneCard, prevBtnSlider, nextBtnSlider, sliderInterval, maxHeight, sliderDots, touchPoint;
    const defaultSettings = {
        isSlidesToScrollAll: false,
        gap: 0,
        isArrows: false,
        isDots: false,
        distanceToDots: 0,
        isAutoplay: false,
        autoplaySpeed: 3000,
        baseCardWidth: widthSliderContainer,
        transitionCard: "all 1s ease-in-out",
        isEffectFadeOut: false
    };

    slider.querySelectorAll(".clone").forEach(clone => {
        clone.remove();
    });

    if (localStorage[slider.id + "Interval"]) {
        clearInterval(localStorage[slider.id + "Interval"]);
    } 
    
    slider.style.position = "relative";
    sliderContainer.style.overflow = "hidden";
    sliderContainer.style.position = "relative";
    sliderContainer.style.width = "100%";
    settings = {...defaultSettings, ...settings}; // берем всі аргументи обох об'єктів останній об'єкт в дужках в приоритеті

    cardsCount = Math.floor(widthSliderContainer / (parseInt(settings.baseCardWidth) + settings.gap));
    distanceCards = settings.gap;
    widthCards = (widthSliderContainer - ((cardsCount - 1) * distanceCards)) / cardsCount;
    positionCards = 0 - (distanceCards + widthCards);
    if (settings.isArrows) creationArrows ();
    prevBtnSlider = slider.querySelector('.left.slider_navigation');
    nextBtnSlider = slider.querySelector('.right.slider_navigation');
    
    if (settings.isArrows && sliderCards.length <= cardsCount) {
        prevBtnSlider.style.display = "none";
        nextBtnSlider.style.display = "none";
    } else if (settings.isArrows) {
        prevBtnSlider.style.display = "block";
        nextBtnSlider.style.display = "block";
    }
    
    if (settings.isDots && realCardsLength > 1) {
        creationDots ();
        sliderDots = document.querySelectorAll('.slider-dot')
        for (let i = 0; i < sliderCards.length; i++) {
            if (sliderCards[i].classList.contains("active")) {
                sliderDots[i].classList.remove("active");
                sliderCards[i].classList.remove("active");
            }
        }        
        sliderDots[0].classList.add("active");
        sliderCards[0].classList.add("active");
    }

    if (!settings.isEffectFadeOut) creationClons ();
    
    sliderCards = sliderContainer.children;
    for (let i = 0; i < sliderCards.length; i++) {
        sliderCards[i].style.width = widthCards + "px";
        sliderCards[i].style.position = "absolute";
        maxHeight = sliderCards[i].getBoundingClientRect().height;
        if (heightCards < maxHeight) {
            heightCards = maxHeight;
        }
        setTimeout(() => {
            sliderCards[i].style.transition = settings.transitionCard; 
        }, 1);
    }

    if (settings.isDots && realCardsLength > 1) {
        sliderContainer.style.height = heightCards + settings.distanceToDots + 'px';
    } else {
        sliderContainer.style.height = heightCards + 'px';
    }

    function creationClons () {
        let counter = 1;
        do {
            cloneCard = sliderCards[sliderCards.length - counter].cloneNode(true);
            cloneCard.classList.add("clone");
            cloneCard.style.transition = 'none';
            sliderContainer.insertAdjacentElement("afterbegin", cloneCard);
            counter++;
            realCardsLength = sliderCards.length - slider.querySelectorAll('.clone').length
        } while (counter <= realCardsLength && settings.isSlidesToScrollAll); 
        
        if (settings.isSlidesToScrollAll) {
            counter = 0;
            while (counter < realCardsLength) {
                cloneCard = sliderCards[counter].cloneNode(true);
                cloneCard.classList.add("clone");
                cloneCard.style.transition = 'none';
                sliderContainer.insertAdjacentElement("beforeend", cloneCard);
                counter++;
            }
        }
    }

    function creationArrows () {
        const areArrowsExist = slider.querySelectorAll('.slider_navigation').length;
        if (areArrowsExist < 1) {
            prevBtnSlider = document.createElement("span");
            nextBtnSlider = document.createElement("span");
            prevBtnSlider.className = "left slider_navigation";
            nextBtnSlider.className = "right slider_navigation";
            slider.insertAdjacentElement("afterbegin", prevBtnSlider);
            slider.insertAdjacentElement("beforeend", nextBtnSlider);
            
            let isClickUnabled = true;
            const clickUnabled = () => {
                isClickUnabled = false;
                setTimeout(() => {
                    isClickUnabled = true;
                }, 1000); 
            };
            prevBtnSlider.onclick = function () {
                if (isClickUnabled) {
                    changeSlide("left");    
                    clickUnabled();
                }
            }
            nextBtnSlider.onclick = function () {
                if (isClickUnabled) {
                    changeSlide("right");
                    clickUnabled();
                }
            }
        }
    }

    function creationDots () {
        const dotsContainer = slider.querySelector('.dots-container');
        if (!dotsContainer) {
            let dotContainer = document.createElement("div");
            dotContainer.style.position = "absolute";
            dotContainer.className = "dots-container";
            dotContainer.style.bottom = "0";
            slider.insertAdjacentElement("beforeend", dotContainer);
            for (let index = 0; index < realCardsLength; index++) {
                const slideDot = document.createElement("span");
                slideDot.className = "slider-dot";
                slideDot.dataset.order = index;
                dotContainer.insertAdjacentElement("beforeend", slideDot);
            }
        }
    }

    function shuffleCard () {
        sliderCards = sliderContainer.children;
        positionCards = 0 - (distanceCards + widthCards); 
        if (settings.isSlidesToScrollAll) {
            positionCards = 0 - (distanceCards + widthCards) * realCardsLength; 
        } 
        for (let i = 0; i < sliderCards.length; i++) {
            sliderCards[i].style.left = positionCards + 'px';
            positionCards += (distanceCards + widthCards);
        }           
    }
    
    function changeSlide (direction) {
        widthSliderContainer = sliderContainer.getBoundingClientRect().width;
        cardsCount = Math.floor(widthSliderContainer / (parseInt(settings.baseCardWidth) + settings.gap));
        widthCards = (widthSliderContainer - ((cardsCount - 1) * distanceCards)) / cardsCount;
        sliderCards = sliderContainer.children;
        let slideIndex = 0;
        for (let i = 0; i < sliderCards.length; i++) {
            if (sliderCards[i].classList.contains("active")) {
                slideIndex = i;
            }
        }
        if (direction == "left") {
            if (settings.isSlidesToScrollAll) {
                for (let index = 0; index < cardsCount; index++) {
                    sliderContainer.insertAdjacentElement("afterbegin", sliderCards[sliderCards.length - 1]);                
                }   
            } else if (settings.isEffectFadeOut) {
                sliderCards[slideIndex].classList.remove("active");
                sliderDots[slideIndex].classList.remove("active");
                sliderCards[slideIndex - 1] ? slideIndex -= 1 : slideIndex = sliderCards.length - 1;
                setTimeout(() => sliderCards[slideIndex].classList.add("active"), 1000);
                setTimeout(() => sliderDots[slideIndex].classList.add("active"), 1000);
            } else {
                sliderCards[sliderCards.length - 1].remove();
                let cloneLast = sliderCards[sliderCards.length - 1].cloneNode(true);
                cloneLast.classList.add("clone");
                sliderContainer.insertAdjacentElement("afterbegin", cloneLast);
                sliderCards[1].classList.remove("clone");
            }
        } else if (direction == "right") {
            if (settings.isSlidesToScrollAll) {
                for (let index = 0; index < cardsCount; index++) {
                    sliderContainer.insertAdjacentElement("beforeend", sliderCards[0]);                
                }  
            } else if (settings.isEffectFadeOut) {
                sliderCards[slideIndex].classList.remove("active");
                sliderDots[slideIndex].classList.remove("active");
                sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
                setTimeout(() => sliderCards[slideIndex].classList.add("active"), 1000);
                setTimeout(() => sliderDots[slideIndex].classList.add("active"), 1000);
            } else {              
                sliderCards[0].remove();
                let cloneFirst = sliderCards[0].cloneNode(true);
                cloneFirst.classList.add("clone");
                sliderContainer.insertAdjacentElement("beforeend", cloneFirst);
                sliderCards[sliderCards.length - 2].classList.remove("clone");
            }
        } 
        if (!settings.isEffectFadeOut) shuffleCard();    
    }

    function startAutoPlay () {
        clearInterval(localStorage[slider.id + "Interval"]);
        if (settings.isEffectFadeOut) {
            let slideIndex = 0;
            for (let i = 0; i < sliderCards.length; i++) {
                if (sliderCards[i].classList.contains("active")) {
                    slideIndex = i;
                }
            }
            const setActive = (index) => {
                setTimeout(() => sliderCards[index].classList.add("active"), 1000);
                setTimeout(() => sliderDots[index].classList.add("active"), 1000);
            }
            sliderInterval = setInterval(() => {
                sliderCards[slideIndex].classList.remove("active");
                sliderDots[slideIndex].classList.remove("active");
                sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
                setActive(slideIndex);
            }, settings.autoplaySpeed);
        } else {
            sliderInterval = setInterval(() => {
                changeSlide ("right");
            }, settings.autoplaySpeed);
        }
        localStorage[slider.id + "Interval"] = sliderInterval;
    }

    function touchSlider (e) {
        if ((touchPoint + 20) < e.touches[0].pageX) {
            changeSlide('left');
            this.removeEventListener('touchmove', touchSlider);
        } else if ((touchPoint - 20) > e.touches[0].pageX) {
            changeSlide('right');
            this.removeEventListener('touchmove', touchSlider);
        }
    }

    slider.addEventListener('touchend', function () {
        if (settings.isAutoplay && realCardsLength > cardsCount) {
            startAutoPlay();
        }             
    });

    sliderDots = document.querySelectorAll('.slider-dot');
    sliderDots.forEach(element => {
        element.onclick = function () {
            clearInterval(localStorage[slider.id + "Interval"]);
            for (let index = 0; index < realCardsLength; index++) {
                sliderDots[index].classList.remove("active");
                sliderCards[index].classList.remove("active");   
            }
            sliderCards[element.dataset.order].classList.add("active");
            element.classList.add("active");
        }
    });

    if (settings.isAutoplay && realCardsLength > cardsCount) {
        startAutoPlay();
    } 

    slider.ontouchstart = function (e) {
        touchPoint = e.touches[0].pageX;
        this.addEventListener('touchmove', touchSlider);
        clearInterval(localStorage[slider.id + "Interval"]);
    };

    // slider.ontouchmove = function (e) {
    //     console.log(e)
    // };


    slider.onmouseenter = () => {
        clearInterval(localStorage[slider.id + "Interval"]);
    };
    slider.onmouseleave = () => {
        if (settings.isAutoplay && realCardsLength > cardsCount) {
            startAutoPlay();
        }
    };

    if (!settings.isEffectFadeOut) shuffleCard();    
}
// window.addEventListener('mousewheel', this.onWheel)
// window.addEventListener('wheel', this.onWheel)
// window.addEventListener('resize', _.debounce(this.onResize, 200))

// window.addEventListener('mousedown', this.onTouchDown)
// window.addEventListener('mousemove', this.onTouchMove)
// window.addEventListener('mouseup', this.onTouchUp)

