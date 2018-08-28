import * as React from 'react'
import { render } from 'react-dom'
import {MyAppLoader} from './App'

// const root = document.createElement('div')
// document.body.appendChild(root)

// render(<MyAppLoader />, root)

const root = document.getElementById('coglite-app-root')
document.body.appendChild(root)

render(<MyAppLoader />, root)