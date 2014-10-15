/* css({'border-top':'5px solid red'}) */

(function ($) {

	/* Settings ----------------*/
	//
	//

	var deliveryTypeTrigger = $('.module.delivery-type.forwarding > a');
	var deliveryTypeInfoWrapper = $('.module.navi.central .module.product-delivery-info').parent().parent();
	
	var deliveryTypeForwarding = function() {
		deliveryTypeTrigger.click(function(event) {
			deliveryTypeInfoWrapper.addClass('current m-opened');
			deliveryTypeInfoWrapper.velocity("scroll", { offset: -35, mobileHA: false });
		});
	};

	$(document).ready(function () {
		deliveryTypeForwarding();
	});

})(jQuery);