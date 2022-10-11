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
    dots: true
};

const cleintBrandsProp = {
    dots: true
};

function infinitySlider(selector, settings) {  // selector - шлях до слайдера, settings - нестанарні налаштування
    window.onresize = function () {
        infinitySlider(selector, sliderProps);
    };
    let slider = document.querySelector(selector),
        positionCards = 0,
        sliderContainer = slider.querySelector(".slider-container"),
        sliderCards = sliderContainer.children,
        widthSliderContainer = sliderContainer.getBoundingClientRect().width,
        constCardWidth,
        cardsCount,
        widthCards,
        distanceCards,
        cloneCard,
        heightCards,
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
        dots: false
    };

    slider.querySelectorAll(".clone").forEach(clone => {
        clone.remove();
    });
    
    if (localStorage[slider.id + "CardWidth"]) {
        clearInterval(localStorage[slider.id + "Interval"]);
        constCardWidth = localStorage[slider.id + "CardWidth"];
    } else {
        constCardWidth = sliderCards[0].getBoundingClientRect().width;
        localStorage[slider.id + "CardWidth"] = constCardWidth;
    }
    cardsCount = Math.floor(widthSliderContainer / constCardWidth);

    settings = {...defaultSettings, ...settings}; // берем всі аргументи обох об'єктів останній об'єкт в дужках в приоритеті
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

    if (settings.dots) creationDots ();
    
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

    if (slider.querySelectorAll(".clone").length > 0) {
        slider.querySelectorAll(".clone").forEach(clone => {
            setTimeout(() => {
                clone.style.transition = 'all .5s ease'; 
            }, 1);
        });
    }

    sliderCards = sliderContainer.children;

    for (let i = 0; i < sliderCards.length; i++) {
        sliderCards[i].style.width = widthCards + "px";
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

    function creationDots () {
        const areDotsExist = slider.querySelectorAll('.dots-container').length;
        if (areDotsExist < 1) {        
            let dotsContainer = document.createElement("div");
            dotsContainer.className = `dots-container`;
            slider.insertAdjacentElement("beforeend", dotsContainer);

            for (let index = 0; index < realCardsLength; index++) {
                let dot = document.createElement("span");
                dot.className = `dot-${index} slider_dots`;
                dotsContainer.insertAdjacentElement("beforeend", dot);
                console.log(dot)
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
        cardsCount = Math.floor(widthSliderContainer / constCardWidth);
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

    // slider.addEventListener('touchstart', dragStart);
    // slider.addEventListener('touchend', dragEnd);
    // slider.addEventListener('touchmove', ()=> {

    // });
    
}
// window.addEventListener('mousewheel', this.onWheel)
// window.addEventListener('wheel', this.onWheel)
// window.addEventListener('resize', _.debounce(this.onResize, 200))

// window.addEventListener('mousedown', this.onTouchDown)
// window.addEventListener('mousemove', this.onTouchMove)
// window.addEventListener('mouseup', this.onTouchUp)