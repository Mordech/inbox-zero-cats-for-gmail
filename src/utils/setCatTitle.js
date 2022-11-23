// @ts-check

/** @typedef {import('../@types')} */

/**
 * @param {HTMLHeadingElement} catTitle
 */
function setCatTitle(catTitle) {
  browser.storage.sync
    .get('catTitles')
    .then(({ catTitles }) => {
      catTitle.textContent = randomItem(parseResult(catTitles));
    })
    .catch((error) => {
      error;
    });
}
