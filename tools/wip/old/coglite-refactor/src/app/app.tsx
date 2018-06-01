import { MuiThemeProvider } from 'material-ui/styles'
import * as React from 'react'
import {observer, Provider, inject} from "mobx-react";
import {useStrict} from 'mobx'
import { Header } from './components'
import { LeftPane } from './components'
import { MainView } from './components';





useStrict(true);

interface Props{}

export let App = observer((props: Props) =>

<Provider>
  <MuiThemeProvider>
    <div className='app'>
      <Header />
      <MainView />
      <LeftPane />
    </div>
  </MuiThemeProvider>
</Provider>
)

