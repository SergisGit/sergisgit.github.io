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

  function clickLink(event) {
    mainNav.classList.add('main-nav_closed');
    mainNav.classList.remove('main-nav_opened');

    event.preventDefault();
    var V = 0.2,
      w = window.pageYOffset,
      hash = this.href.replace(/[^#]*(.*)/, '$1'),
      t = document.querySelector(hash).getBoundingClientRect().top,
      start = null;
    requestAnimationFrame(step);

    function step(time) {
      if (start === null) start = time;
      var progress = time - start,
        r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
      window.scrollTo(0, r+2);
      if (r != w + t) {
        requestAnimationFrame(step)
      } else {
        location.hash = hash
      }
    }
  }

  var links = document.querySelectorAll('.main-nav__link');
  for (i = 0; i < links.length; i += 1) {
    links[i].addEventListener('click', clickLink, false);
  }

  var navItems = document.getElementsByClassName('main-nav__item');
  var mainSections = document.getElementsByClassName('main__section');
  navItems[0].classList.add('main-nav__item_active');
  window.onscroll = function () {
    var pageOffset = window.pageYOffset;

    for (i = 0; i < mainSections.length; i += 1) {
      if ((pageOffset >= mainSections[i].offsetTop) & (pageOffset < mainSections[i + 1].offsetTop)) {
        navItems[i].classList.add('main-nav__item_active');
      } else {
        navItems[i].classList.remove('main-nav__item_active');
      }
      if (pageOffset >= mainSections[mainSections.length - 1].offsetTop) {
        navItems[mainSections.length - 1].classList.add('main-nav__item_active');
      } else {
        navItems[mainSections.length - 1].classList.remove('main-nav__item_active');
      }
    }
  }

}


// Галерея
function photoChanging(event) {
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
}

// Показать большие фотографии, переключить индекс
function galleryShow(event) {
  event.preventDefault();
  popupOverlay.style.transform = 'scale(1)';
  popupOverlay.style.opacity = '1';

  for (i = 0; i < imageLinks.length; i += 1) {
    imageLinks[i].classList.remove('image-index');
  }
  this.classList.add('image-index');

  imageSrc = this.getAttribute('href');
  siteHref = this.dataset.link;
  siteLink.setAttribute('href', siteHref);
  bigGalleryImage.setAttribute('src', '');
  bigGalleryImage.setAttribute('src', imageSrc);
  bigGalleryImage.onload = function () {
    bigGallery.style.transform = 'translateY(-50%) scale(1)';
    bigGallery.style.opacity = '1';
    bigGallery.style.zIndex = '50';
  }
}
if (gallery) {
  var popupOverlay = gallery.querySelector('.popup-overlay'),
    bigGallery = gallery.querySelector('.gallery__big'),
    bigGalleryImage = bigGallery.querySelector('.gallery__image_big'),
    siteLink = bigGallery.querySelector('.gallery__href'),
    imageLinks = gallery.querySelectorAll('.gallery__image-link'),

    btn = gallery.querySelectorAll('.btn'),
    galleryClose = gallery.querySelector('.gallery__close'),

    photos = Array.prototype.slice.call(imageLinks),
    photoShowed,
    imageSrc,
    siteHref;

  for (i = 0; i < btn.length; i += 1) {
    btn[i].addEventListener('click', photoChanging);
  }

  for (i = 0; i < imageLinks.length; i += 1) {
    imageLinks[i].addEventListener('click', galleryShow);
  }

  // Закрытие большой галереи по нажатию на Esc
  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      bigGallery.style.transform = '';
      bigGallery.style.opacity = '';
      popupOverlay.style.opacity = '';
      setTimeout(function () {
        bigGallery.style.zIndex = '';
        popupOverlay.style.transform = '';
      }, 300);
    }
  });
  // Закрытие большой галереи по нажатию на кнопку
  galleryClose.addEventListener('click', function (event) {
    bigGallery.style.transform = '';
    bigGallery.style.opacity = '';
    popupOverlay.style.opacity = '';
    setTimeout(function () {
      bigGallery.style.zIndex = '';
      popupOverlay.style.transform = '';
    }, 200);
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