// @ts-check

import { toggleThemeIcon } from '../assets/toggleThemeIcon.js';
import { renderContent } from '../index.js';
import { html } from '../modules/lit-html.js';

/**
 * @param {import('../@types/index.js').Data['theme']} theme
 */
export const toggleThemeButton = (theme) => {
  const currentTheme = theme || document.body.attributes['data-theme'].value;
  return html`<button
    class="icon toggle-theme"
    aria-label="Toggle to ${currentTheme === 'dark' ? 'light' : 'dark'} mode"
    @click=${() => {
      browser.storage.local
        .set({
          theme: currentTheme === 'dark' ? 'light' : 'dark',
        })
        .then(() => {
          renderContent();
        });
    }}
  >
    ${toggleThemeIcon}
  </button>`;
};
