
function Product(data) {

	this.index = data.index;
	this.title = data.title;
	this.subTitle = data.subTitle;
	this.url = data.url;
	this.imgUrl = data.imgUrl;
	this.numStars = data.numStars;
	this.numRatings = data.numRatings;
	this.currency = data.currency;
	this.apriceF = data.apriceF;
	
	this.getRatingClass = function() {
		return 'r-' + String(this.numStars);
	};
	this.getNumRatings = function() {
		return '(' + String(this.numRatings) + ')';
	}
	this.getPrice = function() {
		return this.apriceF + ' ' + this.currency;
	}
}

function ProductCategoryViewModel() {

	var self = this;
	
	// Attributes
	self.currentCategory = 'Katzenfutter';
	self.productURL = 'http://10.0.1.34:9001/shop/c/189/1/categoryProducts.json';
	self.doScroll = false;
	self.fadeInSpeed = 1000;
	self.ScrollSpeed = 1000;

    // Observables  
    self.products = ko.observableArray([]);
	self.perPage = ko.observable(2);
	self.totalResults = ko.observable(0);
	self.currentPage = ko.observable(1);
    self.hasMoreResults = ko.computed(function() {
		return self.currentPage() * self.perPage() < self.totalResults();
	});
	
    // Behaviours
	self.loadMoreProducts = function(doScroll) {
		$('.product-added').removeClass('product-added');
		self.scrollIntoView = true;
		self.doScroll = doScroll;
		var data = fixtures.productlist;
		
		//$.getJSON(self.productURL, {}).done(function(data) {
			var newProducts = ko.utils.arrayMap(data.results, function(productData) {
				return new Product(productData);
			});
			ko.utils.arrayPushAll(self.products(), newProducts);
			self.products.valueHasMutated();
			self.totalResults(data.totalResults);
			self.currentPage(data.currentPage);
			
			//history.pushState({test: 'test2'}, '', 'index2.html?page=2');
		//});
		
	}
	
	// Callbacks
	self.showAdditionalProduct = function(elem) {
		if (elem.nodeType === 1) {
			$(elem).hide().addClass('product-added').fadeIn(self.fadeInSpeed);
			var $productAdded = $('.product-added');
			if (self.doScroll && $productAdded.length === 1) {
				$('html, body').animate({ scrollTop: $productAdded.offset().top - 50 }, { duration: self.ScrollSpeed });
			}
		}
	}
    
};

(function ($) {
	$(document).ready(function () {
		var pageViewModel = new ProductCategoryViewModel();
		ko.applyBindings(pageViewModel);
		pageViewModel.loadMoreProducts(false);
	});
})(jQuery);
