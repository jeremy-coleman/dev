import * as React from "react";
import { Navbar, NavbarHeading ,NavbarDivider , Alignment,Button, Classes, Popover} from "@blueprintjs/core";
import { observer } from 'mobx-react';
import styled from 'styled-components'

import { LoginMenuView, LoginView } from "./Login";
import { FileCommandButtons } from "./FileCommandButtons";

const NavHeader = styled(Navbar)`
  background-color: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
  overflow: hidden !important;
`;


@observer
export class Header extends React.Component<any, any> {
    render() {
        return (
            <NavHeader>
                <Navbar.Group align={Alignment.RIGHT}>
                    <LoginView/>
                    <LoginMenuView/>
                    <NavbarDivider />
                    <FileCommandButtons/>
                </Navbar.Group>
            </NavHeader>
        );
    }
}
