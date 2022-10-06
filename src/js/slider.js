const sliderProps = {
    arrows: true
};

function infinitySlider(selector, settings) {  // selector - шлях до слайдера, settings - нестанарні налаштування
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
        sliderInterval;
    const defaultSettings = {
        slidesToScrollAll: false,
        gap: 20,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    slider.querySelectorAll(".clone").forEach(clone => {
        clone.remove();
    });
    
    if (localStorage[slider.id]) {
        clearInterval(localStorage[slider.id + "interval"])
        constCardWidth = localStorage[slider.id];
    } else {
        constCardWidth = sliderCards[0].getBoundingClientRect().width;
        localStorage[slider.id] = constCardWidth;
    }
    cardsCount = Math.floor(widthSliderContainer / constCardWidth);
    
    settings = {...defaultSettings, ...settings}; // берем всі аргументи обох об'єктів останній об'єкт в дужках в приоритеті
    distanceCards = settings.gap;
    widthCards = (widthSliderContainer - ((cardsCount - 1) * distanceCards)) / cardsCount;
    positionCards = 0 - (distanceCards + widthCards);
    if (settings.arrows) createArrows ();

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
    } while (counter <= cardsCount && settings.slidesToScrollAll); 

    if (cloneCard.classList.contains("clone")) {
        setTimeout(() => {
            cloneCard.style.transition = 'all .5s ease'; /// vsem clonam nado
        }, 1);
    }

    sliderCards = sliderContainer.children;

    for (let i = 0; i < sliderCards.length; i++) {
        sliderCards[i].style.width = widthCards + "px";
    }

    heightCards = sliderCards[0].getBoundingClientRect().height;
    sliderContainer.style.height = heightCards + 'px';

    function createArrows () {
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
                clearInterval(localStorage[slider.id + "interval"]);
                startAutoPlay();
            }
            nextBtnSlider.onclick = function () {
                changeSlide("right");
                clearInterval(localStorage[slider.id + "interval"]);
                startAutoPlay();
            }
        }
    }
    
    function shuffleCard () {
        sliderCards = sliderContainer.children;
        positionCards = 0 - (distanceCards + widthCards);

        for (let i = 0; i < sliderCards.length; i++) {
            sliderCards[i].style.left = positionCards + 'px';
            positionCards += (distanceCards + widthCards);
        }

    }

    function changeSlide (direction) {
        widthSliderContainer = sliderContainer.getBoundingClientRect().width;
        cardsCount = Math.floor(widthSliderContainer / constCardWidth);
        widthCards = (widthSliderContainer - ((cardsCount - 1) * distanceCards)) / cardsCount;

        if (direction == "left") {
            sliderCards[sliderCards.length - 1].remove();
            let cloneLast = sliderCards[sliderCards.length - 1].cloneNode(true);
            cloneLast.classList.add("clone");
            sliderContainer.insertAdjacentElement("afterbegin", cloneLast);
            sliderCards[1].classList.remove("clone");
        } else if (direction == "right") {
            sliderCards[0].remove();
            let cloneFirst = sliderCards[0].cloneNode(true);
            cloneFirst.classList.add("clone");
            sliderContainer.insertAdjacentElement("beforeend", cloneFirst);
            sliderCards[sliderCards.length - 2].classList.remove("clone");
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
