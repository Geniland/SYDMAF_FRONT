/**
* Template Name: Bootslander
* Template URL: https://bootstrapmade.com/bootslander-free-bootstrap-landing-page-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

 /**
  * Apply .scrolled class to the body as the page is scrolled down
  */
 function toggleScrolled() {
   const selectBody = document.querySelector('body');
   const selectHeader = document.querySelector('#header');
   if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
   window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
 }

 document.addEventListener('scroll', toggleScrolled);
 window.addEventListener('load', toggleScrolled);

 /**
  * Mobile nav toggle
  */
 const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

 function mobileNavToogle() {
   document.querySelector('body').classList.toggle('mobile-nav-active');
   mobileNavToggleBtn.classList.toggle('bi-list');
   mobileNavToggleBtn.classList.toggle('bi-x');
 }
// mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
 // scrollTop.addEventListener('click', (e) => {
 //   e.preventDefault();
 //   window.scrollTo({
 //     top: 0,
 //     behavior: 'smooth'
 //   });
 // });
//
 // window.addEventListener('load', toggleScrollTop);
 // document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });





  /*-----------------------------------------------
|  Swiper
-----------------------------------------------*/
// var swiperInit = function swiperInit() {
//   var themeContainers = document.querySelectorAll('[data-swiper-theme-container]');
//   themeContainers.forEach(function (themeContainer) {
//     var swiper = themeContainer.querySelector('[data-swiper]');
//     var options = utils.getData(swiper, 'swiper');
//     var thumbsOptions = options.thumb;
//     var thumbsInit;
//     if (thumbsOptions) {
//       var thumbImages = swiper.querySelectorAll('img');
//       var slides = '';
//       thumbImages.forEach(function (img) {
//         slides += "\n          <div class='swiper-slide'\">\n            <img class='img-fluid mt-1' src=".concat(img.src, " alt=''/>\n          </div>\n        ");
//       });
//       var thumbs = document.createElement('div');
//       thumbs.setAttribute('class', 'swiper thumb');
//       thumbs.innerHTML = "<div class='swiper-wrapper overflow-hidden'>".concat(slides, "</div>");
//       if (thumbsOptions.parent) {
//         var parent = document.querySelector(thumbsOptions.parent);
//         parent.parentNode.appendChild(thumbs);
//       } else {
//         swiper.parentNode.appendChild(thumbs);
//       }
//       thumbsInit = new window.Swiper(thumbs, thumbsOptions);
//     }
//     var swiperNav = themeContainer.querySelector('.swiper-nav');
//     // eslint-disable-next-line no-new
//     new window.Swiper(swiper, _objectSpread(_objectSpread({}, options), {}, {
//       navigation: {
//         nextEl: swiperNav === null || swiperNav === void 0 ? void 0 : swiperNav.querySelector('.swiper-button-next'),
//         prevEl: swiperNav === null || swiperNav === void 0 ? void 0 : swiperNav.querySelector('.swiper-button-prev')
//       },
//       pagination: {
//         el: themeContainer === null || themeContainer === void 0 ? void 0 : themeContainer.querySelector('.swiper-pagination'),
//         clickable: true
//       },
//       thumbs: {
//         swiper: thumbsInit
//       }
//     }));
//   });
// };

})();