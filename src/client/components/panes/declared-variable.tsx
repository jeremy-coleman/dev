import PropTypes from 'prop-types';
import React from 'react';
import { ValueRenderer } from '../reps/value-renderer';


type DeclareVariableProps = {
  value?: any,
  varName?: string
}

export class DeclaredVariable extends React.Component<DeclareVariableProps, any>{
  // static propTypes = {
  //   value: PropTypes.any,
  //   varName: PropTypes.string,
  // }
  render() {
    const r = true
    return (
      <div className="declared-variable">
        <div className="declared-variable-name">{this.props.varName} = </div>
        <div className="declared-variable-value">
          <ValueRenderer render={r} valueToRender={this.props.value} />
        </div>
      </div>)
  }
}

