const navigations = document.querySelectorAll('.slider_navigation');
const container = document.querySelector('.slider-container');
let sliderCards = document.querySelectorAll('.about-card');

const aboutCards = document.querySelector('.about-cards');
aboutCards.style.height = container.getBoundingClientRect().height + "px";

let position = 0,
    slideWisth,
    firstSlide,
    lastSlide
    indexSlide = [0, 3];

console.log(indexSlide);
sliderCards[0].insertAdjacentElement('beforebegin',sliderCards[sliderCards.length - 1].cloneNode(true));
sliderCards[sliderCards.length - 1].insertAdjacentElement('afterend', sliderCards[0].cloneNode(true))
slideWisth = sliderCards[0].getBoundingClientRect().width;
position = -slideWisth;

sliderCards = document.querySelectorAll('.about-card');
for (let i = 0; i < sliderCards.length; i++) {
    sliderCards[i].style.position = 'absolute';
    sliderCards[i].style.left = `${position}px`;
    position = position + slideWisth;
}

for (const navigation of navigations) {
    navigation.addEventListener('click', navigationHandler);
}

function navigationHandler () {
    const { dir } = this.dataset;
    sliderCards = document.querySelectorAll('.about-card');
    firstSlide = sliderCards[2].cloneNode(true);
    lastSlide = sliderCards[sliderCards.length - 3].cloneNode(true);
    if (dir === "prev") {
        sliderCards[sliderCards.length - 1].remove();
        sliderCards[0].insertAdjacentElement('beforebegin', lastSlide);
    } else if (dir === "next") {
        sliderCards[0].remove()
        sliderCards[sliderCards.length - 1].insertAdjacentElement('afterend', firstSlide)
    }
    sliderCards = document.querySelectorAll('.about-card');
    position -= slideWisth;
    sliderCards.forEach(element => {
        element.style.left = position + "px";
        position = position + slideWisth;
    });
}
