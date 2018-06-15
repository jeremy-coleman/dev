import * as React from 'react'
import {observer} from 'mobx-react'
import { MainView } from './mainView';

import './css/resizer.css'
import './css/application.css'
import './css/messages.css'

@observer
export class CatalogModule extends React.Component {
  render(){
return(
  <MainView/>
)
  }
}
