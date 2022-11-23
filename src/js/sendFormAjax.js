// function ajaxForm(form, method, requestURL) {
//     const promise = new Promise((resolve, reject) => {
//         const formData = new FormData(form);
//         return fetch(requestURL, {
//             method: method,
//             body: formData
//         }).then(response => {
//             form.reset();
//             return (response.ok) ? resolve(response) : reject(response)
//         })
//     });
//     return promise;
// }

// document.querySelector('#contactForms').onsubmit = function (e) { // id form
//     e.preventDefault();
//     ajaxForm(this, 'POST', '../docs/php/getStarted.php') // method, action
//         .then(response => response.text()) // все що після відправки
//         .then(response => {
//             console.log(response);
//         });
// }


