const messageSend = document.querySelector('#messageSend');
const popapSend = document.querySelector('.popap-send');
const contactForm = document.querySelector('#contactForm');
messageSend.onclick = function (e) {
    e.preventDefault()
    const userInfo = {
        userName: document.querySelector('#userName').value,
        userMail: document.querySelector('#userMail').value,
        userTel: document.querySelector('#userTel').value,
        userCompany: document.querySelector('#userCompany').value,
        userMessege: document.querySelector('#userMessege').value
    };

    document.querySelector('.user-name').innerHTML = userInfo.userName;
    document.querySelector('.user-mail').innerHTML = userInfo.userMail;
    document.querySelector('.user-phone').innerHTML = userInfo.userTel;
    document.querySelector('.user-company').innerHTML = userInfo.userCompany;
    document.querySelector('.user-message').innerHTML = userInfo.userMessege;
    
    // console.log(userInfo.userName)
    // console.log(userInfo.userMail)
    // console.log(userInfo.userTel)
    // console.log(userInfo.userCompany)
    // console.log(userInfo.userMessege)
}

popapSend.onclick = function (e) {
    e.preventDefault()
    contactForm.classList.remove('open');
}