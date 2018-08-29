import * as React from "react"
import { observer, inject } from "mobx-react"
import { NodeDrawer } from "./Drawers/NodeDrawer"
import { NotebookControlBar } from "./controlbar"
import { InputNode } from "./Nodes/InputNode"
import { FunctionNode } from "./Nodes/FunctionNode"
import { DebugNode } from "./Nodes/DebugNode"
import { FillFlex, Row, VerticalStretch, FillParent } from '../layout';


import './diagram.css'

import {withTheme} from 'theming'
import styled from 'styled-jss'
import { NodeFormDrawer } from './Drawers/NodeFormDrawer';
import { UiStore } from '../../stores/UiStore';



const MainWorkSpace = withTheme(styled('div')(({theme}) => ({
  display: "flex",
  flex: 1,
  height: "100vh",
  width: "100%",
  backgroundColor: theme.palette.primary.main,
})))



@inject("store")
@observer
export class NotebookLayout extends React.Component<any, any> {

  render() {
    const {nodeFormDrawerToggle, nodeDrawerToggle} = this.props.store.uiStore as UiStore
    const nodeDrawer = (
      <NodeDrawer>
        <InputNode />
        <FunctionNode />
        <DebugNode />
      </NodeDrawer>
    )

    const nodeFormDrawer = (
      <NodeFormDrawer/>
    )

return (
  <FillParent>
<FillFlex>         
        <Row>      
            <VerticalStretch>
            <Row>     
            <Row>
            <MainWorkSpace>
                {this.props.children}
                <div></div>
            </MainWorkSpace>
            </Row>
            <div style={{width: nodeFormDrawerToggle.open ? 'auto' : 0}}>{nodeFormDrawer}</div>
            <div style={{width: nodeDrawerToggle.open  ? 180 : 0}}>{nodeDrawer}</div>
            <NotebookControlBar/>
            </Row>
            </VerticalStretch>
        </Row>
        </FillFlex>
      </FillParent>
      
    )
  }
}


/*
            <RightControlBar/>


const RightControlBar = withTheme(styled(NotebookControlBar)(({theme}) => ({
  maxWidth: 48,
  minWidth: 48,
  width: 48,
  minHeight: "100%",
  flex: "1 1 auto",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignmentBaseline: "central",
  overflow: "hidden",
  border: "3px solid white",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08)",
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.primary.main
})))
*/

//  backgroundColor: theme.palette.primary.main,
//  color: theme.palette.primary.contrastText


/*
export const RightControlBar1  = withTheme(observer((props) => (
  <RightControlBarDimensions {...props}>
      {props.children}
  </RightControlBarDimensions >
)))
*/