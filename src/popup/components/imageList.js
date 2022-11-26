//  @ts-check

import { html } from '../modules/lit-html.js';

import { deleteForeverIcon } from '../assets/deleteForeverIcon.js';
import { removeItem } from '../utils/removeItem.js';
import { defaultCatImages } from '../data/defaultCatImages.js';

/**
 * @param {import('../@types/index.js').DataKeys} category
 * @param {string[]} items
 */
export const imageList = (category, items) => {
  const filteredItems = items.filter((image) => !image.endsWith('mrd-random'));
  return filteredItems.map(
    (item, index) => html`<li
      class="image ${item.endsWith('mrd-spotlight') ? 'random' : 'not-random'}"
    >
      <img
        src=${item}
        title=${item.endsWith('mrd-spotlight')
          ? item
          : `Image no. ${items.length - index}. User uploaded`}
        alt=${item.endsWith('mrd-spotlight')
          ? 'Random image'
          : `Image no. ${items.length - index}. User uploaded`}
      />
      ${filteredItems.length >= 2
        ? html`<button
            @click=${() => {
              removeItem(category, items, item);
            }}
            class="destructive light icon"
            aria-label="Delete image"
          >
            ${deleteForeverIcon}
          </button>`
        : ''}
    </li>`
  );
};
