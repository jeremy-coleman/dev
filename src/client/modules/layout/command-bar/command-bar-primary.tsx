import * as React from "react";
import { observer } from 'mobx-react';




import { HorizontalStretch } from '../../../design';


import {withTheme} from 'theming'
import styled from 'react-emotion'


//@ts-ignore
const CommandBarDimensions = withTheme(styled('div')(({theme}) => ({
    border: "1 solid black",
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
            <CommandBarDimensions >
            <HorizontalStretch>
                hi
            </HorizontalStretch>
            </CommandBarDimensions>
        );
    }
}

//@ts-ignore
const NativeMimicToolbarDimensions = withTheme(styled('div')(({theme}) => ({
    border: "1 solid black",
    display: "flex",
    maxHeight: 5,
    minHeight: 5,
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
export class NativeMimicToolbar extends React.Component<any, any> {
    render() {
        return (
            <NativeMimicToolbarDimensions >
            <HorizontalStretch>
                .......
            </HorizontalStretch>
            </NativeMimicToolbarDimensions>
        );
    }
}



/*

import {  NavbarDivider } from "@blueprintjs/core";
import { LoginView } from "./Login";
import { FileCommandButtons } from "./FileCommandButtons";


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
*/

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