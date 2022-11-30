function parallaxEffect() {
    let parallaxStartPos,
        previousScroll = 0,
        scrollOffsetY = 1;
    const parallaxBG = document.querySelectorAll(".parallax");

    function moveBackground(e) { // на комп
        if (window.innerWidth > 1024) {
            let Y = e.pageY - window.pageYOffset - e.target.getBoundingClientRect().top + 1;
            let offsetX = 50 + (e.pageX / window.innerWidth * 20);
            let offsetY = 50 + (Y / window.innerHeight * 10);
            e.target.style.backgroundPosition = `${offsetX}% ${offsetY}%`;
        } else {
            // window.addEventListener('scroll', function() { // на планшет
            //     let currentScroll = window.pageYOffset;
            //     console.log("+");
            //     if (window.pageYOffset < window.innerHeight) {
            //         if (currentScroll > previousScroll && scrollOffsetY < 99) {
            //             scrollOffsetY += 0.2;
            //             homePage.style.backgroundPosition = `50% ${scrollOffsetY}%`;
            //         } else if (scrollOffsetY > 1) {
            //             scrollOffsetY -= 0.2;
            //             homePage.style.backgroundPosition = `50% ${scrollOffsetY}%`;
            //         }
            //     }
            //     previousScroll = currentScroll;
            // });
        }
    }
    parallaxBG.forEach(element => {
        // element.style.backgroundPosition = `center`;
        // element.style.backgroundSize = `130% auto`;
        element.addEventListener("mousemove", function (e) {
            moveBackground(e);
        });
    });
}