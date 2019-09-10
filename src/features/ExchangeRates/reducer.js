import constants from '../../constants'

export const initialState = {
  latestDate: null,
  latestCurrencies: [],
  fromCurrencyValue: {
    currency: constants.TO_CURRENCY,
    value: 1,
    rate: 1,
  },
  toCurrencyValue: {
    currency: constants.FROM_CURRENCY,
    value: 1,
    rate: 1,
  },
  error: {
    textError: null,
    statusError: false,
  },
  isLoading: true,
}

export const types = {
  UPDATE_ALL: 'UPDATE_ALL',
  UPDATE_CURRENCY: 'UPDATE_CURRENCY',
  SET_LATEST_DATE: 'SET_LATEST_DATE',
  SET_ERROR: 'SET_ERROR',
}

export const reducer = (state, action) => {
  const { latestDate, updatedAll, updatedCurrency, errorInfo } = action

  switch (action.type) {
    case types.SET_LATEST_DATE:
      return { ...state, latestDate }
    case types.UPDATE_CURRENCY:
      return { ...state, ...updatedCurrency }
    case types.UPDATE_ALL:
      return { ...state, ...updatedAll }
    case types.SET_ERROR:
      return { ...state, ...errorInfo }
    default:
      return state
  }
}
