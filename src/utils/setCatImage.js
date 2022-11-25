// @ts-check

/** @typedef {import('../@types')} */

/**
 * Assigns a random image of a cat
 * @param {HTMLElement} imageContainer
 */
function setCatImage(imageContainer) {
  browser.storage.local
    .get('catImageUrls')
    .then(({ catImageUrls }) => {
      imageContainer.style.setProperty(
        '--cat-image-url',
        `url(${JSON.stringify(randomItem(catImageUrls))})`
      );
    })
    .catch((error) => {
      error;
    });
}
