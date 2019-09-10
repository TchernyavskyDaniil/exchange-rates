import React, { useEffect, useReducer, useCallback } from 'react'
import styled from 'styled-components'

import { requestRates } from '../../api/rates'
import { getDate } from '../../lib/helpers'
import constants from '../../constants'
import { initialState, reducer, types } from './reducer'

const RateDate = styled.span``

const Rate = styled.select``

const Option = styled.option``

const Input = styled.input`
  min-width: 100px;
`

export const ExchangeRates = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { latestRates, latestCurrencies, latestDate, fromCurrencyValue, toCurrencyValue } = state

  useEffect(function() {
    requestRates({
      searchParams: {
        base: constants.FROM_CURRENCY,
      },
    }).then(function({ rates, date }) {
      const rateDate = getDate(date, constants.DEFAULT_DATE_OPTIONS)
      const arrRates = Object.entries(rates)
      let fromCurrency = {}
      let toCurrency = {}
      const currencies = []

      arrRates.forEach((data, key) => {
        const currency = data[0]
        const value = +data[1]

        if (currency === constants.FROM_CURRENCY) {
          fromCurrency = { currency, value, rate: value }
        } else if (currency === constants.TO_CURRENCY) {
          toCurrency = { currency, value, rate: value }
        }

        // no id from API
        currencies.push({ currency, id: key })
      })

      dispatch({
        type: types.UPDATE_ALL,
        updatedAll: {
          latestRates: arrRates,
          latestDate: rateDate,
          latestCurrencies: currencies,
          fromCurrencyValue: fromCurrency,
          toCurrencyValue: toCurrency,
        },
      })
    })
  }, [])

  const updateDate = useCallback(date => {
    const newDate = getDate(date, constants.DEFAULT_DATE_OPTIONS)

    if (newDate !== latestDate) {
      dispatch({ type: types.SET_LATEST_DATE, latestDate: newDate })
    }
  }, [latestDate])

  const changeFromCurrency = useCallback(
    function({ target: { value: currency } }) {
      requestRates({
        searchParams: {
          base: currency,
          symbols: toCurrencyValue.currency,
        },
      }).then(function({ rates, date }) {
        const { currency: toCurrency } = toCurrencyValue
        const rate = +rates[toCurrency]

        updateDate(date)
        dispatch({
          type: types.UPDATE_CURRENCY,
          updatedCurrency: {
            fromCurrencyValue: {
              ...fromCurrencyValue,
              currency,
            },
            toCurrencyValue: {
              value: fromCurrencyValue.value * rate,
              currency: toCurrency,
              rate,
            },
          },
        })
      })
    },
    [fromCurrencyValue, toCurrencyValue, updateDate],
  )

  const changeToCurrency = useCallback(
    function({ target: { value: currency } }) {
      requestRates({
        searchParams: {
          base: fromCurrencyValue.currency,
          symbols: currency,
        },
      }).then(function({ rates, date }) {
        const rate = +rates[currency]

        updateDate(date)
        dispatch({
          type: types.UPDATE_CURRENCY,
          updatedCurrency: {
            fromCurrencyValue,
            toCurrencyValue: { currency, value: rate * fromCurrencyValue.value, rate },
          },
        })
      })
    },
    [fromCurrencyValue, updateDate],
  )

  const changeFromValue = useCallback(
    function({ target: { value } }) {
      const numberValue = +value
      dispatch({
        type: types.UPDATE_CURRENCY,
        updatedCurrency: {
          fromCurrencyValue: {
            ...fromCurrencyValue,
            value: numberValue,
          },
          toCurrencyValue: {
            ...toCurrencyValue,
            value: toCurrencyValue.rate * numberValue,
          },
        },
      })
    },
    [fromCurrencyValue, toCurrencyValue],
  )

  const changeToValue = useCallback(
    function({ target: { value } }) {
      const numberValue = +value
      dispatch({
        type: types.UPDATE_CURRENCY,
        updatedCurrency: {
          fromCurrencyValue: {
            ...fromCurrencyValue,
            value: numberValue / toCurrencyValue.rate,
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
    <>
      <RateDate> {latestDate} </RateDate>
      <Input value={fromCurrencyValue.value} onChange={changeFromValue} />
      <Rate value={fromCurrencyValue.currency} onChange={changeFromCurrency}>
        {latestCurrencies.map(({ currency, id }) => (
          <Option value={currency} key={id}>
            {currency}
          </Option>
        ))}
      </Rate>
      <Input value={toCurrencyValue.value} onChange={changeToValue} />
      <Rate value={toCurrencyValue.currency} onChange={changeToCurrency}>
        {latestCurrencies.map(({ currency, id }) => (
          <Option value={currency} key={id}>
            {currency}
          </Option>
        ))}
      </Rate>
    </>
  )
}
