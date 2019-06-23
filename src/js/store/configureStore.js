import { createStore , compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


import rootReducer from '../reducers/index'


const middlewares = [ thunk /** add as many middlewares as you want into this array... */ ]

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      compose(applyMiddleware(...middlewares))
    )
  )
}