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
//import { WidgetToolbar } from "../charts/drawer/toolbar";



import { Card } from '@material-ui/core';
import styled from 'styled-jss';

const Container = styled(Card)({
  position: 'relative',
  display: "flex",
  flex: '1 1 auto',
  width: "100%",
  margin: '5px'
});


let MiddlePanel: React.SFC<any> = observer(props =>
    <Container>
     <FillFlex>{props.children}</FillFlex>
    </Container>
)



interface NotebookProps {
  uiStore?: UiStore,
  classes?: any
}


@inject("uiStore")
@observer
export class NotebookLayout extends React.Component<NotebookProps, any> {
  @observable currentClickTarget

  @action setTarget = event => {this.currentClickTarget = event.target}

  handleThemeDialogClose = (selectedOption: string, action: string): void => {
    const uiStore = this.props.uiStore
    if (action === "ok") {uiStore.updateTheme(selectedOption)}
    uiStore.themeDialogToggle.openDrawer(false)
  }

  render() {
    //const { classes } = this.props
    const { nodeDrawerToggle, nodeFormDrawerToggle, themeDialogToggle } = this.props.uiStore as UiStore

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
            <MiddlePanel>
                {this.props.children}
            </MiddlePanel>
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