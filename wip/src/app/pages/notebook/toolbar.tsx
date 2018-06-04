import * as classNames from "classnames";
import AccountCircle from "@material-ui/icons/AccountCircle";
import BorderRight from "@material-ui/icons/BorderRight";
import FormatAlignRight from "@material-ui/icons/FormatAlignRight";
import MenuIcon from "@material-ui/icons/Menu";

import { MenuItem,Menu , Toolbar, IconButton,AppBar } from "@material-ui/core";
import { action, observable } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { UiStore } from "../../stores/UiStore";

import styled from 'styled-components'
import { Navbar } from "@blueprintjs/core";

const ToolbarDimensions = styled(Navbar)`
  display: flex;
  position: relative;
  height: 50px;
  width: 100%;
  overflow: hidden;
`

interface NotebookToolbarProps {
  uiStore?: UiStore
  //classes?: any
}


@inject("store")
@observer
export class NotebookToolbar extends React.Component<NotebookToolbarProps, any> {
  @observable currentClickTarget
  @action setTarget = event => {this.currentClickTarget = event.target}

  render() {

    const _notebookAppBar = (
      <ToolbarDimensions>

        </ToolbarDimensions>
    )
    return _notebookAppBar
  }
}

//export let NotebookToolbar = injectSheet(layoutStyles)(_NotebookAppBar)

/*
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={e => {menuDrawerToggle.openDrawer(true)}}
            style= {{marginLeft: 60,marginRight: 36}}
          >
            <MenuIcon />
          </IconButton>
          <div>
            <IconButton
              aria-owns="appbar-account-icon"
              aria-haspopup="true"
              onClick={e => {
                this.setTarget(e)
                appBarSettingsMenuToggle.openDrawer(true)
              }}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <IconButton onClick={() => nodeFormDrawerToggle.openDrawer(true)} color="inherit">
              <BorderRight />
            </IconButton>

            <IconButton onClick={() => nodeDrawerToggle.openDrawer(true)} color="inherit">
              <FormatAlignRight />
            </IconButton>
            <Menu
              anchorEl={this.currentClickTarget}
              id="appbar-account-icon"
              aria-label="appbar-account-icon"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={appBarSettingsMenuToggle.open}
              onClose={() => {appBarSettingsMenuToggle.openDrawer(false)}}>
              <MenuItem onClick={() => {appBarSettingsMenuToggle.openDrawer(false)}}>
                Profile
              </MenuItem>

              <MenuItem onClick={() => {themeDialogToggle.openDrawer(true), appBarSettingsMenuToggle.openDrawer(false)}}>
                Theme Settings
              </MenuItem>
            </Menu>
          </div>
          </Toolbar>
          */