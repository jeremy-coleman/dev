import { Card , MenuDivider as Divider, Button as IconButton, Icon } from "@blueprintjs/core"
import * as React from "react"
import { BaseWidget, BaseWidgetProps, PortWidget } from "storm-react-diagrams"
import { CogliteNodeModel } from "./CogliteNodeModel"


export const widgetStyles: any = {
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
    paddingLeft: '10px',
    backgroundColor: 'inherit',
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
  leftTop: {
    position: "absolute",
    zIndex: 10,
    left: -5,
    top: `calc(100% / 4 - 1px)`,
  },
  leftBottom: {
    position: "absolute",
    zIndex: 10,
    left: -5,
    bottom: `calc(100% / 4 - 1px)`,
  },
  rightTop: {
    position: "absolute",
    zIndex: 10,
    left: `calc(100% - 5px)`,
    top: `calc(100% / 4 - 1px)`,
  },
  rightBottom: {
    position: "absolute",
    zIndex: 10,
    left: `calc(100% - 5px)`,
    bottom: `calc(100% / 4 - 1px)`,
  },
}

export interface CogliteNodeWidgetProps extends BaseWidgetProps {
  node?: CogliteNodeModel
}

export interface CogliteNodeWidgetState {}

//Patch for props resolution
export class CogliteNodeWidget extends BaseWidget<any, CogliteNodeWidgetState> {
  public static defaultProps: CogliteNodeWidgetProps = {
    node: null
  }

  constructor(props: CogliteNodeWidgetProps) {
    super("srd-coglite-node", props)
    this.state = {}
  }

  render() {
    const { theme, node } = this.props
    //To be used in props with styles
    node.color = node.color || theme.palette.common.white

    return (
      <div style={widgetStyles.cardBasic}>
        <Card style={widgetStyles.details}>
          <div>
            <div style={widgetStyles.controls}>
              <IconButton aria-label="Previous" style={widgetStyles.playIcon}>
                {node.cogType === "cogliteIn" ? <Icon icon='add'/> : <Icon icon='label' />}
              </IconButton>
              <span style={widgetStyles.headerText}>
                {node.cogType === "cogliteIn" ? `Input Node` : `Output Node`}
              </span>
            </div>
          </div>
          <Divider />
          <div style={widgetStyles.content}>
              <p style={widgetStyles.name}>
                {node.name}
              </p>
          </div>
        </Card>
        <div style={widgetStyles.leftTop}>
          <PortWidget name="leftTop" node={node} />
        </div>
        <div style={widgetStyles.leftBottom}>
          <PortWidget name="leftBottom" node={node} />
        </div>
        <div style={widgetStyles.rightTop}>
          <PortWidget name="rightTop" node={node} />
        </div>
        <div style={widgetStyles.rightBottom}>
          <PortWidget name="rightBottom" node={node} />
        </div>
      </div>
    )
  }
}

export default CogliteNodeWidget
