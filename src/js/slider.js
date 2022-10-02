const sliderProps = {
    arrows: true
};

function infinitySlider(selector, settings) {  // selector - шлях до слайдера, settings - нестанарні налаштування
    let positionCards = 0,
        slider = document.querySelector(selector),
        sliderContainer = slider.querySelector(".slider-container"),
        sliderCards = sliderContainer.children,
        widthSliderContainer = sliderContainer.getBoundingClientRect().width,
        constCardWidth,
        cardsCount,
        widthCards,
        distanceCards,
        cloneCard,
        heightCards,
        prevBtnSlider = document.createElement("span"),
        nextBtnSlider = document.createElement("span");
    const defaultSettings = {
        slidesToScrollAll: false,
        gap: 20,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    slider.querySelectorAll(".clone").forEach(clone => {
        clone.remove()
    });
  
    if (localStorage[slider.id]) {
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
    let counter = 1;
    do {
        cloneCard = sliderCards[sliderCards.length - counter].cloneNode(true)
        cloneCard.classList.add("clone");
        cloneCard.style.transition = 'none';
        sliderContainer.insertAdjacentElement("afterbegin", cloneCard);
        counter++;
    } while (counter <= cardsCount && settings.slidesToScrollAll) 

    if (cloneCard.classList.contains("clone")) {
        setTimeout(() => {
            cloneCard.style.transition = 'all .5s ease';
        }, 10);
    }

    sliderCards = sliderContainer.children;

    for (let i = 0; i < sliderCards.length; i++) {
        sliderCards[i].style.width = widthCards + "px";
    }

    heightCards = sliderCards[0].getBoundingClientRect().height;
    sliderContainer.style.height = heightCards + 'px';
    
    function shuffleCard () {
        const areArrowsExist = document.querySelectorAll('.slider_navigation').length;
        positionCards = 0 - (distanceCards + widthCards);
        prevBtnSlider.className = "left slider_navigation";
        nextBtnSlider.className = "right slider_navigation";
        if (!areArrowsExist){
            slider.insertAdjacentElement("afterbegin", prevBtnSlider)
            slider.insertAdjacentElement("beforeend", nextBtnSlider)
    
            prevBtnSlider.onclick = function () {
                changeSlide("left");
            }
            nextBtnSlider.onclick = function () {
                changeSlide("right");
            }
        }

        if (!settings.arrows && (sliderCards.length - 1) <= cardsCount) {
            prevBtnSlider.style.display = "none";
            nextBtnSlider.style.display = "none";
        } else if (settings.arrows) {
            prevBtnSlider.style.display = "block";
            nextBtnSlider.style.display = "block";
        }

        sliderCards = sliderContainer.children;
        for (let i = 0; i < sliderCards.length; i++) {
            sliderCards[i].style.left = positionCards + 'px';
            positionCards += (distanceCards + widthCards);
        }
    }
    shuffleCard();

    function changeSlide (direction) {
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

}

window.onresize = function () {
    infinitySlider(".slider", sliderProps);
}

infinitySlider('.slider', sliderProps);

function $(selector) {
    let elements = document.querySelectorAll(selector);
    if (elements.length == 1) {
        return elements[0];
    }
    return elements;
}