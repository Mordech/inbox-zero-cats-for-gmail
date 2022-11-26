import { html } from '../modules/lit-html.js';
import { logo } from '../assets/logo.js';

export const footer = html`<footer>
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
