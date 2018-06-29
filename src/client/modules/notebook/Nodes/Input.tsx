import * as React from "react"

import { observer } from "mobx-react"
import { Button } from "@blueprintjs/core";


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
