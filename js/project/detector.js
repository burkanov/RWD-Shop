/* css({'border-top':'5px solid red'}) */

(function ($) {

	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style");
		msViewportStyle.appendChild(
			document.createTextNode(
				"@-ms-viewport{width:auto!important}"
			)
		);
		document.getElementsByTagName("head")[0].
		appendChild(msViewportStyle);
	}

	function baseSetUp() {

		
		fressnapf = {};

		// The breaking points values must be exactly the same as the values in _variables.sass

		// Phone Portrait
		fressnapf.phonePortraitMax =	'max-width: 320px';

		// Phone Landscape
		fressnapf.phoneLandscapeMin =	'min-width: 321px';
		fressnapf.phoneLandscapeMax =	'max-width: 600px';
		
		// Tablet Portrait
		fressnapf.tabletPortraitMin =	'min-width: 601px';
		fressnapf.tabletPortraitMax =	'max-width: 767px';

		// Tablet Landscape
		fressnapf.tabletLandscapeMin =	'min-width: 768px';
		fressnapf.tabletLandscapeMax =	'max-width: 979px';
		
		// Desktop Small
		fressnapf.desktopSmallMin =		'min-width: 980px';
		fressnapf.desktopSmallMax =		'max-width: 1199px';

		// Desktop Normal
		fressnapf.desktopNormalMin =	'min-width: 1200px';
		fressnapf.desktopNormalMax =	'max-width: 1419px';

		// Desktop Large
		fressnapf.desktopLargeMin =		'min-width: 1420px';

		// Other variables
		fressnapf.basis =				$('html');
		fressnapf.isHighResolution =	window.devicePixelRatio >= 1.5;


		// if it's a phone...
		enquire.register("screen and (" + fressnapf.phoneLandscapeMax + ")", {
			match : function() {
				fressnapf.basis.addClass('phone');
				loadMobileScripts();
			},
			unmatch : function() {
				fressnapf.basis.removeClass('phone');
				loadNonMobileScripts();
			}
		});

		// if it's a tablet...
		enquire.register("screen and (" + fressnapf.tabletPortraitMin + ") and (" + fressnapf.tabletLandscapeMax + ")", {
			match : function() {
				fressnapf.basis.addClass('tablet');
				loadNonMobileScripts();
			},
			unmatch : function() {
				fressnapf.basis.removeClass('tablet');
			}
		});

		// if it's a desktop...
		enquire.register("screen and (" + fressnapf.desktopSmallMin + ")", {
			match : function() {
				fressnapf.basis.addClass('desktop');
				loadNonMobileScripts();
			},
			unmatch : function() {
				fressnapf.basis.removeClass('desktop');
			}
		});
		
		// if it's hi-res...
		if ( fressnapf.isHighResolution ){
			fressnapf.basis.addClass('hi-res');
		}else{
			fressnapf.basis.removeClass('hi-res');
		}

	}

	$(document).ready(function () {
		baseSetUp();
	});

})(jQuery);