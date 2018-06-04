import * as React from "react"
import {Card, Icon  }from "@blueprintjs/core"
import { observer, inject } from "mobx-react"

//import { UiStore } from "../../../stores/UiStore"

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




@observer
export class NodeDrawer extends React.Component<any, any> {
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


