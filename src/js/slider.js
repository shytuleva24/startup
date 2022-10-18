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
        slidesToScrollAll: false,               - cкролити одразу всі видимі слайди
        gap: 20,                                - відстань між слайдами
        arrows: false,                          - наявність стрілочок
        autoplay: true,                         - автоскролл
        autoplaySpeed: 3000                     - швидкість автоскролла
        dots: false,                            - наявність точок знизу слайдера
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
    arrows: true,
    slidesToScrollAll: true,
    baseCardWidth: "263rem",
    autoplay: true,
    gap: 20,
    autoplaySpeed: 5000,
    transitionCard: "all 1.5s ease-in-out",
};

const cleintBrandsProp = {
    gap: 45,
    autoplay: true,
    autoplaySpeed: 5000,
    transitionCard: "all 3s ease",
    baseCardWidth: "127rem",
};

const sliderReview = {
    autoplay: true,
    autoplaySpeed: 6000,
    dots: true,
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
        cardsCount,
        widthCards,
        distanceCards,
        cloneCard,
        heightCards = 0,
        prevBtnSlider,
        nextBtnSlider,
        sliderInterval,
        maxHeight,
        sliderDots;
    const defaultSettings = {
        slidesToScrollAll: false,
        gap: 0,
        arrows: false,
        dots: false,
        distanceToDots: 0,
        autoplay: false,
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
    // if (settings.baseCardWidth == "100%") {
    //     settings.baseCardWidth = widthSliderContainer;
    // }
    // console.log(settings)
    cardsCount = Math.floor(widthSliderContainer / (parseInt(settings.baseCardWidth) + settings.gap));
    distanceCards = settings.gap;
    widthCards = (widthSliderContainer - ((cardsCount - 1) * distanceCards)) / cardsCount;
    positionCards = 0 - (distanceCards + widthCards);
    if (settings.arrows) creationArrows ();
    prevBtnSlider = slider.querySelector('.left.slider_navigation');
    nextBtnSlider = slider.querySelector('.right.slider_navigation');
    
    if (settings.arrows && sliderCards.length <= cardsCount) {
        prevBtnSlider.style.display = "none";
        nextBtnSlider.style.display = "none";
    } else if (settings.arrows) {
        prevBtnSlider.style.display = "block";
        nextBtnSlider.style.display = "block";
    }
    
    if (settings.dots && realCardsLength > 1) {
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

    if (settings.dots && realCardsLength > 1) {
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
        } while (counter <= realCardsLength && settings.slidesToScrollAll); 
        
        if (settings.slidesToScrollAll) {
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
            
            prevBtnSlider.onclick = function () {
                changeSlide("left");
            }
            nextBtnSlider.onclick = function () {
                changeSlide("right");
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
        if (settings.slidesToScrollAll) {
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
        if (direction == "left") {
            if (settings.slidesToScrollAll) {
                for (let index = 0; index < cardsCount; index++) {
                    sliderContainer.insertAdjacentElement("afterbegin", sliderCards[sliderCards.length - 1]);                
                }                
            } else {
                sliderCards[sliderCards.length - 1].remove();
                let cloneLast = sliderCards[sliderCards.length - 1].cloneNode(true);
                cloneLast.classList.add("clone");
                sliderContainer.insertAdjacentElement("afterbegin", cloneLast);
                sliderCards[1].classList.remove("clone");
            }
        } else if (direction == "right") {
            if (settings.slidesToScrollAll) {
                for (let index = 0; index < cardsCount; index++) {
                    sliderContainer.insertAdjacentElement("beforeend", sliderCards[0]);                
                }  
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

    if (settings.autoplay && realCardsLength > cardsCount) {
        startAutoPlay();
    } 

    slider.onmouseenter = () => {
        clearInterval(localStorage[slider.id + "Interval"]);
    }
    slider.onmouseleave = () => {
        if (settings.autoplay && realCardsLength > cardsCount) {
            startAutoPlay();
        }
    }
    if (!settings.isEffectFadeOut) shuffleCard();    
}
// window.addEventListener('mousewheel', this.onWheel)
// window.addEventListener('wheel', this.onWheel)
// window.addEventListener('resize', _.debounce(this.onResize, 200))

// window.addEventListener('mousedown', this.onTouchDown)
// window.addEventListener('mousemove', this.onTouchMove)
// window.addEventListener('mouseup', this.onTouchUp)

// Slider rewiews

// function sliderRewiews(selector) {
//     const slider = document.querySelector(selector);
//     const sliderRewiew = document.querySelectorAll('.review');
//     let maxHeight = 0,
//     heightCardRewiew = 0,
//     intervalSpeed = 6000,
//     intervalChange,
//     sliderDots;
    
//     window.addEventListener("resize", init())
//     init()
    
//     function init() {
//         slider.style.position = "relative";
//         sliderRewiew.forEach(element => {
//             element.classList.remove("active")
//             element.style.position = "absolute";
//             element.style.top = "0";
//             element.style.left = "0";
//             element.style.transition = 'all 1s ease-in-out';
//             maxHeight = element.getBoundingClientRect().height
//             if (heightCardRewiew < maxHeight) {
//                 heightCardRewiew = maxHeight;
//             }
//         });
//         slider.style.height = heightCardRewiew + 50 + 'rem';
//     }


//     creationDots ();
//     changeSlide (0);
//     sliderDots = document.querySelectorAll('.slider-dot');

//     sliderRewiew[0].classList.add("active");
//     sliderDots[0].classList.add("active");
    
//     function changeSlide () {
        
//         let slideIndex = 0;
//         for (let i = 0; i < sliderRewiew.length; i++) {
//             if (sliderRewiew[i].classList.contains("active")) {
//                 slideIndex = i;
//             }
//         }
//         const setActive = (index) => {
//             setTimeout(() => sliderRewiew[index].classList.add("active"), 800);
//             setTimeout(() => sliderDots[index].classList.add("active"), 800);
//         }
        
//         intervalChange = setInterval(() => {
//             sliderRewiew[slideIndex].classList.remove("active");
//             sliderDots[slideIndex].classList.remove("active");
//             sliderRewiew[slideIndex + 1] ? slideIndex++ : slideIndex = 0
//             setActive(slideIndex);
//         }, intervalSpeed);
//     }

//     function creationDots () {
//         const dotsContainer = slider.querySelector('.dots-container');
//         if (!dotsContainer) {
//             let dotContainer = document.createElement("div");
//             dotContainer.style.position = "absolute";
//             dotContainer.className = "dots-container";
//             dotContainer.style.bottom = "0";
//             slider.insertAdjacentElement("beforeend", dotContainer);
//             for (let index = 0; index < sliderRewiew.length; index++) {
//                 const slideDot = document.createElement("span");
//                 slideDot.className = "slider-dot";
//                 slideDot.dataset.order = index;
//                 dotContainer.insertAdjacentElement("beforeend", slideDot);
//             }
//         }
//     }
    
//     sliderDots.forEach(element => {
//         element.onclick = function () {
//             clearInterval(intervalChange);
//             for (let index = 0; index < sliderRewiew.length; index++) {
//                 sliderDots[index].classList.remove("active");
//                 sliderRewiew[index].classList.remove("active");   
//             }
//             sliderRewiew[element.dataset.order].classList.add("active");
//             element.classList.add("active");
//         }
//     });

//     slider.onmouseenter = () => {
//         clearInterval(intervalChange);
//     }
//     slider.onmouseleave = () => {
//         changeSlide ();
//     }
    
// }

// sliderRewiews(".reviews");
