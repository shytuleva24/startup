const worksPhotosContainer = document.querySelector('.works-photo');
const worksPhotosCards = worksPhotosContainer.children
let delayTimeAnim = 1.3;

for (let index = 0; index < worksPhotosCards.length; index++) {
    const element = worksPhotosCards[index]; 
    element.style.transition = `all .3s ease ${delayTimeAnim}s`;
    delayTimeAnim = delayTimeAnim + 0.2;
}