(function () {
'use strict';

  var bodyIndex = document.querySelector('.body-index'),

    mainNav = document.querySelector('.main-nav'),
    navToggle = document.querySelector('.main-nav__toggle'),

    gallery = document.querySelector('.gallery'),

    contactForm = document.querySelector('.contact-form'),

    i;

  var IE = window.navigator.userAgent;
  if (IE.indexOf("MSIE ") != -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('src', 'js/picturefill.min.js');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('async', 'false');
    head.appendChild(script);
  }

  mainNav.classList.remove('main-nav_nojs');
  mainNav.classList.add('main-nav_closed');

  function clickToggle(event) {
    event.preventDefault();
    mainNav.classList.toggle('main-nav_closed');
    mainNav.classList.toggle('main-nav_opened');
  }
  navToggle.addEventListener('click', clickToggle);

  if (bodyIndex) {
    bodyIndex.style.transition = 'opacity 0.4s';
    var clickLink = function (event) {
      mainNav.classList.add('main-nav_closed');
      mainNav.classList.remove('main-nav_opened');
      event.preventDefault();
      bodyIndex.style.opacity = '0';

      var w = window.pageYOffset,
        hash = this.href.replace(/[^#]*(.*)/, '$1'),
        r = document.querySelector(hash).getBoundingClientRect().top;

      setTimeout(function () {
        window.scrollTo(0, r + w);
        bodyIndex.style.opacity = '1';
      }, 500);
    };

    var links = document.querySelectorAll('.main-nav__link');
    for (i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', clickLink, false);
    }

    var navItems = document.getElementsByClassName('main-nav__item');
    var mainSections = document.getElementsByClassName('main__section');

    var changeActiveLink = function () {
      var pageOffset = window.pageYOffset;

      for (i = 0; i < (mainSections.length - 1); i += 1) {
        if ((mainSections[i].getBoundingClientRect().top <= 1) && (mainSections[i + 1].getBoundingClientRect().top > 1)) {
          navItems[i].classList.add('main-nav__item_active');
        } else {
          navItems[i].classList.remove('main-nav__item_active');
        }

      }
      if (mainSections[mainSections.length - 1].getBoundingClientRect().top <= 1) {
        navItems[mainSections.length - 1].classList.add('main-nav__item_active');
      } else {
        navItems[mainSections.length - 1].classList.remove('main-nav__item_active');
      }
    };

    window.onload = changeActiveLink;
    window.onscroll = changeActiveLink;

    //Анимации
    var dripW = document.querySelector(".drip-wrapper");
    var isScrolling = false;

    var pfx = ["webkit", "moz", "MS", "o", ""];

    var PrefixedEvent = function (element, type, callback) {
      for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p] + type, callback, false);
      }
    };

    var cTitle = document.querySelector(".capabilities__title-wrapper");
    var iconsF = document.querySelector(".capabilities__icons_first");
    var iconsS = document.querySelector(".capabilities__icons_second");
    var galleryS = document.querySelector(".gallery__small");

    var blog1 = document.querySelector(".myblog__article_first");
    var blog2 = document.querySelector(".myblog__article_second");
    var blog3 = document.querySelector(".myblog__article_third");
    var blog4 = document.querySelector(".myblog__article_fourth");

    var cLinks = document.querySelector(".contact-links");

    cTitle.style.opacity = "0";
    iconsF.style.opacity = "0";
    iconsS.style.opacity = "0";
    galleryS.style.opacity = "0";

    blog1.style.opacity = "0";
    blog2.style.opacity = "0";
    blog3.style.opacity = "0";
    blog4.style.opacity = "0";

    cLinks.style.opacity = "0";

    var scrolling = function (e) {

      if (isFullyVisible(cTitle)) {
        cTitle.style.animation = "bounceInDown 0.8s forwards";
      }
      if (isPartiallyVisible(iconsF)) {
        iconsF.style.animation = "bounceInLeft 1s forwards";
      }
      if (isPartiallyVisible(iconsS)) {
        iconsS.style.animation = "bounceInRight 1s forwards";
      }
      if (isPartiallyVisible(galleryS)) {
        galleryS.style.animation = "fadeIn 1.5s forwards";
      }

      if (isPartiallyVisible(blog1)) {
        blog1.style.animation = "zoomIn 1s forwards";
      }
      if (isPartiallyVisible(blog2)) {
        blog2.style.animation = "zoomIn 1s forwards";
      }
      if (isPartiallyVisible(blog3)) {
        blog3.style.animation = "zoomIn 1s forwards";
      }
      if (isPartiallyVisible(blog4)) {
        blog4.style.animation = "zoomIn 1s forwards";
      }
      if (isPartiallyVisible(cLinks)) {
        cLinks.style.animation = "bounceInUp 1s forwards";
      }

    };


    var isPartiallyVisible = function (el) {
      var elementBoundary = el.getBoundingClientRect();

      var top = elementBoundary.top;
      var bottom = elementBoundary.bottom;
      var height = elementBoundary.height;

      return ((top + height >= 0) && (height + window.innerHeight >= bottom));
    };

    var isFullyVisible = function (el) {
      var elementBoundary = el.getBoundingClientRect();

      var top = elementBoundary.top;
      var bottom = elementBoundary.bottom;

      return ((top >= 0) && (bottom <= window.innerHeight));
    };

    var throttleScroll = function (e) {
      if (isScrolling == false) {
        window.requestAnimationFrame(function () {
          scrolling(e);
          isScrolling = false;
        });
      }
      isScrolling = true;
    };

    window.addEventListener("scroll", throttleScroll, false);

    PrefixedEvent(dripW, "animationend", scrolling, false);

  }

  // Галерея
  if (gallery) {
    var popupOverlay = gallery.querySelector('.popup-overlay'),
      bigGallery = gallery.querySelector('.gallery__big'),
      bigGalleryImage = bigGallery.querySelector('.gallery__image_big'),
      siteLink = bigGallery.querySelector('.gallery__href'),
      gallerySmall = gallery.querySelector(".gallery__small"),
      imageLinks = gallery.querySelectorAll('.gallery__image-link'),

      btn = gallery.querySelectorAll('.btn'),
      galleryClose = gallery.querySelector('.gallery__close'),

      photos = Array.prototype.slice.call(imageLinks),
      photoShowed,
      imageSrc,
      siteHref;

    var photoChanging = function (event) {
      event.preventDefault();
      var showed = gallery.getElementsByClassName('image-index'),
        indexOfShowed = photos.indexOf(showed[0]);

      //переключаем индекс
      if (this.classList.contains('gallery__btn_next') && (indexOfShowed < (photos.length - 1))) {
        photos[indexOfShowed].classList.remove('image-index');
        photos[indexOfShowed + 1].classList.add('image-index');
      } else if (this.classList.contains('gallery__btn_prev') && (indexOfShowed > 0)) {
        photos[indexOfShowed].classList.remove('image-index');
        photos[indexOfShowed - 1].classList.add('image-index');
      }

      // переключаем индекс по кругу
      if (this.classList.contains('gallery__btn_next') && (indexOfShowed == (photos.length - 1))) {
        photos[indexOfShowed].classList.remove('image-index');
        photos[0].classList.add('image-index');
      } else if (this.classList.contains('gallery__btn_prev') && (indexOfShowed == 0)) {
        photos[indexOfShowed].classList.remove('image-index');
        photos[photos.length - 1].classList.add('image-index');
      }

      // переключаем большие фото
      photoShowed = gallery.querySelector('.image-index');
      imageSrc = photoShowed.getAttribute('href');
      bigGalleryImage.setAttribute('src', imageSrc);
      siteHref = photoShowed.dataset.link;
      siteLink.setAttribute('href', siteHref);
    };

    // Показать большие фотографии, переключить индекс
    gallerySmall.addEventListener('click', function (event) {
      var clickedElement = event.target;
      if (clickedElement.parentNode.classList.contains('gallery__image-link')) {
        clickedElement = clickedElement.parentNode;
      }
      if (clickedElement.classList.contains('gallery__image-link')) {
        event.preventDefault();
        popupOverlay.style.transform = 'scale(1)';
        popupOverlay.style.opacity = '1';

        for (i = 0; i < imageLinks.length; i += 1) {
          imageLinks[i].classList.remove('image-index');
        }
        clickedElement.classList.add('image-index');

        imageSrc = clickedElement.getAttribute('href');
        siteHref = clickedElement.dataset.link;
        siteLink.setAttribute('href', siteHref);
        bigGalleryImage.setAttribute('src', '');
        bigGalleryImage.setAttribute('src', imageSrc);
        bigGalleryImage.onload = function () {
          bigGallery.style.transform = 'translateY(-50%) scale(1)';
          bigGallery.style.opacity = '1';
          bigGallery.style.zIndex = '50';
        };

        for (i = 0; i < btn.length; i += 1) {
          btn[i].addEventListener('click', photoChanging);
        }

        // Закрытие большой галереи
        var closeGallery = function () {
          bigGallery.style.transform = '';
          bigGallery.style.opacity = '';
          popupOverlay.style.opacity = '';
          setTimeout(function () {
            bigGallery.style.zIndex = '';
            popupOverlay.style.transform = '';
          }, 300);
          for (i = 0; i < btn.length; i += 1) {
            btn[i].removeEventListener('click', photoChanging);
          }
          window.removeEventListener('keydown', closeGalleryEsc);
          galleryClose.removeEventListener('click', closeGallery);
        };

        var closeGalleryEsc = function (event) {
          if (event.keyCode === 27) {
            closeGallery();
          }
        };

        // Закрытие большой галереи по нажатию на Esc
        window.addEventListener('keydown', closeGalleryEsc);
        // Закрытие большой галереи по нажатию на кнопку
        galleryClose.addEventListener('click', closeGallery);

      }
    });

  }

  if (contactForm) {
    var contactName = contactForm.querySelector('#contact-name'),
      contactEmail = contactForm.querySelector('#contact-email'),
      contactText = contactForm.querySelector('#contact-text');

    contactName.removeAttribute('required');
    contactEmail.removeAttribute('required');
    contactText.removeAttribute('required');

    contactForm.addEventListener('submit', function (event) {
      if (!contactName.value || !contactEmail.value || !contactText.value) {
        event.preventDefault();
        contactForm.style.animation = "left-right 0.1s linear 4";
        setTimeout(function () {
          contactForm.style.animation = "";
          if (contactName.value && contactEmail.value) {
            contactText.focus();
          } else
            if (contactName.value) {
              contactEmail.focus();
            } else {
              contactName.focus();
            }
        }, 600);
      }
    });
  }
})();