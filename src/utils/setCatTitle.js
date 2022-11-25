// @ts-check

/** @typedef {import('../@types')} */

/**
 * @param {HTMLHeadingElement} catTitle
 */
async function setCatTitle(catTitle) {
  await browser.storage.local
    .get('catTitles')
    .then(({ catTitles }) => {
      catTitle.textContent = randomItem(catTitles);
    })
    .catch((error) => {
      error;
    });
}
