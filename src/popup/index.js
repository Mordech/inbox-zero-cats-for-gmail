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
import { logo } from './assets/logo.js';
import { initTheme } from './utils/initTheme.js';
import { deleteForeverIcon } from './assets/delete-forever.js';
import { toggleThemeIcon } from './assets/toggle-theme-icon.js';

/**
 * @param {Data['theme']} theme
 */
const toggleThemeButton = (theme) => html`<button
  class="toggle-theme icon"
  aria-label="Toggle to ${theme === 'dark' ? 'light' : 'dark'} mode"
  @click=${() => {
    browser.storage.local
      .set({
        theme: theme === 'dark' ? 'light' : 'dark',
      })
      .then(() => {
        renderContent();
      });
  }}
>
  ${toggleThemeIcon}
</button>`;

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

export const addImage = async () => {
  const images = document.getElementById('custom-image');

  if (images instanceof HTMLInputElement && images.files) {
    const files = images.files;
    for await (const file of files) {
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
    (item) => html`<li dir="auto" class="text-item">
      ${item}
      <button
        @click=${() => {
          removeItem(category, items, item);
        }}
        aria-label=${`Delete title ${item}`}
        class="destructive light icon"
        style="visibility: ${items.length >= 2 ? 'visible' : 'hidden'}"
      >
        ${deleteForeverIcon}
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
      <img
        src=${item}
        title=${item.includes(defaultImage)
          ? item
          : `Image no. ${items.length - index}. User uploaded`}
        alt=${item.includes(defaultImage)
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

/**
 * @param {Data['catTitles']} catTitles
 */
const customTitleSection = (catTitles) => html`<div id="custom-titles">
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

/**
 * @param {Data['catImageUrls']} catImageUrls
 */
const customImageSection = (catImageUrls) => html`<div id="custom-images">
  <details open class="custom-category-list">
    <summary>Customize images</summary>
    <div class="custom-category-list content">
      <div class="input-text-row">
        ${browser.runtime.getURL('').startsWith('moz-extension://') &&
        location.pathname === '/popup/index.html'
          ? html`
              <p>
                <strong>Firefox users 🦊</strong> can only upload images from a
                browser tab.
                <a
                  href=${browser.runtime.getURL('options/index.html')}
                  target="_blank"
                  >Go to the options tab</a
                >
                to upload a photo.
              </p>
            `
          : html`<input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                id="custom-image"
                name="custom-image"
                @change=${addImage}
              />
              <label class="btn" role="button" for="custom-image"
                >Upload image</label
              >
              <button @click=${resetImages} class="destructive">Reset</button>`}
      </div>
      <ul class="image-grid">
        ${imageList('catImageUrls', catImageUrls)}
      </ul>
    </div>
  </details>
</div> `;

const footer = html`<footer>
  ${logo}
  <div class="content">
    <p>
      Made with 😻 by
      <a
        href="https://elad.mizrahi.cc"
        target="_blank"
        aria-label="Go to Elad Mizrahi's portfolio"
        >Elad Mizrahi</a
      >
    </p>
    <p>No cats were harmed in the making of this extension.</p>
  </div>
</footer>`;

/**
 * @param {Data} data
 */
const template = (data) => {
  initTheme(data);
  const { catTitles, catImageUrls, theme } = data;
  return html`<header>
      <h1>Customize your inbox-zero empty state</h1>
      ${toggleThemeButton(theme)}
    </header>
    ${catTitles ? customTitleSection(catTitles) : resetTitles()}
    ${catImageUrls ? customImageSection(catImageUrls) : resetImages()}${footer}`;
};

export const renderContent = async () => {
  browser.storage.local
    .get()
    // @ts-ignore
    .then((result) => render(template(result), document.body))
    .catch((error) => error);
};

renderContent();
