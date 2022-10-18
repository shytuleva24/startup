// const worksPhotosContainer = document.querySelector('.works-photo');
// const worksPhotosCards = worksPhotosContainer.children
// let delayTimeAnim = 1.3;

// for (let index = 0; index < worksPhotosCards.length; index++) {
//     const element = worksPhotosCards[index]; 
//     element.style.transition = `all .3s ease ${delayTimeAnim}s`;
//     delayTimeAnim = delayTimeAnim + 0.2;
// }

function filterCards () {
    const worksMenu = document.querySelectorAll('.menu-category');
    const cards = document.querySelectorAll('.photo-card');

    function filter (category, items) {
        items.forEach(item => {
            const isItemFiltered = item.classList.contains(category);
            const isShowAll = category === 'all'
            if (!isItemFiltered && !isShowAll) {
                item.classList.add('anime');
            } else {
                item.classList.remove('anime');
            }
        });
    }

    worksMenu.forEach(element => {
        element.addEventListener('click', (e) => {
            worksMenu.forEach(el => {
                el.classList.remove('active');
            });
            e.preventDefault();
            element.classList.add('active');
            const currentCategory = element.dataset.filter;
            filter(currentCategory, cards);
        })
    });
    // cards.forEach(card => {
    //     card.ontransitionend = function () {
    //         if (card.classList.contains('anime')) {
    //             card.classList.add('hide')
    //         }
    //     }
    // });
    
}

filterCards();