import React from 'react'
import styled from 'styled-components'

import { ExchangeRates } from '../features/ExchangeRates'

const MainView = styled.main`
  padding: 20px 40px;
`

export const Main = () => (
  <MainView>
    <ExchangeRates />
  </MainView>
)
