var openMap = document.querySelector(".maps");
var popupMap = document.querySelector(".popup__map");
var closeMap = popupMap.querySelector(".popup__close");

var openForm = document.querySelector(".contact__button");
var popupForm = document.querySelector(".popup__contact-form");
var closeForm = popupForm.querySelector(".popup__close");

var openBuy = document.querySelectorAll(".button--buy");
var popapCatalog = document.querySelector(".popup__catalog");
var closeBuy = popapCatalog.querySelector(".popup__close");



openMap.addEventListener("click", function(e) {
  e.preventDefault();
  openModal(openMap, popupMap)
});
closeMap.addEventListener("click", function(e) {
  e.preventDefault();
  closePopup(closeMap, popupMap)
});

openForm.addEventListener("click", function(e) {
  e.preventDefault();
  openModal(openForm, popupForm)
});
closeForm.addEventListener("click", function(e) {
  e.preventDefault();
  closePopup(closeForm, popupForm)
});

openBuy.addEventListener("click", function(e) {
  e.preventDefault();
  openModal(openBuy, popapCatalog)
});
closeBuy.addEventListener("click", function(e) {
  e.preventDefault();
  closePopup(closeBuy, popapCatalog)
});


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

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [59.938872, 30.322617],
          zoom: 16,
          controls: [],
          type: "yandex#map",

      }, {
          searchControlProvider: "yandex#search"
      },
      {
        suppressMapOpenBlock: true,
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          `<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>`
      ),

      myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
          hintContent: `191186, Санкт-Петербург,
          ул. Б. Конюшенная, д. 19/8`
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: "default#image",
      })
      myMap.behaviors
      .disable(["rightMouseButtonMagnifier", "scrollZoom"])
  myMap.geoObjects
      .add(myPlacemark)
});
