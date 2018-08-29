import * as React from 'react';


import './styles.css';

//import {cssRaw} from 'typestyle'
//cssRaw(require('./styles.css'))

export default class Drawer extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const {handleRightClose,isDrawerOpen} = this.props;

    return (
      <div
        className={['drawer-container', isDrawerOpen ? 'nav-drawer_open' : '',
          'react-virtualized-pivot-module-menu'].join(' ')}
      >
        <div
          className="drawer-overlay"
          onClick={handleRightClose}
        >
        </div>
        <section className="drawer">
          {this.props.children}
        </section>
      </div>
    );
  }
}
