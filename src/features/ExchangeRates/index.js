import React, { useEffect, useReducer, useCallback } from 'react'

import { requestRates } from '../../api/rates'
import { getDate } from '../../lib/helpers'
import constants from '../../constants'
import { initialState, reducer, types } from './reducer'
import { Rates, RateInfo, RateDate, ErrorDesc, DescRates } from './styles'
import FromRate from './FromRate'
import ToRate from './ToRate'
import Preloader from '../Preloader'

const ExchangeRates = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    latestCurrencies,
    latestDate,
    fromCurrencyValue,
    toCurrencyValue,
    error: { textError, statusError },
    isLoading,
  } = state

  const dispatchError = useCallback(function(error = null) {
    dispatch({
      type: types.SET_ERROR,
      errorInfo: {
        error: {
          textError: error || constants.DEFAULT_ERROR_NETWORK,
          statusError: true,
        },
        isLoading: false,
      },
    })
  }, [])

  useEffect(function() {
    requestRates({
      searchParams: {
        base: constants.FROM_CURRENCY,
      },
    })
      .then(function({ rates, date, error }) {
        if (error) {
          return dispatchError(error)
        }

        const rateDate = getDate(date, constants.DEFAULT_DATE_OPTIONS)
        let fromCurrency = {}
        let toCurrency = {}
        const currencies = []

        Object.entries(rates).forEach((data, key) => {
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

        return dispatch({
          type: types.UPDATE_ALL,
          updatedAll: {
            latestDate: rateDate,
            latestCurrencies: currencies,
            fromCurrencyValue: fromCurrency,
            toCurrencyValue: toCurrency,
            isLoading: false,
          },
        })
      })
      .catch(dispatchError)
  }, [])

  const updateDate = useCallback(
    date => {
      const newDate = getDate(date, constants.DEFAULT_DATE_OPTIONS)

      if (newDate !== latestDate) {
        dispatch({ type: types.SET_LATEST_DATE, latestDate: newDate })
      }
    },
    [latestDate],
  )

  const rateProps = {
    dispatch,
    toCurrencyValue,
    updateDate,
    fromCurrencyValue,
    latestCurrencies,
    isError: statusError,
    dispatchError,
  }

  return (
    <Rates>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <RateInfo>
            <RateDate> {latestDate} </RateDate>
            {statusError && <ErrorDesc> {textError} </ErrorDesc>}
          </RateInfo>
          <FromRate {...rateProps} />
          <ToRate {...rateProps} />
          {!statusError && (
            <DescRates>
              {fromCurrencyValue.value} = {toCurrencyValue.value}
            </DescRates>
          )}
        </>
      )}
    </Rates>
  )
}

export default ExchangeRates
