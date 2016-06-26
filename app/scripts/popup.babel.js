'use strict';

const request = require('request');
const parse = require('csv-parse');

const pushEvent = (event) => {
	const li = document.createElement('li');
	li.textContent = event.event;
	document.getElementsByClassName('logs')[0].appendChild(li);
};

const parser = parse();

request.post('https://api.hakatashi.com/pixiv2kindle/publish').pipe(parser);

parser.on('readable', () => {
	let record;
	while (record = parser.read()) {
		const event = JSON.parse(record[0]);
		pushEvent(event);
	}
});
