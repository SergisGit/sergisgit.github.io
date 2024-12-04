(function () {
  "use strict";

  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i)
  ) {
    document.querySelector("html").classList.add("is-ios");
  }

  var root = document.documentElement;

  var navToggle = document.querySelector("#js-navToggle");
  navToggle.addEventListener("click", function () {
    root.classList.toggle("show-nav");
  });

  //открытие попапа
  var eventPP = document.querySelector("#js-eventPP");

  if (eventPP) {
    var eventOpenBtn = document.querySelector("#js-eventOpenBtn");

    const closeEventPP = function (event) {
      function close() {
        document.removeEventListener("keyup", closeEventPP);
        eventPP.removeEventListener("click", closeEventPP);
        root.classList.remove("show-event-popup");
      }

      switch (event.type) {
        case "keyup":
          if (event.key === "Escape" || event.keyCode === 27) close();
          break;
        case "click":
          if (
            event.target === this ||
            event.target.classList.contains("js-ppCloseBtn")
          )
            close();
          break;
      }
    };

    eventOpenBtn.addEventListener("click", function () {
      root.classList.add("show-event-popup");

      document.addEventListener("keyup", closeEventPP);
      eventPP.addEventListener("click", closeEventPP);
    });
  }

  //слайдер
  var swipers = document.querySelectorAll(".js-swiper");
  swipers.forEach(function (swpr) {
    new Swiper(swpr, {
      updateOnWindowResize: true,
      slidesPerView: "auto",
      freeMode: true,
      spaceBetween: 0,
      speed: 500,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-arrow-next",
        prevEl: ".swiper-arrow-prev",
        disabledClass: "arrow--disabled"
      }
    });
  });

  //Google карта
  var contactsMap = document.querySelector("#js-contactsMap");
  if (contactsMap) {
    var mapStyles = [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#242f3e"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#746855"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#242f3e"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563"
          }
        ]
      },
      {
        featureType: "poi",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#263c3f"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#6b9a76"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#38414e"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#212a37"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9ca5b3"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#746855"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#1f2835"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#f3d19c"
          }
        ]
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#2f3948"
          }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#17263c"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#515c6d"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#17263c"
          }
        ]
      }
    ];

    var mapCenter = new google.maps.LatLng(56.49387, 84.96274);

    var mapOptions = {
      center: mapCenter,
      disableDefaultUI: true,
      draggable: true,
      gestureHandling: "cooperative",
      scrollwheel: false,
      styles: mapStyles,
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      }
    };
    var map = new google.maps.Map(contactsMap, mapOptions);

    var point = new google.maps.LatLng(56.49385, 84.96274);

    var mapPin = new google.maps.MarkerImage(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABHCAMAAABf/MtLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAADAUExURUdwTK8wILwyJL0zI70yJbwyI79AIL0yJL8wILs0JLw0JLsyJL0zJbwyJbwzJB8eHv///3Nycjs6OldWVsRMP4+OjsRNP8fHx+Pj492ZkUlISOazrauqqu7MyMfGxsBAMS0sLMlZTc1mW/vy8sBAMvvy8WVkZMVMQPbl48lZTtmMg81mWtmMhMxmW4+Pj/fm4/fl5OGmnvHx8Z2cnMVNQPLZ1tWAdt6ZktBzaHNzc9V/duq/u+Gmn8hZTNFzabm5uYZR+N4AAAAOdFJOUwAQz9/f3xB/EIDPz9/ftWbT5QAAAWxJREFUWMPt1VlTwjAQAGDEaluPJiQhYGjtAeUQxPu+/v+/cpO2DC+OI7PRYcw+JOlO55vMdpO2WmtBNo3W9+FsZzvb2c529l/Y45hXi/iG6yA8fuKMkGUMqS5X1RvLONvA7tJOtaD9au5AginSo5A6hUem3+hRhmUTwhubjNFttbKzDwT7GqqtGpv0G5vE2Ptes9FrsvqW/9FmXDGIjHCuZwYJc0wUHCn9aYlJKO7uKmf/sh39LJxtxx7lObJ9e1emMA1oISN5OUmFmNMrIQSGnd/TM2M/w3iRwCDpCdK+i9EwMfY5jMkU056l0SvNtf0GT0PUfT9K+a6tAYUKP0wFpl3oSpTansuXchIh2jM9LKDWet/SlATNLkxjg2lqsjAtg9cnOqCbU1Ev9Ji6+wTTdv/LLbJdbHnsh160GwZW6ANz+Ns28LC+WXwL9lFt71mwv7gSUcKzuG/fYr2DtqEPd2w0YeAfR55vg/4EpN3f8dlAXnoAAAAASUVORK5CYII=",
      new google.maps.Size(91, 71), //size
      new google.maps.Point(0, 0), //origin point
      new google.maps.Point(0, 71) //offset point
    );

    new google.maps.Marker({
      position: point,
      map: map,
      icon: mapPin,
      title: "TAGREE digital"
    });

    window.addEventListener("resize", function () {
      map.setCenter(mapCenter);
    });
  }

  //обработка контента
  function wrapContent(el, wrapTag, wrapClass) {
    if (el.hasAttribute("data-no-wrap")) return;

    var wrapper = document.createElement(wrapTag);
    if (wrapClass) wrapper.className = wrapClass;

    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);

    if (el.tagName.toLowerCase() === "img" && el.alt) {
      var figcaption = document.createElement("figcaption");
      figcaption.innerHTML = el.alt;
      wrapper.appendChild(figcaption);
    }
  }

  var content = $(".content");

  $.each(content, function (i) {
    var thisContent = $(this);
    var iframe = thisContent.find(">iframe");

    $.each(iframe, function (i) {
      wrapContent(this, "div", "adaptive-frame");
    });

    var img = thisContent.find(
      ">img:not([align]):not(.alignright):not(.alignleft)"
    );

    $.each(img, function (i) {
      wrapContent(this, "figure");
    });
  });

  //custom select
  var jsSelectric = $(".js-selectric");
  if (jsSelectric.length) {
    jsSelectric.selectric({
      nativeOnMobile: false
    });
  }

  var mobileMask = $('.js-mobileMask');
  if (mobileMask.length) {
    mobileMask.mask('+7 (000) 000 00 00', { placeholder: "+7 (___) ___ __ __" });
  }

  //datapicker
  var dateField = $(".js-dateField");

  if (dateField.length) {
    var pickerInit = function (pick) {
      var dateInput = pick.find(".js-dateInput");
      var dateDay = pick.find(".js-dateDay");
      var dateMonth = pick.find(".js-dateMonth");
      var dateYear = pick.find(".js-dateYear");

      var dateConfig = {
        autoClose: true,
        minDate: new Date(),
        navTitles: {
          days: "MMMM <i>yyyy</i>",
        },
        onSelect: function ({date}) {
          dateDay.val(date ? ("0" + date.getDate()).slice(-2) : "");
          dateMonth.val(date ? ("0" + (date.getMonth() + 1)).slice(-2) : "");
          dateYear.val(date ? date.getFullYear() : "");
        }
      };
      new AirDatepicker(dateInput[0], dateConfig)
    };

    $.each(dateField, function (i) {
      pickerInit($(this));
    });
  }

})();
