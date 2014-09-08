
var CategoryPage = {};

CategoryPage.Product = function(data) {

	this.index = data.index;
	this.title = data.title;
	this.subTitle = data.subTitle;
	this.url = data.url;
	this.imgUrl = data.imgUrl;
	this.numStars = data.numStars;
	this.numRatings = data.numRatings;
	this.currency = data.currency;
	this.apriceF = data.apriceF;
	this.relativePriceBadge = data.relativePriceBadge;
	this.textBadge = data.textBadge;
	
	this.getRatingClass = function() {
		return 'r-' + String(this.numStars).replace('.',  '_');
	};
	this.getNumRatings = function() {
		return '(' + String(this.numRatings) + ')';
	}
	this.getPrice = function() {
		return this.apriceF + ' ' + this.currency;
	}
	this.hasRelativePriceBadge = function() {
		return this.relativePriceBadge.length > 0;
	}
	this.hasTextBadge = function() {
		return this.textBadge.length > 0;
	}
}

CategoryPage.ProductCategoryViewModel = function(categoryName, categorySlug) {

	var self = this;
	
	// Attributes
	self.categoryName = categoryName;
	self.categorySlug = categorySlug;
	self.categoryUrl = window.location.protocol + '//' + window.location.host + '/c/{cat}{page}/categoryProducts.json';
	self.doScroll = false;
	self.fadeInSpeed = 1000;
	self.ScrollSpeed = 1000;

    // Observables  
    self.products = ko.observableArray([]);
	self.pageSize = ko.observable(2);
	self.totalResults = ko.observable(0);
	self.currentPage = ko.observable(0);
	self.sort = ko.observable('preis');
	self.searchQuery = ko.observable('filter-settings');
    self.hasMoreResults = ko.computed(function() {
		return self.currentPage() * self.pageSize() < self.totalResults();
	});
	
    // Behaviours
	self.loadMoreProducts = function(doScroll, currentPageInit) {
		$('.product-added').removeClass('product-added');
		if (currentPageInit > 0) {
			self.currentPage(currentPageInit);
		}
		self.scrollIntoView = true;
		self.doScroll = doScroll;
		var data = fixtures.productlist;
		var url = self.categoryUrl.replace('{cat}', self.categorySlug).replace('{page}', self.currentPage());
		
		/*$.getJSON(url, {
			mode: currentPageInit > 0 ? 'a':'s',
			pageSize: self.pageSize(),
			sort: self.sort(),
			searchQuery: self.searchQuery()
		}).done(function(data) {*/
			var newProducts = ko.utils.arrayMap(data.results, function(productData) {
				return new CategoryPage.Product(productData);
			});
			ko.utils.arrayPushAll(self.products(), newProducts);
			self.products.valueHasMutated();
			self.totalResults(data.totalResults);
			self.currentPage(data.currentPage);
		//});
		
	}
	
	// Callbacks
	self.showAdditionalProduct = function(elem) {
		if (elem.nodeType === 1) {
			$(elem).hide().addClass('product-added').fadeIn(self.fadeInSpeed);
			var $productAdded = $('.product-added');
			if (self.doScroll && $productAdded.length === 1) {
				var url = window.location.href.replace(/\?page=\d+/, '') + '?page=' + self.currentPage();
				var scrollTop = $productAdded.offset().top - 50;
				history.replaceState({currentPage: self.currentPage(), scrollTop: scrollTop }, self.categoryName, url);
				$('html, body').animate({ scrollTop: scrollTop }, { duration: self.ScrollSpeed });
			}
		}
	}
    
};

(function ($) {
	$(document).ready(function () {
		var currentPage, categorySlug, pageViewModel;
		var pageMatch = window.location.href.match(/\d$/.test(window.location.href) ? /\/c\/(.+)\/?(\d+)\/?$/ : /\/c\/(.+)\/?$/);
		if (pageMatch !== null) {
			currentPage = pageMatch.length === 3 ? 0 : pageMatch[2];
			categorySlug = pageMatch[1];
		} else {
			currentPage = 0;
			categorySlug = '';
		}
		pageViewModel = new CategoryPage.ProductCategoryViewModel(categoryName, categorySlug);
		ko.applyBindings(pageViewModel);
		pageViewModel.loadMoreProducts(false, currentPage);
		window.addEventListener('popstate', function(event) {
			$('html, body').animate({ scrollTop: event.state === null ? 200 : event.state.scrollTop }, { duration: pageViewModel.ScrollSpeed });
		});
		

	});
})(jQuery);
