// @ts-check

/**
 * @param {string[]} array
 * @returns {string}
 */
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * firefox storage returns a string chrome returns an array
 * @param {string} result
 */
function parseResult(result) {
  return typeof result === 'string' ? JSON.parse(result) : result;
}
