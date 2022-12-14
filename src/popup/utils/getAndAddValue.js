import { renderContent } from '../index.js';

/**
 * @param {import('../@types/index.js').DataKeys} category
 * @param {string} value
 */
export const getAndAddValue = (category, value) =>
  browser.storage.local
    .get(category)
    .then((result) => {
      const values = result[category] || [];
      values.unshift(value);
      browser.storage.local
        .set({ [category]: values })
        .then(() => renderContent())
        .catch((error) => {
          error;
        });
    })
    .catch((error) => {
      error;
    });
