import * as React from "react"
import {NotebookLayout} from "./layout"
import { observer } from "mobx-react"
import Canvas from "./Diagram/Canvas";

export const NotebookView = observer((props: any) => {
  return (
    <React.Fragment>
      <NotebookLayout>
        <Canvas num="2" someProp={100} />
      </NotebookLayout>
    </React.Fragment>
  )
})
