import * as React from "react";
import {  NavbarDivider } from "@blueprintjs/core";
import { observer } from 'mobx-react';
//import styled from 'styled-components'

import { LoginView } from "./Login";
import { FileCommandButtons } from "./FileCommandButtons";
import { HorizontalStretch } from '../../../design';


import {withTheme} from 'theming'
import styled from 'styled-jss'
import { AddressBarMenu } from "../addressBar/addressBarMenu";




const Dimensions = withTheme(styled('div')(({theme}) => ({
    border: "1px solid black",
    display: "flex",
    maxHeight: 32,
    minHeight: 32,
    width: "100%",
    flexDirection: "row",
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    flexWrap: "none",
    overflow: "hidden !important",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
})))

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
                    <AddressBarMenu/>
        </HorizontalStretch>
        </Dimensions>
        );
    }
}


/*
const Dimensions1 = styled.div`
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
*/