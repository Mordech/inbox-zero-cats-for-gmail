//  @ts-check

/**
 * @typedef {import('./@types').Data} Data
 * @typedef {import('./@types').DataKeys} DataKeys
 */

import { html, render } from './modules/lit-html.js';
import '../polyfills/browser-polyfill.js';

import { resetTitles, resetImages, initTheme } from './utils/index.js';
import { footer, toggleThemeButton } from './components/index.js';
import { customTitleSection, customImageSection } from './sections/index.js';

/**
 * @param {Data} data
 */
const template = (data) => {
  const { catTitles, catImageUrls, theme } = data;
  initTheme(theme);
  return html`<header>
      <h1>Customize your <strong>inbox zero</strong></h1>
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
