window.onload = function () {

    const header = document.querySelector('.header');
    const arrowUp = document.querySelector('.arrow-up');
    const iconMenu = document.querySelector('.menu-icon');
    const homeMenuLinks = document.querySelectorAll(".scroll-to");
    const menuBody = document.querySelector('.menu-body');
    const homePage = document.querySelector(".home-page");


    let lastScrollTop = 0;

    homePage.style.height = window.innerHeight + "px";

    function navMenuBackground() {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
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

    window.addEventListener(`scroll`, navMenuBackground);

    if (iconMenu) {
        iconMenu.addEventListener("click", function (e) {
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

        function onMenuLinkClick(href) {
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
    savedLastVisit();
    tripleClick();
    animBlockInScroll();
    confirmForm();
    parallaxEffect();
    zoomPhotoBlog(".img-zoom");
    new Shop().init();

    const sliderBoys = new InfinitySlider(".slider", {
        isArrows: true,
        isSlidesToScrollAll: true,
        baseCardWidth: "263rem",
        gap: 20,
        isAutoplay: true,
        autoplaySpeed: 5000,
        transitionCard: "all 1.5s ease-in-out",
    });

    const sliderBrands = new InfinitySlider(".slider-brands", {
        gap: 45,
        isAutoplay: true,
        autoplaySpeed: 5000,
        baseCardWidth: "127rem",
        transitionCard: "all 1.3s ease-in-out",
    });

    const sliderReviews = new InfinitySlider(".reviews.slider", {
        isAutoplay: true,
        autoplaySpeed: 6000,
        isDots: true,
        distanceToDots: 40,
        isEffectFadeOut: true,
        transitionCard: "all 1s ease-in-out",
    });

    sliderBoys.init();
    sliderBrands.init();
    sliderReviews.init();
    window.onresize = function () {
        sliderBoys.init();
        sliderBrands.init();
        sliderReviews.init();
    };
}

// let patern = /url\(["']?(.+)["']?\)/g;

// анимация появления элементов при скролле
function animBlockInScroll() {
    const animItems = document.querySelectorAll(`._anim-items`);

    if (animItems.length > 0) {
        window.addEventListener(`scroll`, animOnScroll);
        window.addEventListener(`touchmove`, animOnScroll);
        window.addEventListener(`wheel`, animOnScroll);

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
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }
        setTimeout(() => {
            animOnScroll();
        }, 300)
    }
}



// localStorage home page
function savedLastVisit() {
    let titleHome = document.querySelector(".title-home"),
        firstVisit,
        lastVisit,
        timeInSite;

    if (!localStorage.firstVisit || localStorage.firstVisit == "undefined") {
        localStorage.firstVisit = new Date();
        titleHome.innerText = "Welcome to STARTUP";
    }
    firstVisit = localStorage.firstVisit;

    if (!localStorage.lastVisit) {
        localStorage.lastVisit = firstVisit;
    }
    timeInSite = (new Date() - new Date(localStorage.lastVisit)) / 1000 / 60; // min
    let timeInSiteFirst = (new Date() - new Date(localStorage.firstVisit)) / 1000 / 60; // min
    if (timeInSiteFirst <= 5) {
        titleHome.innerText = "Welcome to STARTUP";
    } else if (timeInSite < 5) {
        titleHome.innerText = "glad to see you again";
    } else if (timeInSite >= 1440) {
        titleHome.innerText = "you were gone for a day, welcome to STARTUP";
    } else if (timeInSite >= 5) {
        titleHome.innerText = "welcome back to STARTUP";
    }

    window.onblur = function () {
        localStorage.lastVisit = new Date();
    }
    lastVisit = localStorage.lastVisit;
}

// tripl click
function tripleClick() {
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

    function changeInClick() {
        const changeClicks = document.querySelectorAll(".services-card h3")
        changeClicks.forEach(element => {
            element.innerText = "Yeah, you did triple-click!!!"
        });
    }
}
// zoom photo

function zoomPhotoBlog(classImg) {
    const zoomContainers = document.querySelectorAll(classImg);
    if (zoomContainers.length) {
        zoomContainers.forEach(element => {
            const zoomImg = element.querySelector('img');
            element.style.overflow = "hidden";
            element.addEventListener("mouseenter", function (e) {
                zoomImg.style.transform = "scale(2)";
            });
            element.addEventListener("mousemove", function (e) {
                let originX = ((e.clientX - element.getBoundingClientRect().x) / element.getBoundingClientRect().width) * 100;
                let originY = ((e.clientY - element.getBoundingClientRect().y) / element.getBoundingClientRect().height) * 100;
                zoomImg.style.transformOrigin = `${originX}% ${originY}%`;
            });
            element.addEventListener("mouseleave", () => {
                zoomImg.style.transform = "scale(1)";
            });
        });
    }
}