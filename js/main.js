var popupMap = document.querySelector(".popup__map");
var popupForm = document.querySelector(".popup__contact-form");
var popapCatalog = document.querySelector(".popup__catalog");
if(popapCatalog) {
  var openBuy = document.querySelectorAll(".button--buy");
  var closeBuy = popapCatalog.querySelector(".popup__close");
  for (var index = 0; index < openBuy.length; index++) {
    var element = openBuy[index];
    element.addEventListener("click", function(e) {
      e.preventDefault();
      openModal(element, popapCatalog)
    });
    closeBuy.addEventListener("click", function(e) {
      e.preventDefault();
      closePopup(closeBuy, popapCatalog)
    });
  }
} else {
  var openMap = document.querySelector(".maps");
  var closeMap = popupMap.querySelector(".popup__close");
  var openForm = document.querySelector(".contact__button");
  var closeForm = popupForm.querySelector(".popup__close");
  var popupInput = popupForm.querySelectorAll("input, textarea");
  var popupLogin = popupForm.querySelector("#name");
  var popupEmail = popupForm.querySelector("#email");
  var popupText = popupForm.querySelector("#text-area");
  var popupSubmit = popupForm.querySelector(".contact-form__submit");
  var isStorageSupport = true;
  var loginStorage = "";
  var emailStorage = "";
  try {
    loginStorage = localStorage.getItem("login");
    emailStorage = localStorage.getItem("email");
  } catch (error) {
    isStorageSupport = false;
  }
  openMap.addEventListener("click", function(e) {
    e.preventDefault();
    openModal(openMap, popupMap);
  });
  closeMap.addEventListener("click", function(e) {
    e.preventDefault();
    closePopup(closeMap, popupMap);
  });
  popupForm.addEventListener("submit", valid);
  openForm.addEventListener("click", function(e) {
    e.preventDefault();
    if(loginStorage && emailStorage) {
      popupText.focus();
    } else if(loginStorage) {
      popupEmail.focus();
    } else {
      popupLogin.focus();
    }
    popupLogin.value = loginStorage;
    popupEmail.value = emailStorage;
    openModal(openForm, popupForm);
  });
  closeForm.addEventListener("click", function(e) {
    e.preventDefault();
    closePopup(closeForm, popupForm);
  });
  popupForm.addEventListener("submit", valid);
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [59.938872, 30.322617],
            zoom: 16,
            controls: [],
            type: "yandex#map"
        }, {
            searchControlProvider: "yandex#search"
        }, {
            suppressMapOpenBlock: true,
        }),

        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            `<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>`
        ),
        myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
            hintContent: `191186, Санкт-Петербург,
            ул. Б. Конюшенная, д. 19/8`
        }, {
            iconLayout: "default#image",
        })
        myMap.behaviors
        .disable(["rightMouseButtonMagnifier", "scrollZoom"])
    myMap.geoObjects
        .add(myPlacemark)
  });
}
function valid(e) {
  for (var i = 0; i < popupInput.length; i++) {
    var element = popupInput[i];
    element.setAttribute("required", true);
    if(!element.validity.valid) {
      popupError();
      e.preventDefault();
      popupSubmit.addEventListener("click", function() {
        if (!element.validity.valid) {
          popupError();
        }
      })
    } else if(isStorageSupport) {
      localStorage.setItem("login", popupLogin.value);
      localStorage.setItem("email", popupEmail.value);
    }
  }
}
function popupError() {
  popupForm.classList.add("popup--error");
  setTimeout(() => {
    popupForm.classList.remove("popup--error");
  }, 2000);
}
function openModal(btn, obj) {
  obj.classList.add("popup--open");
  popupOpenAnimate(obj);
  window.addEventListener("keydown", function(e) {
    if (e.keyCode === 27) {
      if(obj.classList.contains("popup--open")) {
        e.preventDefault();
        closePopup(btn, obj);
      }
    }
  });
};
function popupOpenAnimate(obj) {
  obj.classList.add("popup--open-animate");
  setTimeout(() => {
    obj.classList.remove("popup--open-animate");
  }, 2000);
};
function closePopup(btn, obj) {
  obj.classList.add("popup--close");
  setTimeout(() => {
    obj.classList.remove("popup--open");
    obj.classList.remove("popup--close");
  }, 800);
  btn.focus();
};
function popupOpenAnimate(obj) {
  obj.classList.add("popup--open-animate");
  setTimeout(() => {
    obj.classList.remove("popup--open-animate");
  }, 2000);
};
var product = document.querySelectorAll('.product');
product.forEach(element => {
  element.addEventListener('focus', function() {
    var btn = element.querySelectorAll('.product__button');
    btn[1].addEventListener('blur', function() {
      element.classList.remove('product--show');
    });
    element.classList.add('product--show');
  })
})
