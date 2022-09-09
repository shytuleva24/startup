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
    offsetX = 50 + (e.pageX / window.innerWidth * 20);
    offsetY = 50 + (e.pageY / window.innerHeight * 10);
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


// document.addEventListener('wheel', (evt)=>{
//     console.log(evt.deltaY);
// });

// $(function(){
//     //WOW plugin init
//     new WOW().init();

//     //parallax effect for banner
//     (function() {
//         var posY;
//         var image = document.getElementById('parallax');;
//         function paralax() {
//             posY = window.pageYOffset;
//             image.style.top = posY * 0.9 + 'px';
//         }
//         window.addEventListener('scroll', paralax);
//     })();
// });

// window.addEventListener('scroll', function () { scrollParalax(); });

parallaxBG.forEach(element => {
    element.style.backgroundPosition = `center`;
    element.style.backgroundSize = `130% auto`;
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