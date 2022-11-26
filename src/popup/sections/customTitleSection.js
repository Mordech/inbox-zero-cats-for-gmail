import { html } from '../modules/lit-html.js';
import { resetTitles, getAndAddValue } from '../utils/index.js';
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
 * @param {Data['catTitles']} catTitles
 */
export const customTitleSection = (catTitles) => html`<div id="custom-titles">
  <details open class="custom-category-list">
    <summary>Customize titles</summary>
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
        <button @click=${addTitle}>Add</button>
        <button @click=${resetTitles} class="destructive">Reset</button>
      </div>
      <ul>
        ${itemList('catTitles', catTitles)}
      </ul>
    </div>
  </details>
</div> `;
