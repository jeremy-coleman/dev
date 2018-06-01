import * as React from 'react'
import {observer} from 'mobx-react'
import {withTheme} from 'theming'
import styled from 'styled-jss'


export let ChartsPage = withTheme(observer((props) =>
<div>Charts
    <Button/>
</div>
))



const Button = styled('button')(({margin, theme}) => ({
  margin,
  color: theme.palette.color,
  backgroundColor: theme.palette.primary,
}))