// @ts-check

/** @typedef {import('../@types')} */

/**
 * @param {string} selector
 * @param {string} text
 */
function findAndReplaceEmptyState(selector, text) {
  document.querySelectorAll(selector).forEach((element) => {
    if (
      (element.firstElementChild?.textContent?.includes(text) &&
        !element.parentElement?.querySelector('.cat-container')) ||
      (element.textContent?.includes(text) &&
        !element.querySelector('.cat-container'))
    ) {
      createCatEmptyState(element.firstElementChild || element);
    }
  });
}
