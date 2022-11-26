// @ts-check

import { toggleThemeIcon } from '../assets/toggleThemeIcon.js';
import { renderContent } from '../index.js';
import { html } from '../modules/lit-html.js';

/**
 * @param {import('../@types/index.js').Data['theme']} theme
 */
export const toggleThemeButton = (theme) => html`<button
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
