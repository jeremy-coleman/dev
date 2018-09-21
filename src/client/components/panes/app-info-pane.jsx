import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import DeclaredVariables from '../declared-variables'
import tasks from '../../actions/task-definitions';
import SidePane from './side-pane';



export class AppInfoPaneUnconnected extends React.Component {
  static propTypes = {
    appMessages: PropTypes.array,
  }
  render() {
    /* eslint-disable */
    const appMessages = this.props.appMessages.slice().reverse()
    appMessages.sort((a,b)=> {
      if( Date.parse(a.when) > Date.parse(b.when)) return -1
      return 1
    })
    const messageDivs = appMessages
      .map((msg, i) => (
        <div className="app-info-message" key={`msg-${msg.id}`}>
          <div className='app-message-details' dangerouslySetInnerHTML={{ __html: msg.details }} />
          <div className='app-message-when'>{msg.when}</div>
        </div>
      ))
    /* eslint-enable */
    return (
      <SidePane task={tasks.toggleAppInfoPane} title="App info" openOnMode="_APP_INFO">
        {messageDivs}
      </SidePane>
    )
  }
}

function mapStateToProps(state) {
  return {
    appMessages: state.appMessages,
    sidePaneMode: state.sidePaneMode,
  }
}

export default connect(mapStateToProps)(AppInfoPaneUnconnected)
