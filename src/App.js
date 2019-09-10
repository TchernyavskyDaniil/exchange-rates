import React, { Component } from 'react'

import Header from './layout/Header'
import Main from './layout/Main'

class App extends Component {
  state = {
    errorInfo: null,
    isError: false,
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo, isError: true })
  }

  render() {
    const { errorInfo, isError } = this.state

    if (isError) {
      return <h1> {errorInfo} </h1>
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
