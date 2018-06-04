import * as React from 'react';

export class DevRoot extends React.Component<any, any> {
  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
    return <DevTools position={{right: 0, bottom: 0}}/>;
    }
  }

  render() {
    return (
      <div className="fill-parent">
        {this.props.children}
        {this.renderDevTool()}
      </div>
    );
  }
}
