/**
 * Get actual format date with options
 * @param date {Date}
 * @param isNewDate {boolean}
 * @param options {Object.<string>}
 * @returns {string}
 */
export function getDate(date, options = {}, isNewDate = false) {
  const newDate = isNewDate ? date : new Date(date)

  return newDate.toLocaleString('ru', options)
}
