// let patern = /url\(["']?(.+)["']?\)/g;
const header = document.querySelector('.header');
const arrowUp = document.querySelector('.arrow-up');
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
window.addEventListener(`scroll`, navMenuBackground)

// анимация появления элементов при скролле

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


// localStorage home page

window.onload = function () {
    popap()
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

    ///////// shop
    const basketCounter = document.querySelector('.basket-counter');
    const productContainer = document.querySelector('.products-container');
    const notProduct = document.querySelector('.product-none');
    const btnCheckout = document.querySelector('.popap-checkout');
    const productHead = document.querySelector('.products-head');
    const totaPriceContainer = document.querySelector('.total-container');
    let basketItems  = {};

    if (localStorage["basketItems"]) {
        basketItems = JSON.parse(localStorage["basketItems"]);
    }

    fetch("goods.json")
        .then(response => {
            return response.json();
        })
        .then(response => {
            for (const [key, value] of Object.entries(response)) {
                const shopBlock = document.querySelector('.shop-block');
                const shopCard = document.createElement('div');
                const imgShopCard = document.createElement('img');
                const cardDescription = document.createElement('div');
                const shopCardTitle = document.createElement('p');
                const shopCardPrice = document.createElement('p');
                const shopCardCategory = document.createElement('p');
                const shopCardButton = document.createElement('a');

                shopCard.className = "_anim-show photo-card";
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
                shopCardPrice.innerText = value.price + " $";
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
            filterCards();
            translateToCart(btnsCard);
        })

    function translateToCart(event) {
        event.forEach(btn => {
            btn.onclick = function (e) {
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
                        if (idClone in basketItems) {
                            basketItems[idClone].amount++;
                        } else {
                            basketItems[idClone] = {
                                "src": srcClone,
                                "alt": altClone,
                                "name": nameClone,
                                "price": priceClone,
                                "amount": amountClone
                            };
                        }
                        localStorage["basketItems"] = JSON.stringify(basketItems);
                        showProductsInBusket();
                        updateCounter();
                    }, 300);
                }, 400);
            }
        });
    }
    updateCounter();
    showProductsInBusket();
    
    function showTotalPrice() {
        let sumPrice = 0;
        for (const [key, value] of Object.entries(basketItems)) {
            sumPrice += (value.amount * parseInt(value.price));
        }
        document.querySelector('.total-price-basket').innerHTML = sumPrice + " $";
    }

    function updateCounter() {
        if (Object.keys(basketItems).length == 0) {
            notProduct.style.display = "block";
            productHead.style.display = "none";
            totaPriceContainer.style.display = "none";
            btnCheckout.style.display = "none";
            basketCounter.style.opacity = "0";
        } else {
            notProduct.style.display = "none";
            productHead.style.display = "block";
            totaPriceContainer.style.display = "flex";
            btnCheckout.style.display = "inline-block";
            basketCounter.style.opacity = "1";
            basketCounter.innerHTML = Object.keys(basketItems).length;
        }
    }

    function showProductsInBusket() {
        let tableBody = '';
        for (const [key, value] of Object.entries(basketItems)) {
            tableBody += `
                <tr class="product" data-id="${key}">
                    <td class="photo-product">
                        <img src="${value.src}", alt="${value.alt}">
                    <td class="name-product">${value.name}</td>
                    <td class="price-product">${value.price}</td>
                    <td>
                        <button class="delite-products"> 
                            <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="100%" version="1.1" viewBox="0 0 24 24" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Icon"><path d="M4.251,9.031c-0,0 0.194,4.655 0.34,8.167c0.106,2.544 2.199,4.552 4.746,4.552c1.68,0 3.646,0 5.326,0c2.547,0 4.64,-2.008 4.746,-4.552c0.146,-3.512 0.34,-8.167 0.34,-8.167c0.018,-0.413 -0.304,-0.763 -0.718,-0.78c-0.413,-0.018 -0.763,0.304 -0.78,0.718c-0,-0 -0.194,4.655 -0.341,8.166c-0.072,1.741 -1.505,3.115 -3.247,3.115c-1.68,0 -3.646,0 -5.326,-0c-1.742,0 -3.175,-1.374 -3.247,-3.115c-0.147,-3.511 -0.341,-8.166 -0.341,-8.166c-0.017,-0.414 -0.367,-0.736 -0.78,-0.718c-0.414,0.017 -0.736,0.367 -0.718,0.78Z"/><path d="M7.459,5.25l0.374,-1.12c0.374,-1.123 1.425,-1.88 2.609,-1.88c0.944,0 2.172,0 3.116,0c1.184,-0 2.235,0.757 2.609,1.88l0.374,1.12l3.459,0c0.414,-0 0.75,0.336 0.75,0.75c0,0.414 -0.336,0.75 -0.75,0.75l-16,0c-0.414,-0 -0.75,-0.336 -0.75,-0.75c0,-0.414 0.336,-0.75 0.75,-0.75l3.459,0Zm7.5,0l-0.215,-0.645c-0.17,-0.511 -0.647,-0.855 -1.186,-0.855c-0.944,-0 -2.172,-0 -3.116,0c-0.539,-0 -1.016,0.344 -1.186,0.855l-0.215,0.645l5.918,0Z"/></g></svg>
                        </button>
                    </td>
                    <td class="count-product">
                        <div class="flex">
                            <button class="delite-product"> - </button>
                            <input class="counter-product" type="text" value="${value.amount}">
                            <button class="add-product"> + </button>
                        </div>
                    </td>
                    <td class="total-price-product">${value.amount * parseInt(value.price)} $</td>
                </tr>
            `;
        }
        showTotalPrice();
        productContainer.innerHTML = tableBody;
        const counterProducts = document.querySelectorAll('.counter-product');
        const addProducts = document.querySelectorAll('.add-product');
        const deliteProducts = document.querySelectorAll('.delite-product');
        const deliteAllProducts = document.querySelectorAll('.delite-products');
    
        deliteAllProduct(deliteAllProducts);
        counterProduct (counterProducts);
        deliteProduct (deliteProducts);
        addProduct (addProducts);
    }
    function addProduct (addProducts) {
        addProducts.forEach(element => {
            element.onclick = () => {
                const cart = element.closest('.product');
                const idCart = cart.dataset.id;
                const counterProduct = cart.querySelector('.counter-product');
                basketItems[idCart].amount++;
                counterProduct.value = basketItems[idCart].amount;
                cart.querySelector('.total-price-product').innerHTML = `${basketItems[idCart].amount * parseInt(basketItems[idCart].price)} $`;
                localStorage["basketItems"] = JSON.stringify(basketItems);
                showTotalPrice();
            };
        });
    }

    function deliteProduct (deliteProducts) {
        deliteProducts.forEach(element => {
            element.onclick = () => {
                const cart = element.closest('.product');
                const idCart = cart.dataset.id;
                const counterProduct = cart.querySelector('.counter-product');
                if (basketItems[idCart].amount > 1) {
                    basketItems[idCart].amount--;
                    cart.querySelector('.total-price-product').innerHTML = `${basketItems[idCart].amount * parseInt(basketItems[idCart].price)} $`;
                    counterProduct.value = basketItems[idCart].amount;
                    showTotalPrice();
                    localStorage["basketItems"] = JSON.stringify(basketItems);
                }
            };
        });
    }
    function deliteAllProduct(deliteAllProducts) {
        deliteAllProducts.forEach(element => {
            element.onclick = (e) => {
                const cart = element.closest('.product');
                const idCart = cart.dataset.id;
                delete basketItems[idCart];
                cart.remove();
                cart.style.display="none"
                // showProductsInBusket();
                showTotalPrice();
                updateCounter();
                localStorage["basketItems"] = JSON.stringify(basketItems);
            };
        });        
    }
    function counterProduct (counterProducts) {
        counterProducts.forEach(element => {
            element.addEventListener('input', function (e) {
                const cart = element.closest('.product');
                const idCart = cart.dataset.id;
                basketItems[idCart].amount = element.value;
                element.value = basketItems[idCart].amount;
                localStorage["basketItems"] = JSON.stringify(basketItems);
                cart.querySelector('.total-price-product').innerHTML = `${basketItems[idCart].amount * parseInt(basketItems[idCart].price)} $`;
                showTotalPrice();
                updateCounter();
            });
        });
    }


    function filterCards() {
        const cardsWorksPhoto = document.querySelectorAll('.photo-card');
        const worksMenu = document.querySelectorAll('.menu-category');
        let currentCategory;

        // let delayTimeAnim = 1.3;
        // for (let index = 0; index < cardsWorksPhoto.length; index++) {
        //     const element = cardsWorksPhoto[index]; 
        //     element.style.transition = `all .3s ease ${delayTimeAnim}s`;
        //     delayTimeAnim = delayTimeAnim + 0.2;
        // }

        if (localStorage["currentCategory"]) {
            filter(localStorage["currentCategory"], cardsWorksPhoto);
            worksMenu.forEach(element => {
                if (element.dataset.filter == localStorage["currentCategory"]) {
                    element.classList.add('active-category');
                }
            });
        }


        function filter(category, items) {
            items.forEach(item => {
                const categoryItem = item.querySelector(".works-photo__description").innerHTML.split(" ").includes(category);
                const isShowAll = category === 'all';
                if (!categoryItem && !isShowAll) {
                    item.classList.add('anim-card');
                } else {
                    item.classList.remove('anim-card');
                }
            });
        }

        worksMenu.forEach(element => {
            element.addEventListener('click', (e) => {
                worksMenu.forEach(el => {
                    el.classList.remove('active-category');
                });
                e.preventDefault();
                element.classList.add('active-category');
                currentCategory = element.dataset.filter;
                filter(currentCategory, cardsWorksPhoto);
                localStorage["currentCategory"] = currentCategory;
            })
        });
    }

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

function changeInClick() {
    const changeClicks = document.querySelectorAll(".services-card h3")
    changeClicks.forEach(element => {
        element.innerText = "Yeah, you did triple-click!!!"
    });
}

// filter works-photo