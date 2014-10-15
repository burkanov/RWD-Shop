/* css({'border-top':'5px solid red'}) */


// ATTENTION !!!!!!!!!!!!!!!!!!!!!!!!!!
// THIS CODE IS BROKEN AND WILL NOT WORK!!!


(function ($) {

	/* Settings ----------------*/
	//
	//

	var deliveryTypeTrigger = $('.module.delivery-type.forwarding > a');
	var deliveryTypeInfoWrapper = $('.module.navi.central .module.product-delivery-info').parent().parent();

	/* Primary Action ----------------*/
	//
	//
	
	var deliveryTypeForwarding = function() {
		deliveryTypeTrigger.click(function(event) {
			var togglingButton = deliveryTypeInfoWrapper.find('A');
			deliveryTypeInfoWrapper.velocity("scroll", { offset: -35, mobileHA: false });
		});
	};

	//
	//
	/* Launch ----------------*/

	$(document).ready(function () {
		deliveryTypeForwarding();
	});

})(jQuery);