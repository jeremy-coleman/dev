import * as React from 'react';
import { withStyles, Paper} from 'material-ui';
import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz } from '@material-ui/icons';
import { NavIcon } from './NavIcon';
import {observer} from 'mobx-react'
import styled from 'styled-components';


const LeftNavSC = styled.div`
    width: 64px;
    flex-direction: column;
    align-items: central;
    border: 3px solid black;
`


export const LeftNav = observer(props => (
<LeftNavSC>
              <NavIcon route="/" icon={<Dashboard />} />
              <NavIcon route="/pages/notebook" icon={<SwapHoriz />} />
              <NavIcon route="/pages/datasets" icon={<AccountBalanceWallet />} />
              <NavIcon route="/pages/cloud" icon={<Cloud />} />
              <NavIcon route="/pages/settings" icon={<Settings />} />
              <NavIcon route="/pages/about" icon={<HelpOutline />} />
</LeftNavSC>
))


//const LeftNav = withStyles(styles, {withTheme: true})(_LeftNav);
//export {LeftNav as default, LeftNav}


// add "label" if you want to use text ie: <NavIcon label="Portfolio" route="/" icon={<Dashboard />} />
