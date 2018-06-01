import * as React from "react"
import {IconButton,Divider ,List ,Drawer, Card  }from "@material-ui/core"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import { observer, inject } from "mobx-react"
import { UiStore } from "../../../stores/UiStore"

import injectSheet from 'react-jss'
import styled from 'styled-jss'


const NodeDrawerDimensions = styled(Card)({
    maxWidth: '180px',
    minHeight: '100%',
    flex: '1 1 auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignmentBaseline: 'central',
    marginBottom: '5px',
})

interface NodeDrawerProps {
  uiStore?: UiStore
  classes?: any
}


//position: "relative", width: nodeDrawerWidth, left: "auto", right: 0,

@inject("uiStore")
@observer
export class NodeDrawer extends React.Component<NodeDrawerProps, any> {
  render() {
    const { nodeDrawerToggle } = this.props.uiStore
    const nodeDrawer = (
      <NodeDrawerDimensions
        open={nodeDrawerToggle.open ? true : false}
      >
        <List>
          <div>{this.props.children}</div>
        </List>
      </NodeDrawerDimensions>
    )
    return nodeDrawer
  }
}

//export let NodeDrawer = injectSheet(layoutStyles)(_NodeDrawer)
