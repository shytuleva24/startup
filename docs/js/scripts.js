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
let parallaxStartPos,
    previousScroll = 0,
    scrollOffsetY = 1;
const parallaxBG = document.querySelectorAll(".parallax");
const homePage = document.querySelector(".home-page");

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
    if (unlock) {
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
// let patern = /url\(["']?(.+)["']?\)/g;
const header = document.querySelector('.header');
const arrowUp = document.querySelector('.arrow-up');
let lastScrollTop = 0;

homePage.style.height = window.innerHeight + "px";

function navMenuBackground() {
    let st = window.pageYOffset || document.documentElement.scrollTop; 
    if (st > lastScrollTop){
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
window.addEventListener(`scroll`, navMenuBackground)

// анимация появления элементов при скролле

const animItems = document.querySelectorAll(`._anim-items`);

if (animItems.length > 0) {
    window.addEventListener(`scroll`, animOnScroll);

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
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
    }
}

setTimeout(() => {
    animOnScroll();
}, 300)
// localStorage home page

window.onload = function () {
    
    let titleHome = document.querySelector(".title-home"),
        firstVisit,
        lastVisit,
        timeInSite;

    if (!localStorage.firstVisit || localStorage.firstVisit == "undefined") {
        localStorage.firstVisit = new Date ();
        titleHome.innerText = "Welcome to STARTUP";
    }
    firstVisit = localStorage.firstVisit;
    
    if (!localStorage.lastVisit) {
        localStorage.lastVisit = firstVisit;
    } 
    timeInSite = (new Date () - new Date (localStorage.lastVisit)) / 1000 / 60; // min
    let timeInSiteFirst = (new Date () - new Date (localStorage.firstVisit)) / 1000 / 60; // min
    if (timeInSiteFirst <= 5) {
        titleHome.innerText = "Welcome to STARTUP";
    } else if (timeInSite < 5) {
        titleHome.innerText = "glad to see you again";
    } else if (timeInSite >= 1440) {
        titleHome.innerText = "you were gone for a day, welcome to STARTUP";
    } else if (timeInSite >= 5) {
        titleHome.innerText = "welcome back to STARTUP";
    } 

    window.onblur = function() {
        localStorage.lastVisit = new Date ();
    }
    lastVisit = localStorage.lastVisit;

    infinitySlider(".slider.about-slider", sliderProps);
    infinitySlider(".slider.slider-brands", cleintBrandsProp);
    // infinitySlider(".slider", sliderProps);
}

// tripl click

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

function changeInClick () {
    const changeClicks = document.querySelectorAll(".services-card h3")
    changeClicks.forEach(element => {
        element.innerText = "Yeah, you did triple-click!!!"
    });
}

// slider


// window.onload = function () {
//     infinitySlider(".slider", sliderProps);
// }















// function $(selector) {
//     let elements = document.querySelectorAll(selector);
//     if (elements.length == 1) {
//         return elements[0];
//     }
//     return elements;
// }
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
let interval;
function scrollToBlock(href) {
    let target = document.querySelector(href),
        targetLocation = target.getBoundingClientRect().top + window.pageYOffset, //положення цілі
        currentPosition = window.pageYOffset, //поточна позиція
        direction, //напрямок скролу
        pixelScroll = 1, // швидкість скролу 
        pixelsLeft; //залишилось пікселів до цілі
    if (!header.classList.contains("header-hidden") && targetLocation < window.pageYOffset) {
        targetLocation = target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight;
    } 
    if (targetLocation > currentPosition) {
        direction = "down";
    } else {
        direction = "up";
    }
    clearInterval(interval);
    interval = setInterval(()=> {
        pixelsLeft = Math.abs(targetLocation - window.pageYOffset);
        
        if (pixelScroll <= 50 && pixelsLeft > (window.innerHeight * 0.35)) {
            pixelScroll *= 1.2;
        } else if (pixelsLeft < (window.innerHeight * 0.35)  && pixelScroll > 3) {
            pixelScroll *= 0.8;
        }

        if(direction == "down"){
            window.scrollTo(0, window.pageYOffset + pixelScroll);
        } else {
            window.scrollTo(0, window.pageYOffset - pixelScroll);
        }

        if (Math.abs(window.pageYOffset - targetLocation) <= 3) {
            window.scrollTo(0, targetLocation);
            clearInterval(interval);
        } else if (Math.abs(window.pageYOffset + window.innerHeight - document.body.getBoundingClientRect().height) < 5 ) {
            clearInterval(interval);
        }
    }, 20)
}

// homeMenuLinks.forEach(element => {
//     element.onclick = function (event) {
//         event.preventDefault();
//         scrollToBlock(this.getAttribute("href"));
//     } 
// });


/* ------------------------------------------------*/

// burger-menu and scroll
const iconMenu = document.querySelector('.menu-icon');
const homeMenuLinks = document.querySelectorAll(".scroll-to");
const menuBody = document.querySelector('.menu-body');


if (iconMenu) {
    iconMenu.addEventListener("click", function(e) {
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
    
    function onMenuLinkClick (href) {
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


const worksPhotosContainer = document.querySelector('.works-photo');
const worksPhotosCards = worksPhotosContainer.children
let delayTimeAnim = 1.3;

for (let index = 0; index < worksPhotosCards.length; index++) {
    const element = worksPhotosCards[index]; 
    element.style.transition = `all .3s ease ${delayTimeAnim}s`;
    delayTimeAnim = delayTimeAnim + 0.2;
}
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
};

const cleintBrandsProp = {
    gap: 65,
    autoplaySpeed: 1800,
    transitionCard: "all 1.8s linear"
};
window.onresize = function () {
    infinitySlider(".slider.about-slider", sliderProps);
    infinitySlider(".slider.slider-brands", cleintBrandsProp);
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
        sliderInterval,
        realCardsLength;
    const defaultSettings = {
        slidesToScrollAll: false,
        gap: 20,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        transitionCard: "all .8s ease-in-out"
    };

    slider.querySelectorAll(".clone").forEach(clone => {
        clone.remove();
    });
    sliderContainer.style.position = "relative";
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
}
// window.addEventListener('mousewheel', this.onWheel)
// window.addEventListener('wheel', this.onWheel)
// window.addEventListener('resize', _.debounce(this.onResize, 200))

// window.addEventListener('mousedown', this.onTouchDown)
// window.addEventListener('mousemove', this.onTouchMove)
// window.addEventListener('mouseup', this.onTouchUp)

// Slider rewiews
function sliderRewiews(selector) {
    const slider = document.querySelector(selector);
    const sliderRewiew = document.querySelectorAll('.review');
    let maxHeight = 0,
        heightCardRewiew = 0,
        intervalSpeed = 6000,
        intervalChange,
        sliderDots;
    slider.style.position = "relative";
    window.onresize = init ();
    init ();
    function init () {
        sliderRewiew.forEach(element => {
            element.style.position = "absolute";
            element.style.top = "0";
            element.style.left = "0";
            element.style.transition = 'all 1s ease-in-out';
            maxHeight = element.getBoundingClientRect().height
            if (heightCardRewiew < maxHeight) {
                heightCardRewiew = maxHeight;
                console.log(heightCardRewiew)
            }
        });
        slider.style.height = heightCardRewiew + 40 + 'px';
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
            console.log(dotContainer)
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
