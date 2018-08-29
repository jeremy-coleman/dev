import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getCellById } from '../../tools/notebook-utils';
import { CellContainer } from './cell-container';
import CellEditor from './cell-editor';
import CellRow from './cell-row';



export class CSSCellUnconnected extends React.Component {
  static propTypes = {
    cellId: PropTypes.number.isRequired,
    value: PropTypes.any,
    rendered: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <CellContainer cellId={this.props.cellId}>
        <CellRow cellId={this.props.cellId} rowType="input">
          <CellEditor cellId={this.props.cellId} />
          <style>
            {this.props.rendered && this.props.value}
          </style>
        </CellRow>
      </CellContainer>
    )
  }
}


export function mapStateToProps(state, ownProps) {
  const cell = getCellById(state.cells, ownProps.cellId)
  return {
    cellId: cell.id,
    value: cell.value,
    rendered: cell.rendered,
  }
}

export default connect(mapStateToProps)(CSSCellUnconnected)
