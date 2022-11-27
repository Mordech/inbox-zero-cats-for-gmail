// @ts-check

import { html } from '../modules/lit-html.js';
import { getAndAddValue } from '../utils/index.js';
import { itemList } from '../components/index.js';

const addTitle = async () => {
  const title = document.getElementById('custom-title');
  if (title instanceof HTMLInputElement && title.value !== '') {
    getAndAddValue('catTitles', title.value);
    title.value = '';
  }
};
const addTitleKeyupCallback = () => (e) => {
  if (e.key === 'Enter') {
    addTitle();
  }
};
/**
 * @param {import('../@types/index.js').Data['catTitles']} catTitles
 */
export const customTitleSection = (catTitles) => html`<section
  id="custom-titles"
>
  <details open>
    <summary>Customize titles</summary>
    <div class="custom-category-list">
      <div class="custom-category-list content">
        <div class="input-text-row">
          <input
            dir="auto"
            type="text"
            id="custom-title"
            placeholder="Add custom titles"
            name="custom-title"
            @keyup=${addTitleKeyupCallback()}
          />
          <button class="primary" @click=${addTitle}>Add</button>
        </div>
        <ul>
          ${itemList('catTitles', catTitles)}
        </ul>
      </div>
    </div>
  </details>
</section> `;
