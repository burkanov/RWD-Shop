(function ($) {

	var prepareFB = function() {

		var fbLoginButton = $(".fb-login-button");

		if(fbLoginButton.length) {

			(function(d, s, id)
				{
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) return;
					js = d.createElement(s); js.id = id;
					js.src = "//connect.facebook.net/de_DE/sdk.js#xfbml=1&appId=304112019741832&version=v2.0";
					fjs.parentNode.insertBefore(js, fjs);
				}(
					document, 'script', 'facebook-jssdk'
				)
			);

		}

	};

	$(document).ready(function () {
		prepareFB();
	});


})(jQuery);