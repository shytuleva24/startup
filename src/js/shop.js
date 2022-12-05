// class Shop {
//     constructor() {
//         this.basketCounter = document.querySelector('.basket-counter'),
//         this.productContainer = document.querySelector('.products-container'),
//         this.notProduct = document.querySelector('.product-none'),
//         this.btnCheckout = document.querySelector('.popap-checkout'),
//         this.productHead = document.querySelector('.products-head'),
//         this.totaPriceContainer = document.querySelector('.total-container'),
//         this.basketItems = {},
//         this.cardsWorksPhoto = {},
//         this.imgWidth,
//         this.imgheight
//     }

//     init() {
//         if (localStorage["basketItems"]) {
//             this.basketItems = JSON.parse(localStorage["basketItems"]);
//         }
//         fetch("goods.json")
//             .then(response => {
//                 return response.json();
//             })
//             .then(response => {
//                 this.filterCards.apply(this, [response]);
//                 this.updateCounter();
//                 this.showProductsInBusket();
//             })
//     }

//     buildingCards(obj) {
//         // let delayTimeAnim = 0;
//         for (const [key, value] of Object.entries(obj)) {
//             const shopBlock = document.querySelector('.shop-block');
//             const shopCard = document.createElement('div');
//             const imgShopCard = document.createElement('img');
//             const cardDescription = document.createElement('div');
//             const shopCardTitle = document.createElement('p');
//             const shopCardPrice = document.createElement('p');
//             const shopCardCategory = document.createElement('p');
//             const shopCardButton = document.createElement('a');

//             shopCard.className = "_anim-show photo-card";
//             // shopCard.style.transition = `all .2s ease ${delayTimeAnim}s`;
//             // shopCard.style.transform = `rotate(-180deg) scale(0.3)`;
//             shopCard.style.opacity = `0`;
//             shopCard.style.position = `relative`;
//             setTimeout(() => {
//                 shopCard.style.opacity = `1`;
//             //     shopCard.style.transform = `rotate(0) scale(1)`;
//             }, 1000);
//             // delayTimeAnim = delayTimeAnim + 0.2;
//             cardDescription.className = "works-description flex";
//             shopCardTitle.className = "works-photo__title";
//             shopCardPrice.className = "works-photo__price";
//             shopCardCategory.className = "works-photo__description roboto";
//             shopCardButton.className = "works-photo__btn roboto";
//             imgShopCard.className = "works-img";
//             imgShopCard.src = value.src;
//             imgShopCard.alt = value.alt;
//             shopCard.appendChild(imgShopCard);

//             shopCardTitle.innerText = value.title;
//             shopCardCategory.innerText = value.category;
//             shopCardPrice.innerText = value.price + "$";
//             shopCardButton.innerText = "add to card";
//             shopCardButton.href = value.href;
//             shopCardButton.dataset.id = key;

//             cardDescription.appendChild(shopCardTitle);
//             cardDescription.appendChild(shopCardPrice);
//             cardDescription.appendChild(shopCardCategory);
//             cardDescription.appendChild(shopCardButton);
//             shopCard.appendChild(cardDescription);
//             shopBlock.appendChild(shopCard);
//         }
//         const btnsCard = document.querySelectorAll(".works-photo__btn");
//         this.translateToCart(btnsCard, this.basketItems);
//     }

//     translateToCart(buttons, basket) {
//         buttons.forEach(btn => {
//             btn.onclick = (e) => {
//                 e.preventDefault();

//                 const shopCard = btn.closest('.photo-card');
//                 let posCardTop = shopCard.getBoundingClientRect().top;
//                 let posCardLeft = shopCard.getBoundingClientRect().left;

//                 const basketShop = document.querySelector('.basket');

//                 let posBasketTop = basketShop.getBoundingClientRect().top;
//                 let posBasketLeft = basketShop.getBoundingClientRect().left;
//                 let cloneCard = shopCard.cloneNode(true);
//                 let srcClone,
//                     altClone,
//                     nameClone,
//                     idClone,
//                     priceClone,
//                     amountClone;
//                 cloneCard.style.position = "fixed";
//                 cloneCard.style.transition = "all .5s ease";
//                 cloneCard.style.top = posCardTop + "px";
//                 cloneCard.style.left = posCardLeft + "px";
//                 cloneCard.style.opacity = "1";
//                 cloneCard.style.transform = "rotate(0) scale(1)";

//                 cloneCard.style.width = shopCard.getBoundingClientRect().width + "px";
//                 document.body.appendChild(cloneCard);
//                 setTimeout(() => {
//                     cloneCard.style.left = posBasketLeft - (shopCard.getBoundingClientRect().width / 10) + "px";
//                     cloneCard.style.top = posBasketTop + "px";
//                     cloneCard.style.width = (shopCard.getBoundingClientRect().width / 1.5) + "px";
//                     setTimeout(() => {
//                         cloneCard.style.width = (0) + "px";
//                     }, 200);
//                     setTimeout(() => {
//                         cloneCard.remove();
//                         srcClone = cloneCard.querySelector('.works-img').src;
//                         altClone = cloneCard.querySelector('.works-img').alt;
//                         nameClone = cloneCard.querySelector('.works-photo__title').innerHTML;
//                         priceClone = cloneCard.querySelector('.works-photo__price').innerHTML;
//                         idClone = cloneCard.querySelector('.works-photo__btn').dataset.id;
//                         amountClone = 1;
//                         if (idClone in basket) {
//                             basket[idClone].amount++;
//                         } else {
//                             basket[idClone] = {
//                                 "src": srcClone,
//                                 "alt": altClone,
//                                 "name": nameClone,
//                                 "price": priceClone,
//                                 "amount": amountClone
//                             };
//                         }
//                         localStorage["basketItems"] = JSON.stringify(basket);
//                         this.showProductsInBusket();
//                         this.updateCounter();
//                     }, 300);
//                 }, 400);
//             }
//         });
//     }

//     showProductsInBusket() {
//         let tableBody = '';
//         for (const [key, value] of Object.entries(this.basketItems)) {
//             tableBody += `
//                 <tr class="product" data-id="${key}">
//                     <td class="photo-product">
//                         <img src="${value.src}", alt="${value.alt}">
//                     <td class="name-product">${value.name}</td>
//                     <td class="price-product">${value.price}</td>
//                     <td class="count-product">
//                     <div class="flex">
//                     <button class="delite-product"> - </button>
//                     <input class="counter-product" type="number" value="${value.amount}">
//                     <button class="add-product"> + </button>
//                     </div>
//                     </td>
//                     <td class="total-price-product">${value.amount * parseInt(value.price)}$</td>
//                     <td>
//                         <button class="delite-products"> 
//                             <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="100%" version="1.1" viewBox="0 0 24 24" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Icon"><path d="M4.251,9.031c-0,0 0.194,4.655 0.34,8.167c0.106,2.544 2.199,4.552 4.746,4.552c1.68,0 3.646,0 5.326,0c2.547,0 4.64,-2.008 4.746,-4.552c0.146,-3.512 0.34,-8.167 0.34,-8.167c0.018,-0.413 -0.304,-0.763 -0.718,-0.78c-0.413,-0.018 -0.763,0.304 -0.78,0.718c-0,-0 -0.194,4.655 -0.341,8.166c-0.072,1.741 -1.505,3.115 -3.247,3.115c-1.68,0 -3.646,0 -5.326,-0c-1.742,0 -3.175,-1.374 -3.247,-3.115c-0.147,-3.511 -0.341,-8.166 -0.341,-8.166c-0.017,-0.414 -0.367,-0.736 -0.78,-0.718c-0.414,0.017 -0.736,0.367 -0.718,0.78Z"/><path d="M7.459,5.25l0.374,-1.12c0.374,-1.123 1.425,-1.88 2.609,-1.88c0.944,0 2.172,0 3.116,0c1.184,-0 2.235,0.757 2.609,1.88l0.374,1.12l3.459,0c0.414,-0 0.75,0.336 0.75,0.75c0,0.414 -0.336,0.75 -0.75,0.75l-16,0c-0.414,-0 -0.75,-0.336 -0.75,-0.75c0,-0.414 0.336,-0.75 0.75,-0.75l3.459,0Zm7.5,0l-0.215,-0.645c-0.17,-0.511 -0.647,-0.855 -1.186,-0.855c-0.944,-0 -2.172,-0 -3.116,0c-0.539,-0 -1.016,0.344 -1.186,0.855l-0.215,0.645l5.918,0Z"/></g></svg>
//                         </button>
//                     </td>
//                 </tr>
//             `;
//         }
//         this.cardsWorksPhoto = document.querySelectorAll('.photo-card')
//         this.showTotalPrice();
//         this.productContainer.innerHTML = tableBody;

//         this.deliteAllProduct();
//         this.counterProduct();
//         this.deliteProduct();
//         this.addProduct();
//     }


//     showTotalPrice() {
//         let sumPrice = 0;
//         for (const [key, value] of Object.entries(this.basketItems)) {
//             sumPrice += (value.amount * parseInt(value.price));
//         }
//         document.querySelector('.total-price-basket').innerHTML = sumPrice + "$";
//     }

//     updateCounter() {
//         if (Object.keys(this.basketItems).length == 0) {
//             this.notProduct.style.display = "block";
//             this.productHead.style.display = "none";
//             this.totaPriceContainer.style.display = "none";
//             this.btnCheckout.style.display = "none";
//             this.basketCounter.style.opacity = "0";
//         } else {
//             this.notProduct.style.display = "none";
//             this.productHead.style.display = "block";
//             this.totaPriceContainer.style.display = "flex";
//             this.btnCheckout.style.display = "inline-block";
//             this.basketCounter.style.opacity = "1";
//             this.basketCounter.innerHTML = Object.keys(this.basketItems).length;
//         }
//     }

//     addProduct() {
//         const addProducts = document.querySelectorAll('.add-product');
//         addProducts.forEach(element => {
//             element.onclick = () => {
//                 const cart = element.closest('.product');
//                 const idCart = cart.dataset.id;
//                 const counterProduct = cart.querySelector('.counter-product');
//                 this.basketItems[idCart].amount++;
//                 counterProduct.value = this.basketItems[idCart].amount;
//                 cart.querySelector('.total-price-product').innerHTML = `${this.basketItems[idCart].amount * parseInt(this.basketItems[idCart].price)}$`;
//                 localStorage["basketItems"] = JSON.stringify(this.basketItems);
//                 this.showTotalPrice();
//             };
//         });
//     }

//     deliteProduct() {
//         const deliteProducts = document.querySelectorAll('.delite-product');
//         deliteProducts.forEach(element => {
//             element.onclick = () => {
//                 const cart = element.closest('.product');
//                 const idCart = cart.dataset.id;
//                 const counterProduct = cart.querySelector('.counter-product');
//                 if (this.basketItems[idCart].amount > 1) {
//                     this.basketItems[idCart].amount--;
//                     cart.querySelector('.total-price-product').innerHTML = `${this.basketItems[idCart].amount * parseInt(this.basketItems[idCart].price)}$`;
//                     counterProduct.value = this.basketItems[idCart].amount;
//                     this.showTotalPrice();
//                     localStorage["basketItems"] = JSON.stringify(this.basketItems);
//                 }
//             };
//         });
//     }

//     deliteAllProduct() {
//         const deliteAllProducts = document.querySelectorAll('.delite-products');
//         deliteAllProducts.forEach(element => {
//             element.onclick = (e) => {
//                 e.stopPropagation();
//                 const cart = element.closest('.product');
//                 const idCart = cart.dataset.id;
//                 delete this.basketItems[idCart];
//                 cart.remove();
//                 cart.style.display = "none"
//                 this.showTotalPrice();
//                 this.updateCounter();
//                 localStorage["basketItems"] = JSON.stringify(this.basketItems);
//             };
//         });
//     }

//     counterProduct() {
//         const counterProducts = document.querySelectorAll('.counter-product');
//         counterProducts.forEach(element => {
//             element.addEventListener('input', (e) => {
//                 const cart = element.closest('.product');
//                 const idCart = cart.dataset.id;
//                 console.log(cart, idCart);
//                 this.basketItems[idCart].amount = element.value;
//                 element.value = this.basketItems[idCart].amount;
//                 localStorage["basketItems"] = JSON.stringify(this.basketItems);
//                 cart.querySelector('.total-price-product').innerHTML = `${this.basketItems[idCart].amount * parseInt(this.basketItems[idCart].price)}$`;
//                 this.showTotalPrice();
//                 this.updateCounter();
//             });
//         });
//     }

//     filterCards(obj) {
//         const worksMenu = document.querySelectorAll('.menu-category');
//         let currentCategory,
//             cartCurrentCategory = {};

//         if (localStorage["currentCategory"]) {
//             currentCategory = localStorage["currentCategory"];
//             worksMenu.forEach(element => {
//                 if (element.dataset.filter == localStorage["currentCategory"]) {
//                     element.classList.add('active-category');
//                 }
//             });
//         } else {
//             currentCategory = "all";
//             localStorage["currentCategory"] = currentCategory;
//         }
//         filter.apply(this, [currentCategory, obj]);
//         this.cardsWorksPhoto = document.querySelectorAll('.photo-card');

//         function filter(category, items) {
//             this.cardsWorksPhoto = document.querySelectorAll('.photo-card');
            
//             this.cardsWorksPhoto.forEach(element => {
//                 element.remove()
//             });
//             if (currentCategory == "all") {
//                 this.buildingCards(obj);
//             } else {
//                 cartCurrentCategory = {};
//                 for (const [key, value] of Object.entries(items)) {
//                     let categoryItem = value.category + "",
//                         idCart = key;
//                     if (categoryItem.split(" ").includes(category)) {
//                         cartCurrentCategory[idCart] = obj[idCart];
//                     }
//                 }
//                 this.buildingCards(cartCurrentCategory);
//                 this.animationCartsShop(cartCurrentCategory)
//             }
//         }

//         worksMenu.forEach(element => {
//             element.addEventListener('click', (e) => {
//                 worksMenu.forEach(el => {
//                     el.classList.remove('active-category');
//                 });
//                 e.preventDefault();
//                 element.classList.add('active-category');
//                 currentCategory = element.dataset.filter;
//                 this.cardsWorksPhoto = document.querySelectorAll('.photo-card');

//                 this.cardsWorksPhoto.forEach(element => {
//                     element.style.display = "none"
//                 });
//                 filter.apply(this, [currentCategory, obj]);
//                 localStorage["currentCategory"] = currentCategory;
//             })
//         });
//     }

//     animationCartsShop(object) {
//         this.imgWidth = document.querySelector('.photo-card').getBoundingClientRect().width;
//         console.log(this.imgWidth );

//         // const containerImg = document.querySelectorAll('.photo-card'),
//         //     img = containerImg.querySelector('img')
//         //     imgWidth = img.getBoundingClientRect().width,
//         //     imgHeight = img.getBoundingClientRect().height;
//         //     console.log(imgWidth, imgHeight);
//         for (const [key, value] of Object.entries(object)) {
//             const src = value.src;


//         }
//         const posLeft = [];
//         const posTop = [];
//         const countSpan = 30;

//         function sliderPlus() {
//             const container = document.querySelector('.slider'),
//                 cartsSlider = container.querySelectorAll('.img-cart');

//             cartsSlider.forEach(cart => {
//                 const img = cart.querySelector('img');
//                 let posX = 0,
//                     posY = 0,
//                     top = 0,
//                     left = 0;
//                 imgWidth = img.getBoundingClientRect().width;
//                 imgHeight = img.getBoundingClientRect().height;
//                 let widthSpan = imgWidth / countSpan;
//                 let heightSpan = imgHeight / countSpan;
//                 container.style.width = `${imgWidth}px`;
//                 container.style.height = `${imgHeight}px`;
//                 cart.style.width = `${imgWidth}px`;
//                 cart.style.height = `${imgHeight}px`;
//                 cart.style.top = `0`;
//                 cart.style.left = `0`;
//                 for (let i = 0; i < countSpan; i++) {
//                     left = 0;
//                     for (let j = 0; j < countSpan; j++) {
//                         let span = document.createElement('span');
//                         span.style.position = `absolute`;
//                         span.style.background = `url(${img.src}), no-repeat`;
//                         span.style.width = `${widthSpan}px`;
//                         span.style.height = `${heightSpan}px`;
//                         span.style.backgroundPosition = `${posX}px ${posY}px`;
//                         cart.appendChild(span);
//                         span.style.transition = `all ${(rand(5, 20))/10}s ease ${(rand(0, 15))/10}s`
//                         // span.style.top = `${rand(imgHeight*2, window.innerHeight/2)}px`;
//                         // span.style.left = `${rand(0, imgWidth)}px`;
//                         span.style.top = `${rand(-window.innerHeight/2, window.innerHeight/2)}px`;
//                         span.style.left = `${rand(-window.innerWidth/2, window.innerWidth/2)}px`;
//                         span.style.opacity = '0';
//                         posX -= widthSpan;
//                         posLeft.push(left);
//                         left += widthSpan;
//                     }
//                     posTop.push(top);
//                     top += heightSpan;
//                     posY -= heightSpan;
//                 }
//                 // img.remove()
//             });

//         }
//         sliderPlus();
//         // setInterval(() => {
//         //     let index = 0;
//         //     for (let i = 0; i < countSpan; i++) {
//         //         for (let j = 0; j < countSpan; j++) {
//         //             const span = spans[index];
//         //             index++;
//         //             span.style.top = `${posTop[i]}px`;
//         //             span.style.left = `${posLeft[j]}px`;
//         //             span.style.opacity = "1";
//         //         }
//         //     }
//         //     setTimeout(() => {
//         //         randPosition(spans)
//         //     }, 4000);
//         // }, 8000);

//         function randPosition(spans) {
//             spans.forEach(span => {
//                 span.style.transition = `all ${(rand(5, 20))/10}s ease ${(rand(0, 10))/10}s`
//                 // span.style.top = `${rand(imgHeight*2, window.innerHeight/2)}px`;
//                 // span.style.left = `${rand(0, imgWidth)}px`;
//                 span.style.top = `${rand(-window.innerHeight/2, window.innerHeight/2)}px`;
//                 span.style.left = `${rand(-window.innerWidth/2, window.innerWidth/2)}px`;
//                 span.style.opacity = '0';

//             });
//         }

//         function rand(min, max) {
//             return Math.floor(Math.random() * (max - min + 1)) + min;
//         }
//     }
// }


// new Shop('.works-photo', '.basket').addProduct();