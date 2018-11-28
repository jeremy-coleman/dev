import Subheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import React from 'react';

export default class NotebookMenuHeader extends React.Component<any, any> {
  static propTypes = { title: PropTypes.string, onClick: PropTypes.func }
  render() {
    return (
      <Subheader disableSticky={Boolean(true)} key={this.props.title}>
        {this.props.title}
      </Subheader>
    )
  }
}
