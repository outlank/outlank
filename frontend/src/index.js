import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './stroe'

import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import Home from './pages/home'
import Product from './pages/product'

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/product/:id' component={Product} />
          <Route exact path='/class' component={Home} />
          <Route exact path='/cart' component={Home} />
          <Route exact path='/user' component={Home} />
          <Route path='*' render={() => '404 not found'} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
  , document.getElementById('root'))
registerServiceWorker()
