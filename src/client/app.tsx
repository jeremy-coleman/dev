import * as React from 'react'
import * as ReactDOM from 'react-dom'
//import {hot} from 'react-hot-loader'
import {AppContainer} from 'react-hot-loader'

import "../../node_modules/bootstrap/scss/bootstrap.scss"


let MyAppBase: React.SFC<any> = (props) => 
   <div>hi</div>

//let MyApp = hot(module)(MyAppBase)

export class MyAppLoader extends React.Component{
  render(){
    return(
      <AppContainer>
        <MyAppBase/>
      </AppContainer>
      
    )
  }
}

//let render = () => ReactDOM.render(<MyAppLoader/>, document.getElementById('coglite-app-root'))

//render()