// параллакс еффект
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

window.addEventListener('scroll', function() { // на планшет
    let currentScroll = window.pageYOffset;
    if (window.pageYOffset < window.innerHeight && window.innerWidth < 1024) {
        if (currentScroll > previousScroll && scrollOffsetY < 99){
            scrollOffsetY += 0.2;
            homePage.style.backgroundPosition = `50% ${scrollOffsetY}%`;
        } else if (scrollOffsetY > 1) {
            scrollOffsetY -= 0.2;
            homePage.style.backgroundPosition = `50% ${scrollOffsetY}%`;

        }
    }
    previousScroll = currentScroll;
});

parallaxBG.forEach(element => {
    // element.style.backgroundPosition = `center`;
    // element.style.backgroundSize = `130% auto`;
    element.addEventListener("mousemove", function (e) { moveBackground(e); });
});

// let patern = /url\(["']?(.+)["']?\)/g;


// появление елементов

homePage.style.height = window.innerHeight + "px";

const animItems = document.querySelectorAll(`._anim-items`)
if (animItems.length > 0) {
    window.addEventListener(`scroll`, animOnScroll)

    function animOnScroll() {
        animItems.forEach(element => {
            const animItem = element
            const animItemHeight = animItem.offsetHeight
            const animItemOffSet = offset(animItem).top
            const animStart = 4
            let animItemPoint = window.innerHeight - animItemHeight / animStart
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }
            if ((window.pageYOffset > animItemOffSet - animItemPoint) && window.pageYOffset < (animItemOffSet + animItemHeight)) {
                animItem.classList.add(`_active`)
            } else {
                if (!(animItem.classList.contains(`_anim-no-hide`))) {
                    animItem.classList.remove(`_active`)
                }
            }            
        });
    }
    function offset(el) {
        const rect = el.getBoundingClientRect()
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    setTimeout(() => {
        animOnScroll()
    }, 300)
}
// localStorage home page

let titleHome = document.querySelector(".title-home"),
    firstVisit,
    lastVisit,
    timeInSite;

window.onload = function () {
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
}

// tripl click

const tripleClick = document.querySelector(".rock-solid svg")
const changeClicks = document.querySelectorAll(".services-card h3")
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
    changeClicks.forEach(element => {
        element.innerText = "Yeah, you did triple-click!!!"
    });
}

// slider

const prevBtn = document.querySelector('.cards-arrow.left')
const nextBtn = document.querySelector('.cards-arrow.right')
const outImg = document.querySelector('.slider-cards')
const aboutCard = document.querySelectorAll('.about-card')

// let i = 0
// outImg.innerHTML = aboutCard


// nextBtn.onclick = () => {
//     if (i < aboutCard.length - 1){
//         i++
//     } else {
//         i = 0
//     }
//     outImg.innerHTML = aboutCard[i] 
// }

// prevBtn.onclick = () => {
//     if (i > 0 ){
//         i--
//     } else {
//         i = aboutCard.length - 1 
//     }
//     outImg.innerHTML = aboutCard[i] 
// }

