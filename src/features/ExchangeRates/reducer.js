import constants from '../../constants'

export const initialState = {
  latestRates: null,
  latestDate: null,
  latestCurrencies: [],
  fromCurrencyValue: {
    currency: constants.TO_CURRENCY,
    value: 0,
  },
  toCurrencyValue: {
    currency: constants.FROM_CURRENCY,
    value: 0,
  },
}

export const types = {
  UPDATE_ALL: 'UPDATE_ALL',
  UPDATE_CURRENCY: 'UPDATE_CURRENCY',
  SET_LATEST_RATES: 'SET_LATEST_RATES',
  SET_LATEST_DATE: 'SET_LATEST_DATE',
  SET_LATEST_CURRENCIES: 'SET_LATEST_CURRENCIES',
  SET_FROM_CURRENCY_VALUE: 'SET_FROM_CURRENCY_VALUE',
  SET_TO_CURRENCY_VALUE: 'SET_TO_CURRENCY_VALUE',
}

export const reducer = (state, action) => {
  const {
    latestRates,
    latestDate,
    latestCurrencies,
    fromCurrencyValue,
    toCurrencyValue,
    updatedAll,
    updatedCurrency,
  } = action

  switch (action.type) {
    case types.SET_LATEST_RATES:
      return { ...state, latestRates }
    case types.SET_LATEST_DATE:
      return { ...state, latestDate }
    case types.SET_LATEST_CURRENCIES:
      return { ...state, latestCurrencies }
    case types.SET_FROM_CURRENCY_VALUE:
      return { ...state, fromCurrencyValue }
    case types.SET_TO_CURRENCY_VALUE:
      return { ...state, toCurrencyValue }
    case types.UPDATE_CURRENCY:
      return { ...state, ...updatedCurrency }
    case types.UPDATE_ALL:
      return { ...state, ...updatedAll }
    default:
      return state
  }
}
