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
	var addToCartMessage = $(".variant-matrix").attr('data-add-to-card-message');
	var formSubmitTrigger = $(".form-submit-button");

	var header = {};
		header.selector = $(".module.header");
		header.heightMass = header.selector.innerHeight();

	var naviPanel = {};
		naviPanel.selector = $(".navi-panel");

	var contentPanel = {};
		contentPanel.selector = $(".main");

	var searchMenuItem = naviPanel.selector.find('.find > a');

	var buyButton = $(".add-to-cart-button");
	var bubble = $(".bubble");
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
	};

	var prepareBuyingBubble = function() {
		
		buyButton.click(function(event) {
		
			var product = $(this).parents(".product-single");
			var ghost = $('<div class="ghost"></div>').append(product.html());
			var message = $('<div class="message"></div>').text(addToCartMessage);
			var productContent = product.find('> *');

			productContent.css({
				visibility: 'hidden'
			}); // first, we hide everything in the product cell (while keeping the dimensions unchanged)

			product.append(message); // then, we add the message box

			var productHeight = product.innerHeight();
			var messageHeight = message.innerHeight();
			var difference = (productHeight - messageHeight) / 2;

			message.css('top', difference + 'px');
			message.velocity("fadeIn", { duration: 500 });

			product.append(ghost); // Here we clone the content of the product matrix cell (a product) to animate it indepenently
			
			ghost.velocity({
				opacity: 0,
				translateY: "-200px"
			},
			1000, function() {
				$(this).remove();
				message.remove();
				productContent.velocity({opacity: 1}, {visibility: "visible"});
			}); // Copied product content is floating to the top and then being removed... Status Quo is restored

		});
	};

	var prepareFormSubmit = function() {
		formSubmitTrigger.click(function(event) {
			$(this).closest('form').submit();
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
		prepareBuyingBubble();
		prepareFormSubmit();
	});




})(jQuery);