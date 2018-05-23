import * as React from "react"
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import Input from "@material-ui/icons/Input"
import { observer } from "mobx-react"
import { Icon, Button } from "@blueprintjs/core";


@observer
export class InputNode extends React.Component<any, any> {
  render() {
    const inputNode = (
      <div
        draggable={true}
        onDragStart={event => {event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteIn" }))}}
      >
        <Button icon='add' text='input'/>
      </div>
    )

    return inputNode
  }
}
