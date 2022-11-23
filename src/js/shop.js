// const basketCounter = document.querySelector('.basket-counter');
// const productContainer = document.querySelector('.products-container');
// const notProduct = document.querySelector('.product-none');
// const btnCheckout = document.querySelector('.popap-checkout');





// class Shop {
//     constructor(product = {}) {
//         this.product = product;
//     }

//     addProduct(name, price, amount) { // поставка продуктов в магазин
//         this.product[name] = {"price": price, "amount": amount};
//     }

//     productList(obj) { // вывод списка продуктов на экран
//         const products = document.querySelector('#products');
//         for (const [key, value] of Object.entries(obj)) { 
//             const product = document.createElement("a");
//             product.href = "#";
//             products.appendChild(product);
//             product.innerHTML = `${key} price ${value.price} uah (available ${value.amount})`;
//         }
//     }
// };

// class Basket {
//     constructor(items = {}) {
//         this.items = items;
//     }

//     addProduct(name, amount) { // добавить товар в корзину
//         if (shop.product[name] && amount <= shop.product[name].amount) {
//             if (this.items[name]) {
//                 let sumAmount = this.items[name].amount + amount;
//                 this.items[name] = {"price": shop.product[name].price, "amount": sumAmount};
//             } else {
//                 this.items[name] = {"price": shop.product[name].price, "amount": amount};
//             }
//             shop.product[name].amount = shop.product[name].amount - amount;
//             // console.log(`%c you have added ${amount} of ${name} to your basket`, 'color: #1E90FF' );
//             this.setTotalPrice();
//             showProductsInBusket ();
//             localStorage["basketItems"] = JSON.stringify(basket.items);
//         } else {
//             console.log("%c This item is out of stock", 'color: #8B0000');
//         }
//     }
//     setTotalPrice() { // общая сумма товаров в корзине
//         this.summPrise = 0;
//         for(const [key, value] of Object.entries(this.items)) { 
//             if (value.amount > 0) {
//                 let summ = value.price * value.amount;
//                 this.summPrise += summ;
//             }
//         }
//     }
//     removeProduct(name) { // удалить один товар из корзины
//         if (this.items[name]) {
//             shop.product[name].amount = shop.product[name].amount + this.items[name].amount;
//             delete this.items[name];
//             this.setTotalPrice();
//             localStorage["basketItems"] = JSON.stringify(basket.items);
//         }
//     }
//     remove() { // удалить все товары из корзины
//         for(const [key, value] of Object.entries(this.items)) { 
//             delete this.items[key];
//             shop.product[key].amount = shop.product[key].amount + value.amount;
//         }
//         localStorage["basketItems"] = JSON.stringify(basket.items);
//         this.setTotalPrice();
//     }

//     static updateCounter () {
//         const basketItems = Object.keys(basket.items);
//         if (basketItems.length == 0) {
//             notProduct.style.display = "block";
//             productContainer.style.display = "none";
//             btnCheckout.style.display = "none";
//             basketCounter.style.opacity = "0";
//         } else {
//             notProduct.style.display = "none";
//             productContainer.style.display = "block";
//             btnCheckout.style.display = "inline-block";
//             basketCounter.style.opacity = "1";
//             basketCounter.innerHTML = basketItems.length;
//         }
//     }
// }

// class Customer {
//     constructor(customers = {}) {
//         this.customers = customers;
//     }

//     addCustomer(name,  age) { // добавить покупателей
//         this.customers[name] = {"name": name, "age": age, "cash": rand(20, 200), "basket": new Basket()};
//     }

//     outputOnSelect() { // вывод покупателей в селект
//         const buyer = document.querySelector('#buyer');
//         const infoBuyer = document.querySelector('#infoBuyer');
//         for(const [key, value] of Object.entries(this.customers)) { 
//             const customerName = document.createElement("option");
//             buyer.appendChild(customerName);
//             customerName.innerHTML = `${key}, ${value.age} лет (${value.cash}uah)`;
//         }
//     }

//     payOff() {  // скупиться
//         if (this.age < 18 && this.basket.items.beer) {
//             console.log(`%c you can't by beer, you are not 18 `, 'color: #008000'); 
//             this.basket.removeProduct("beer");
//             this.basket.setTotalPrice();  
//         }
//         if (this.basket.summPrise <= this.cash) {
//             console.log(`%c you have successfully paid for the goods and purchased:`, 'color: #008000'); 
//             for(const [key, value] of Object.entries(this.basket.items)) { 
//                 console.log(`%c - ${key}`, 'color: #008000'); 
//             }    
//             this.cash = this.cash - this.basket.summPrise;
//             console.log(`%c the total amount of goods is ${this.basket.summPrise} uah account balance ${this.cash}`, 'color: #008000');             
//             this.basket.remove();
//         } else if (this.basket.summPrise > this.cash) {
//             console.log("%c You don't have enough money", 'color: #FF0000');
//             for(const [key, value] of Object.entries(this.basket.items)) { 
//                 shop.product[key].amount = shop.product[key].amount + value.amount;
//             } 
//         }
//     }
// }
// const shop = new Shop();
// const basket = new Basket();
// const deleteProduct = document.querySelectorAll('.delite-products svg');
// console.log(shop);

// if (localStorage["basketItems"] ) {
//     basket.items = JSON.parse(localStorage["basketItems"])
// }


// if (localStorage["shopProduct"] ) {
//     shop.product = JSON.parse(localStorage["shopProduct"])
// } else {
//     cardsWorksPhoto.forEach(element => {
//         const nameProduct = element.querySelector('.works-photo__title').textContent
//         const priceProduct = element.querySelector('.works-photo__price').textContent
//         element.querySelector('.works-photo__btn').dataset.item = nameProduct;
//         shop.addProduct(nameProduct, parseInt(priceProduct), rand(1, 10));
//     });
// }

// showProductsInBusket ();
// cardsWorksPhoto.forEach(element => {
//     const nameProduct = element.querySelector('.works-photo__title').textContent
//     element.querySelector('.works-photo__btn').onclick = function (e) {
//         e.preventDefault();
//         basket.addProduct(nameProduct, 1);
//         Basket.updateCounter();
//         localStorage["shopProduct"] = JSON.stringify(shop.product)
//     }
// });

// deleteProduct.forEach(element => {
//     element.onclick = function () {
//         let productsInBusket = document.querySelectorAll(".product");
//         basket.removeProduct(element.dataset.name);
//         productsInBusket.forEach(el => {
//             if (el.dataset.atr == element.dataset.name) {
//                 el.remove()
//             }
//         });
//         showProductsInBusket ()
//         console.log(basket.items);
//     }
// });
// localStorage["shopProduct"] = JSON.stringify(shop.product)


// Basket.updateCounter();

function rand(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}

// function showProductsInBusket () {
//     const productsContainer = document.querySelector(".products-container tbody");
//     // productsContainer.querySelectorAll(".clone").forEach(clone => {
//     //     clone.remove();
//     // });
//     let productsInBusket = document.querySelectorAll(".product"),
//         srcProduct,
//         nameProduct,
//         priceProduct,
//         amountProduct,
//         index = 0,
//         summPrise = 0,
//         totalSummPrise = 0;
//     for(const [key, value] of Object.entries(basket.items)) { 
//         cardsWorksPhoto.forEach(element => {
//             if(element.dataset.id == key) {
//                 srcProduct = element.querySelector("img").src;
//                 nameProduct = key;
//                 amountProduct = value.amount;
//                 priceProduct = element.querySelector('.works-photo__price').textContent;
//                 summPrise = parseInt(priceProduct) * amountProduct;
//                 totalSummPrise += summPrise;
//             }
//         });
//         productsInBusket = document.querySelectorAll(".product");
//         if (productsInBusket.length < Object.entries(basket.items).length) {
//             let clone = productsInBusket[0].cloneNode(true);
//             productsContainer.insertAdjacentElement("afterbegin",  clone);
//         }
//         productsInBusket = document.querySelectorAll(".product");
//         productsInBusket[index].dataset.atr = nameProduct;
//         productsInBusket[index].querySelector(".delite-products svg").dataset.name = nameProduct;
//         productsInBusket[index].querySelector("img").src = srcProduct;
//         productsInBusket[index].querySelector(".name-product").innerHTML = nameProduct;
//         productsInBusket[index].querySelector(".counter-product").innerHTML = amountProduct;
//         productsInBusket[index].querySelector(".price-product").innerHTML = priceProduct;
//         productsInBusket[index].querySelector(".total-price-product").innerHTML = summPrise + " $";
//         index++;
//     }
//     productsContainer.querySelector(".total-price-basket").innerHTML = totalSummPrise+ " $";
// }

// const cardsWorksPhoto = document.querySelectorAll('.photo-card');
// const basketCounter = document.querySelector('.basket-counter');
// const productContainer = document.querySelector('.products-container');
// const notProduct = document.querySelector('.product-none');
// const btnCheckout = document.querySelector('.popap-checkout');

// class Shop {
//     constructor (selectorShop, selectorBusket) {
//         this.busketBlock = document.querySelector(selectorBusket);
//         this.shopBlock = document.querySelector(selectorShop);
//         this.basketCounter = this.busketBlock.querySelector(".basket-counter");
//         this.shopCards = this.shopBlock.children;
//         this.product = {};
//     }

//     addProduct() { // поставка продуктов в магазин
//         for(const [key, value] of Object.entries(this.shopCards)) { 
//             const nameProduct = value.querySelector('.works-photo__title').textContent
//             const priceProduct = value.querySelector('.works-photo__price').textContent
//             this.product[nameProduct] = {'price': parseInt(priceProduct), 'amount': rand(1, 10)}
//         }
//         console.log(this.product)
//     }
// }

// new Shop('.works-photo', '.basket').addProduct();

// const homeBtn = document.querySelector('#getStarted');

// homeBtn.onclick = function (e) {
//     e.preventDefault();
    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", '../docs/php/getStarted.php', true);
    // xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    // xhr.onload = () => {
    //     homeBtn.innerHTML = xhr.responseText;
    // }
    // let params = `rol=admin`
    // xhr.send(params);
    // sendAjaxFetch ("POST", '../docs/php/getStarted.php', params = "rol=admin")
    //     .then(params => {
            // homeBtn.innerHTML = params;
            // console.log(params)
//         })
// }
// function sendAjaxFetch (method, url, params = null) {
//     const headers = {
        // "Content-Type": "aplication/json"
        // "Content-Type": "text/html"
        // "Content-Type": ""
        // "Content-Type": "application/x-www-form-urlencoded"
    // }
//     return fetch(url, {
//         method: method,
//         body: JSON.stringify(params),
//         // body: params,
//         headers: headers
//     }).then(response => { // переменная в которую вернулись данные
//         if (response.ok) return response.text()
//         return response.then(error => {})
//     })
// }

// function sendAjax (url) {
//     return fetch(url).then(data => {
//         return data
//     })
// }

// fetch('../docs/php/getStarted.php')
//     .then(data => {
//         return data;
//         console.log(data);
//     })

// const myPromise = new Promise ((resolve, reject) => {
//     console.log("prepair data...");
//     setTimeout(() => {
//         const becendData = {name: "Dmitriy", company: "Hashtag academy"}
//         resolve(becendData)
//     }, 2000);
// })


// myPromise.then((becendData) => {
//     return new Promise ((resolve, reject) => {
//         setTimeout(function() {
//             becendData.type = "Education"
//             resolve(becendData)
//         }, 2000);
//     })
// }).then((becendData) => {console.log('Promise done!')});

// function sendAjax (method, requestURL, params = null) {
//     return new Promise ((resolve, reject) => {
//         const xhr = new XMLHttpRequest()
//         xhr.open(method, requestURL)
//         xhr.responseType = "json"
//         xhr.onerror = () => {
//             reject(xhr.response)
//         }
//         xhr.onload = () => {
//             if(xhr.status == 200) {
//                 reject(xhr.reject)
//             } else {
//                 resolve(xhr.response)
//             }
//         }
//         xhr.send(params)
//     })
// }

// fetch('../docs/php/getStarted.php')
//     .then(data => {
//         return data.json()
//     })
    // .then(data => {
    //     console.log(data[0])
    // })


// let test = sendAjaxFetch("https://jsonplaceholder.typicode.com/users")
// console.log(test)