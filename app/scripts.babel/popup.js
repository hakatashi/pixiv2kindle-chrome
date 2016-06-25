'use strict';

const request = require('request');

request.post('https://api.hakatashi.com/pixiv2kindle/publish', function (error, response, body) {
	document.write(body);
});
