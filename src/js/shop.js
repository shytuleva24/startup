function filterCards () {
    let delayTimeAnim = 1.3;
    const worksMenu = document.querySelectorAll('.menu-category');
    const cards = document.querySelectorAll('.photo-card');
    let selectedFilter,
        currentCategory;

    for (let index = 0; index < cards.length; index++) {
        const element = cards[index]; 
        element.style.transition = `all .3s ease ${delayTimeAnim}s`;
        delayTimeAnim = delayTimeAnim + 0.2;
    }

    if (localStorage["currentCategory"]) {
        filter(localStorage["currentCategory"], cards);
    } 


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
            currentCategory = element.dataset.filter;
            filter(currentCategory, cards);
            localStorage["currentCategory"] = currentCategory;
        })
    });    
}

filterCards();