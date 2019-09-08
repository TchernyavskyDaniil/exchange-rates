/**
 * Get actual format date with options
 * @param date {string}
 * @param options {Object.<string>}
 * @returns {string}
 */
export function getDate(date, options = {}) {
  const newDate = new Date(date);

  return newDate.toLocaleString('ru', options);
}
