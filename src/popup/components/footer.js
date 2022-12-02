import { html } from '../modules/lit-html.js';
import { logo } from '../assets/logo.js';
import { resetImages, resetTitles } from '../utils/index.js';
import { resetIcon } from '../assets/resetIcon.js';

export const footer = html`<footer>
  <button
    @click=${async () => resetImages().then(() => resetTitles())}
    class="destructive small revert-btn"
  >
    ${resetIcon} Reset settings to default
  </button>
  <div class="lockup">
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
  </div>
</footer>`;
