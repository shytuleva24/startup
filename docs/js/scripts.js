let parallaxStartPos,previousScroll=0,scrollOffsetY=1;const parallaxBG=document.querySelectorAll(".parallax"),homePage=document.querySelector(".home-page");function moveBackground(e){if(window.innerWidth>1024){let o=e.pageY-window.pageYOffset-e.target.getBoundingClientRect().top+1,t=50+e.pageX/window.innerWidth*20,n=50+o/window.innerHeight*10;e.target.style.backgroundPosition=`${t}% ${n}%`}}parallaxBG.forEach((e=>{e.addEventListener("mousemove",(function(e){moveBackground(e)}))}));
homePage.style.height=window.innerHeight+"px";const animItems=document.querySelectorAll("._anim-items");if(animItems.length>0){function animOnScroll(){animItems.forEach((e=>{const t=e,i=t.offsetHeight,n=offset(t).top;let o=window.innerHeight-i/4;i>window.innerHeight&&(o=window.innerHeight-window.innerHeight/4),window.pageYOffset>n-o&&window.pageYOffset<n+i?t.classList.add("_active"):t.classList.contains("_anim-no-hide")||t.classList.remove("_active")}))}function offset(e){const t=e.getBoundingClientRect();let i=window.pageXOffset||document.documentElement.scrollLeft,n=window.pageYOffset||document.documentElement.scrollTop;return{top:t.top+n,left:t.left+i}}window.addEventListener("scroll",animOnScroll),setTimeout((()=>{animOnScroll()}),300)}let firstVisit,lastVisit,timeInSite,titleHome=document.querySelector(".title-home");window.onload=function(){localStorage.firstVisit&&"undefined"!=localStorage.firstVisit||(localStorage.firstVisit=new Date,titleHome.innerText="Welcome to STARTUP"),firstVisit=localStorage.firstVisit,localStorage.lastVisit||(localStorage.lastVisit=firstVisit),timeInSite=(new Date-new Date(localStorage.lastVisit))/1e3/60,(new Date-new Date(localStorage.firstVisit))/1e3/60<=5?titleHome.innerText="Welcome to STARTUP":timeInSite<5?titleHome.innerText="glad to see you again":timeInSite>=1440?titleHome.innerText="you were gone for a day, welcome to STARTUP":timeInSite>=5&&(titleHome.innerText="welcome back to STARTUP"),window.onblur=function(){localStorage.lastVisit=new Date},lastVisit=localStorage.lastVisit};const tripleClick=document.querySelector(".rock-solid svg"),changeClicks=document.querySelectorAll(".services-card h3");let timer;function changeInClick(){changeClicks.forEach((e=>{e.innerText="Yeah, you did triple-click!!!"}))}tripleClick.addEventListener("dblclick",(function(){timer=setTimeout((function(){timer=null}),200)})),tripleClick.addEventListener("click",(function(){timer&&(clearTimeout(timer),timer=null,changeInClick())}));
let interval,menu=document.querySelectorAll(".home-page .menu a");function scrollToBlock(e){let n,t,o=document.querySelector(e).getBoundingClientRect().top+window.pageYOffset,l=window.pageYOffset,i=1;n=o>l?"down":"up",clearInterval(interval),interval=setInterval((()=>{t=Math.abs(o-window.pageYOffset),i<=50&&t>.35*window.innerHeight?i*=1.2:t<.35*window.innerHeight&&i>3&&(i*=.8),"down"==n?window.scrollTo(0,window.pageYOffset+i):window.scrollTo(0,window.pageYOffset-i),Math.abs(window.pageYOffset-o)<=3?(window.scrollTo(0,o),clearInterval(interval)):Math.abs(window.pageYOffset+window.innerHeight-document.body.getBoundingClientRect().height)<5&&clearInterval(interval),console.log(i)}),20)}menu.forEach((e=>{e.onclick=function(e){e.preventDefault(),scrollToBlock(this.getAttribute("href"))}}));
const navigations=document.querySelectorAll(".slider_navigation"),container=document.querySelector(".slider-container");let sliderCards=document.querySelectorAll(".about-card");const aboutCards=document.querySelector(".about-cards");aboutCards.style.height=container.getBoundingClientRect().height+"px";let slideWisth,firstSlide,lastSlide,position=0;indexSlide=[0,3],console.log(indexSlide),sliderCards[0].insertAdjacentElement("beforebegin",sliderCards[sliderCards.length-1].cloneNode(!0)),sliderCards[sliderCards.length-1].insertAdjacentElement("afterend",sliderCards[0].cloneNode(!0)),slideWisth=sliderCards[0].getBoundingClientRect().width,position=-slideWisth,sliderCards=document.querySelectorAll(".about-card");for(let e=0;e<sliderCards.length;e++)sliderCards[e].style.position="absolute",sliderCards[e].style.left=`${position}px`,position+=slideWisth;for(const e of navigations)e.addEventListener("click",navigationHandler);function navigationHandler(){const{dir:e}=this.dataset;sliderCards=document.querySelectorAll(".about-card"),firstSlide=sliderCards[2].cloneNode(!0),lastSlide=sliderCards[sliderCards.length-3].cloneNode(!0),"prev"===e?(sliderCards[sliderCards.length-1].remove(),sliderCards[0].insertAdjacentElement("beforebegin",lastSlide)):"next"===e&&(sliderCards[0].remove(),sliderCards[sliderCards.length-1].insertAdjacentElement("afterend",firstSlide)),sliderCards=document.querySelectorAll(".about-card"),position-=slideWisth,sliderCards.forEach((e=>{e.style.left=position+"px",position+=slideWisth}))}