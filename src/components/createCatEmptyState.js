// @ts-check

/** @typedef {import('../@types')} */

/**
 * @param {Element} emptyState
 */
function createCatEmptyState(emptyState) {
  emptyState.textContent = '';

  const catContainer = document.createElement('div');
  emptyState.appendChild(catContainer);
  catContainer.className = 'cat-container';

  const catTitle = document.createElement('h1');
  catContainer.appendChild(catTitle);
  setCatTitle(catTitle);
  catTitle.className = 'cat-title';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'cat-image-container';
  catContainer.appendChild(imageContainer);

  const catBackdrop = document.createElement('div');
  catBackdrop.className = 'cat-backdrop';
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
  imageContainer.appendChild(catBackdrop);

  const catImage = document.createElement('div');
  catImage.className = 'cat-image';
  imageContainer.appendChild(catImage);

  const catText = document.createElement('span');
  catContainer.appendChild(catText);
  catText.className = 'cat-text';

  catText.textContent = 'Go outside and play with a cat!';
}
