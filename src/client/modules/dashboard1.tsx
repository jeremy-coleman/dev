import * as React from 'react'
import {observer} from 'mobx-react'
import styled from 'react-emotion'
import {withTheme} from 'theming'

export const Tester = withTheme(styled('div')(({theme}) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
})))

export let DashboardPage = observer(props =>
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
export const Box = styled('div')`
  flex-direction: ${props => (props.layout === 'column' ? 'column' : 'row')};
  padding: ${props => (props.outer ? '4px' : '0')};
  height: ${props => (props.fixed ? '20px' : 'auto')};
  width: ${props => (props.fixed ? '20px' : 'auto')};
  background-color: ${props => getColor(props.color)};
`
*/