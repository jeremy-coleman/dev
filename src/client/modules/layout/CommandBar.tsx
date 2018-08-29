import ColorLens from "@material-ui/icons/ColorLens";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import { action, observable } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { UiStore } from "../../stores/UiStore";
import styled from "styled-jss";
import {withTheme} from 'theming'

//maxHeight: 32,
//minHeight: 32,


const CommandBarDimensions = withTheme(styled('div')(({theme}) => ({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  position: "relative",
  top: 0,
  left: 0,
  right: 0,
  flexWrap: "none",
  overflow: "hidden !important",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText
})));

//const CommandBarDimensions = CommandBarStyles.withComponent(AppBar)

@inject("store")
@observer
export class CommandBar extends React.Component<any, any> {
  @observable currentClickTarget
  @action setTarget = event => {this.currentClickTarget = event.target}

  render() { 
    const {menuDrawerToggle,themeDialogToggle} = this.props.store.uiStore as UiStore

    const _commandBar = (
      <CommandBarDimensions>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={e => {menuDrawerToggle.openDrawer(true)}}
          >
            <MenuIcon />
          </IconButton>

          <div>
            <IconButton onClick={() => themeDialogToggle.toggleDrawer()} color="inherit">
              {<ColorLens/>}
            </IconButton>
          </div>
        </Toolbar>
      </CommandBarDimensions>
    )
    return _commandBar
  }
}
