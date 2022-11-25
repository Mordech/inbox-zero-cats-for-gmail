// @ts-check

/**
 * @param {string[]} array
 * @returns {string}
 */
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
