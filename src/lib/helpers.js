/**
 * Get actual format date with options
 * @param date {Date}
 * @param isNewDate {boolean}
 * @param options {Object.<string>}
 * @returns {string}
 */
import constants from '../constants'

export function getDate(date, options = {}, isNewDate = false) {
  const newDate = isNewDate ? date : new Date(date)

  return newDate.toLocaleString('ru', options)
}

/**
 * Get new fixed value by params
 * @param value {number}
 * @returns {number}
 */
export function toFixedDefault(value) {
  return +value.toFixed(constants.DEFAULT_DECIMAL_PLACES)
}

/**
 * Checking, is number is Float
 * @param n {number}
 * @param isFixed {boolean}
 * @returns {number}
 */
export function checkIsFloatAndFixed(n, isFixed = false) {
  const float = Number(n) === n && n % 1 !== 0

  if (float && isFixed) {
    return toFixedDefault(n)
  }

  return +n
}

/**
 * Checking is value valid for rates
 * @param val {number}
 * @returns {boolean}
 */
export function isWrongValue(val) {
  return isNaN(val) || Math.sign(val) === -1
}
