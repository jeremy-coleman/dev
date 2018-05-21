import * as React from "react";
var SplitPane = require("react-split-pane");
import "./index.scss";
// import COLORS from "./constants/COLORS";

export default class extends React.Component<any ,any> {
  render() {
    return (
      <SplitPane
        {...this.props}
        resizerStyle={{backgroundColor: "none"}}
      />
    );
  }
}
