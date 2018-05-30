import * as React from 'react'
import {observer, inject} from 'mobx-react'
import { lighten } from 'polished';
import {observable, action} from 'mobx'
import styled from 'styled-jss';


import { FillFlex, VerticalStretch, FillParent, Row } from '../design';

import {Footer} from './Footer'
import {WidgetNavBar} from './WidgetNavBar'
import {  IconNavBar } from './IconNavigation';

import { NavStore } from '../stores/NavStore';
import { MiddlePanel } from './Workspace';


interface INavProps {
  nav?: NavStore;
}

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
            <WidgetNavBar/>
            <Row>  
            <IconNavBar/>
            <Row>
            <MiddlePanel>
                {this.hasError ? (<ErrorDisplay/>) : (children)}
            </MiddlePanel>
            </Row>
            </Row>      
            <Footer/>
            </VerticalStretch>
        </Row>      
        </FillFlex>
  )
 }
}

const ErrorDisplay = observer(props => 
    <div style={{ textAlign: 'center', paddingTop: 25, paddingBottom: 25 }}>
    <h1>An unknown error occurred</h1>
    </div>
)