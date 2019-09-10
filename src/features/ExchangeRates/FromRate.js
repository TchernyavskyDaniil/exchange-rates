import React, { useCallback } from 'react'

import { FromContainer, Input } from './styles'
import { types } from './reducer'
import { requestRates } from '../../api/rates'
import RateSelect from './RateSelect'
import { checkIsFloatAndFixed } from '../../lib/helpers'

const FromRate = ({
  dispatch,
  toCurrencyValue,
  updateDate,
  fromCurrencyValue,
  latestCurrencies,
  isError,
  dispatchError,
}) => {
  const changeFromValue = useCallback(
    function({ target: { value } }) {
      const numberValue = checkIsFloatAndFixed(value, true)
      const newCurrencyValue = checkIsFloatAndFixed(toCurrencyValue.rate * numberValue, true)

      dispatch({
        type: types.UPDATE_CURRENCY,
        updatedCurrency: {
          fromCurrencyValue: {
            ...fromCurrencyValue,
            value: numberValue,
          },
          toCurrencyValue: {
            ...toCurrencyValue,
            value: newCurrencyValue,
          },
        },
      })
    },
    [fromCurrencyValue, toCurrencyValue],
  )

  const changeFromCurrency = useCallback(
    function({ target: { value: currency } }) {
      requestRates({
        searchParams: {
          base: currency,
          symbols: toCurrencyValue.currency,
        },
      })
        .then(function({ rates, date }) {
          const { currency: toCurrency } = toCurrencyValue
          const rate = checkIsFloatAndFixed(rates[toCurrency], true)
          const newCurrencyValue = checkIsFloatAndFixed(fromCurrencyValue.value * rate, true)

          updateDate(date)
          dispatch({
            type: types.UPDATE_CURRENCY,
            updatedCurrency: {
              fromCurrencyValue: {
                ...fromCurrencyValue,
                currency,
              },
              toCurrencyValue: {
                value: newCurrencyValue,
                currency: toCurrencyValue.currency,
                rate,
              },
            },
          })
        })
        .catch(dispatchError)
    },
    [fromCurrencyValue, toCurrencyValue, updateDate],
  )

  return (
    <FromContainer>
      <Input value={fromCurrencyValue.value} onChange={changeFromValue} disabled={isError} />
      <RateSelect
        value={fromCurrencyValue.currency}
        onChange={changeFromCurrency}
        isDisabled={isError}
        options={latestCurrencies}
      />
    </FromContainer>
  )
}

export default FromRate
