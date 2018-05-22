import * as React from 'react'
import {Footer} from './Footer'
import {Header} from './Header'
import {LeftNav} from './LeftNav'
import { Paper } from 'material-ui';
import {withRouter} from 'react-router-dom'
import {observer} from 'mobx-react'
import { lighten } from 'polished';
import {observable, action} from 'mobx'
import styled from 'styled-components';
import {WorkDrawer} from './WorkDrawer'
import { IconNavBar } from './BpNavIcon';

export const FillFlex =  styled.div`
  display: flex;
  flex: auto;
  width: 100%;
  height: 100%;
`;

const HorizontalFlex = styled.div`
  display: flex;
  flex: auto;
  flex-direction: row;
  justify-content: stretch;
`;

const VerticalFlex = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: stretch;
`;

const MainWorkSpace = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${props => lighten(0.1, props.theme.main)};
`;



@observer
class _AppLayout extends React.Component<any, any> {
@observable hasError = false
@action displayError = () => this.hasError = true

width = '300px'

 public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
     this.displayError()
 }

 render() {
    const {children} = this.props
    return (
      <FillFlex>
        <HorizontalFlex>    
            <LeftNav/>
            <VerticalFlex>
            <Header/>
            <MainWorkSpace>
              <HorizontalFlex> 
              <IconNavBar/>
                <FillFlex>
                {this.hasError ? (<ErrorDisplay/>) : (children)}
                 </FillFlex>
              <WorkDrawer width={this.width}/>
              </HorizontalFlex>
              </MainWorkSpace>     
            <Footer/>
            </VerticalFlex>
        </HorizontalFlex>
        </FillFlex>
  )
 }
}

const ErrorDisplay = props => 
    <div style={{ textAlign: 'center', paddingTop: 25, paddingBottom: 25 }}>
    <h1>An unknown error occurred</h1>
    </div>



export let AppLayout = withRouter(_AppLayout)