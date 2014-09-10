// namespace 
var ProductListPage = {};

// constants
ProductListPage.NO_SCROLL = false;

ProductListPage.Product = function(data) {

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

ProductListPage.ProductListViewModel = function(pageName, pageSlug) {

	var self = this;
	
	// attributes
	this.pageName = pageName;
	this.pageSlug = pageSlug;
	this.pageUrl = window.location.protocol + '//' + window.location.host + '/c/{cat}{page}/productList.json';
	this.doScroll = true;
	this.fadeInSpeed = 1000;
	this.ScrollSpeed = 1000;

    // observables  
    this.products = ko.observableArray([]);
	this.pageSize = ko.observable(2);
	this.totalResults = ko.observable(0);
	this.currentPage = ko.observable(0);
	this.sortBy = ko.observable('preis');
	this.searchQuery = ko.observable('filter-settings');
    this.hasMoreResults = ko.computed(function() {
		return self.currentPage() * self.pageSize() < self.totalResults();
	});
	
    // Behaviours
	this.loadMoreProducts = function(koData, options) {
	
		var options = options || {};
		var loadMode = 's';	// load single page by default
		$('.product-added').removeClass('product-added');
		
		// check options
		if ('currentPage' in options && options.currentPage > 0) {
			self.currentPage(options.currentPage);
			loadMode = 'a'; // load all pages until here
		}
		if ('sortBy' in options) {
			self.sortBy(options.sortBy);
		}
		if ('searchQuery' in options) {
			self.searchQuery(options.searchQuery);
		}
		self.doScroll = 'doScroll' in options ? options.doScroll : true;
		
		var data = fixtures.productlist;
		var url = self.pageUrl.replace('{cat}', self.pageSlug).replace('{page}', self.currentPage());
		
		/*$.getJSON(url, {
			mode: loadMode,
			pageSize: self.pageSize(),
			sortBy: self.sortBy(),
			searchQuery: self.searchQuery()
		}).done(function(data) {*/
			var newProducts = ko.utils.arrayMap(data.results, function(productData) {
				return new ProductListPage.Product(productData);
			});
			ko.utils.arrayPushAll(self.products(), newProducts);
			self.products.valueHasMutated();
			self.totalResults(data.totalResults);
			self.currentPage(data.currentPage);
		//});
		
	}
	
	// Callbacks
	this.showAdditionalProduct = function(elem) {
		if (elem.nodeType === 1) {
			$(elem).hide().addClass('product-added').fadeIn(self.fadeInSpeed);
			var $productAdded = $('.product-added');
			if (self.doScroll && $productAdded.length === 1) {
				var scrollTop = $productAdded.offset().top - 50;
				history.replaceState(
					{currentPage: self.currentPage(), scrollTop: scrollTop },
					self.pageName,
					window.location.href.replace(/\/\d+\//, self.currentPage())
				);
				$('html, body').animate({ scrollTop: scrollTop }, { duration: self.ScrollSpeed });
			}
		}
	}
    
};

(function ($) {
	$(document).ready(function () {
		// remove if-clause after tag manager integration
		if ($('.filtering select').length === 0) {
			return;
		}
		var currentPage, pageSlug, pageViewModel;
		var pageMatch = window.location.href.match(/\d$/.test(window.location.href) ? /\/c\/(.+)\/?(\d+)\/?$/ : /\/c\/(.+)\/?$/);
		if (pageMatch !== null) {
			currentPage = pageMatch.length === 3 ? 0 : pageMatch[2];
			pageSlug = pageMatch[1];
		} else {
			currentPage = 0;
			pageSlug = '';
		}
		pageViewModel = new ProductListPage.ProductListViewModel(pageName, pageSlug);
		ko.applyBindings(pageViewModel);
		pageViewModel.loadMoreProducts(null, {
			currentPage: currentPage,
			doScroll: ProductListPage.NO_SCROLL
		});
		window.addEventListener('popstate', function(event) {
			$('html, body').animate({ scrollTop: event.state === null ? 200 : event.state.scrollTop }, { duration: pageViewModel.ScrollSpeed });
		});
		$('.filtering select').on('change', function() {
			pageViewModel.loadMoreProducts(null, {
				sortBy: $(this).val()
			});
		});
	});
})(jQuery);
