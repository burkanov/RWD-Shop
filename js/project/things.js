/* css({'border-top':'5px solid red'}) */

(function ($) {

	/* Settings ----------------*/
	//
	//
	var pageBody = $("body");
	var naviSwitch = $(".toggle-navigation");
	var naviStatus = "navi-open";

	var naviPanel = {};
		naviPanel.selector = $(".navi");

	var contentPanel = {};
		contentPanel.selector = $(".main");
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

	var naviOff = function(event){
		alert("you clicked " + event.target.nodeName);
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
			if ($(event.target).hasClass('navi')){
				closeNavigationPanel();
			}
		});

	};

	$(document).ready(function () {
		prepareNavigationToggle();
	});

	window.addEventListener('load', function() {
    	new FastClick(document.body);
	}, false);

})(jQuery);