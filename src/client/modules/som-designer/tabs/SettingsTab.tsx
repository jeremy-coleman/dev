import * as React from "react";

import { List, ListItem,Checkbox  } from "material-ui";

//import '../som.styles'
//const style = require("./SettingsTab.scss");

//import {style} from './SettingsTab.style'

export interface SettingsTabProps {
  displayMap: boolean;
  displayUMatrix: boolean;

  onUpdateDisplayMap(value: boolean): void;
  onUpdateDisplayUMatrix(value: boolean): void;
}



export class SettingsTab extends React.Component<SettingsTabProps, {}> {
  protected renderSettings() {
    return (
      <List style={{
        padding: 0
      }}>
        <ListItem
          style={{
            padding: "10px 0 10px 60px"
          }}
          leftCheckbox={<Checkbox
            style={{ top: 14 }}
            checked={this.props.displayMap}
            onCheck={(e, checked) => this.props.onUpdateDisplayMap(checked)}
          />}
          primaryText="Display color-coded map"
          secondaryText="Visualizes positions of neurons"
        />
        <ListItem
          style={{
            padding: "10px 0 10px 60px"
          }}
          leftCheckbox={<Checkbox
            style={{ top: 14 }}
            checked={this.props.displayUMatrix}
            onCheck={(e, checked) => this.props.onUpdateDisplayUMatrix(checked)}
          />}
          primaryText="Display U-Matrix"
          secondaryText="Visualizes weight distance of adjacent neurons"
        />
      </List>
    );
  }

  protected renderAbout() {
    return (
      <div>
        TODO: add infos.<br />
      </div>
    )
  }

  render() {
    return <div className={"som-tab"}>
      <h2>Settings</h2>
      {this.renderSettings()}
      <hr />
      <h2>Guide</h2>
      {this.renderAbout()}
    </div>;
  }
}
