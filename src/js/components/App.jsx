import '@babel/polyfill'
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, NavLink } from 'react-router-dom'
import routes from '../routes'
import Lost from './_common/Lost'


import '../../sass/app.scss'


// Components
import Navbar from './_common/Navbar'


class App extends React.Component {

  render() {
    
    return(
      <>
        <div className='bg'></div>
        <div className='wrapper'>




          <Switch>
            { // main app routes here
              routes.map(({ path, exact , strict, component: C , ...rest }) => (
                <Route 
                  key={path}
                  path={path}
                  exact={exact}
                  strict={strict}
                  render={(props) => <C {...props} {...rest} />}
                  />
              ))
            }

            <Route component={Lost} />
          </Switch>

        </div>
      </>
    )
  }
}





export default App