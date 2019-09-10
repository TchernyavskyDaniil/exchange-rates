import PT from 'prop-types'

export const defaultRateTypes = {
  dispatch: () => {},
  toCurrencyValue: {},
  updateDate: () => {},
  fromCurrencyValue: {},
  latestCurrencies: [],
  isError: false,
  dispatchError: () => {},
}

const currencyTypes = PT.shape({
  currency: PT.string,
  value: PT.oneOfType([PT.number, PT.string]),
  rate: PT.number,
})

export const propTypesRate = {
  dispatch: PT.func,
  toCurrencyValue: currencyTypes,
  updateDate: PT.func,
  fromCurrencyValue: currencyTypes,
  latestCurrencies: PT.array,
  isError: PT.bool,
  dispatchError: PT.func,
}
