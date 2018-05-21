import * as React from 'react'
import {Router} from 'react-router-dom'
import {observer, inject} from 'mobx-react'
import { lighten } from 'polished';
import {observable, action} from 'mobx'
import styled from 'styled-jss';


import { FillFlex, VerticalStretch, FillParent, Row } from '../design';

import {Footer} from './Footer'
import {WidgetToolbar} from './WidgetToolbar'
import {  IconNavBar } from './IconNavigation';

import { NavigationStore } from '../stores/NavigationStore';
import { MiddlePanel } from './Workspace';

const MainWorkSpace = styled('div')({
  display: "flex",
  height: "100%",
  width: "100%",
})


interface INavProps {
  navigation: NavigationStore;
}

@inject('navigation')
@observer
export class AppLayout extends React.Component {
@observable hasError = false
@action displayError = () => this.hasError = true



 public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
     this.displayError()
 }

 render() {
    const {navigation} = this.props as INavProps;
    const {children} = this.props
    return (
    <Router history={navigation.history}>
      <FillFlex>
          
        <Row>      
            <VerticalStretch>
            <WidgetToolbar/>
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
      </Router>
  )
 }
}

const ErrorDisplay = props => 
    <div style={{ textAlign: 'center', paddingTop: 25, paddingBottom: 25 }}>
    <h1>An unknown error occurred</h1>
    </div>


