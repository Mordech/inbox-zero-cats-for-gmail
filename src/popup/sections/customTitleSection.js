import { html } from '../modules/lit-html.js';
import { getAndAddValue } from '../utils/index.js';
import { itemList } from '../components/index.js';
import { summary } from '../components/summary.js';

const addTitle = async () => {
  const title = document.getElementById('custom-title');
  if (title instanceof HTMLInputElement && title.value !== '') {
    getAndAddValue('catTitles', title.value);
    title.value = '';
  }
};

const addTitleKeyupCallback = () => (/** @type {KeyboardEvent} */ e) => {
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
    ${summary('Customize titles')}
    <div class="custom-category-list">
      <div class="custom-category-list content">
        <div class="input-text-row">
          <input
            dir="auto"
            type="text"
            id="custom-title"
            placeholder="Add your titles"
            name="custom-title"
            @keyup=${addTitleKeyupCallback()}
          />
          <button class="primary" @click=${addTitle}>Add</button>
        </div>
        <ul>
          ${itemList('catTitles', catTitles || defaultCatTitles)}
        </ul>
      </div>
    </div>
  </details>
</section> `;
