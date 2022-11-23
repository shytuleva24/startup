// scroll

// let homeMenuLinks = document.querySelectorAll(".home-menu a"),
//     interval;
// const btnGetInTouch = document.querySelectorAll("a.btn-home.roboto");

// let hamburger = document.querySelector(".hamburger");
// let homeMenu = document.querySelector(".home-menu");
// let isMobile = false;

// hamburger.onclick = toggleMenu;

// window.onresize = function(event) {
//     isMobile = window.innerWidth < 768
// };

// window.dispatchEvent(new Event('resize'));

// function toggleMenu() {
//     homeMenu.classList.toggle ("active-burger");
//     hamburger.classList.toggle ("open");
// }
// let interval;
// function scrollToBlock(href) {
//     let target = document.querySelector(href),
//         targetLocation = target.getBoundingClientRect().top + window.pageYOffset, //положення цілі
//         currentPosition = window.pageYOffset, //поточна позиція
//         direction, //напрямок скролу
//         pixelScroll = 1, // швидкість скролу 
//         pixelsLeft; //залишилось пікселів до цілі
//     if (!header.classList.contains("header-hidden") && targetLocation < window.pageYOffset) {
//         targetLocation = target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight;
//     } 
//     if (targetLocation > currentPosition) {
//         direction = "down";
//     } else {
//         direction = "up";
//     }
//     clearInterval(interval);
//     interval = setInterval(()=> {
//         pixelsLeft = Math.abs(targetLocation - window.pageYOffset);
        
//         if (pixelScroll <= 50 && pixelsLeft > (window.innerHeight * 0.35)) {
//             pixelScroll *= 1.2;
//         } else if (pixelsLeft < (window.innerHeight * 0.35)  && pixelScroll > 3) {
//             pixelScroll *= 0.8;
//         }

//         if(direction == "down"){
//             window.scrollTo(0, window.pageYOffset + pixelScroll);
//         } else {
//             window.scrollTo(0, window.pageYOffset - pixelScroll);
//         }

//         if (Math.abs(window.pageYOffset - targetLocation) <= 3) {
//             window.scrollTo(0, targetLocation);
//             clearInterval(interval);
//         } else if (Math.abs(window.pageYOffset + window.innerHeight - document.body.getBoundingClientRect().height) < 5 ) {
//             clearInterval(interval);
//         }
//     }, 20)
// }

// homeMenuLinks.forEach(element => {
//     element.onclick = function (event) {
//         event.preventDefault();
//         scrollToBlock(this.getAttribute("href"));
//     } 
// });


/* ------------------------------------------------*/

// burger-menu and scroll
