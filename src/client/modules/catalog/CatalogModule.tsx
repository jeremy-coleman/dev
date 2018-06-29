import * as React from 'react'
import {observer} from 'mobx-react'
import styled from 'react-emotion'
import {withTheme} from 'theming'

const Tester = withTheme(styled('div')(({theme}) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
})))

export let CatalogModule = observer((props) =>
<div>
  <Tester>
<p>Dashboard</p>

<p>Recent Projects</p>

<p>Reports</p>

<p>Feeds</p>

<p>Breadcrumbs / Progress for most recent project</p>
</Tester>
</div>
)





/*
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

export const Box = styled('div')`
  flex-direction: ${props => (props.layout === 'column' ? 'column' : 'row')};
  padding: ${props => (props.outer ? '4px' : '0')};
  height: ${props => (props.fixed ? '20px' : 'auto')};
  width: ${props => (props.fixed ? '20px' : 'auto')};
  background-color: ${props => getColor(props.color)};
`
*/