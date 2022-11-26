//  @ts-check

import { html } from '../modules/lit-html.js';

import { deleteForeverIcon } from '../assets/deleteForeverIcon.js';
import { removeItem } from '../utils/removeItem.js';
import { defaultCatImages } from '../data/defaultCatImages.js';

/**
 * @param {import('../@types/index.js').DataKeys} category
 * @param {string[]} items
 */
export const imageList = (category, items) =>
  items.map(
    (item, index) => html`<li
      class="image ${item.includes(defaultCatImages[0])
        ? 'random'
        : 'not-random'}"
    >
      <img
        src=${item}
        title=${item.includes(defaultCatImages[0])
          ? item
          : `Image no. ${items.length - index}. User uploaded`}
        alt=${item.includes(defaultCatImages[0])
          ? 'Random image of a cat'
          : `Image no. ${items.length - index}. User uploaded`}
      />
      ${items.length >= 2
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
