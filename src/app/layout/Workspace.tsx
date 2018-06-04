import { Card } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { FillFlex, FillParent, Row } from '../design';
import { observable, action } from 'mobx';


import SplitterLayout from 'react-splitter-layout';
import { style } from 'typestyle/lib';
import { flex, vertical } from 'csstips';
import { IconNavBar } from './IconNavigation';

const Container = styled(Card)`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  margin: 5px;`


export let MiddlePanel: React.SFC<any> = observer((props) =>
    <Container>
     <FillFlex>{props.children}</FillFlex>
    </Container>
)



//this works
/*
@observer
export class MiddlePanel11 extends React.Component {
    @observable showSubmenu: boolean = false
    @action.bound toggleSidebar1 () {return this.showSubmenu = !this.showSubmenu}

  render(){
    const menuStyles = {width: this.showSubmenu ? 260 : 0};
    return(

    <Container>
      <div style={menuStyles}>test</div>
     <FillFlex>{this.props.children}</FillFlex>
    </Container>
)
}
}
*/


/*
          <button onClick={this.toggleSidebar}>
            {this.sidebarVisible && 'Hide Sidebar'}
            {!this.sidebarVisible && 'Show Sidebar'}
          </button>
          */



/*
  render() {
    const { showSubmenu } = this.state;
    const menuStyles = {width: showSubmenu ? 260 : 0};
    const contextStyle = {marginLeft: showSubmenu ? 324 : 80};

    return (
      <div>
        <TopLevelNav showSubmenu={showSubmenu} onToggleMenu={this.handleToggleMenu} />
        <DocSidebar style={menuStyles} />
        */