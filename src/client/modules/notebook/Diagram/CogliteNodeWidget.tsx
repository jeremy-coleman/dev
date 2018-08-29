import Input from "@material-ui/icons/Input"
import Functions from "@material-ui/icons/Functions"
import Pageview from "@material-ui/icons/Pageview"
import  { Card, CardContent } from "@material-ui/core"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"

//import { withStyles } from "@material-ui/core/styles"

import * as React from "react"
import { BaseWidget, BaseWidgetProps, PortWidget } from "storm-react-diagrams"
import { CogliteNodeModel } from "./CogliteNodeModel"

import injectSheet from 'react-jss'

export const style = theme => ({
  cardBasic: {
    display: "flex",
    position: "relative",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    minWidth: 180,
  },
  content: {
    flex: "1 0 auto",
    backgroundColor: "white",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: theme.spacing.unit,
    backgroundColor: theme.palette.background.default,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  headerText: {
    paddingRight: 10,
  },
  name: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  leftCenter: {
    position: "absolute",
    zIndex: 10,
    left: -5,
    top: `calc(100% / 2)`,
  },
  rightCenter: {
    position: "absolute",
    zIndex: 10,
    left: `calc(100% - 5px)`,
    top: `calc(100% / 2)`,
  }
})

export interface CogliteNodeWidgetProps extends BaseWidgetProps {
  node: CogliteNodeModel
  classes?: any
}

export interface CogliteNodeWidgetState {}

//Patch for props resolution
export class CogliteNodeWidgetBase extends BaseWidget<any, CogliteNodeWidgetState> {

  constructor(props: CogliteNodeWidgetProps) {
    super("srd-coglite-node", props)
    this.state = {}
  }

  getNodeHeaders(cogType) {
    let nodeHeaderIcon = null
    let nodeHeaderText = null
    if (cogType === "cogliteInput") {
      nodeHeaderIcon = <Input />
      nodeHeaderText = 'Input Node'
    } else if (cogType === "cogliteFunctionMath") {
      nodeHeaderIcon = <Functions />
      nodeHeaderText = 'Function Node'
    } else {
      nodeHeaderIcon = <Pageview />
      nodeHeaderText = 'Debug Node'
    }
    return {
      'nodeHeaderIcon' : nodeHeaderIcon,
      'nodeHeaderText' : nodeHeaderText
    }
  }

  render() {
    const { classes, theme, node } = this.props
    //To be used in props with styles
    node.color = node.color || theme.palette.common.white
    const nodeHeaders = this.getNodeHeaders(node.cogType)

    const rightPorts = (
      <div>
        <div className={classes.rightCenter}>
          <PortWidget name="rightCenter" node={node} />
        </div>
      </div>
    )

    const leftPorts = (
      <div>
        <div className={classes.leftCenter}>
          <PortWidget name="leftCenter" node={node} />
        </div>
      </div>
    )

    
    return (
      <div className={classes.cardBasic}>
        <Card className={classes.details}>
          <div>
            <div className={classes.controls}>
              <IconButton aria-label="Previous" className={classes.playIcon}>
                {nodeHeaders.nodeHeaderIcon}
              </IconButton>
              <Typography variant="subheading" className={classes.headerText}>
                {nodeHeaders.nodeHeaderText}
              </Typography>
            </div>
          </div>
          <Divider />
          <div>
            <CardContent className={classes.content}>
              <Typography component="p" className={classes.name}>
                {node.name}
              </Typography>
            </CardContent>
          </div>
        </Card>
        {node.cogType === "cogliteInput" || node.cogType === "cogliteFunctionMath" ? rightPorts : null}
        {node.cogType === "cogliteDebug" || node.cogType === "cogliteFunctionMath" ? leftPorts : null}
      </div>
    )
  }
}

export let CogliteNodeWidget = injectSheet(style)(CogliteNodeWidgetBase)