// TODO Manage uploading large images
import { html } from '../modules/lit-html.js';
import { getAndAddValue } from '../utils/index.js';
import { imageList } from '../components/index.js';
import { uploadIcon } from '../assets/uploadIcon.js';
import { summary } from '../components/summary.js';

export const addImage = async () => {
  const images = document.getElementById('upload-image');
  if (images instanceof HTMLInputElement && images.files) {
    const files = images.files;
    const reader = new FileReader();

    reader.readAsDataURL(files[0]);

    reader.onloadend = async () => {
      const res = reader.result?.toString();
      res && getAndAddValue('catImageUrls', res);
    };

    reader.onerror = (error) => {
      error;
    };
  }
};

/**
 * @param {import('../@types/index.js').Data['catImageUrls']} catImageUrls
 */
export const customImageSection = (catImageUrls) => html`<section
  id="custom-images"
>
  <details open>
    ${summary('Custom Images')}
    <div class="custom-category-list">
      <div class="custom-category-list content">
        <div class="input-text-row">
          ${browser.runtime.getURL('').startsWith('moz-extension://') &&
          location.pathname === '/popup/index.html'
            ? html`
                <p>
                  <strong>Firefox users 🦊</strong> can only upload images from
                  a browser tab.
                  <a
                    href=${browser.runtime.getURL('options/index.html')}
                    target="_blank"
                    >Go to the options tab</a
                  >
                  to upload a photo.
                </p>
              `
            : uploadImageButton}
        </div>
        <ul class="image-grid">
          ${imageList('catImageUrls', catImageUrls)}
        </ul>
      </div>
    </div>
  </details>
</section>`;

const uploadImageButton = html`<input
    type="file"
    accept="image/jpeg, image/png, image/jpg"
    id="upload-image"
    name="upload-image"
    @change=${addImage}
  />
  <label
    id="upload-image-button"
    class="btn primary"
    role="button"
    for="upload-image"
  >
    ${uploadIcon} Upload image
  </label> `;
