import * as React from 'react';
import styled from 'react-emotion';
import { observer } from 'mobx-react';


//@ts-ignore
const Container = styled('div')({
position: "relative",
display: 'flex',
flexGrow: 1,
flexShrink: 1,
flexBasis: "0%",
flexDirection: "column",
width: "100%",
margin: 1,
overflow: 'hidden'
})


export let MiddlePanel: React.SFC<any> = observer((props) =>
    <Container>
     {props.children}
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