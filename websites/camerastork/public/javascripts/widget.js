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
	function getRatingData(params, callback) {}
	function drawWidget() {}

	loadSupportingFiles(function () {
		var params = getWidgetParams();

		console.log("Scripts loaded");

		getRatingData(params, function() {
			drawWidget();
		});
	});

	return Stork;

})(window);