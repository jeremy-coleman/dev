import * as React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { IconBar } from '../IconBar/IconBar'
import { ProvidersDrawer } from './Drawers/ProvidersDrawer'
import { ServiceAreasDrawer } from './Drawers/ServiceAreasDrawer'



export let LeftPane = () =>
  <div className='LeftPane'>
    <Router>
      <div>
        <IconBar />
        <div className='LeftPaneContent'>
          <Route path='/providers' component={ProvidersDrawer} />
          <Route path='/service-areas' component={ServiceAreasDrawer} />
        </div>
      </div>
    </Router>
  </div>
