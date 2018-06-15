import * as React from 'react';
import './toolbar.css';

export class ToolBar extends React.Component {
  render() {
    return (
    <div id="toolbar">
      <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_598462_3xve1872wizzolxr.css" />
      <i data-command="undo" className="command iconfont icon-undo" title="undo"></i>
      <i data-command="redo" className="command iconfont icon-redo" title="redo"></i>
      <span className="separator"></span>
      <i data-command="copy" className="command iconfont icon-copy-o" title="copy"></i>
      <i data-command="paste" className="command iconfont icon-paster-o" title="paste"></i>
      <i data-command="delete" className="command iconfont icon-delete-o" title="delete"></i>
      <span className="separator"></span>
      <i data-command="zoomIn" className="command iconfont icon-zoom-in-o" title="zoom-in"></i>
      <i data-command="zoomOut" className="command iconfont icon-zoom-out-o" title="zoom-out"></i>
      <i data-command="autoZoom" className="command iconfont icon-fit" title="fit"></i>
      <i data-command="resetZoom" className="command iconfont icon-actual-size-o" title="actual-size"></i>
      <span className="separator"></span>
      <i data-command="toBack" className="command iconfont icon-to-back" title="send-to-back"></i>
      <i data-command="toFront" className="command iconfont icon-to-front" title="send-to-front"></i>
      <span className="separator"></span>
      <i data-command="multiSelect" className="command iconfont icon-select" title="select"></i>
      <i data-command="addGroup" className="command iconfont icon-group" title="group"></i>
      <i data-command="unGroup" className="command iconfont icon-ungroup" title="ungroup"></i>
    </div>);
  }
}

