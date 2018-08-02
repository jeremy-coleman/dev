import * as React from 'react'
import * as ReactDOM from 'react-dom'

let MyApp: React.SFC<any> = (props) => {
   return( <div>hi</div>)
   }

let render = () => ReactDOM.render(<MyApp/>, document.getElementById('coglite-app-root'))

render()