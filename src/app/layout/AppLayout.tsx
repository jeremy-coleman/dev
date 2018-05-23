import * as React from 'react'
import {Router} from 'react-router-dom'
import {observer, inject} from 'mobx-react'
import { lighten } from 'polished';
import {observable, action} from 'mobx'
import styled from 'styled-components';

import { FillFlex, HorizontalStretch, VerticalStretch, Row } from '../design';
//import {WorkspaceDrawer} from '../components/WorkspaceDrawer'
import {Footer} from './Footer'
import {Header} from './toolbar'
import { IconNavBar } from './IconNavigation';


export const MainWorkSpace = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${props => lighten(0.1, props.theme.main)};
`;


@observer
export class AppLayout extends React.Component<any, any> {
@observable hasError = false
@action displayError = () => this.hasError = true

 public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
     this.displayError()
 }

 render() {
    const {children} = this.props
    return (
      <FillFlex>
        <HorizontalStretch>
            <IconNavBar/>
            <VerticalStretch>
            <Header/>
                <MainWorkSpace>
                  <HorizontalStretch>
                  <FillFlex>
                    {this.hasError ? (<ErrorDisplay/>) : (children)}
                  </FillFlex>
                  </HorizontalStretch>
              </MainWorkSpace>     
            <Footer/>
        </VerticalStretch>
        </HorizontalStretch>
        </FillFlex>
  )
 }
};

export let ErrorDisplay = props => 
    <div style={{ textAlign: 'center', paddingTop: 25, paddingBottom: 25 }}>
    <h1>An unknown error occurred</h1>
    </div>


/*
  return (
          <FillFlex>        
        <Row>      
            <VerticalStretch>
            <WidgetToolbar/>
            <Row>  
            <IconNavBar/>
            <Row>
            <MainWorkSpace>
                {this.hasError ? (<ErrorDisplay/>) : (children)}
            </MainWorkSpace>
            </Row>
            </Row>      
            <Footer/>
            </VerticalStretch>
        </Row>
        
        </FillFlex>
  )
  */