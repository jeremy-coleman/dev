import * as React from "react"
import { UiStore } from "../../stores/UiStore"
import Grid from "@material-ui/core/Grid"
import * as classNames from "classnames"
import { observer, inject } from "mobx-react"
import injectStylesheet from "react-jss"
import { observable, action } from "mobx"
import { NodeDrawer } from "./Drawers/NodeDrawer"
import { NotebookToolbar } from "./toolbar"
import { InputNode } from "./Nodes/Input"
import { OutputNode } from "./Nodes/Output"
import { FillFlex, Row, VerticalStretch } from "../../design";

import { MainWorkSpace } from "../../layout/AppLayout";
import { ButtonGroup, Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";




export const WidgetToolbar  = () => (
            <ButtonGroup large={true} fill={true}>
                <Button icon={IconNames.CODE} />
                <Button icon={IconNames.GRAPH} />
                <Button icon={IconNames.SCATTER_PLOT} />
                <Button icon={IconNames.GRAPH}/>
            </ButtonGroup >
          
)

interface NotebookProps {
  uiStore?: UiStore,
  classes?: any
}


@inject("store")
@observer
export class NotebookLayout extends React.Component<NotebookProps, any> {
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


        /*
              <Grid container>
        <div style={{width: "100%",overflow: "hidden"}}>
          <div style={{position: "relative",display: "flex",width: "100%",height: "100%"}}>
            <NotebookToolbar />
            <main style={{width: "100%", flexGrow: 1}}>
              {this.props.children}
              {nodeDrawer}
            </main>
            
          </div>
        </div>
      </Grid>
      */