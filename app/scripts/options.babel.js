'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Restore saved options
    chrome.storage.sync.get({
        auth: '',
    }, items => {
        document.getElementById('auth').value = items.auth;
    });

    document.getElementById('save').addEventListener('click', () => {
        chrome.storage.sync.set({
            auth: document.getElementById('auth').value,
        }, () => {
            const statusEl = document.getElementById('status');
            statusEl.textContent = 'Option saved.';
            setTimeout(() => {
                statusEl.textContent = '';
            }, 1000);
        })
    });
});
