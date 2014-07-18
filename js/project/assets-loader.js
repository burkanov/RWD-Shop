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
		],
	},{
		load: [
			'js/project/things.js' // Different things (why not)
		]
	}
]);