/* css({'border-top':'5px solid red'}) */

(function ($) {

	/* Settings ----------------*/
	//
	//
	var selectedFiltersClass = '.selected-filters';
	var singleFilterOption = $(selectedFiltersClass + ' .c-group');

	// Action

	var prepareFiltersControl = function() {
		singleFilterOption.on('click', function(event) {
			$(this).fadeOut('400', function() {
				var parentList = $(this).parents(selectedFiltersClass);
				$(this).parent().hide();
				amountOfVisibleChildren = parentList.find('> *:visible').length;
				if (amountOfVisibleChildren < 1){
					parentList.hide();
				}
			});
		});
	};

	//
	//
	/* Init ----------------*/

	$(document).ready(function () {
		prepareFiltersControl();
	});


})(jQuery);