import * as React from "react"
import {Card, Icon  }from "@blueprintjs/core"
import { observer, inject } from "mobx-react"
import { UiStore } from "../../../stores/UiStore"

import styled from 'styled-components'
import { VerticalStretch } from "../../../design";


const NodeDrawerDimensions = styled(Card)`
    max-width: 180px;
    min-height: 100%;
    flex: 1 1 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    alignment-baseline: central;
`

interface NodeDrawerProps {
  uiStore?: UiStore
  classes?: any
}


//position: "relative", width: nodeDrawerWidth, left: "auto", right: 0,

@inject("store")
@observer
export class NodeDrawer extends React.Component<NodeDrawerProps, any> {
  render() {
    const nodeDrawer = (
      <NodeDrawerDimensions style={{width: '180px'}}>
        <VerticalStretch>
          <div>{this.props.children}</div>
        </VerticalStretch>
      </NodeDrawerDimensions>
    )
    return nodeDrawer
  }
}

//export let NodeDrawer = injectSheet(layoutStyles)(_NodeDrawer)
