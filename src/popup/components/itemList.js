import { html } from '../modules/lit-html.js';
import { removeItem } from '../utils/removeItem.js';
import { deleteForeverIcon } from '../assets/deleteForeverIcon.js';

/**
 * @param {import('../@types/index.js').DataKeys} category
 * @param {string[]} items
 */
export const itemList = (category, items) =>
  items.map(
    (item) => html`<li dir="auto" class="text-item">
      ${item}
      <button
        @click=${() => {
          removeItem(category, items, item);
        }}
        aria-label=${`Delete title ${item}`}
        class="destructive icon"
        style="visibility: ${items.length >= 2 ? 'visible' : 'hidden'}"
      >
        ${deleteForeverIcon}
      </button>
    </li>`
  );
