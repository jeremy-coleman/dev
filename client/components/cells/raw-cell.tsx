import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { CellContainer } from './cell-container';
import CellEditor from './cell-editor';
import CellRow from './cell-row';

type RawCellProps = {
  cellId: number
}

export class RawCellUnconnected extends React.Component<RawCellProps, any> {
  // static propTypes = {
  //   cellId: PropTypes.number.isRequired,
  // }
  render() {
    return (
      <CellContainer cellId={this.props.cellId}>
        <CellRow cellId={this.props.cellId} rowType="input">
          <CellEditor
            cellId={this.props.cellId}
            editorOptions={{
              matchBrackets: false,
              autoCloseBrackets: false,
            }}
          />
        </CellRow>
      </CellContainer>
    )
  }
}

export default connect()(RawCellUnconnected)
