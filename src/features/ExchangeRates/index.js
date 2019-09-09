import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';

import { requestRates } from '../../api/rates';
import { getDate } from '../../helpers';
import constants from '../../constants';
import { initialState, reducer, types } from './reducer';

const RateDate = styled.span``;

const FromRate = styled.select``;

const FromOption = styled.option``;

export const ExchangeRates = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function() {
    requestRates('?base=USD').then(function({ rates, date }) {
      const rateDate = getDate(date, constants.DEFAULT_DATE_OPTIONS);
      const arrRates = Object.entries(rates);
      const fromCurrency = [];
      const toCurrency = [];
      const currencies = [];

      arrRates.forEach((value, key) => {
        const currency = value[0];

        if (currency === constants.FROM_CURRENCY) {
          fromCurrency.push(value);
        } else if (currency === constants.TO_CURRENCY) {
          toCurrency.push(value);
        }

        // no id from API
        currencies.push({ currency, id: key });
      });

      dispatch({
        type: types.UPDATE_ALL,
        updatedAll: {
          latestRates: arrRates,
          latestDate: rateDate,
          latestCurrencies: currencies,
          fromCurrencyValue: fromCurrency,
          toCurrencyValue: toCurrency,
        },
      });
    });
  }, []);

  const { latestDate, latestCurrencies } = state;

  return (
    <>
      <RateDate> {latestDate} </RateDate>
      {console.log('render')}
      <FromRate>
        {latestCurrencies.map(({ currency, id }) => (
          <FromOption value={currency} key={id}>
            {' '}
            {currency}{' '}
          </FromOption>
        ))}
      </FromRate>
    </>
  );
};
