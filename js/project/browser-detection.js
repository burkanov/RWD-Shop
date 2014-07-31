(function (window) {
	window.Browser = function () {
		this.document = document.documentElement;
		this.app      = 'unknown_app';
		this.engine   = 'unknown_engine';
		this.version  = 'unknown_version';
		this.initialize();

		this.placeBrowserData();
	};

	Browser.prototype = {
		initialize: function () {
			var appName = navigator.appName, ua = navigator.userAgent, tem;
			var metadata = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
			if (metadata && (tem = ua.match(/version\/([\.\d]+)/i)) != null) metadata[2] = tem[1];
			metadata = metadata ? [metadata[1], metadata[2]] : [appName, navigator.appVersion, '-?'];

			this.app = metadata[0];
			this.version = "vers_" + ((metadata[1]).replace(/\./g, '_'));
		},

		bind: function (scope, fn) {
			return function () {
				fn.apply(scope, arguments);
			};
		},

		/**
		 * Add classes to body tag according to the browser.
		 */
		placeBrowserData: function () {

			this.document.className += " "+this.app.toLowerCase();
			this.document.className += " "+this.version;

		},

		clearClasses: function (element) {
			var classes = element.className.split(' '), classNames = this.getClasses();
			element.className = "";

			// Remove any classes of Browser.CLASSES from the document tag
			for (var i = 0; i <= classes.length - 1; i++) {
				if (classNames.indexOf(classes[i]) < 0) {
					element.className += " "+classes[i];
				}
			}

			return element;
		},

		/**
		 * Return the classes as a string.
		 *
		 * @returns {string}
		 */
		getClasses: function () {
			var classes = [];

			for (var className in Browser.CLASSES) {
				classes.push(Browser.CLASSES[className]);
			}

			return classes;
		}
	};

	window.browser = new Browser();
	
})(this);