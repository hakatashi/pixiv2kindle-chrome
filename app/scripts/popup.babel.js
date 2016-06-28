'use strict';

const request = require('request');
const parse = require('csv-parse');
const url = require('url');
const assert = require('assert');

const pushEvent = (event) => {
	const li = document.createElement('li');
	li.textContent = event.event;
	document.getElementsByClassName('logs')[0].appendChild(li);
};

const parser = parse();

chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
}, tabs => {
	assert(tabs.length === 1);

	const tab = tabs[0];
	const tabUrl = url.parse(tab.url, true);
	const novelId = tabUrl.query.id || tabUrl.pathname.match(/^(?:\/whitecube)?\/novel\/(\d+)$/)[1];

	if (!novelId) {
		pushEvent({
			error: true,
			event: 'Failed to determine novel ID',
		});
		return;
	} else {
		pushEvent({
			event: `Determined novel ID: ${novelId}`,
		});
	}

	chrome.storage.sync.get('auth', items => {
		const auth = items.auth;

		if (!auth || auth === '') {
			pushEvent({
				error: true,
				event: 'Failed to get authentication token',
			});
			return;
		} else {
			pushEvent({
				event: 'Got authentication token',
			});
		}

		request.post('https://api.hakatashi.com/pixiv2kindle/publish', {
			form: {auth, id: novelId},
		}).pipe(parser);

		parser.on('readable', () => {
			let record;
			while (record = parser.read()) {
				const event = JSON.parse(record[0]);
				pushEvent(event);
			}
		});
	});
})
