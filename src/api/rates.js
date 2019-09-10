import root from './config'

/**
 * Get actual exchange rates
 * @param options {Object<string>}
 * @returns {Promise<Object>}
 */
export const requestRates = (query = '', options = {}) =>
  root.get(`latest${query}`, options).then(res => res.json())
