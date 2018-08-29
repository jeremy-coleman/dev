import * as React from "react"
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import Pageview from "@material-ui/icons/Pageview"
import { observer } from "mobx-react"

@observer
export class DebugNode extends React.Component<any, any> {
  render() {
    const { classes } = this.props

    const debugNode = (
      <ListItem
        classes={classes}
        component="div"
        draggable={true}
        onDragStart={event => {
          event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteDebug" }))
        }}
      >
        <ListItemIcon>
          <Pageview />
        </ListItemIcon>
        <ListItemText primary="Debug" />
      </ListItem>
    )

    return debugNode
  }
}