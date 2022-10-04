const messageSend = document.querySelector('#messageSend');
const popapAccept = document.querySelector('.popap-accept');
const popapDecl = document.querySelector('.popap-decline');
const contactForm = document.querySelector('#contactForm');
let userInfo = {};

messageSend.onclick = function (e) {
    e.preventDefault();
    userInfo = {
        userName: document.querySelector('#userName').value,
        userMail: document.querySelector('#userMail').value,
        userTel: document.querySelector('#userTel').value,
        userCompany: document.querySelector('#userCompany').value,
        userMessage: document.querySelector('#userMessage').value
    };

    document.querySelector('.user-name').innerHTML = userInfo.userName;
    document.querySelector('.user-mail').innerHTML = userInfo.userMail;
    document.querySelector('.user-phone').innerHTML = userInfo.userTel;
    document.querySelector('.user-company').innerHTML = userInfo.userCompany;
    document.querySelector('.user-message').innerHTML = userInfo.userMessage;
    
}
popapDecl.onclick = function (e) {
    e.preventDefault();
    contactForm.classList.remove('open');
    bodyUnLock();
}

popapAccept.onclick = function (e) {
    e.preventDefault();
    if (localStorage.userMessage) {
        let userMessage = JSON.parse(localStorage.getItem("userMessage"));
        let rewrite = confirm("Rewrite your message? " + userMessage.userMessage);
        console.log(rewrite)
        if (rewrite) {
            localStorage.setItem("userMessage", JSON.stringify(userInfo));
        }
    } else {
        localStorage.setItem("userMessage", JSON.stringify(userInfo));
    }
    contactForm.classList.remove('open');
    bodyUnLock();
}