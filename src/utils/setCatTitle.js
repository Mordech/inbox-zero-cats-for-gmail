// @ts-check

/** @typedef {import('../@types')} */

/**
 * @param {HTMLHeadingElement} catTitle
 */
function setCatTitle(catTitle) {
  browser.storage.local
    .get('catTitles')
    .then(({ catTitles }) => {
      catTitle.textContent = randomItem(catTitles || defaultCatTitles);
    })
    .catch((error) => {
      error;
    });
}
