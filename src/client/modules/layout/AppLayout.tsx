import * as React from 'react'
import {observer, inject} from 'mobx-react'
import {observable, action} from 'mobx'
import { FillFlex, VerticalStretch, Row } from '../../design';

import {StatusFooter} from './Footer'

import { IconNavBar } from './IconNavigation';

//import { NavStore } from '../stores/NavStore';
import { MiddlePanel } from './Workspace';
import { CommandBarPrimary, NativeMimicToolbar } from './command-bar';




@inject('nav')
@observer
export class AppLayout extends React.Component {
@observable hasError = false
@action displayError = () => this.hasError = true

 public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
     this.displayError()
 }

 render() {
    const {children} = this.props
    return (
      <FillFlex>        
        <Row>
            <VerticalStretch>
            <NativeMimicToolbar/>
            <CommandBarPrimary/>
            <Row>  
            <IconNavBar/>
            <Row>
            <MiddlePanel>
                {this.hasError ? (<ErrorDisplay/>) : (children)}
            </MiddlePanel>
            </Row>
            </Row>      
            <StatusFooter/>
            </VerticalStretch>
            <div style={{width: '1px'}}>same as above. set width to 100px or something to see</div> 
        </Row>      
        </FillFlex>
  )
 }
}

const ErrorDisplay = observer((props) => 
    <div style={{ textAlign: 'center', paddingTop: 25, paddingBottom: 25 }}>
    <h1>An unknown error occurred</h1>
    </div>
)