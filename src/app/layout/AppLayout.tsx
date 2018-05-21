import { observer } from 'mobx-react';
import { lighten } from 'polished';
import * as React from 'react';
import styled from 'styled-components';
import {MiddlePanel} from './MiddlePanel';
import {Sidebar} from './Sidebar';

const SplitPane = require('react-split-pane');

import {Header} from './Header'
import {IconNavBar} from './iconbar'

import {PageRoutes} from '../PageRoutes'

const Footer = styled.div`
  background-color: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
  height: 30px;
`;


export const FullScreen =  styled.div`
  display: flex;
  flex: auto;
  width: 100%;
  height: 100%;
`;

export let FillParent = styled.div`
position: absolute;
top:0;
bottom:0;
left:0;
right:0;
height: 100vh;
`

const RowCenterContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  justify-content: stretch;
`;

const VertFlexContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  flex-direction: column;
  justify-content: stretch;
`;

const GlobalContentSlot = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: none;
  background-color: ${props => lighten(0.1, props.theme.main)} !important;
`;




@observer
export class AppLayout extends React.Component<any, {}> {
  public render() {
    return (
    <FillParent>
     <VertFlexContainer>
      <Header/>
      <RowCenterContainer>
      <IconNavBar/>
        <GlobalContentSlot>
          <SplitPane  split="vertical" minSize={0} size={200} maxSize={-200}>
            <Sidebar></Sidebar>
            <PageRoutes/>
          </SplitPane>
        </GlobalContentSlot>
      </RowCenterContainer>
      <Footer>hi</Footer>
      </VertFlexContainer>
      </FillParent>
    );
  }
}
