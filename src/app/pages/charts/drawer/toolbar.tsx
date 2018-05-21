import * as React from "react";
import { Navbar, NavbarHeading ,NavbarDivider , Alignment,Button, Classes} from "@blueprintjs/core";

import { Switch,IconButton,Typography,Toolbar, Menu, MenuItem, FormControlLabel, FormGroup, AppBar} from '@material-ui/core';

import { AccountBalanceWallet, Cloud, Dashboard, SwapHoriz } from '@material-ui/icons';
import { NavListIcon } from "../../../layout/NavIcon";
import { observer, inject } from 'mobx-react';
import styled from 'styled-jss'
import { Row } from "../../../design";


const ToolbarDimensions = styled(Toolbar)({
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
                    <Row><ChartDrawerToolbar/></Row>
            </ToolbarDimensions>
        );
    }
}

const RowContainer = styled('div')({
    height: '100%',
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignmentBaseline: 'central'
})


@observer
export class ChartDrawerToolbar extends React.Component<any, any> {
    public render() {
        return (     
            <RowContainer {...this.props}>
              <NavListIcon route='/nbdrawer/dashboard' icon={<Dashboard />} />
              <NavListIcon route='/nbdrawer/notebook' icon={<Cloud />} />
              <NavListIcon route='/nbdrawer/charts' icon={<SwapHoriz />} />
              <NavListIcon route='/nbdrawer/datasets' icon={<AccountBalanceWallet />} />
            </RowContainer>
        );
    }
}
