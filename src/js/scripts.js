// параллакс еффект
let parallaxStartPos,
    shiftX,
    offsetX,
    offsetY,
    shiftY;
let previousScroll = 0;
const parallaxBG = document.querySelectorAll(".parallax");
const homePage = document.querySelector(".home-page");

function moveBackground(e) {
    let Y = e.pageY - window.pageYOffset - e.target.getBoundingClientRect().top + 1;
    offsetX = 50 + (e.pageX / window.innerWidth * 20);
    offsetY = 50 + (Y / window.innerHeight * 10);
    e.target.style.backgroundPosition = `${offsetX}% ${offsetY}%`;
}


window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset;
    if (window.pageYOffset < window.innerHeight) {
        if (currentScroll > previousScroll){
            offsetY += 0.7
        } else {
            offsetY -= 0.7
        }
        homePage.style.backgroundPosition = `${offsetX}% ${offsetY}%`;
    }
    previousScroll = currentScroll;
});

parallaxBG.forEach(element => {
    element.style.backgroundPosition = `center`;
    element.style.backgroundSize = `130% auto`;
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