import { html } from '../modules/lit-html.js';
import { resetImages, getAndAddValue } from '../utils/index.js';
import { imageList } from '../components/index.js';

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
/**
 * @param {Data['catImageUrls']} catImageUrls
 */
export const customImageSection = (catImageUrls) => html`<div
  id="custom-images"
>
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
              <button @click=${resetImages} class="destructive revert-btn">
                Revert
              </button>`}
      </div>
      <ul class="image-grid">
        ${imageList('catImageUrls', catImageUrls)}
      </ul>
    </div>
  </details>
</div> `;
