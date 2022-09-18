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
