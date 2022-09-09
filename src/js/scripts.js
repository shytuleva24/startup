// параллакс еффект
let parallaxStartPos,
    shiftX,
    shiftY;
const parallaxBG = document.querySelectorAll(".parallax");

function moveBackground(e) {
    let offsetX = 50 + (e.pageX / window.innerWidth * 10);
    let offsetY = 50 + (e.pageY / window.innerHeight * 5);
    e.target.style.backgroundPosition = `${offsetX}% ${offsetY}%`;
}

parallaxBG.forEach(element => {
    element.style.backgroundPosition = `center`;
    element.style.backgroundSize = `150% auto`;
    element.addEventListener("mousemove", function (e) { moveBackground(e); });
});

// let patern = /url\(["']?(.+)["']?\)/g;

// let parallaxBG = document.querySelector(".header"),
//     parallaxStartPos 

// parallaxBG.onmouseenter = function (e) {
//     parallaxStartPos = e.pageY - window.pageYOffset - parallaxBG.getBoundingClientRect().top + 1
// }

// parallaxBG.onmousemove = function (e) {
//     let Y = e.pageY - window.pageYOffset - parallaxBG.getBoundingClientRect().top + 1
//     parallaxBG.style.backgroundPosition = "center " + ((Y - parallaxStartPos + parseInt(getComputedStyle(parallaxBG).backgroundPositionY)) / 100)) + "%"
// }

// появление елементов

const homePage = document.querySelector(".home-page");
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
            if ((window.pageYOffset > animItemOffSet - animItemPoint) && pageYOffset < (animItemOffSet + animItemHeight)) {
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
    }, 500)
}