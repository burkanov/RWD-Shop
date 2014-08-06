/* css({'border-top':'5px solid red'}) */

(function ($) {

	/* Settings ----------------*/
	//
	//
	var pageBody = $("body");
	var naviSwitch = $(".toggle-navigation");
	var naviStatus = "navi-open";
	var searchField = $(".search-field");
	var centralNavi = $(".central-navi");

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

	$(document).ready(function () {
		FastClick.attach(document.body);
		prepareNavigationToggle();
		prepareSearchFocus();
		prepareScrollingGallery();
		prepareCentralNavi();
	});




})(jQuery);