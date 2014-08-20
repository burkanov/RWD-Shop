/* css({'border-top':'5px solid red'}) */

(function ($) {

	/* Settings ----------------*/
	//
	//
	var pageBody = $("body");
	var naviSwitch = $(".toggle-navigation");
	var naviStatus = "navi-open";
	var scrolledOffStatus = "scrolled";
	var searchField = $(".search-field");
	var centralNavi = $(".central-navi");
	var rememberButton = $(".remember-button");

	var header = {};
		header.selector = $(".module.header");
		header.heightMass = header.selector.innerHeight();

	var naviPanel = {};
		naviPanel.selector = $(".navi-panel");

	var contentPanel = {};
		contentPanel.selector = $(".main");

	var searchMenuItem = naviPanel.selector.find('.find > a');
	//
	/*--------------------------*/

	var openNavigationPanel = function() {
		pageBody.addClass(naviStatus);
		naviPanel.selector.focus();
	};

	var closeNavigationPanel = function() {
		pageBody.removeClass(naviStatus);
		naviPanel.selector.blur();
	};

	var prepareNavigationToggle = function() {
		
		naviSwitch.click(function(event) {
			if (!pageBody.hasClass(naviStatus)){
				openNavigationPanel();
			}else{
				closeNavigationPanel();
			}
		});

		naviPanel.selector.click(function( event ) {
			if ($(event.target).hasClass('navi-panel')){
				closeNavigationPanel();
			}
		});

	};

	var prepareSearchFocus = function() {
		searchMenuItem.click(function(event) {
			closeNavigationPanel();
			searchField.focus();
		});
	};

	var prepareScrollingGallery = function() {
		$(".m-carousel").carousel();
	};

	var prepareCentralNavi = function() {
		$('.m-accordion').accordion();
	};

	var prepareScrollSpy = function() {
		$(window).scroll(function() {
			var fromTop = $(this).scrollTop() - header.heightMass;
			if (fromTop > 0) {
				pageBody.addClass(scrolledOffStatus);
			}else{
				pageBody.removeClass(scrolledOffStatus);
			}
		});
	};

	var prepareRememberButton = function() {
		rememberButton.click(function(event) {
			$(this).toggleClass('on');
		});
	};

	$(document).ready(function () {
		FastClick.attach(document.body);
		prepareNavigationToggle();
		prepareSearchFocus();
		prepareScrollingGallery();
		prepareCentralNavi();
		prepareScrollSpy();
		prepareRememberButton();
	});




})(jQuery);