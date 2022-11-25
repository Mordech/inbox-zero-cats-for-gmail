// @ts-check

import { renderContent } from '../index.js';
/**
 * @typedef {import('../@types/index.js').Data} Data
 */

/**
 * @param {keyof Data} category
 * @param {string} title
 * @param {string[]} itemList
 */
export const removeItem = (category, itemList, title) => {
  const values = itemList || [];
  if (values.length !== 1) {
    const index = values.indexOf(title);
    if (index > -1) {
      values.splice(index, 1);
    }
    browser.storage.local
      .set({ [category]: values })
      .then(() => renderContent())
      .catch((error) => {
        error;
      });
  }
};
