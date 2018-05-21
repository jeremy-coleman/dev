import * as React from "react";
import { Navbar, NavbarHeading ,NavbarDivider , Alignment,Button, Classes} from "@blueprintjs/core";

import { Switch,IconButton,Typography,Toolbar, Menu, MenuItem, FormControlLabel, FormGroup, AppBar} from '@material-ui/core';

import { observer, inject } from 'mobx-react';
import styled from 'styled-jss'
import { Row } from "../design";



const ToolbarDimensions = styled(AppBar)({
  display: "flex",
  position: 'relative',
  height: 50,
  width: "100%",
  overflow: "hidden"
})

@observer
export class WidgetToolbar extends React.Component<any, any> {
    render() {
        return (
            <ToolbarDimensions>
                    <Row><WidgetIcons/></Row>
            </ToolbarDimensions>
        );
    }
}




import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz } from '@material-ui/icons';
import {NavigationStore} from '../stores'
import { NavListIcon } from './NavIcon';


const RowContainer = styled('div')({
    height: '100%',
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignmentBaseline: 'central'
})


@inject('navigation')
@observer
export class WidgetIcons extends React.Component<any, any> {
    public render() {
      const nav = this.props as NavigationStore
        return (     
            <RowContainer {...this.props}>
              <NavListIcon route="/" icon={<Dashboard />} />
              <NavListIcon route="/pages/notebook" icon={<SwapHoriz />} />
              <NavListIcon route="/pages/charts" icon={<SwapHoriz />} />
              <NavListIcon route="/pages/datasets" icon={<AccountBalanceWallet />} />
              <NavListIcon route="/pages/workflowgraph" icon={<SwapHoriz />} />
              <NavListIcon route="/pages/cloud" icon={<Cloud />} />
              <NavListIcon route="/pages/settings" icon={<Settings />} />
              <NavListIcon route="/pages/about" icon={<HelpOutline />} />
            </RowContainer>
        );
    }
}
