import * as React from 'react'
import {observer} from 'mobx-react'

export let ChartsPage = () => <TogglableSidebarLayout/>

import SplitterLayout from 'react-splitter-layout';
import { FillParent, FillFlex } from '../../design';
import { WorkDrawer } from './drawer/drawer';


interface SBState {
    sidebarVisible: boolean
}

@observer
export class TogglableSidebarLayout extends React.Component<any, SBState> {
  
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.state = {
      sidebarVisible: true
    };
  }

  toggleSidebar() {this.setState({ sidebarVisible: !this.state.sidebarVisible })}

  render() {
    return (
      <SplitterLayout percentage secondaryInitialSize={25} style={{height: '100%', position: 'relative', display: 'flex', flexDirection: 'row'}}>
        <FillParent>
          <h2>1st Pane</h2>
          <button onClick={this.toggleSidebar}>
            {this.state.sidebarVisible && 'Hide Sidebar'}
            {!this.state.sidebarVisible && 'Show Sidebar'}
          </button>
        </FillParent>
        {this.state.sidebarVisible &&
          <FillParent>
            <h2>2nd Pane</h2>
            <WorkDrawer/>
          </FillParent>
        }
      </SplitterLayout>
    );
  }
}

