/** Slider by Hashtag team
 * .slider                              - обов'язковий клас для слайдера
 * .slider-container                    - обов'язковий клас для контейнера слайдів 
 * id                                   - обов'язково задати id

.left.slider_navigation                 - класи для заддяння стилів на кнопки
.right.slider_navigation                - класи для заддяння стилів на кнопки

 * const sliderProps = {
        slidesToScrollAll: false,       - cкролити одразу всі видимі слаййди
        gap: 20,                        - відстань між слайдами
        arrows: false,                  - наявність стрілочок
        autoplay: true,                 - автоскролл
        autoplaySpeed: 3000             - швидкість автоскролла
    }
    
 * infinitySlider(selector, settings)
        - selector - шлях до слайдера, 
        - settings - нестанарні налаштування sliderProps

 **/

const sliderProps = {
    arrows: true,
    slidesToScrollAll: true,
    baseCardWidth: "263rem",
};

const cleintBrandsProp = {
    gap: 65,
    autoplay: true,
    autoplaySpeed: 1800,
    transitionCard: "all 1.8s linear",
    baseCardWidth: "145rem"
};

window.onresize = function () {
    infinitySlider(".slider", sliderProps);
    infinitySlider(".slider-brands", cleintBrandsProp);
};

function infinitySlider(selector, settings) {  // selector - шлях до слайдера, settings - нестанарні налаштування
    let slider = document.querySelector(selector),
        positionCards = 0,
        sliderContainer = slider.querySelector(".slider-container"),
        sliderCards = sliderContainer.children,
        widthSliderContainer = sliderContainer.getBoundingClientRect().width,
        cardsCount,
        widthCards,
        distanceCards,
        cloneCard,
        heightCards = 0,
        prevBtnSlider,
        nextBtnSlider,
        sliderInterval,
        realCardsLength;
    const defaultSettings = {
        slidesToScrollAll: false,
        gap: 20,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        baseCardWidth: "100%",
        transitionCard: "all .8s ease-in-out"
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
    
    cardsCount = Math.floor(widthSliderContainer / parseInt(settings.baseCardWidth));
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

    sliderCards = sliderContainer.children;
    for (let i = 0; i < sliderCards.length; i++) {
        console.log(widthCards)
        sliderCards[i].style.width = widthCards + "px";
        sliderCards[i].style.position = "absolute";
        setTimeout(() => {
            sliderCards[i].style.transition = settings.transitionCard; 
        }, 1);
    }
    heightCards = sliderCards[0].getBoundingClientRect().height;
    sliderContainer.style.height = heightCards + 'px';

    function creationArrows () {
        const areArrowsExist = slider.querySelectorAll('.slider_navigation').length
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
        cardsCount = Math.floor(widthSliderContainer / parseInt(settings.baseCardWidth));
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
        shuffleCard();
    }

    function startAutoPlay() {
        if (settings.autoplay && (sliderCards.length - 1) > cardsCount) {
            clearInterval(localStorage[slider.id + "interval"]);
            sliderInterval = setInterval(() => {
                changeSlide ("right");
            }, settings.autoplaySpeed);
            localStorage[slider.id + "interval"] = sliderInterval;
        }     
    }

    window.onscroll = () => {
        clearInterval(localStorage[slider.id + "interval"]);
        if (slider.classList.contains("_active")) {
            startAutoPlay();
        } 
    }
    slider.onmouseenter = () => {
        clearInterval(localStorage[slider.id + "interval"]);
    }
    slider.onmouseleave = () => {
        startAutoPlay();
    }
    shuffleCard();    
}
// window.addEventListener('mousewheel', this.onWheel)
// window.addEventListener('wheel', this.onWheel)
// window.addEventListener('resize', _.debounce(this.onResize, 200))

// window.addEventListener('mousedown', this.onTouchDown)
// window.addEventListener('mousemove', this.onTouchMove)
// window.addEventListener('mouseup', this.onTouchUp)

// Slider rewiews

// class SliderRewiews {
//     constructor (settings = {}) {
//         this.slider,
//         this.sliderRewiew,
//         this.maxHeight = 0,
//         this.heightCardRewiew = 0,
//         this.intervalSpeed = 6000,
//         this.intervalChange,
//         this.sliderDots,
//         this.slideIndex
//     }

//     initSlider (selector) {
//         this.slider = document.querySelector(selector);
//         this.sliderRewiew = document.querySelectorAll('.review');
//         this.slider.style.position = "relative";
//         this.sliderRewiew.forEach(element => {
//             element.classList.remove("active")
//             element.style.position = "absolute";
//             element.style.top = "0";
//             element.style.left = "0";
//             element.style.transition = 'all 1s ease-in-out';
//             this.maxHeight = element.getBoundingClientRect().height
//             if (this.heightCardRewiew < this.maxHeight) {
//                 this.heightCardRewiew = this.maxHeight;
//             }
//         });
//         this.slider.style.height = this.heightCardRewiew + 50 + 'rem';

//         this.creationDots.bind(this);

//         this.slider.onmouseenter = () => {
//             clearInterval(this.intervalChange);
//         }
//         this.slider.onmouseleave = () => {
//             changeSlide ();
//         }    
//     }

//     changeSlide (0);
//     sliderDots = document.querySelectorAll('.slider-dot');

//     sliderRewiew[0].classList.add("active");
//     sliderDots[0].classList.add("active");
    
//     changeSlide () {
//         for (let i = 0; i < this.sliderRewiew.length; i++) {
//             if (this.sliderRewiew[i].classList.contains("active")) {
//                 this.slideIndex = i;
//             }
//         }
//         const setActive = (index) => {
//             setTimeout(() => this.sliderRewiew[index].classList.add("active"), 800);
//             setTimeout(() => this.sliderDots[index].classList.add("active"), 800);
//         }
        
//         this.intervalChange = setInterval(() => {
//             this.sliderRewiew[slideIndex].classList.remove("active");
//             this.sliderDots[slideIndex].classList.remove("active");
//             this.sliderRewiew[slideIndex + 1] ? slideIndex++ : slideIndex = 0
//             setActive(this.slideIndex);
//         }, intervalSpeed);
//     }

//     creationDots (obj) {
//         const dotsContainer = this.slider.querySelector('.dots-container');
//         if (!dotsContainer) {
//             let dotContainer = document.createElement("div");
//             dotContainer.style.position = "absolute";
//             dotContainer.className = "dots-container";
//             dotContainer.style.bottom = "0";
//             this.slider.insertAdjacentElement("beforeend", dotContainer);
//             for (let index = 0; index < this.sliderRewiew.length; index++) {
//                 const slideDot = document.createElement("span");
//                 slideDot.className = "slider-dot";
//                 slideDot.dataset.order = index;
//                 dotContainer.insertAdjacentElement("beforeend", slideDot);
//             }
//         }
//         this.sliderDots = document.querySelectorAll('.slider-dot');
//         this.sliderRewiew = document.querySelectorAll('.review');
//         for (const element of this.sliderDots) {
//             element.onclick = function () {
//                 clearInterval(this.intervalChange);
//                 console.log(this)
//                 for (let index = 0; index < obj.sliderRewiew.length; index++) {
//                     sliderDots[index].classList.remove("active");
//                     sliderRewiew[index].classList.remove("active");   
//                 }
//                 this.sliderRewiew[element.dataset.order].classList.add("active");
//                 element.classList.add("active");
//             }
//         }
//         // for(const [key, value] of Object.entries(this.sliderDots)) { 
//         //     console.log(key)
//         //     console.log(value)
//         // }
//         // this.sliderDots.forEach(element => {
//         //     element.onclick = function () {
//         //         clearInterval(this.intervalChange);
//         //         for (let index = 0; index < this.sliderRewiew.length; index++) {
//         //             sliderDots[index].classList.remove("active");
//         //             sliderRewiew[index].classList.remove("active");   
//         //         }
//         //         this.sliderRewiew[element.dataset.order].classList.add("active");
//         //         element.classList.add("active");
//         //     }
//         // });
//     }
    

// }
// const sliderRewiew = new SliderRewiews();
// sliderRewiew.initSlider(".reviews");


function sliderRewiews(selector) {
    const slider = document.querySelector(selector);
    const sliderRewiew = document.querySelectorAll('.review');
    let maxHeight = 0,
    heightCardRewiew = 0,
    intervalSpeed = 6000,
    intervalChange,
    sliderDots;
    
    window.addEventListener("resize", init())
    init()
    
    function init() {
        slider.style.position = "relative";
        sliderRewiew.forEach(element => {
            element.classList.remove("active")
            element.style.position = "absolute";
            element.style.top = "0";
            element.style.left = "0";
            element.style.transition = 'all 1s ease-in-out';
            maxHeight = element.getBoundingClientRect().height
            if (heightCardRewiew < maxHeight) {
                heightCardRewiew = maxHeight;
            }
        });
        slider.style.height = heightCardRewiew + 50 + 'rem';
    }


    creationDots ();
    changeSlide (0);
    sliderDots = document.querySelectorAll('.slider-dot');

    sliderRewiew[0].classList.add("active");
    sliderDots[0].classList.add("active");
    
    function changeSlide () {
        
        let slideIndex = 0;
        for (let i = 0; i < sliderRewiew.length; i++) {
            if (sliderRewiew[i].classList.contains("active")) {
                slideIndex = i;
            }
        }
        const setActive = (index) => {
            setTimeout(() => sliderRewiew[index].classList.add("active"), 800);
            setTimeout(() => sliderDots[index].classList.add("active"), 800);
        }
        
        intervalChange = setInterval(() => {
            sliderRewiew[slideIndex].classList.remove("active");
            sliderDots[slideIndex].classList.remove("active");
            sliderRewiew[slideIndex + 1] ? slideIndex++ : slideIndex = 0
            setActive(slideIndex);
        }, intervalSpeed);
    }

    function creationDots () {
        const dotsContainer = slider.querySelector('.dots-container');
        if (!dotsContainer) {
            let dotContainer = document.createElement("div");
            dotContainer.style.position = "absolute";
            dotContainer.className = "dots-container";
            dotContainer.style.bottom = "0";
            slider.insertAdjacentElement("beforeend", dotContainer);
            for (let index = 0; index < sliderRewiew.length; index++) {
                const slideDot = document.createElement("span");
                slideDot.className = "slider-dot";
                slideDot.dataset.order = index;
                dotContainer.insertAdjacentElement("beforeend", slideDot);
            }
        }
    }
    
    sliderDots.forEach(element => {
        element.onclick = function () {
            clearInterval(intervalChange);
            for (let index = 0; index < sliderRewiew.length; index++) {
                sliderDots[index].classList.remove("active");
                sliderRewiew[index].classList.remove("active");   
            }
            sliderRewiew[element.dataset.order].classList.add("active");
            element.classList.add("active");
        }
    });

    slider.onmouseenter = () => {
        clearInterval(intervalChange);
    }
    slider.onmouseleave = () => {
        changeSlide ();
    }
    
}

sliderRewiews(".reviews");
