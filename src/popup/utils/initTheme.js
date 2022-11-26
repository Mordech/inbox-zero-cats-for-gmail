// @ts-check

/**
 * @param {import("../@types").Data} data
 */
export const initTheme = (data) => {
  document.body.attributes.setNamedItem(document.createAttribute('data-theme'));
  const { theme } = data;
  if (theme) {
    document.body.attributes['data-theme'].value = theme;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.attributes['data-theme'].value = 'dark';
  } else {
    document.body.attributes['data-theme'].value = 'light';
  }
};
