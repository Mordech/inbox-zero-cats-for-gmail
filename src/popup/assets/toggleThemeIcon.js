// @ts-check

import { svg } from '../modules/lit-html.js';

export const toggleThemeIcon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
  .mrd-element {
    fill: var(--color-primary-on, #000);
  }

  #mrd-sun,
  [data-theme='light'] #mrd-sun {
    transform-origin: center;
    transform: rotate(360deg);
    transition: fill 100ms ease-in, transform 600ms ease-out;
  }

  [data-theme='dark'] #mrd-sun {
    transform-origin: center;
    transform: rotate(0deg);
  }

  #mrd-mask,
  [data-theme='light'] #mrd-mask {
    transform-origin: center;
    transform: translateX(-5px);
    transition: fill 250ms ease-in, transform 600ms ease-out;
  }

  [data-theme='dark'] #mrd-mask {
    transform: translateX(0);
  }
  </style>
  <path class="mrd-element" id="mrd-sun"
    d="M8.65 20H6C5.45 20 4.97933 19.8043 4.588 19.413C4.196 19.021 4 18.55 4 18V15.35L2.075 13.4C1.69167 13.0167 1.5 12.55 1.5 12C1.5 11.45 1.69167 10.9833 2.075 10.6L4 8.65V6C4 5.45 4.196 4.97933 4.588 4.588C4.97933 4.196 5.45 4 6 4H8.65L10.6 2.075C10.9833 1.69167 11.45 1.5 12 1.5C12.55 1.5 13.0167 1.69167 13.4 2.075L15.35 4H18C18.55 4 19.021 4.196 19.413 4.588C19.8043 4.97933 20 5.45 20 6V8.65L21.925 10.6C22.3083 10.9833 22.5 11.45 22.5 12C22.5 12.55 22.3083 13.0167 21.925 13.4L20 15.35V18C20 18.55 19.8043 19.021 19.413 19.413C19.021 19.8043 18.55 20 18 20H15.35L13.4 21.925C13.0167 22.3083 12.55 22.5 12 22.5C11.45 22.5 10.9833 22.3083 10.6 21.925L8.65 20ZM12 20.5L14.5 18H18V14.5L20.5 12L18 9.5V6H14.5L12 3.5L9.5 6H6V9.5L3.5 12L6 14.5V18H9.5L12 20.5Z" />
  <mask id="circleClip">
    <circle cx="12" cy="12" r="5" fill="white" mask="url(#circleClip)" />
    <circle id="mrd-mask" cx="8" cy="12" r="3.5" fill="black" />
  </mask>
  <circle class="mrd-element" cx="12" cy="12" r="5" mask="url(#circleClip)" />
</svg>`;
