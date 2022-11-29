import { expandMoreIcon } from '../assets/expandMoreIcon.js';
import { html } from '../modules/lit-html.js';

/**
 * Summary element for <details>
 * @param {string} title
 */
export const summary = (title) =>
  html`<summary>${title} ${expandMoreIcon}</summary>`;
