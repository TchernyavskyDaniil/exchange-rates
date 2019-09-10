import root from './config'
import constants from '../constants'

/**
 * Get actual exchange rates
 * @param options {Object<string>}
 * @returns {Promise<Object>}
 */
export const requestRates = (options = {}) =>
  root
    .get('latest', options)
    .then(res => res.json())
    .catch(({ error }) => ({ error: error || constants.DEFAULT_ERROR_NETWORK }))
