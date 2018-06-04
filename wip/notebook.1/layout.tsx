import * as React from "react"
import { UiStore } from "../../stores/UiStore"
import * as classNames from "classnames"
import { observer, inject } from "mobx-react"
import { observable, action } from "mobx"
import { NodeDrawer } from "./Drawers/NodeDrawer"
import { NotebookToolbar } from "./toolbar"
import { InputNode } from "./Nodes/Input"
import { OutputNode } from "./Nodes/Output"
import { FillFlex, Row, VerticalStretch } from "../../design";

import styled from 'styled-components'


import { ButtonGroup, Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { lighten } from 'polished';

export const MainWorkSpace = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${props => lighten(0.1, props.theme.main)};
`;


export const WidgetToolbar  = () => (
            <ButtonGroup large={true} fill={true}>
                <Button icon={IconNames.CODE} />
                <Button icon={IconNames.GRAPH} />
                <Button icon={IconNames.SCATTER_PLOT} />
                <Button icon={IconNames.GRAPH}/>
            </ButtonGroup >
          
)




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
            <NotebookToolbar/>
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
