import '@babel/polyfill'
// react
import React from 'react'
import ReactDOM from 'react-dom'

// redux
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

// react router
import { BrowserRouter } from 'react-router-dom'


import App from './components/App'


const preloadedState = window.__INITIAL_DATA__
delete window.__INITIAL_DATA__



const store = configureStore(preloadedState)

ReactDOM.hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.querySelector('#app')
)