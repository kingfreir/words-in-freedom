import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Home from './scenes/Home/Home'
import './fonts.css'

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'))

module.hot.accept()
