
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
        prevBtnSlider = slider.querySelector(".slider_navigation#prev"),
        nextBtnSlider = slider.querySelector(".slider_navigation#next");
    const defaultSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        gap: 20,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: []
    };

    slider.querySelectorAll(".clone").forEach(clone => {
        clone.remove()
    });

    if (localStorage.constCardWidth) {
        constCardWidth = localStorage.constCardWidth;
    } else {
        constCardWidth = sliderCards[0].getBoundingClientRect().width;
        localStorage.constCardWidth = constCardWidth;
    }
    
    cardsCount = Math.floor(widthSliderContainer / constCardWidth);

    settings = {...defaultSettings, ...settings}; // берем всі аргументи обох об'єктів останній об'єкт в дужках в приоритеті
    distanceCards = settings.gap;
    widthCards = (widthSliderContainer - ((cardsCount - 1) * distanceCards)) / cardsCount;
    positionCards = 0 - (distanceCards + widthCards);

    for (let i = 1; i <= settings.slidesToScroll; i++) {
        cloneCard = sliderCards[sliderCards.length - i].cloneNode(true)
        cloneCard.classList.add("clone");
        sliderContainer.insertAdjacentElement("afterbegin", cloneCard);
    }

    sliderCards = sliderContainer.children;

    for (let i = 0; i < sliderCards.length; i++) {
        sliderCards[i].style.width = widthCards + "px";
    }

    sliderCards = sliderContainer.children;
    heightCards = sliderCards[0].getBoundingClientRect().height;
    if (heightCards < 325) {
        heightCards = 325;
    }
    
    // console.log(heightCards)
    sliderContainer.style.height = heightCards + 'px';
    
    function shuffleCard () {
        positionCards = 0 - (distanceCards + widthCards);
        if (!settings.arrows || (sliderCards.length - 1 )<= cardsCount) {
            prevBtnSlider.style.display = "none";
            nextBtnSlider.style.display = "none";
        } else {
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
            let preLastEl = sliderCards[sliderCards.length - 1].cloneNode(true);
            sliderContainer.insertAdjacentElement("afterbegin", preLastEl);
        } else if (direction == "right") {
            sliderCards[0].remove();
            let preFirstEl = sliderCards[0].cloneNode(true);
            sliderContainer.insertAdjacentElement("beforeend", preFirstEl);
        }
        shuffleCard();
    }
    prevBtnSlider.onclick = function () {
        changeSlide("left");
    }
    nextBtnSlider.onclick = function () {
        changeSlide("right");
    }
}

window.onresize = function () {
    infinitySlider(".slider", {
        responsive: [
            {
                brackpoint: 625,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true
            }, 
            {
                brackpoint: 900,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true
            }, 
            {
                brackpoint: 1100,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true
            }
        ]
    });
}

function $(selector) {
    let elements = document.querySelectorAll(selector);
    if (elements.length == 1) {
        return elements[0];
    }
    return elements;
}

infinitySlider('.slider', {
    responsive: [
        {
            brackpoint: 625,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: true
        }, 
        {
            brackpoint: 900,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true
        }, 
        {
            brackpoint: 1100,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true
        }
    ]
});