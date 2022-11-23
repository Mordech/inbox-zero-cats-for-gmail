// @ts-check

/** @typedef {import('./@types')} */

(function () {
  'use strict';

  // set default cat titles in storage sync
  browser.storage.sync
    .get('catTitles')
    .then(({ catTitles }) => {
      if (!catTitles) {
        browser.storage.sync.set({
          catTitles: JSON.stringify(defaultCatTitles),
        });
      }
    })
    .catch((error) => {
      error;
    });

  const observer = new MutationObserver(() => {
    findAndReplaceEmptyState('.aRu', ' tab is empty');
    findAndReplaceEmptyState('td', 'No new mail!');
  });

  const body = document.querySelector('body');

  body &&
    observer.observe(body, {
      childList: true,
      subtree: true,
    });
})();
