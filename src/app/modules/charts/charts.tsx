import * as React from 'react'
import {observer} from 'mobx-react'

export let ChartsPage = observer(() => <TogglableSidebarLayout/>)

import SplitterLayout from 'react-splitter-layout';
import { FillParent, FillFlex } from '../../design';
import { WorkDrawer } from './drawer';
import { style } from 'typestyle/lib';
import { flex, vertical } from 'csstips';
import { observable, action } from 'mobx';






@observer
export class TogglableSidebarLayout extends React.Component {
  @observable sidebarVisible: boolean = true
  @action.bound toggleSidebar () { return this.sidebarVisible = !this.sidebarVisible}



  //toggleSidebar() {this.setState({ sidebarVisible: !this.sidebarVisible })}

  render() {
    return (
      <SplitterLayout percentage secondaryInitialSize={25} style={{height: '100%', position: 'relative', display: 'flex', flexDirection: 'row'}}>
        <FillParent>
          <h2>1st Pane</h2>
          <button onClick={this.toggleSidebar}>
            {this.sidebarVisible && 'Hide Sidebar'}
            {!this.sidebarVisible && 'Show Sidebar'}
          </button>
        </FillParent>
        {this.sidebarVisible &&
          <FillParent>
            <div className={style(flex, vertical)}>
            <h2>2nd Pane</h2>
            <WorkDrawer/>
            </div>
          </FillParent>
        }
      </SplitterLayout>
    );
  }
}


//added fill parent remember to take it uot



/*

interface SBState {
    sidebarVisible: boolean
}

@observer
export class TogglableSidebarLayout extends React.Component<any, SBState> {
  constructor(props, context?) {
    super(props, context);
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
            <div className={style(flex, vertical)}>
            <h2>2nd Pane</h2>
            <WorkDrawer/>
            </div>
          </FillParent>
        }
      </SplitterLayout>
    );
  }
}

*/