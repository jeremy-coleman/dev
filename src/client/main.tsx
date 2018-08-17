import * as React from 'react'
import * as ReactDOM from 'react-dom'

import "../../node_modules/bootstrap/scss/bootstrap.scss"



let MyApp: React.SFC<any> = (props) => 
   <div>hi</div>

let render = () => ReactDOM.render(<MyApp/>, document.getElementById('coglite-app-root'))

render()