import * as React from "react"
import './assets/scss/main.scss'

import {NotebookLayout} from "./layout"
import { CogliteNotebookRoutes } from "./routes"
import { observer } from "mobx-react"

export const NotebookView = observer(props => {
  return (
    <React.Fragment>
      <NotebookLayout>
        <CogliteNotebookRoutes />
      </NotebookLayout>
    </React.Fragment>
  )
})
