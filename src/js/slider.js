const prevBtnSlider = document.querySelector("#prev");
const nextBtnSlider = document.querySelector("#next");
let sliderCards = document.querySelectorAll(".about-card"),
    sliderContainer = document.querySelector(".slider-container"),
    widthSliderContainer = sliderContainer.getBoundingClientRect().width,
    widthCards = sliderCards[0].getBoundingClientRect().width,
    constCardWidth = widthCards,
    cardsCount = Math.floor(widthSliderContainer / constCardWidth),
    distanceCards = (cardsCount == 1) ? 20 : (widthSliderContainer - (widthCards * cardsCount)) / (cardsCount - 1),
    positionCards = 0 - (distanceCards + widthCards),    
    firstEl = sliderCards[sliderCards.length - 1].cloneNode(true);

console.log(distanceCards);
sliderContainer.insertAdjacentElement("afterbegin", firstEl);

function infinitySlider () {
    sliderCards = document.querySelectorAll(".about-card");
    widthSliderContainer = sliderContainer.getBoundingClientRect().width;
    cardsCount = Math.floor(widthSliderContainer / constCardWidth);
    
    sliderCards.forEach(card => {
        if (cardsCount == 1) {
            card.style.width = 100 + "%";
        } else if (cardsCount == 2) {
            card.style.width = 47 + "%";
        } else if (cardsCount == 3) {
            card.style.width = 31 + "%";
        } else {
            card.style.width = "auto";
        }
    });
    let heightCards = sliderCards[0].getBoundingClientRect().height;
    widthCards = sliderCards[0].getBoundingClientRect().width;
    sliderContainer.style.height = heightCards + 'px';

    
    distanceCards = (cardsCount == 1) ? 20 : (widthSliderContainer - (widthCards * cardsCount)) / (cardsCount - 1);
    
    function shuffleCard () {
        positionCards = 0 - (distanceCards + widthCards);
        if (sliderCards.length - 1 > cardsCount) {
            prevBtnSlider.style.display = "block";
            nextBtnSlider.style.display = "block";
        } else {
            prevBtnSlider.style.display = "none";
            nextBtnSlider.style.display = "none";
        }

        sliderCards = document.querySelectorAll(".about-card");
        sliderCards.forEach(card => {
            card.style.left = positionCards + 'px';
            positionCards += (distanceCards + widthCards);
        });
    }
    shuffleCard();

    function changeSlide (direction) {
        if (direction == "left") {
            sliderCards[sliderCards.length - 1].remove();
            let preLastEl = sliderCards[sliderCards.length - 2].cloneNode(true);
            sliderContainer.insertAdjacentElement("afterbegin", preLastEl);
        } else if (direction == "right") {
            sliderCards[0].remove();
            let preFirstEl = sliderCards[1].cloneNode(true);
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

window.onresize = infinitySlider ;
infinitySlider ();