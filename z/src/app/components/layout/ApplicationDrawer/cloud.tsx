import * as React from 'react'
import {observer} from 'mobx-react'
import {Drawer as MuiDrawer} from 'material-ui'
import styled from 'styled-components';

const Drawer = styled(MuiDrawer)`
display: flex;
height: 100%;
width: 500px;
`

export let CloudPage = observer(props =>
<div>
<div>Cloud</div>
<Drawer
anchor='right'
open={true}
variant='persistent'
/>
</div>
)
