import * as React from 'react'
import {observer} from 'mobx-react'
import styled from 'react-emotion'
import {withTheme} from 'theming'
import { DashboardTabRouterOutlet } from './TabRouter';


export const Tester = withTheme(styled('div')(({theme}) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
})))


export let DashboardPage = observer(() =>
<div>
  <DashboardTabRouterOutlet/>
</div>
)
