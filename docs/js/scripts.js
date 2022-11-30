function confirmForm() {
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
    
}
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
    if (unlock && popupActive) {
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
    const zoomContainer = document.querySelectorAll(classImg);
    if (zoomContainer.length) {
        zoomContainer.forEach(element => {
            const zoomImg = element.querySelector('img');
            let widthContainer,
                heightContainer;
            element.style.overflow = "hidden";
            element.onmouseenter = function (e) {
                widthContainer = element.getBoundingClientRect().width
                heightContainer = element.getBoundingClientRect().height
                zoomImg.style.transform = "scale(2)";
                zoomImg.style.objectFit = `none`;
            };
            element.onmousemove = function (e) {
                let x = Math.floor((e.pageX - element.getBoundingClientRect().x) - (widthContainer / 2)),
                    y = Math.floor((e.pageY - element.getBoundingClientRect().y - window.pageYOffset) - (heightContainer / 2));
                zoomImg.style.objectPosition = `${-(x/2.05)}px ${-(y/2.05)}px`;
            };
            element.onmouseleave = function (e) {
                zoomImg.style.transform = "scale(1)";
                zoomImg.style.objectFit = `cover`;
                zoomImg.style.objectPosition = `0px 0px`;
            };
        });
    }
}
class Shop {
    constructor() {
        this.basketCounter = document.querySelector('.basket-counter'),
            this.productContainer = document.querySelector('.products-container'),
            this.notProduct = document.querySelector('.product-none'),
            this.btnCheckout = document.querySelector('.popap-checkout'),
            this.productHead = document.querySelector('.products-head'),
            this.totaPriceContainer = document.querySelector('.total-container'),
            this.basketItems = {},
            this.cardsWorksPhoto = {}
    }

    init() {
        if (localStorage["basketItems"]) {
            this.basketItems = JSON.parse(localStorage["basketItems"]);
        }
        fetch("goods.json")
            .then(response => {
                return response.json();
            })
            .then(response => {
                this.filterCards.apply(this, [response]);
                this.updateCounter();
                this.showProductsInBusket();
            })
    }

    buildingCards(obj) {
        let delayTimeAnim = 0;
        for (const [key, value] of Object.entries(obj)) {
            const shopBlock = document.querySelector('.shop-block');
            const shopCard = document.createElement('div');
            const imgShopCard = document.createElement('img');
            const cardDescription = document.createElement('div');
            const shopCardTitle = document.createElement('p');
            const shopCardPrice = document.createElement('p');
            const shopCardCategory = document.createElement('p');
            const shopCardButton = document.createElement('a');

            shopCard.className = "_anim-show photo-card";
            shopCard.style.transition = `all .2s ease ${delayTimeAnim}s`;
            shopCard.style.transform = `rotate(-180deg) scale(0.3)`;
            shopCard.style.opacity = `0`;
            setTimeout(() => {
                shopCard.style.opacity = `1`;
                shopCard.style.transform = `rotate(0) scale(1)`;
            }, 300);
            delayTimeAnim = delayTimeAnim + 0.2;
            cardDescription.className = "works-description flex";
            shopCardTitle.className = "works-photo__title";
            shopCardPrice.className = "works-photo__price";
            shopCardCategory.className = "works-photo__description roboto";
            shopCardButton.className = "works-photo__btn roboto";
            imgShopCard.className = "works-img";
            imgShopCard.src = value.src;
            imgShopCard.alt = value.alt;
            shopCard.appendChild(imgShopCard);

            shopCardTitle.innerText = value.title;
            shopCardCategory.innerText = value.category;
            shopCardPrice.innerText = value.price + "$";
            shopCardButton.innerText = "add to card";
            shopCardButton.href = value.href;
            shopCardButton.dataset.id = key;

            cardDescription.appendChild(shopCardTitle);
            cardDescription.appendChild(shopCardPrice);
            cardDescription.appendChild(shopCardCategory);
            cardDescription.appendChild(shopCardButton);
            shopCard.appendChild(cardDescription);
            shopBlock.appendChild(shopCard);
        }
        const btnsCard = document.querySelectorAll(".works-photo__btn");
        this.translateToCart(btnsCard, this.basketItems);
    }

    translateToCart(buttons, basket) {
        buttons.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();

                const shopCard = btn.closest('.photo-card');
                let posCardTop = shopCard.getBoundingClientRect().top;
                let posCardLeft = shopCard.getBoundingClientRect().left;

                const basketShop = document.querySelector('.basket');

                let posBasketTop = basketShop.getBoundingClientRect().top;
                let posBasketLeft = basketShop.getBoundingClientRect().left;
                let cloneCard = shopCard.cloneNode(true);
                let srcClone,
                    altClone,
                    nameClone,
                    idClone,
                    priceClone,
                    amountClone;
                cloneCard.style.position = "fixed";
                cloneCard.style.transition = "all .5s ease";
                cloneCard.style.top = posCardTop + "px";
                cloneCard.style.left = posCardLeft + "px";
                cloneCard.style.opacity = "1";
                cloneCard.style.transform = "rotate(0) scale(1)";

                cloneCard.style.width = shopCard.getBoundingClientRect().width + "px";
                document.body.appendChild(cloneCard);
                setTimeout(() => {
                    cloneCard.style.left = posBasketLeft - (shopCard.getBoundingClientRect().width / 10) + "px";
                    cloneCard.style.top = posBasketTop + "px";
                    cloneCard.style.width = (shopCard.getBoundingClientRect().width / 1.5) + "px";
                    setTimeout(() => {
                        cloneCard.style.width = (0) + "px";
                    }, 200);
                    setTimeout(() => {
                        cloneCard.remove();
                        srcClone = cloneCard.querySelector('.works-img').src;
                        altClone = cloneCard.querySelector('.works-img').alt;
                        nameClone = cloneCard.querySelector('.works-photo__title').innerHTML;
                        priceClone = cloneCard.querySelector('.works-photo__price').innerHTML;
                        idClone = cloneCard.querySelector('.works-photo__btn').dataset.id;
                        amountClone = 1;
                        if (idClone in basket) {
                            basket[idClone].amount++;
                        } else {
                            basket[idClone] = {
                                "src": srcClone,
                                "alt": altClone,
                                "name": nameClone,
                                "price": priceClone,
                                "amount": amountClone
                            };
                        }
                        localStorage["basketItems"] = JSON.stringify(basket);
                        this.showProductsInBusket();
                        this.updateCounter();
                    }, 300);
                }, 400);
            }
        });
    }

    showProductsInBusket() {
        let tableBody = '';
        for (const [key, value] of Object.entries(this.basketItems)) {
            tableBody += `
                <tr class="product" data-id="${key}">
                    <td class="photo-product">
                        <img src="${value.src}", alt="${value.alt}">
                    <td class="name-product">${value.name}</td>
                    <td class="price-product">${value.price}</td>
                    <td class="count-product">
                    <div class="flex">
                    <button class="delite-product"> - </button>
                    <input class="counter-product" type="number" value="${value.amount}">
                    <button class="add-product"> + </button>
                    </div>
                    </td>
                    <td class="total-price-product">${value.amount * parseInt(value.price)}$</td>
                    <td>
                        <button class="delite-products"> 
                            <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="100%" version="1.1" viewBox="0 0 24 24" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Icon"><path d="M4.251,9.031c-0,0 0.194,4.655 0.34,8.167c0.106,2.544 2.199,4.552 4.746,4.552c1.68,0 3.646,0 5.326,0c2.547,0 4.64,-2.008 4.746,-4.552c0.146,-3.512 0.34,-8.167 0.34,-8.167c0.018,-0.413 -0.304,-0.763 -0.718,-0.78c-0.413,-0.018 -0.763,0.304 -0.78,0.718c-0,-0 -0.194,4.655 -0.341,8.166c-0.072,1.741 -1.505,3.115 -3.247,3.115c-1.68,0 -3.646,0 -5.326,-0c-1.742,0 -3.175,-1.374 -3.247,-3.115c-0.147,-3.511 -0.341,-8.166 -0.341,-8.166c-0.017,-0.414 -0.367,-0.736 -0.78,-0.718c-0.414,0.017 -0.736,0.367 -0.718,0.78Z"/><path d="M7.459,5.25l0.374,-1.12c0.374,-1.123 1.425,-1.88 2.609,-1.88c0.944,0 2.172,0 3.116,0c1.184,-0 2.235,0.757 2.609,1.88l0.374,1.12l3.459,0c0.414,-0 0.75,0.336 0.75,0.75c0,0.414 -0.336,0.75 -0.75,0.75l-16,0c-0.414,-0 -0.75,-0.336 -0.75,-0.75c0,-0.414 0.336,-0.75 0.75,-0.75l3.459,0Zm7.5,0l-0.215,-0.645c-0.17,-0.511 -0.647,-0.855 -1.186,-0.855c-0.944,-0 -2.172,-0 -3.116,0c-0.539,-0 -1.016,0.344 -1.186,0.855l-0.215,0.645l5.918,0Z"/></g></svg>
                        </button>
                    </td>
                </tr>
            `;
        }
        this.cardsWorksPhoto = document.querySelectorAll('.photo-card')
        this.showTotalPrice();
        this.productContainer.innerHTML = tableBody;
        
        this.deliteAllProduct();
        this.counterProduct();
        this.deliteProduct();
        this.addProduct();
    }


    showTotalPrice() {
        let sumPrice = 0;
        for (const [key, value] of Object.entries(this.basketItems)) {
            sumPrice += (value.amount * parseInt(value.price));
        }
        document.querySelector('.total-price-basket').innerHTML = sumPrice + "$";
    }

    updateCounter() {
        if (Object.keys(this.basketItems).length == 0) {
            this.notProduct.style.display = "block";
            this.productHead.style.display = "none";
            this.totaPriceContainer.style.display = "none";
            this.btnCheckout.style.display = "none";
            this.basketCounter.style.opacity = "0";
        } else {
            this.notProduct.style.display = "none";
            this.productHead.style.display = "block";
            this.totaPriceContainer.style.display = "flex";
            this.btnCheckout.style.display = "inline-block";
            this.basketCounter.style.opacity = "1";
            this.basketCounter.innerHTML = Object.keys(this.basketItems).length;
        }
    }

    addProduct() {
        const addProducts = document.querySelectorAll('.add-product');
        addProducts.forEach(element => {
            element.onclick = () => {
                const cart = element.closest('.product');
                const idCart = cart.dataset.id;
                const counterProduct = cart.querySelector('.counter-product');
                this.basketItems[idCart].amount++;
                counterProduct.value = this.basketItems[idCart].amount;
                cart.querySelector('.total-price-product').innerHTML = `${this.basketItems[idCart].amount * parseInt(this.basketItems[idCart].price)}$`;
                localStorage["basketItems"] = JSON.stringify(this.basketItems);
                this.showTotalPrice();
            };
        });
    }

    deliteProduct() {
        const deliteProducts = document.querySelectorAll('.delite-product');
        deliteProducts.forEach(element => {
            element.onclick = () => {
                const cart = element.closest('.product');
                const idCart = cart.dataset.id;
                const counterProduct = cart.querySelector('.counter-product');
                if (this.basketItems[idCart].amount > 1) {
                    this.basketItems[idCart].amount--;
                    cart.querySelector('.total-price-product').innerHTML = `${this.basketItems[idCart].amount * parseInt(this.basketItems[idCart].price)}$`;
                    counterProduct.value = this.basketItems[idCart].amount;
                    this.showTotalPrice();
                    localStorage["basketItems"] = JSON.stringify(this.basketItems);
                }
            };
        });
    }

    deliteAllProduct() {
        const deliteAllProducts = document.querySelectorAll('.delite-products');
        deliteAllProducts.forEach(element => {
            element.onclick = (e) => {
                e.stopPropagation();
                const cart = element.closest('.product');
                const idCart = cart.dataset.id;
                delete this.basketItems[idCart];
                cart.remove();
                cart.style.display = "none"
                this.showTotalPrice();
                this.updateCounter();
                localStorage["basketItems"] = JSON.stringify(this.basketItems);
            };
        });
    }

    counterProduct() {
        const counterProducts = document.querySelectorAll('.counter-product');
        counterProducts.forEach(element => {
            element.addEventListener('input', (e) => {
                const cart = element.closest('.product');
                const idCart = cart.dataset.id;
                console.log(cart, idCart);
                this.basketItems[idCart].amount = element.value;
                element.value = this.basketItems[idCart].amount;
                localStorage["basketItems"] = JSON.stringify(this.basketItems);
                cart.querySelector('.total-price-product').innerHTML = `${this.basketItems[idCart].amount * parseInt(this.basketItems[idCart].price)}$`;
                this.showTotalPrice();
                this.updateCounter();
            });
        });
    }

    filterCards(obj) {
        const worksMenu = document.querySelectorAll('.menu-category');
        let currentCategory,
            cartCurrentCategory = {};

        if (localStorage["currentCategory"]) {
            currentCategory = localStorage["currentCategory"];
            worksMenu.forEach(element => {
                if (element.dataset.filter == localStorage["currentCategory"]) {
                    element.classList.add('active-category');
                }
            });
        } else {
            currentCategory = "all";
            localStorage["currentCategory"] = currentCategory;
        }
        filter.apply(this, [currentCategory, obj]);
        this.cardsWorksPhoto = document.querySelectorAll('.photo-card');

        function filter(category, items) {
            this.cardsWorksPhoto = document.querySelectorAll('.photo-card');
            this.cardsWorksPhoto.forEach(element => {
                element.remove()
            });
            if (currentCategory == "all") {
                this.buildingCards(obj);
            } else {
                cartCurrentCategory = {};
                for (const [key, value] of Object.entries(items)) {
                    let categoryItem = value.category + "",
                        idCart = key;
                    if (categoryItem.split(" ").includes(category)) {
                        cartCurrentCategory[idCart] = obj[idCart];
                    }
                }
                this.buildingCards(cartCurrentCategory);
            }
        }

        worksMenu.forEach(element => {
            element.addEventListener('click', (e) => {
                worksMenu.forEach(el => {
                    el.classList.remove('active-category');
                });
                e.preventDefault();
                element.classList.add('active-category');
                currentCategory = element.dataset.filter;
                this.cardsWorksPhoto = document.querySelectorAll('.photo-card');

                this.cardsWorksPhoto.forEach(element => {
                    element.style.display = "none"
                });
                filter.apply(this, [currentCategory, obj]);
                localStorage["currentCategory"] = currentCategory;
            })
        });
    }
}


new Shop('.works-photo', '.basket').addProduct();
// /** Slider by Hashtag team
//  * .slider                                      - обов'язковий клас для слайдера
//  * .slider-container                            - обов'язковий клас для контейнера слайдів 
//  * id                                           - обов'язково задати id

// .(карточки слайдера)                            - обов'язкові стилі для єффекту FadeOut
//     opacity: 0
//     visibility: hidden
// .(карточки слайдера).active
//     opacity: 1
//     visibility: visible

// .left.slider_navigation                         - класи для заддяння стилів на кнопки
// .right.slider_navigation                
// .slider-dot                                     - клас для задання стилів на точки


//  * const sliderProps = {
//         isSlidesToScrollAll: false,               - cкролити одразу всі видимі слайди
//         gap: 20,                                - відстань між слайдами
//         isArrows: false,                          - наявність стрілочок
//         isAutoplay: true,                         - автоскролл
//         autoplaySpeed: 3000                     - швидкість автоскролла
//         isDots: false,                            - наявність точок знизу слайдера
//         distanceToDots: 0,                      - паддінг для відображення точок, якщо потрібен
//         baseCardWidth: widthSliderContainer,    - базова ширина карточок слайдера
//         transitionCard: "all .8s ease-in-out",  - єффект появи карточок
//         isEffectFadeOut: false                  - тип слайдера (з плавною появою, або скролом вбік)
//     }

//  * infinitySlider(selector, settings)
//         - selector - шлях до слайдера, 
//         - settings - нестанарні налаштування sliderProps
//  **/

class InfinitySlider {
    constructor(selector, settings = {}) {
        this.settings = {
            ...InfinitySlider.defaultSettings,
            ...settings
        };
        this.slider = document.querySelector(selector);
        this.positionCards = 0;
        this.sliderContainer = this.slider.querySelector(".slider-container");
        this.sliderCards = this.sliderContainer.children;
        this.realCardsLength = this.sliderCards.length;
        this.heightCards = 0;
        this.widthSliderContainer;
        this.cardsCount;
        this.widthCards;
        this.distanceCards;
        this.cloneCard;
        this.prevBtnSlider;
        this.nextBtnSlider;
        this.sliderInterval;
        this.maxHeight;
        this.sliderDots;
        this.touchPoint;
        // InfinitySlider.defaultSettings.baseCardWidth = this.widthSliderContainer;
    };

    static defaultSettings = {
        // isSlidesToScrollAll: false,
        gap: 0,
        isArrows: false,
        isDots: false,
        distanceToDots: 0,
        isAutoplay: false,
        autoplaySpeed: 3000,
        baseCardWidth: null,
        transitionCard: "all 1s ease-in-out",
        isEffectFadeOut: false
    };

    init() {
        this.widthSliderContainer = this.sliderContainer.getBoundingClientRect().width;

        if (this.settings.baseCardWidth == null) this.settings.baseCardWidth = this.widthSliderContainer

        this.slider.querySelectorAll(".clone").forEach(clone => {
            clone.remove();
        });

        if (localStorage[this.slider.id + "Interval"]) {
            clearInterval(localStorage[this.slider.id + "Interval"]);
        }

        this.slider.style.position = "relative";
        this.sliderContainer.style.overflow = "hidden";
        this.sliderContainer.style.position = "relative";
        this.sliderContainer.style.width = "100%";
        
        this.cardsCount = Math.floor(this.widthSliderContainer / (parseInt(this.settings.baseCardWidth) + this.settings.gap));
        if (this.cardsCount == 0) this.cardsCount = 1;
        this.distanceCards = this.settings.gap;
        this.widthCards = (this.widthSliderContainer - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount;
        this.positionCards = 0 - (this.distanceCards + this.widthCards);

        if (this.settings.isArrows) this.creationArrows();
        this.prevBtnSlider = this.slider.querySelector('.left.slider_navigation');
        this.nextBtnSlider = this.slider.querySelector('.right.slider_navigation');
        if (this.settings.isArrows && this.sliderCards.length <= this.cardsCount) {
            this.prevBtnSlider.style.display = "none";
            this.nextBtnSlider.style.display = "none";
        } else if (this.settings.isArrows) {
            this.prevBtnSlider.style.display = "block";
            this.nextBtnSlider.style.display = "block";
        }
        if (this.settings.isDots && this.realCardsLength > 1) {
            this.creationDots();
            this.sliderDots = document.querySelectorAll('.slider-dot');
            for (let i = 0; i < this.sliderCards.length; i++) {
                if (this.sliderCards[i].classList.contains("activeFade")) {
                    this.sliderDots[i].classList.remove("activeFade");
                    this.sliderCards[i].classList.remove("activeFade");
                }
            }
            this.sliderDots[0].classList.add("activeFade");
            this.sliderCards[0].classList.add("activeFade");
        }

        if (!this.settings.isEffectFadeOut) {
            this.creationClons();
            this.shuffleCard();
        }

        this.sliderCards = this.sliderContainer.children;
        this.heightCards = 0;
        for (let i = 0; i < this.sliderCards.length; i++) {
            this.sliderCards[i].style.width = this.widthCards + "px";
            this.sliderCards[i].style.position = "absolute";
            this.maxHeight = this.sliderCards[i].getBoundingClientRect().height;
            if (this.heightCards < this.maxHeight) {
                this.heightCards = this.maxHeight;
            }
            this.sliderCards[i].style.transition = 'none';
            setTimeout(() => {
                this.sliderCards[i].style.transition = this.settings.transitionCard;
            }, 1);
        }

        this.settings.isDots ? this.sliderContainer.style.height = this.heightCards + this.settings.distanceToDots + 'px' : this.sliderContainer.style.height = this.heightCards + 'px';
        
        this.sliderDots = document.querySelectorAll('.slider-dot');
        this.sliderDots.forEach(element => {
            element.onclick = () => {
                clearInterval(localStorage[this.slider.id + "Interval"]);
                for (let index = 0; index < this.realCardsLength; index++) {
                    this.sliderDots[index].classList.remove("activeFade");
                    this.sliderCards[index].classList.remove("activeFade");
                }
                this.sliderCards[element.dataset.order].classList.add("activeFade");
                element.classList.add("activeFade");
            }
        });
        if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
            this.startAutoPlay();
        }
        this.slider.addEventListener('touchend', () => {
            if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
                this.startAutoPlay();
            }
        });
        
        this.touchSlider = this.touchSlider.bind(this);

        this.slider.addEventListener('touchstart', (e) => {
            this.touchPoint = e.touches[0].pageX;
            this.slider.addEventListener('touchmove', this.touchSlider);
            clearInterval(localStorage[this.slider.id + "Interval"]);
        });

        this.slider.onmouseenter = () => {
            clearInterval(localStorage[this.slider.id + "Interval"]);
        };

        this.slider.onmouseleave = () => {
            if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
                this.startAutoPlay();
            }
        };
    }

    creationClons() {
        let counter = 1;
        do {
            this.cloneCard = this.sliderCards[this.sliderCards.length - counter].cloneNode(true);
            this.cloneCard.classList.add("clone");
            this.cloneCard.style.transition = 'none';
            this.sliderContainer.insertAdjacentElement("afterbegin", this.cloneCard);
            this.realCardsLength = this.sliderCards.length - this.slider.querySelectorAll('.clone').length
            counter++;
        } while (counter <= this.realCardsLength && this.settings.isSlidesToScrollAll);
        
        if (this.settings.isSlidesToScrollAll) {
            counter = 0;
            while (counter < this.realCardsLength) {
                this.cloneCard = this.sliderCards[counter].cloneNode(true);
                this.cloneCard.classList.add("clone");
                this.cloneCard.style.transition = 'none';
                this.sliderContainer.insertAdjacentElement("beforeend", this.cloneCard);
                counter++;            
            }
        }
    }


    creationArrows() {
        const areArrowsExist = this.slider.querySelectorAll('.slider_navigation').length;
        if (areArrowsExist < 1) {
            this.prevBtnSlider = document.createElement("span");
            this.nextBtnSlider = document.createElement("span");
            this.prevBtnSlider.className = "left slider_navigation";
            this.nextBtnSlider.className = "right slider_navigation";
            this.slider.insertAdjacentElement("afterbegin", this.prevBtnSlider);
            this.slider.insertAdjacentElement("beforeend", this.nextBtnSlider);

            let isClickUnabled = true;
            const clickUnabled = () => {
                isClickUnabled = false;
                setTimeout(() => {
                    isClickUnabled = true;
                }, (parseFloat(this.sliderCards[0].style.transitionDuration) * 1000));
            };

            this.prevBtnSlider.onclick = () => {
                if (isClickUnabled) {
                    this.changeSlide("left");
                    clickUnabled();
                }
            };
            this.nextBtnSlider.onclick = () => {
                if (isClickUnabled) {
                    this.changeSlide("right");
                    clickUnabled();
                }
            };
        }
    }

    creationDots() {
        const dotsContainer = this.slider.querySelector('.dots-container');
        if (!dotsContainer) {
            let dotContainer = document.createElement("div");
            dotContainer.style.position = "absolute";
            dotContainer.className = "dots-container";
            dotContainer.style.bottom = "0";
            this.slider.insertAdjacentElement("beforeend", dotContainer);
            for (let index = 0; index < this.realCardsLength; index++) {
                const slideDot = document.createElement("span");
                slideDot.className = "slider-dot";
                slideDot.dataset.order = index;
                dotContainer.insertAdjacentElement("beforeend", slideDot);
            }
        }
    }

    shuffleCard() {
        this.sliderCards = this.sliderContainer.children;
        this.positionCards = 0 - (this.distanceCards + this.widthCards);
        if (this.settings.isSlidesToScrollAll) {
            this.positionCards = 0 - (this.distanceCards + this.widthCards) * this.realCardsLength;
        }
        for (let i = 0; i < this.sliderCards.length; i++) {
            this.sliderCards[i].style.left = this.positionCards + 'px';
            this.positionCards += (this.distanceCards + this.widthCards);
        }
    }

    changeSlide(direction) {
        this.widthSliderContainer = this.sliderContainer.getBoundingClientRect().width;
        this.cardsCount = Math.floor(this.widthSliderContainer / (parseInt(this.settings.baseCardWidth) + this.settings.gap));
        if (this.cardsCount == 0) this.cardsCount = 1;
        this.widthCards = (this.widthSliderContainer - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount;
        this.sliderCards = this.sliderContainer.children;
        let slideIndex = 0;
        for (let i = 0; i < this.sliderCards.length; i++) {
            if (this.sliderCards[i].classList.contains("activeFade")) {
                slideIndex = i;
            }
        }
        if (direction == "left") {
            if (this.settings.isSlidesToScrollAll) {
                for (let index = 0; index < this.cardsCount; index++) {
                    this.sliderContainer.insertAdjacentElement("afterbegin", this.sliderCards[this.sliderCards.length - 1]);
                }
            } else if (this.settings.isEffectFadeOut) {
                setTimeout(() => this.sliderCards[slideIndex].classList.add("activeFade"), 800);
                setTimeout(() => this.sliderDots[slideIndex].classList.add("activeFade"), 800);
                this.sliderCards[slideIndex].classList.remove("activeFade");
                this.sliderDots[slideIndex].classList.remove("activeFade");
                this.sliderCards[slideIndex - 1] ? slideIndex-- : slideIndex = this.sliderCards.length - 1;
            } else {
                this.sliderCards[this.sliderCards.length - 1].remove();
                let cloneLast = this.sliderCards[this.sliderCards.length - 1].cloneNode(true);
                cloneLast.classList.add("clone");
                this.sliderContainer.insertAdjacentElement("afterbegin", cloneLast);
                this.sliderCards[1].classList.remove("clone");
            }
        } else if (direction == "right") {
            if (this.settings.isSlidesToScrollAll) {
                for (let index = 0; index < this.cardsCount; index++) {
                    this.sliderContainer.insertAdjacentElement("beforeend", this.sliderCards[0]);
                }
            } else if (this.settings.isEffectFadeOut) {
                setTimeout(() => this.sliderCards[slideIndex].classList.add("activeFade"), 800);
                setTimeout(() => this.sliderDots[slideIndex].classList.add("activeFade"), 800);
                this.sliderCards[slideIndex].classList.remove("activeFade");
                this.sliderDots[slideIndex].classList.remove("activeFade");
                this.sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
            } else {
                this.sliderCards[0].remove();
                let cloneFirst = this.sliderCards[0].cloneNode(true);
                cloneFirst.classList.add("clone");
                this.sliderContainer.insertAdjacentElement("beforeend", cloneFirst);
                this.sliderCards[this.sliderCards.length - 2].classList.remove("clone");
            }
        }
        if (!this.settings.isEffectFadeOut) this.shuffleCard();
    }

    startAutoPlay() {
        clearInterval(localStorage[this.slider.id + "Interval"]);
        if (this.settings.isEffectFadeOut) {
            let slideIndex = 0;
            for (let i = 0; i < this.sliderCards.length; i++) {
                if (this.sliderCards[i].classList.contains("activeFade")) {
                    slideIndex = i;
                }
            }
            const setActive = (index) => {
                setTimeout(() => this.sliderCards[index].classList.add("activeFade"), 1000);
                setTimeout(() => this.sliderDots[index].classList.add("activeFade"), 1000);
            }
            this.sliderInterval = setInterval(() => {
                this.sliderCards[slideIndex].classList.remove("activeFade");
                this.sliderDots[slideIndex].classList.remove("activeFade");
                this.sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
                setActive(slideIndex);
            }, this.settings.autoplaySpeed);
        } else {
            this.sliderInterval = setInterval(() => {
                this.changeSlide("right");
            }, this.settings.autoplaySpeed);
        }
        localStorage[this.slider.id + "Interval"] = this.sliderInterval;
    }

    touchSlider(e) {
        if ((this.touchPoint + 20) < e.touches[0].pageX) {
            this.changeSlide('left');
            this.slider.removeEventListener('touchmove', this.touchSlider);
        } else if ((this.touchPoint - 20) > e.touches[0].pageX) {
            this.changeSlide('right');
            this.slider.removeEventListener('touchmove', this.touchSlider);
        }
    }
}


