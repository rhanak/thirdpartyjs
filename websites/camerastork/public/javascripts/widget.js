var Stork = (function (window, undefined) {
	var Stork = {};

	console.log("Stork initializing");

	function loadScript(url, callback) {
		var script = document.createElement('script');

		script.src = url
        script.async = true;

        var entry = document.getElementsByTagName('script')[0];

        entry.parentNode.insertBefore(script, entry);

        script.onload = script.onreadystatechange = function() {
        	var rdyState = script.readyState;

        	if(!rdyState || /complete|loaded/.test(script.readyState)) {
        		callback();

        		// Detach our handlers to avoid memory leaks
        		script.onload = null;
        		script.onreadystatechange = null;
        	} 
        }
	}

	function loadSupportingFiles(callback) {
		var i = 0;
		var numberOfFiles = 0;

		loadScript('http://www.camerastork.com/javascripts/util.js', scriptsDone());
		loadScript('http://www.camerastork.com/javascripts/dom.js', scriptsDone());
		loadScript('http://code.jquery.com/jquery-1.9.1.min.js', scriptsDone());

		function scriptsDone() {
			numberOfFiles++;

			return function () {
				i++;

				if(i === numberOfFiles) {
					callback();
				}
			};	
		}
	}
	function getWidgetParams() {}
	function getRatingData(params, callback) { callback(); }
	function drawWidget(data, location) {
		var html = 
			'<div>' +
			'   <h3>Mikon E90 Digital SLR</h3>' +
			'   <img src="http://www.camerastork.com/images/1337-small.jpeg"/>' +
			'   <p>$599.99</p>' + 
			'   <p>4.3/5.0 &bull; 176 Reviews</p>' +
			'</div>';
		//var div = document.createElement('div');
		//div.innerHtml = html;
		location.before(html);

	}

	loadSupportingFiles(function () {
		var params = getWidgetParams();

		console.log("Scripts loaded");

		
		jQuery('[data-stork-product]').each(function() {
			var location = jQuery(this);
			location.removeAttr('data-stork-product');

			var id = location.attr('data-stork-product');

			getRatingData(id, function() {
				drawWidget({}, location);
			});
		});
			
		
	});

	return Stork;

})(window);