// namespace 
var ProductDetailPage = {};

ProductDetailPage.ProductDetailViewModel = function() {

	var self = this;
	
	// attributes

    // observables
	this.selectedIngredientsValue = ko.observable(1);
	
    // behaviours
	this.switchIngredients = function() {
		self.selectedIngredientsValue($('#ingredients-selector').val());
	}
	this.isIngredientsSelected = function(index) {
		return self.selectedIngredientsValue() == index;
	}
};

(function ($) {
	$(document).ready(function () {
		// remove if-clause after tag manager integration
		if ($('.product').length === 0) {
			return;
		}
		pageViewModel = new ProductDetailPage.ProductDetailViewModel();
		ko.applyBindings(pageViewModel);

	});
})(jQuery);
