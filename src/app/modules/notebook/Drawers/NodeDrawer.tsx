import * as React from "react"
import {Card }from "@blueprintjs/core"
import { observer } from "mobx-react"
import styled from 'styled-jss'

import { VerticalStretch } from "../../../design";



const NodeDrawerDimensions = styled(Card)({
    maxWidth: 180,
    minHeight: "100%",
    flex: "1 1 auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignmentBaseline: "central"
  })



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


/*
const NodeDrawerDimensions = styled(Card)`
    max-width: 180px;
    min-height: 100%;
    flex: 1 1 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    alignment-baseline: central;
`
*/