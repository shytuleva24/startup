// class Shop {
//     constructor (selectorShop, selectorBusket) {
//         this.busketBlock = document.querySelector(selectorBusket);
//         this.shopBlock = document.querySelector(selectorShop);
//         // this.basketCounter = this.busketBlock.querySelector(".basket-counter");
//         this.shopCards = this.shopBlock.children;
//         this.product = {};
//     }

//     addProduct() { // поставка продуктов в магазин
//         for(const [key, value] of Object.entries(this.shopCards)) { 
//             const nameProduct = value.querySelector('.works-photo__title').textContent;
//             const priceProduct = value.querySelector('.works-photo__price').textContent;
//             this.product[nameProduct] = {'price': parseInt(priceProduct), 'amount': 10};
//         }
//         console.log(this.product)
//     }
// }

// new Shop('.works-photo', '.basket').addProduct();
