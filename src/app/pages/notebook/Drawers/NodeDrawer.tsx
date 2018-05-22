import * as React from "react"
import {IconButton,Divider ,List ,Drawer  }from "@material-ui/core"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import { observer, inject } from "mobx-react"
import { UiStore } from "../../../stores/UiStore"
import { layoutStyles } from "../layout.styles"

import injectSheet from 'react-jss'

interface NodeDrawerProps {
  uiStore: UiStore
  classes?: any
}


@inject("uiStore")
@observer
class _NodeDrawer extends React.Component<NodeDrawerProps, any> {
  render() {
    const { classes } = this.props
    const { nodeDrawerToggle } = this.props.uiStore
    const nodeDrawer = (
      <Drawer
        variant="persistent"
        anchor="right"
        open={nodeDrawerToggle.open ? true : false}
        classes={{
          paper: classes.nodeDrawerPaper,
          paperAnchorRight: classes.nodeDrawerPaperAnchorRight,
        }}
      >
        <div className={classes.nodeDrawerHeader}>
          <IconButton onClick={() => nodeDrawerToggle.openDrawer(false)}>
            <ArrowForwardIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>{this.props.children}</div>
        </List>
      </Drawer>
    )
    return nodeDrawer
  }
}

export let NodeDrawer = injectSheet(layoutStyles)(_NodeDrawer)
