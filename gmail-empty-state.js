// @ts-check
(function () {
  'use strict';

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
    catTitle.textContent = `You've achieved inbox zero!`;
    catTitle.className = 'cat-title';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'cat-image-container';
    catContainer.appendChild(imageContainer);

    const catBackdrop = document.createElement('div');
    catBackdrop.className = 'cat-backdrop';
    imageContainer.appendChild(catBackdrop);

    const catImage = document.createElement('div');
    catImage.className = 'cat-image';
    imageContainer.appendChild(catImage);

    const catText = document.createElement('span');
    catContainer.appendChild(catText);
    catText.className = 'cat-text';

    catText.textContent = 'Go outside and play with a cat!';
  }

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
