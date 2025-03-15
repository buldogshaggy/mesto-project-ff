(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}function o(e){e.target.classList.contains("popup")&&e.currentTarget.classList.remove("popup_is-opened")}function c(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(U.inactiveButtonClass)):(t.disabled=!0,t.classList.add(U.inactiveButtonClass))}e.d({},{gI:()=>U,cK:()=>T});var a={baseUrl:"https://nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"96c128e6-12dd-4ec5-ac75-627a0fa1164c","Content-Type":"application/json"}};function i(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function u(){return fetch("".concat(a.baseUrl,"/users/me"),{method:"GET",headers:a.headers}).then(i)}function l(e,t){var r=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),n=r.querySelector(".card__image"),o=r.querySelector(".card__title"),c=r.querySelector(".card__delete-button"),u=r.querySelector(".card__like-button"),l=r.querySelector(".card__like_count");return n.src=e.link,n.alt=e.name,o.textContent=e.name,l.textContent=e.likes.length,n.addEventListener("click",T),e.likes.some((function(e){return e._id===t}))&&u.classList.add("card__like-button_is-active"),e.owner._id===t?c.style.display="block":c.style.display="none",c.addEventListener("click",(function(){var t;(t=e._id,fetch("".concat(a.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:a.headers}).then(i)).then((function(){r.remove()}))})),u.addEventListener("click",(function(){var t;u.classList.contains("card__like-button_is-active")?(t=e._id,fetch("".concat(a.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:a.headers}).then(i)).then((function(e){l.textContent=e.likes.length,u.classList.remove("card__like-button_is-active")})):function(e){return fetch("".concat(a.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:a.headers}).then(i)}(e._id).then((function(e){l.textContent=e.likes.length,u.classList.add("card__like-button_is-active")}))})),r}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}document.getElementById("card-container");var d=document.querySelector(".popup_type_image"),p=d.querySelector(".popup__image"),_=d.querySelector(".popup__caption"),f=document.querySelectorAll(".popup"),y=document.querySelector(".profile__edit-button"),m=document.querySelector(".popup_type_edit"),v=document.querySelectorAll(".popup__close"),h=document.querySelector(".popup__form"),S=h.querySelector(".popup__input_type_name"),b=h.querySelector(".popup__input_type_description"),q=document.querySelector(".popup_type_new-card"),C=document.querySelector(".profile__add-button"),E=(q.querySelector(".popup__input_type_card-name"),q.querySelector(".popup__input_type_url"),document.querySelector(".profile__title")),L=document.querySelector(".profile__description"),g=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),x=document.querySelector(".profile__image-avatar"),A=null;function T(e){p.src=e.target.src,_.textContent=e.target.alt,p.alt=_.textContent,t(d)}v.forEach((function(e){e.addEventListener("click",(function(){r(e.closest(".popup"))}))})),y.addEventListener("click",(function(){t(m),function(e,t){e.querySelectorAll(t.inputSelector).forEach((function(r){r.classList.remove(t.inputErrorClass);var n=e.querySelector(".".concat(r.id,"-error"));n&&(n.textContent="",n.classList.remove(t.errorClass))}));var r=e.querySelector(t.submitButtonSelector);r&&(r.classList.add(t.inactiveButtonClass),r.disabled=!0)}(h,U)})),f.forEach((function(e){e.addEventListener("click",o)})),h.addEventListener("submit",(function(e){e.preventDefault(e);var t=S.value,n=b.value;E.textContent=t,L.textContent=n,r(m)})),C.addEventListener("click",(function(){t(q)})),f.forEach((function(e){return e.classList.add("popup_is-animated")})),S.value=E.textContent,b.value=L.textContent;var U={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};Array.from(document.querySelectorAll(U.formSelector)).forEach((function(e){!function(e){var t=Array.from(e.querySelectorAll(U.inputSelector)),r=e.querySelector(U.submitButtonSelector);c(t,r),t.forEach((function(n){n.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(U.inputErrorClass),r.classList.remove(U.errorClass),r.textContent=""}(e,t):function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.add(U.inputErrorClass),n.textContent=r,n.classList.add(U.errorClass)}(e,t,t.validationMessage)})(e,n),c(t,r)}))}))}(e)})),Promise.all([u(),fetch("".concat(a.baseUrl,"/cards"),{method:"GET",headers:a.headers}).then(i)]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,i=[],u=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=c.call(r)).done)&&(i.push(n.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?s(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],c=n[1];g.textContent=o.name,k.textContent=o.about,x.src=o.avatar,A=o._id,function(e,t,r){var n=document.querySelector(".places__list");e.forEach((function(e){var t=l(e,r);n.append(t)}))}(c,0,o._id)})).catch((function(e){console.error("Ошибка при загрузке данных:",e)}));var O=document.querySelector('form[name="edit-profile"]');O.addEventListener("submit",(function(e){e.preventDefault();var t,n,o=O.querySelector("#name-input"),c=O.querySelector("#description-input");(t=o.value,n=c.value,fetch("".concat(a.baseUrl,"/users/me"),{method:"PATCH",headers:a.headers,body:JSON.stringify({name:t,about:n})}).then(i)).then((function(e){console.log("Данные профиля обновлены:",e),function(e){var t=document.querySelector(".profile__title"),r=document.querySelector(".profile__description");t.textContent=e.name,r.textContent=e.about}(e),r(O)}))})),q.addEventListener("submit",(function(e){e.preventDefault();var t,n,o=w.querySelector(".popup__button"),c=o.textContent;o.textContent="Сохранение...",(t=q.querySelector(".popup__input_type_card-name").value,n=q.querySelector(".popup__input_type_url").value,fetch("".concat(a.baseUrl,"/cards"),{method:"POST",headers:a.headers,body:JSON.stringify({name:t,link:n})}).then(i)).then((function(e){var t=l(e,A);document.querySelector(".places__list").prepend(t),r(q)})).finally((function(){o.textContent=c}))}));var j=document.querySelector(".profile__image"),w=document.querySelector(".popup_type_edit_avatar"),B=w.querySelector(".popup__input_type_avatar");j.addEventListener("click",(function(){t(w)})),w.addEventListener("submit",(function(e){e.preventDefault();var t,n=w.querySelector(".popup__button"),o=n.textContent;n.textContent="Сохранение...",(t=B.value,fetch("".concat(a.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:a.headers,body:JSON.stringify({avatar:t})}).then(i)).then((function(e){document.querySelector(".profile__image-avatar").src=e.avatar,r(w),u()})).finally((function(){n.textContent=o}))}))})();