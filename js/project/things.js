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
	var addToCartMessage = $(".variant-matrix").attr("data-add-to-card-message");
	var formSubmitTrigger = $(".form-submit-button");
	var couponTrigger = $(".coupon > fieldset > legend");
	var couponArea = $(".coupon > fieldset > div");
	var checkboxLabel = $(".c-group > p > span");
	var fakeLabels = $(".unilable");

	var activateDeliveryAddress = $("#different-delivery-address");
	var deliveryForm = $(".address > .delivery");
	var createNewButton = $('.create-new-address');
	var editExistingButton = $('.optional-delivery-addresses .edit');

	var paymentOptions = $(".module.payment .unilable > input[name='payment-kind']");
	var creditCardMarker = "credit-card";
	var creditCardInfo = $(".credit-card-info");

	var header = {};
		header.selector = $(".module.header");
		header.heightMass = header.selector.innerHeight();

	var naviPanel = {};
		naviPanel.selector = $(".navi-panel");

	var contentPanel = {};
		contentPanel.selector = $(".main");

	var searchMenuItem = naviPanel.selector.find('.find > a');

	var buyButton = $(".add-to-cart-button:not(.disabled)");
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

	var prepareCouponSwitch = function() {
		couponTrigger.click(function(event) {
			couponArea.slideToggle("400", function() {
			});
		});
	};

	var prepareDeliveryForm = function() {

		activateDeliveryAddress.on('change', function(event) {
			if ( $(this).prop('checked') ){
				deliveryForm.slideDown('fast');
			}else{
				deliveryForm.hide();
			}
		});

	};

	var openForm = function(selector, action) {
		var subformName = defineSubformName(selector);
		var formToOpen = $('.subform[data-subform="' + subformName + '"]');

		if (action == 'open'){
			formToOpen.slideDown('400');
		}else{
			return formToOpen;
		}
	};

	var closeForms = function(formsSelector) {
		var formsToClose = $(formsSelector);
		formsToClose.hide();
	};

	var defineSubformName = function(selector) {
		var subformName = selector.attr('data-subform-pointer');
		return subformName;
	};

	var imitateLabels = function() { // We need because on mobile clicks on label often don't trigger the inputs to change

		fakeLabels.click(function(event) {

			var clickTarget = event.target.nodeName;
			
			if ( clickTarget == 'A'){ // This is for the cases, if there are links in "labels", that must be followed
				return;
			}else{
				event.preventDefault();
				fakeLabels.removeClass('current');

				var inputField = $(this).find('input');
				var inputType = inputField.attr('type');

				if (inputType == 'radio') {
					$(this).addClass('current');
					inputField.prop("checked", true);
				}else if (inputType == 'checkbox') {
					if ( inputField.prop( 'checked' ) ){
						inputField.prop( 'checked', false);
					}else{
						inputField.prop( 'checked', true);
					}
				}

				if ( $(this).attr('data-subform-pointer') ){

					openForm( $(this), 'open' );
					var subformName = defineSubformName( $(this) );

					closeForms('.subform:not([data-subform="' + subformName + '"])');
				}else{
					closeForms('.subform');
				}

				if ($(this).hasClass('autosubmit')){
					$(this).closest('form').submit();
				}
			}

		});
	};

	var preparePaymentForm = function() {
		var currentFormBadge = $('.unilable.current');
		if ( currentFormBadge.attr('data-subform-pointer') ){
			openForm(currentFormBadge, 'open');
		}
	};

	var prepareIBAN = function() {
		var showIBANButton = $(".iban-unknown");
		var conainerIBAN = $(".iban-calculator");

		showIBANButton.click(function(event) {
			showIBANButton.hide();
			conainerIBAN.slideDown('400');
		});
	};

	var showDeliveryForm = function() {
		createNewButton.hide();
		deliveryForm.slideDown('400');
		deliveryForm.velocity("scroll", { offset: -40, mobileHA: false });
	};

	var createNewDeliveryAddress = function() {
		createNewButton.click(function(event) {
			showDeliveryForm();
		});
	};

	var deliveryAddress = function(){
		var sex, firstName, lastName, street, house, addition, zip, city, birthDay, birthMonth, birthYear, phone;
	};

	var editExistingDeliveryAddress = function() {
		editExistingButton.click(function(event) {

			var existingAddress = new deliveryAddress;

			var dataStorage = $(this).parents('li');
			var gd = function(p){
				return dataStorage.attr('data-' + p);
			};

			existingAddress.sex = gd('sex');
			existingAddress.firstName = gd('firstName');
			existingAddress.lastName = gd('lastName');
			existingAddress.street = gd('street');
			existingAddress.house = gd('house');
			existingAddress.addition = gd('addressAddition');
			existingAddress.zip = gd('zip');
			existingAddress.city = gd('city');
			existingAddress.birthDay = gd('birthDay');
			existingAddress.birthMonth = gd('birthMonth');
			existingAddress.birthYear = gd('birthYear');
			existingAddress.phone = gd('phone');

			deliveryForm.find('#delivery-title').val(existingAddress.sex);
			deliveryForm.find('#delivery-first-name').val(existingAddress.firstName);
			deliveryForm.find('#delivery-last-name').val(existingAddress.lastName);
			deliveryForm.find('#delivery-street').val(existingAddress.street);
			deliveryForm.find('#delivery-house').val(existingAddress.house);
			deliveryForm.find('#delivery-address-addition').val(existingAddress.addition);
			deliveryForm.find('#delivery-zip').val(existingAddress.zip);
			deliveryForm.find('#delivery-place').val(existingAddress.city);
			deliveryForm.find('#delivery-birth-day').val(existingAddress.birthDay);
			deliveryForm.find('#delivery-birth-month').val(existingAddress.birthMonth);
			deliveryForm.find('#delivery-birth-year').val(existingAddress.birthYear);
			deliveryForm.find('#delivery-phone').val(existingAddress.phone);

			showDeliveryForm();

			console.log(existingAddress);
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
		prepareCouponSwitch();
		prepareDeliveryForm();
		preparePaymentForm();
		imitateLabels();
		prepareIBAN();
		createNewDeliveryAddress();
		editExistingDeliveryAddress();
	});




})(jQuery);