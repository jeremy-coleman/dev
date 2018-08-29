import * as React from "react"
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import Functions from "@material-ui/icons/Functions"
import { observer, inject } from "mobx-react"
import {withTheme} from 'theming'

@inject('store')
@observer
class _FunctionNode extends React.Component<any, any> {
  render() {
    const { classes } = this.props
    return (
      <ListItem
        classes={classes}
        component="div"
        draggable={true}
        onDragStart={event => {
          event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteFunctionMath" }))
        }}
      >
        <ListItemIcon>
          <Functions />
        </ListItemIcon>
        <ListItemText primary="Function" />
      </ListItem>
    )
  }
}

export const FunctionNode = withTheme(_FunctionNode)