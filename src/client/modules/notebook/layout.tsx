import * as React from "react"
import { observer } from "mobx-react"
import { observable, action } from "mobx"
import { NodeDrawer } from "./Drawers/NodeDrawer"
import { NotebookWidgetBar } from "./toolbar"
import { InputNode } from "./Nodes/Input"
import { OutputNode } from "./Nodes/Output"
import { FillFlex, Row, VerticalStretch } from "../../design";


import './scss/main.scss'

import {withTheme} from 'theming'
import styled from 'react-emotion'

const MainWorkSpace = withTheme(styled('div')(({theme}) => ({
  display: "flex",
  height: "100%",
  width: "100%",
  backgroundColor: theme.palette.primary.main,
})))




@observer
export class NotebookLayout extends React.Component<any, any> {
  @observable currentClickTarget
  @action setTarget = event => {this.currentClickTarget = event.target}

  render() {
    const nodeDrawer = (
      <NodeDrawer>
        <InputNode />
        <OutputNode />
      </NodeDrawer>
    )

    return (
<FillFlex>         
        <Row>      
            <VerticalStretch>
            <NotebookWidgetBar/>
            <Row>     
            <Row>
            <MainWorkSpace>
                {this.props.children}
            </MainWorkSpace>
            </Row>
            {nodeDrawer}
            </Row>
            </VerticalStretch>
        </Row>
        </FillFlex>
    )
  }
}



/*
import styled from 'styled-components'

export const MainWorkSpace = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${props => lighten(0.1, props.theme.main)};
`;
*/