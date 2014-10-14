// namespace 
var StoreFinder = {};

// configuration

StoreFinder.StoreFinderViewModel = function() {

	var self = this;

    // observables
	this.currentPostalCode = ko.observable();
	
	this.retrieveLocation = function() {
		$.geolocation.get({win: self.processLocation, fail: self.noLocation});
	};
	
	this.processLocation = function(position) {
		// TODO
		console.log(position.coords.latitude);
		console.log(position.coords.longitude);
	}
	
	this.noLocation = function(error) {
		// TODO
		console.log(error);
	}
	
};

(function ($) {
	// remove if-clause after tag manager integration
	if ($('.store-finder-list').length === 0) {
		return;
	}
	$(document).ready(function () {
		StoreFinder.viewModel = new StoreFinder.StoreFinderViewModel();
		ko.applyBindings(StoreFinder.viewModel, document.getElementsByClassName('main')[0]);
		StoreFinder.viewModel.retrieveLocation();
	});
})(jQuery);
