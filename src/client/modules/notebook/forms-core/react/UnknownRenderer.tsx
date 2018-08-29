
import * as React from 'react';

export interface UnknownRendererProps {
  type: 'renderer' | 'field';
}

/**
 * A renderer that will be used in case no other renderer is applicable.
 */
export class UnknownRenderer extends React.Component<UnknownRendererProps, any> {
  render() {
    return (
      <div style={{color: 'red'}}>
        No applicable {this.props.type} found.
      </div>
    );
  }
}
