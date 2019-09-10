import React, { Component } from 'react'
import styled from 'styled-components'

import Header from './layout/Header'
import Main from './layout/Main'

const ErrorDesc = styled.p`
  margin: 40px;
  text-align: center;
  font-size: 24px;
  line-height: 26px;
`

class App extends Component {
  state = {
    errorInfo: null,
    isError: false,
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo, isError: true })
  }

  render() {
    const { errorInfo,
      isError } = this.state

    if (isError) {
      return <ErrorDesc> {errorInfo} </ErrorDesc>
    }

    return (
      <>
        <Header />
        <Main />
      </>
    )
  }
}

export default App
