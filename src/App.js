import React, { Component } from 'react'

import { Header } from './layout/Header'
import { Main } from './layout/Main'

class App extends Component {
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    )
  }
}

export default App
