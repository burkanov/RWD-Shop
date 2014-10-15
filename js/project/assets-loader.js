loadMobileScripts = function() {
	Modernizr.load([
	]);
};

loadNonMobileScripts = function() {
	Modernizr.load([
		// Put here scripts that should be used in desktop version only
	]);
};

Modernizr.load([
	// Loading basic stuff that we'll need anyways	
	{
		load: [
			'js/vendor/jquery/jquery-2.1.1.min.js',
			'js/vendor/enquire/enquire.min.js', // Plugin to detect media queries
			'js/project/browser-detection.js', // UA Sniffing (used for greater good)
			'js/vendor/fast-click/fast-click.js', // Eliminating 300ms delay
			'js/project/detector.js', // Populating DOM with context-description classes
			'js/vendor/knockout/knockout-3.2.0.js', // Knockout.js MVVM framework
			'js/vendor/velocity/velocity.js', // JS Animation Lib, strongly improves performance
			'js/vendor/jquery-geolocation/jquery.geolocation.min.js' // Geo location wrapper
		],
	},
	{
		load: [
			'js/vendor/mobify/carousel.js',
			'js/vendor/mobify/accordion.js',
			'js/vendor/facebug/fb-int.js',
			'js/project/things.js', // Different things (why not) - to be refactored and removed
			'js/project/ui/delivery-type-forwarding.js'
		]
	},
	{
		// view models / fixtures
		load: [
			'js/project/fixtures/productlist.js',
			'js/project/view-model/ProductListViewModel.js',
			'js/project/view-model/ProductDetailViewModel.js',
			'js/project/view-model/StoreFinderViewModel.js'
		]
	}
]);