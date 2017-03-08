window.addEventListener('message', function (msg) {
	var data = msg.data;

	if (data.type !== 'recaptchaLoad') {
		return;
	}

	var sitekey = data.sitekey;
	var lang = data.lang;
	var origin = msg.origin;
	var source = msg.source;

	function responseCallback(response) {
		var data = {
			type: 'recaptchaResponse',
			response: response
		};

		source.postMessage(data, origin);
	}

	window.onloadCallback = function () {
		var data = {
			type: 'recaptchaShow'
		};
		source.postMessage(data, origin);

		grecaptcha.render('recaptchaElement', {
			sitekey: sitekey,
			callback: responseCallback
		});
	};

	var baseUrl = 'https://www.google.com/recaptcha/api.js?';
	var query = 'onload=onloadCallback&render=explicit&hl=' + lang;
	var src = baseUrl + query;
	var script = document.createElement('script');

	script.type = 'text/javascript';
	script.src = src;
	script.async = true;
	script.defer = true;

	document.head.appendChild(script);
});
