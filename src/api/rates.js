import root from './config'

/**
 * Get actual exchange rates
 * @param options {Object<string>}
 * @returns {Promise<Object>}
 */
export const requestRates = (options = {}) => root.get('latest', options).then(res => res.json())
