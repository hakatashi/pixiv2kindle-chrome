'use strict';

const url = require('url');

chrome.runtime.onInstalled.addListener(details => {
    console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener((id, info) => {
    if (info.url) {
        const pageUrl = url.parse(info.url, true);

        if (
            (
                // PC/touch novel page
                (pageUrl.hostname === 'www.pixiv.net' || pageUrl.hostname === 'touch.pixiv.net')
                && pageUrl.pathname === '/novel/show.php'
            ) || (
                // whitecube
                pageUrl.hostname === 'www.pixiv.net'
                && pageUrl.pathname.match(/^(\/whitecube)?\/novel\/\d+$/)
            )
        ) {
            chrome.pageAction.show(id);
        }
    }
});
