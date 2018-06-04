import * as React from "react";
import { Navbar, NavbarHeading ,NavbarDivider , Alignment,Button, Classes, Popover} from "@blueprintjs/core";
import { observer } from 'mobx-react';
import styled from 'styled-components'

import { LoginMenuView, LoginView } from "./Login";
import { FileCommandButtons } from "./FileCommandButtons";
import { lighten } from 'polished';
import { HorizontalStretch } from '../../design';

const NavHeader = styled(Navbar)`
  background-color: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
  overflow: hidden !important;
  height: 30px;
`;


const Dimensions = styled.div`
  border: 1px solid black;
  display: flex;
  max-height: 32px;
  min-height: 32px;
  width: 100%;
  flex-direction: row;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.main};
  flex-wrap: none;
  overflow: hidden !important;
`;

//background-color: ${props => lighten(0.1, props.theme.main)};

@observer
export class CommandBarPrimary extends React.Component<any, any> {
    render() {
        return (
            <Dimensions >
            <HorizontalStretch>
                    <FileCommandButtons/>
                    <NavbarDivider />
                    <LoginView/>
                    
        </HorizontalStretch>
        </Dimensions>
        );
    }
}
