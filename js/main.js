 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });

jQuery(document).ready(function($) {

	"use strict";

	

	var siteMenuClone = function() {
		var $menu = $('.site-mobile-menu');
		var $toggle = $('.site-navbar .js-menu-toggle');
		var opener;

		$('.js-clone-nav').each(function() {
			$(this).clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});

		$menu.attr({ 'role': 'dialog', 'aria-modal': 'true', 'aria-label': 'Navigation menu' });
		$menu.find('.has-children').each(function(counter) {
			var $item = $(this);
			var submenuId = 'collapseItem' + counter;
			$item.children('ul').attr({ 'class': 'collapse', 'id': submenuId });
			$item.prepend($('<button>', {
				'type': 'button',
				'class': 'arrow-collapse collapsed',
				'aria-label': 'Toggle ' + $item.children('a').first().text().trim() + ' submenu',
				'aria-controls': submenuId,
				'aria-expanded': 'false',
				'data-toggle': 'collapse',
				'data-target': '#' + submenuId
			}));
		});

		var closeMenu = function(restoreFocus) {
			if ($menu[0].contains(document.activeElement)) {
				document.activeElement.blur();
			}
			$('body').removeClass('offcanvas-menu');
			$menu.prop('inert', true).attr('aria-hidden', 'true');
			$toggle.removeClass('active').attr('aria-expanded', 'false');
			if (restoreFocus && opener) {
				opener.focus({ preventScroll: true });
			}
		};

		var focusMenu = function() {
			if (!$('body').hasClass('offcanvas-menu') || $menu[0].contains(document.activeElement)) return;
			var closeButton = $menu.find('.site-mobile-menu-close button')[0];
			// The visibility transition must take effect before the button can receive focus.
			if (getComputedStyle(closeButton).visibility === 'visible') {
				closeButton.focus({ preventScroll: true });
			}
			if (!$menu[0].contains(document.activeElement)) requestAnimationFrame(focusMenu);
		};

		$('body').on('click', '.js-menu-toggle', function() {
			if ($('body').hasClass('offcanvas-menu')) {
				closeMenu(true);
			} else {
				opener = this;
				$menu.prop('inert', false).attr('aria-hidden', 'false');
				$('body').addClass('offcanvas-menu');
				$toggle.addClass('active').attr('aria-expanded', 'true');
				requestAnimationFrame(focusMenu);
			}
		});

		$menu.on('click', 'a[href]', function() {
			closeMenu(false);
			// Keep keyboard focus at a selected section after same-page navigation.
			if (this.origin === location.origin && this.pathname === location.pathname &&
				this.search === location.search && this.hash) {
				var section = document.getElementById(decodeURIComponent(this.hash.slice(1)));
				if (section) {
					section.setAttribute('tabindex', '-1');
					section.focus({ preventScroll: true });
				}
			}
		});

		$(document).on('click', function(event) {
			if ($('body').hasClass('offcanvas-menu') &&
				!$(event.target).closest('.site-mobile-menu, .js-menu-toggle').length) {
				closeMenu(true);
			}
		});

		$(document).on('keydown', function(event) {
			if (!$('body').hasClass('offcanvas-menu')) return;
			if (event.key === 'Escape') {
				event.preventDefault();
				closeMenu(true);
			} else if (event.key === 'Tab') {
				var $controls = $menu.find('a[href], button').filter(':visible');
				var first = $controls[0];
				var last = $controls[$controls.length - 1];
				if (!$menu[0].contains(document.activeElement)) {
					event.preventDefault();
					(event.shiftKey ? last : first).focus();
				} else if (event.shiftKey && document.activeElement === first) {
					event.preventDefault();
					last.focus();
				} else if (!event.shiftKey && document.activeElement === last) {
					event.preventDefault();
					first.focus();
				}
			}
		});

		window.matchMedia('(min-width: 1200px)').addListener(function(event) {
			if (event.matches) closeMenu(false);
		});
	};
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();


	var siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	// siteSliderRange();


	var siteMagnificPopup = function() {
		$('.image-popup').magnificPopup({
	    type: 'image',
	    closeOnContentClick: true,
	    closeBtnInside: false,
	    fixedContentPos: true,
	    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
	     gallery: {
	      enabled: true,
	      navigateByImgClick: true,
	      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
	    },
	    image: {
	      verticalFit: true
	    },
	    zoom: {
	      enabled: true,
	      duration: 300 // don't foget to change the duration also in CSS
	    }
	  });

	  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
	    disableOn: 700,
	    type: 'iframe',
	    mainClass: 'mfp-fade',
	    removalDelay: 160,
	    preloader: false,

	    fixedContentPos: false
	  });
	};
	siteMagnificPopup();


	var siteCarousel = function () {
		if ( $('.nonloop-block-13').length > 0 ) {
			$('.nonloop-block-13').owlCarousel({
		    center: false,
		    items: 1,
		    loop: false,
				stagePadding: 0,
		    margin: 20,
		    autoplay: true,
		    nav: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        600:{
	        	margin: 20,
	          items: 1
	        },
	        1000:{
	        	margin: 20,
	        	stagePadding: 0,
	          items: 1
	        },
	        1200:{
	        	margin: 20,
	        	stagePadding: 0,
	          items: 1
	        }
		    }
			});
		}

		$('.slide-one-item').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
			stagePadding: 0,
	    margin: 0,
	    autoplay: true,
	    pauseOnHover: false,
	    nav: true,
	    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
	  });
	};
	siteCarousel();

	var siteStellar = function() {
		var mobileBackgrounds = window.matchMedia('(max-width: 1199.98px), (pointer: coarse)');
		var updateParallax = function() {
			// A cover image has no vertical overflow on phones, so parallax exposes gaps.
			if (mobileBackgrounds.matches) {
				$(window).stellar('destroy');
				return;
			}

			$(window).stellar({
				responsive: true,
				parallaxBackgrounds: false,
				parallaxElements: true,
				horizontalScrolling: false,
				hideDistantElements: false,
				scrollProperty: 'scroll'
			});
		};
		updateParallax();
		mobileBackgrounds.addListener(updateParallax);
	};
	siteStellar();

	var siteCountDown = function() {

		$('#date-countdown').countdown('2020/10/10', function(event) {
		  var $this = $(this).html(event.strftime(''
		    + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
		    + '<span class="countdown-block"><span class="label">%d</span> days </span>'
		    + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
		    + '<span class="countdown-block"><span class="label">%M</span> min </span>'
		    + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
		});
				
	};
	siteCountDown();

	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();

	var swiperSetting = function() {
		var mySwiper = new Swiper ('.swiper-container', {
	    // Optional parameters
	    // direction: 'horizontal',
	    // loop: true,

	    // If we need pagination
	    pagination: {
	      el: '.swiper-pagination',
	    },

	    // Navigation arrows
	    navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev',
	    },
	    mousewheel: {
		  	invert: false,
		  	forceToAxis: true,
		  	releaseOnEdges: true,
		  },

		  // direction: 'vertical',
		  freeMode: true,
      // slidesPerView: 'auto',
      spaceBetween: 30,
      mousewheel: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

	    // And if we need scrollbar
	    // scrollbar: {
	    //   el: '.swiper-scrollbar',
	    // },

	    slidesPerView: 3,
			breakpoints: {
				668: {
					slidesPerView: 1
				},
				1024: {
					slidesPerView: 2 
				}
			},
			// paginationClickable: false,
			spaceBetween: 20,
			// freeMode: true,
			// grabCursor: true,
			// mousewheelControl: true

	  })
	}
	swiperSetting();

});
