import React, { useEffect, useReducer, useCallback } from 'react'
import styled from 'styled-components'

import { requestRates } from '../../api/rates'
import { getDate } from '../../helpers'
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
    requestRates(`?base=${constants.FROM_CURRENCY}`).then(function({ rates, date }) {
      const rateDate = getDate(date, constants.DEFAULT_DATE_OPTIONS)
      const arrRates = Object.entries(rates)
      let fromCurrency = {}
      let toCurrency = {}
      const currencies = []

      arrRates.forEach((data, key) => {
        const currency = data[0]
        const value = data[1]

        if (currency === constants.FROM_CURRENCY) {
          fromCurrency = { currency, value }
        } else if (currency === constants.TO_CURRENCY) {
          toCurrency = { currency, value }
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

  const updateDate = date => {
    const newDate = getDate(date, constants.DEFAULT_DATE_OPTIONS)

    if (newDate !== latestDate) {
      dispatch({ type: types.SET_LATEST_DATE, latestDate: newDate })
    }
  }

  const changeFromCurrency = useCallback(
    function({ target: { value: currency } }) {
      requestRates(`?base=${currency}&symbols=${toCurrencyValue.currency}`).then(function({
        rates,
        date,
      }) {
        const { currency: toCurrency } = toCurrencyValue

        updateDate(date)
        dispatch({
          type: types.UPDATE_CURRENCY,
          updatedCurrency: {
            fromCurrencyValue: {
              value: fromCurrencyValue.value,
              currency,
            },
            toCurrencyValue: {
              value: rates[toCurrency],
              currency: toCurrency,
            },
          },
        })
      })
    },
    [state.latestDate],
  )

  const changeToCurrency = useCallback(
    function({ target: { value: currency } }) {
      requestRates(`?base=${fromCurrencyValue.currency}&symbols=${currency}`).then(function({
        rates,
        date,
      }) {
        updateDate(date)
        dispatch({
          type: types.SET_TO_CURRENCY_VALUE,
          toCurrencyValue: { currency, value: rates[currency] },
        })
      })
    },
    [state.latestDate],
  )

  return (
    <>
      <RateDate> {latestDate} </RateDate>
      <Input value={fromCurrencyValue.value} />
      <Rate value={fromCurrencyValue.currency} onChange={changeFromCurrency}>
        {latestCurrencies.map(({ currency, id }) => (
          <Option value={currency} key={id}>
            {currency}
          </Option>
        ))}
      </Rate>
      <Input value={toCurrencyValue.value} />
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
