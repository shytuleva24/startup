// scroll

let menu = document.querySelectorAll(".home-page .menu a"),
    interval;
const btnGetInTouch = document.querySelectorAll("a.btn-home.roboto");
    
function scrollToBlock(href) {
    let target = document.querySelector(href),
        targetLocation = target.getBoundingClientRect().top + window.pageYOffset, //положення цілі
        currentPosition = window.pageYOffset, //поточна позиція
        direction, //напрямок скролу
        pixelScroll = 1, // швидкість скролу 
        pixelsLeft //залишилось пікселів до цілі
    if (targetLocation > currentPosition) {
        direction = "down";
    } else {
        direction = "up";
    }
    clearInterval(interval);
    interval = setInterval(()=> {
        
        pixelsLeft = Math.abs(targetLocation - window.pageYOffset);
        
        if (pixelScroll <= 50 && pixelsLeft > (window.innerHeight * 0.35)) {
            pixelScroll *= 1.2;
        } else if (pixelsLeft < (window.innerHeight * 0.35)  && pixelScroll > 3) {
            pixelScroll *= 0.8;
        }

        if(direction == "down"){
            window.scrollTo(0, window.pageYOffset + pixelScroll);
        } else {
            window.scrollTo(0, window.pageYOffset - pixelScroll);
        }

        if (Math.abs(window.pageYOffset - targetLocation) <= 3) {
            window.scrollTo(0, targetLocation);
            clearInterval(interval);
        } else if (Math.abs(window.pageYOffset + window.innerHeight - document.body.getBoundingClientRect().height) < 5 ) {
            clearInterval(interval);
        }
    },20)
}

menu.forEach(element => {
    element.onclick = function (event) {
        event.preventDefault();
        scrollToBlock(this.getAttribute("href"));
    } 
});
