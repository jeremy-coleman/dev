import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getCellById } from '../../tools/notebook-utils';
import ExternalResourceOutputHandler from '../reps/output-handler-external-resource';
import { CellContainer } from './cell-container';
import CellEditor from './cell-editor';
import CellRow from './cell-row';


type ExternalResourceCellProps = {
  cellId: number,
  value: any[]
}

export class ExternalResourceCellUnconnected extends React.Component<ExternalResourceCellProps, any>  {
  // static propTypes = {
  //   cellId: PropTypes.number.isRequired,
  //   value: PropTypes.array,
  // }

  render() {
    return (
      <CellContainer cellId={this.props.cellId}>
        <CellRow cellId={this.props.cellId} rowType="input">
          <CellEditor cellId={this.props.cellId} />
        </CellRow>
        <CellRow cellId={this.props.cellId} rowType="output">
          <ExternalResourceOutputHandler value={this.props.value} />
        </CellRow>
      </CellContainer>
    )
  }
}


export function mapStateToProps(state, ownProps) {
  const cell = getCellById(state.cells, ownProps.cellId)
  return {
    value: cell.value,
    cellId: cell.id,
  }
}

export default connect(mapStateToProps)(ExternalResourceCellUnconnected)
