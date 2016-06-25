'use strict';

const request = require('request');
const parse = require('csv-parse');

const parser = parse();

request.post('https://api.hakatashi.com/pixiv2kindle/publish').pipe(parser);

parser.on('readable', () => {
	let record;
	while (record = parser.read()) {
		const event = JSON.parse(record[0]);

		const p = document.createElement('p');
		p.textContent = event.event;
		document.body.appendChild(p);
	}
});
