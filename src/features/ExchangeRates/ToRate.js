import React, { useCallback } from 'react'

import { requestRates } from '../../api/rates'
import { types } from './reducer'
import { ToContainer, Input } from './styles'
import RateSelect from './RateSelect'
import constants from '../../constants'
import { checkIsFloatAndFixed } from '../../lib/helpers'

const ToRate = ({
  dispatch,
  toCurrencyValue,
  updateDate,
  fromCurrencyValue,
  latestCurrencies,
  isError,
  dispatchError,
}) => {
  const changeToCurrency = useCallback(
    function({ target: { value: currency } }) {
      requestRates({
        searchParams: {
          base: fromCurrencyValue.currency,
          symbols: currency,
        },
      })
        .then(function({ rates, date }) {
          const rate = checkIsFloatAndFixed(rates[currency], true)
          const newCurrencyValue = checkIsFloatAndFixed(rate * fromCurrencyValue.value, true)

          updateDate(date)
          dispatch({
            type: types.UPDATE_CURRENCY,
            updatedCurrency: {
              fromCurrencyValue,
              toCurrencyValue: { currency, value: newCurrencyValue, rate },
            },
          })
        })
        .catch(dispatchError)
    },
    [fromCurrencyValue, updateDate],
  )

  const changeToValue = useCallback(
    function({ target: { value } }) {
      const numberValue = checkIsFloatAndFixed(value, true)
      const newCurrencyValue = checkIsFloatAndFixed(numberValue / toCurrencyValue.rate, true)

      dispatch({
        type: types.UPDATE_CURRENCY,
        updatedCurrency: {
          fromCurrencyValue: {
            ...fromCurrencyValue,
            value: newCurrencyValue,
          },
          toCurrencyValue: {
            ...toCurrencyValue,
            value: numberValue,
          },
        },
      })
    },
    [fromCurrencyValue, toCurrencyValue],
  )

  return (
    <ToContainer>
      <Input value={toCurrencyValue.value} onChange={changeToValue} disabled={isError} />
      <RateSelect
        value={toCurrencyValue.currency}
        onChange={changeToCurrency}
        isDisabled={isError}
        options={latestCurrencies}
      />
    </ToContainer>
  )
}

export default ToRate
