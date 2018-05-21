import * as React from "react"
import { UiStore } from "../../stores/UiStore"
import Grid from "@material-ui/core/Grid"
import * as classNames from "classnames"
import { layoutStyles } from "./layout.styles"
import { observer, inject } from "mobx-react"
import injectStylesheet from "react-jss"
import { observable, action } from "mobx"
import { NodeDrawer } from "./Drawers/NodeDrawer"
import { NotebookAppBar } from "./NotebookAppBar"
import { InputNode } from "./Nodes/Input"
import { OutputNode } from "./Nodes/Output"

interface NotebookProps {
  uiStore: UiStore,
  classes?: any
}


@inject("uiStore")
@observer
export class AppFrame extends React.Component<NotebookProps, any> {
  @observable currentClickTarget

  @action
  setTarget = event => {
    this.currentClickTarget = event.target
  }

  handleThemeDialogClose = (selectedOption: string, action: string): void => {
    const uiStore = this.props.uiStore
    if (action === "ok") {
      uiStore.updateTheme(selectedOption)
    }
    uiStore.themeDialogToggle.openDrawer(false)
  }

  renderDevTool() {
    if (process.env.NODE_ENV !== "production") {
      const DevTools = require("mobx-react-devtools").default
      return <DevTools />
    }
    return null
  }

  render() {
    const { classes } = this.props
    const { nodeDrawerToggle, nodeFormDrawerToggle, themeDialogToggle } = this.props.uiStore as UiStore

    const nodeDrawer = (
      <NodeDrawer>
        <InputNode />
        <OutputNode />
      </NodeDrawer>
    )

    return (
      <Grid container className={classes.root}>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <NotebookAppBar />
            <main
              className={classNames(classes.content, {
                [classes.contentRightShift]: nodeDrawerToggle.open || nodeFormDrawerToggle.open,
              })}
            >
              {this.props.children}
            </main>
            {nodeDrawer}
          </div>
        </div>
      </Grid>
    )
  }
}

export default injectStylesheet(layoutStyles, { withTheme: true })(AppFrame)
