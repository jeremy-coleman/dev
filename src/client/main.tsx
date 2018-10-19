import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {MyAppBase} from './myapp'

//@ts-ignore
console.log(process.env.APP_CONFIG)

import './styles/scrollbar.css'
import './assets/minesweeper.css'
import "../../node_modules/bootstrap/scss/bootstrap.scss"

// const root = document.createElement('div')
// document.body.appendChild(root)
// render(<MyAppLoader />, root)
//document.body.appendChild(root)


//const root = document.getElementById('coglite-app-root')
ReactDOM.render(<MyAppBase />, document.getElementById("coglite-app-root"))