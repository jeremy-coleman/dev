import * as React from "react";
import { Navbar, NavbarHeading,NavbarGroup ,NavbarDivider , Alignment,Button, Classes} from "@blueprintjs/core";
import { observer } from 'mobx-react';
import styled from 'styled-components'

const NavHeader = styled(Navbar)`
  background-color: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
`;

const NavHeaderGroup = styled(NavbarGroup)`
    flex-wrap: none;
`;

@observer
export class Header extends React.Component<any, any> {
    render() {
        return (
            <NavHeader>
                <NavHeaderGroup>
                    <NavbarHeading>Navbar Heading</NavbarHeading>
                    <input type="input" className={Classes.INPUT} />
                </NavHeaderGroup>
                <NavHeaderGroup align={Alignment.RIGHT}>
                    <Button rightIcon="home">Home</Button>
                    <NavbarDivider />
                    <Button rightIcon="cog">Settings</Button>
                </NavHeaderGroup>
            </NavHeader>
        );
    }
}
