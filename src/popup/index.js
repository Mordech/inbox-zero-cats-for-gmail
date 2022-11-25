//  @ts-check

/**
 * @typedef {import('./@types').Data} Data
 * @typedef {import('./@types').DataKeys} DataKeys
 */

import { html, render } from './modules/lit-html.js';
import '../polyfills/browser-polyfill.js';

import defaultCatTitles from './data/defaultCatTitles.js';
import { getAndAddValue } from './utils/getAndAddValue.js';
import { removeItem } from './utils/removeItem.js';

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

const addImage = async () => {
  const images = document.getElementById('custom-image');

  if (images instanceof HTMLInputElement && images.files) {
    const files = images.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const res = reader.result?.toString();
        res && getAndAddValue('catImageUrls', res);
      };
      reader.onerror = (error) => {
        error;
      };
    }
    images.value = '';
  }
};

const addImageKeyupCallback = () => (e) => {
  if (e.key === 'Enter') {
    addImage();
  }
};

const resetTitles = async () => {
  browser.storage.local
    .set({ catTitles: defaultCatTitles })
    .then(() => renderContent())
    .catch((error) => {
      error;
    });
};

const defaultImage = 'https://source.unsplash.com/random/320x320/?cat';
const resetImages = async () => {
  browser.storage.local
    .set({ catImageUrls: [defaultImage] })
    .then(() => renderContent())
    .catch((error) => {
      error;
    });
};

/**
 * @param {DataKeys} category
 * @param {string[]} items
 */
const itemList = (category, items) =>
  items.map(
    (item) => html`<li>
      ${item}

      <button
        @click=${() => {
          removeItem(category, items, item);
        }}
        class="destructive small"
        style="visibility: ${items.length >= 2 ? 'visible' : 'hidden'}"
      >
        Remove
      </button>
    </li>`
  );

/**
 * @param {DataKeys} category
 * @param {string[]} items
 */
const imageList = (category, items) =>
  items.map(
    (item, index) => html`<li
      class="image ${item.includes(defaultImage) ? 'random' : 'not-random'}"
    >
      <img src=${item} title=${item} alt="cat-image-${index + 1}" />
      ${items.length >= 2
        ? html`<button
            @click=${() => {
              removeItem(category, items, item);
            }}
            class="destructive small"
          >
            Remove
          </button>`
        : ''}
    </li>`
  );

/**
 * @param {Data['catTitles']} catTitles
 */
const customTitleSection = (catTitles) => html`<div class="custom-titles">
  <details open class="custom-category-list">
    <summary>Customize titles</summary>
    <div class="custom-category-list">
      <div class="input-text-row">
        <input
          type="text"
          id="custom-title"
          placeholder="Add custom titles"
          name="custom-title"
          @keyup=${addTitleKeyupCallback()}
        />
        <button @click=${addTitle}>Add</button>
        <button @click=${resetTitles} class="reset">Reset</button>
      </div>
      <ul>
        ${itemList('catTitles', catTitles)}
      </ul>
    </div>
  </details>
</div> `;

/**
 * @param {Data['catImageUrls']} catImageUrls
 */
const customImageSection = (catImageUrls) => html`<div class="custom-titles">
  <details open class="custom-category-list">
    <summary>Customize images</summary>
    <div class="custom-category-list">
      <div class="input-text-row">
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          id="custom-image"
          name="custom-image"
          @keyup=${addImageKeyupCallback()}
          @change=${addImage}
        />
        <label role="button" tabindex="0" for="custom-image"
          >Upload image</label
        >
        <button @click=${resetImages} class="reset">Reset</button>
      </div>
      <ul class="image-grid">
        ${imageList('catImageUrls', catImageUrls)}
      </ul>
    </div>
  </details>
</div> `;

/**
 * @param {Data} data
 */
const template = (data) => {
  const { catTitles, catImageUrls } = data;
  return html`<h1>Inbox-zero cats customizations</h1>
    ${catTitles ? customTitleSection(catTitles) : resetTitles()}
    ${catImageUrls ? customImageSection(catImageUrls) : resetImages()}`;
};

export const renderContent = () => {
  browser.storage.local
    .get()
    // @ts-ignore
    .then((result) => render(template(result), document.body))
    .catch((error) => error);
};

renderContent();
