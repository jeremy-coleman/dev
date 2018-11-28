import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import tasks from '../../actions/task-definitions';
import { getCellById } from '../../tools/notebook-utils';
import NotebookMenuDivider from '../menu/notebook-menu-divider';
import NotebookMenuItem from '../menu/notebook-menu-item';

type CellMenuProps = {
    menuLabel: string,
    cellId: number,
    skipInRunAll: boolean,
  }


export class CellMenuUnconnected extends React.Component<CellMenuProps, any> {
  // static propTypes = {
  //   menuLabel: PropTypes.string.isRequired,
  //   cellId: PropTypes.number.isRequired,
  //   skipInRunAll: PropTypes.bool.isRequired,
  // }

  render() {
    return (
      <div className="cell-menu-items-container">
        <NotebookMenuItem
          key={tasks.changeToJavascriptCell.title}
          task={tasks.changeToJavascriptCell}
          disabled={this.props.menuLabel === 'js'}
        />
        <NotebookMenuItem
          key={tasks.changeToMarkdownCell.title}
          task={tasks.changeToMarkdownCell}
          disabled={this.props.menuLabel === 'md'}
        />
        <NotebookMenuItem
          key={tasks.changeToCSSCell.title}
          task={tasks.changeToCSSCell}
          disabled={this.props.menuLabel === 'css'}
        />
        <NotebookMenuItem
          key={tasks.changeToExternalResourceCell.title}
          task={tasks.changeToExternalResourceCell}
          disabled={this.props.menuLabel === 'resource'}
        />
        <NotebookMenuItem
          key={tasks.changeToRawCell.title}
          task={tasks.changeToRawCell}
          disabled={this.props.menuLabel === 'raw'}
        />
        <NotebookMenuItem
          key={tasks.changeToPluginCell.title}
          task={tasks.changeToPluginCell}
          disabled={this.props.menuLabel === 'plugin'}
        />

        <NotebookMenuDivider />
        <NotebookMenuItem
          key={tasks.toggleSkipCellInRunAll.title}
          task={tasks.toggleSkipCellInRunAll}
        />
      </div>
    )
  }
}


export function mapStateToProps(state, ownProps) {
  const { cellId } = ownProps
  const { skipInRunAll } = getCellById(state.cells, cellId)
  return { skipInRunAll }
}

export default connect(mapStateToProps)(CellMenuUnconnected)
