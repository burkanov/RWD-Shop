// namespace 
var ProductDetailPage = {};

ProductDetailPage.ProductDetailViewModel = function() {

	var self = this;

    // observables
	this.selectedIngredientsValue = ko.observable();
	
    // behaviours
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
		pageViewModel.selectedIngredientsValue($('#ingredients-selector').val());
	});
})(jQuery);
