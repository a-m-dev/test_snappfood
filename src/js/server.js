// express
import express from 'express'
import cors from 'cors'

// react 
import React from 'react'
import { renderToString } from 'react-dom/server'

// redux 
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'  

// react route
import { StaticRouter, matchPath } from 'react-router-dom' 


// Main Components
import App from './components/App'
import template from './template'
import routes from './routes'


// Some constants to make work easy peasy...
const PORT = 4000
const BUILD_FOLDER = 'public'

const app = express()


app.use(cors())
app.use(express.static(BUILD_FOLDER))




app.get('/*', (req, res, next) => {

  const activeRoute = routes.find( route => matchPath(req.url, route) ) || {}

  const store = configureStore()
  
  const _promise = activeRoute.fetchInitialData 
    ? activeRoute.fetchInitialData(store.dispatch) // you need to pass the dispatch down to the function here, see 
    : Promise.resolve()

  _promise.then( () => {
    const markup = renderToString(
  
      <StaticRouter location={req.url} context={{}}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    )
  
    const initialBrowserTabText = 'Notify'
    const initialState = store.getState() || {}
  
    const _template = template( initialBrowserTabText, initialState, markup )
  
    res.send(_template)
  }).catch(err => {
    console.log(err)
  })
})




app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`)
})
