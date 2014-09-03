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
    var styledSelectIcon = $(".select-icon");
    var styledSelect = $(".select-icon + select");

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

    var openSelect = function(elem) {
        if (document.createEvent) {
            var e = document.createEvent("MouseEvents");
            e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            elem[0].dispatchEvent(e);
        } else if (element.fireEvent) {
            elem[0].fireEvent("onmousedown");
        }
    }

    var prepareStyledSelect = function() {
        styledSelectIcon.on('click', function() {
            openSelect(styledSelect);
        });
    }

	$(document).ready(function () {
		FastClick.attach(document.body);
		prepareNavigationToggle();
		prepareSearchFocus();
		prepareScrollingGallery();
		prepareCentralNavi();
		prepareScrollSpy();
		prepareRememberButton();
        prepareStyledSelect();
	});




})(jQuery);