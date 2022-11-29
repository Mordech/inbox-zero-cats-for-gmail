// @ts-check

/** @typedef {import('../@types')} */

/**
 * Assigns a random image of a cat
 * @param {HTMLImageElement[]} imageContainer
 */
function setCatImage(imageContainer) {
  browser.storage.local
    .get('catImageUrls')
    .then(({ catImageUrls }) => {
      const url = randomItem(catImageUrls || defaultCatImageUrls);
      imageContainer.forEach((image) => (image.src = url));
    })
    .catch((error) => {
      error;
    });
}
