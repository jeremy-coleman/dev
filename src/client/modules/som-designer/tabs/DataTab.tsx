import * as React from "react";

import Popover from "material-ui/Popover";
import Slider from "material-ui/Slider";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FontIcon from "material-ui/FontIcon";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";


import {Dataset, DatasetSource, ClusterDatasetSource, CallbackDatasetSource } from "../../../lib";

import {LogSlider} from "../LogSlider";
import {NumberInput} from "../NumberInput";

//import '../som.styles'

//const style = require("./DataTab.scss");

//import {style} from './DataTab.style'

//const MonacoEditor = require("react-monaco-editor").default;
import {MonacoEditor} from "ronaco";

class WeightEditor extends React.Component<{
  weights: number[];
  onChange(weights: number[]): void;
}, {
  open: boolean;
  anchorElement: HTMLElement | undefined;
}> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorElement: undefined
    };
  }

  render() {
    return <div className={"som-weight-editor"}>
      <div
        className="color"
        style={{
          backgroundColor: `rgb(${this.props.weights.map(v => Math.round(v * 255)).join(", ")})`
        }}
        onClick={e => this.setState({ open: true, anchorElement: e.currentTarget })}
      />
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorElement}
        anchorOrigin={{ horizontal: "left", vertical: "center" }}
        targetOrigin={{ horizontal: "right", vertical: "center" }}
        onRequestClose={() => this.setState({ open: false })}
        style={{
          padding: "12px 0",
          overflow: "hidden"
        }}
      >
        <div className={"som-we-popover-content"}>
          <span className="title">
            {this.props.weights.map(w => w.toFixed(2)).join("/")}
          </span>
          {this.props.weights.map((weight, dim) =>
            <div key={dim} style={{ paddingLeft: 20 }} className="coordinate">
              <b className="caption">
                {[ "X", "Y", "Z" ][dim]}
              </b>
              <Slider
                defaultValue={weight}
                onChange={(e, newValue) =>
                  this.props.onChange(this.props.weights.map((prev, i) => i === dim ? newValue : prev))
                }
                style={{
                  display: "inline-block",
                  width: 200,
                  verticalAlign: "middle",
                  marginRight: 30
                }}
                sliderStyle={{
                  margin: 4
                }}
              />
            </div>
          )}
        </div>
      </Popover>
    </div>;
  }
}

class ScriptEditor extends React.Component<{
  source: CallbackDatasetSource;
  onUpdate(): void;
}, {
  modalOpen: boolean;
}> {
  protected newCode: string;

  constructor(props: any) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  protected openModal() {
    this.setState({ modalOpen: true });
  }

  protected closeModal() {
    this.setState({ modalOpen: false });
  }

  protected editorDidMount(editor: any) {
    let monaco = (window as any).monaco;

    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      require("raw-loader!client/modules/som-designer/assets/script-environment.d.ts")
    );

    editor.focus();
  }

  render() {
    return <div>
      <span
        className="js-label"
        onClick={() => this.openModal()}
      >JS</span>
      <Dialog
        title="Edit code"
        actions={[
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={() => this.closeModal()}
          />,
          <FlatButton
            label="Save"
            primary={true}
            keyboardFocused={true}
            onClick={() => {
              // commit code change
              this.props.source.code = this.newCode;
              this.closeModal();
              this.props.onUpdate();
            }}
          />
        ]}
        modal={true}
        open={this.state.modalOpen}
        onRequestClose={() => this.closeModal()}
      >
        <MonacoEditor
          width="100%"
          height="600"
          language="javascript"
          value={this.props.source.code}
          onChange={(v: string) => this.newCode = v}
        />
      </Dialog>
    </div>;
  }
}

abstract class Example {
  public name: string;
  abstract generate(): DatasetSource[];
}

export interface IProps {
  revision: number;
  dataset: Dataset;
  onUpdate(): void;
  onSelect(datasource: DatasetSource | null): void;
}

interface IState {
}

export class DataTab extends React.Component<IProps, IState> {
  static examples: Example[] = [];

  protected renderSourceTitle(source: DatasetSource) {
    return <span className="title">
      <span className="cluster-type">
        Cluster
      </span>
      {" "}with
      <NumberInput
        value={source.sampleCount}
        onChange={value => {
          source.sampleCount = value;
          this.props.onUpdate();
        }}
      /> datapoints
    </span>;
  }

  protected renderClusterSource(source: ClusterDatasetSource, key: number) {
    return <div key={key} className={"som-datasource"}>
      <WeightEditor
        weights={source.center}
        onChange={weights => {
          source.center = weights;
          this.props.onUpdate();
        }}
      />
      <div className="content">
        {this.renderSourceTitle(source)}
        <div>
          <span>
            &sigma;
          </span>
          <LogSlider
            min={-4}
            max={0}
            step={0.1}
            value={source.stddev}
            onChange={(e, newValue) => {
              source.stddev = newValue;
              this.props.onUpdate();
            }}
            style={{
              display: "inline-block",
              width: "calc(100% - 60px)",
              verticalAlign: "middle",
              marginRight: 0
            }}
            sliderStyle={{
              margin: 4
            }}
          />
        </div>
      </div>
    </div>;
  }

  protected renderCallbackSource(source: CallbackDatasetSource, key: number) {
    return <div key={key} className={"som-datasource"}>
      <ScriptEditor
        source={source}
        onUpdate={this.props.onUpdate}
      />
      <div className="content">
        {this.renderSourceTitle(source)}
      </div>
    </div>;
  }

  protected renderSource(source: DatasetSource, key: number) {
    let interior = <b>Unknown datasource</b>;

    if (source instanceof ClusterDatasetSource)
      interior = this.renderClusterSource(source, key);
    else if (source instanceof CallbackDatasetSource)
      interior = this.renderCallbackSource(source, key);
    
    return <div>
      <FontIcon
        className="material-icons"
        style={{ float: "right", zIndex: 1000 }}
        onClick={() => this.removeSource(source)}
      >
        remove
      </FontIcon>
      {interior}
    </div>;
  }

  protected addSource(source: DatasetSource) {
    this.props.dataset.sources.push(source);
    this.props.onUpdate();
  }

  protected removeSource(source: DatasetSource) {
    let { dataset } = this.props;
    dataset.sources = dataset.sources.filter(s => s !== source);
    this.props.onUpdate();
  }

  protected removeAllSources() {
    this.props.dataset.sources = [];
    this.props.onUpdate();
  }

  protected renderToolbar() {
    return <Toolbar style={{
      height: 36,
      padding: "6px 8px",
      lineHeight: "1em"
    }}>
      <ToolbarGroup firstChild={true} style={{ marginLeft: 0 }}>
        <ToolbarTitle
          text={`${this.props.dataset.sources.length} sources`}
          style={{
            fontSize: 12,
            lineHeight: "20px"
          }}
        />
      </ToolbarGroup>
      <ToolbarGroup>
        <IconMenu
          iconButtonElement={<FontIcon style={{ fontSize: 20, marginRight: 8 }} className="material-icons">add</FontIcon>}
        >
          <MenuItem value="1" primaryText="Cluster" onClick={() =>
            this.addSource(new ClusterDatasetSource(1000, [ 0, 0, 0 ], 0.1))
          } />
          <MenuItem value="2" primaryText="JavaScript" onClick={() =>
            this.addSource(new CallbackDatasetSource(1000, require("raw-loader!client/modules/som-designer/assets/template.js")))
          } />
        </IconMenu>
        <IconMenu
          iconButtonElement={<FontIcon style={{ fontSize: 20 }} className="material-icons">expand_more</FontIcon>}
        >
          <MenuItem primaryText="Remove all" onClick={() => this.removeAllSources()} />
          <Divider />
          <Subheader>Examples</Subheader>
          {DataTab.examples.map(example =>
            <MenuItem value="1" primaryText={example.name} onClick={() => {
              this.props.dataset.sources = example.generate();
              this.props.onUpdate();
            }} />
          )}
        </IconMenu>
      </ToolbarGroup>
    </Toolbar>;
  }

  render() {
    return <div>
      {this.renderToolbar()}
      <div className="sources">
        {this.props.dataset.sources.map((source, key) => this.renderSource(source, key))}
      </div>
    </div>;
  }
}

DataTab.examples.push(new class extends Example {
  name = "Clusters";
  generate() {
    return [
      new ClusterDatasetSource( 400, [ 0.80, 0.10, 0.10 ], 0.01),
      new ClusterDatasetSource(1000, [ 0.88, 0.50, 0.10 ], 0.02),
      new ClusterDatasetSource(1000, [ 1.00, 0.88, 0.39 ], 0.04),
      new ClusterDatasetSource(2000, [ 0.40, 0.30, 0.50 ], 0.08),
      new ClusterDatasetSource(1000, [ 0.35, 0.45, 0.75 ], 0.03),
      new ClusterDatasetSource( 200, [ 0.49, 0.69, 0.21 ], 0.005)
    ];
  }
});

DataTab.examples.push(new class extends Example {
  name = "JavaScript";
  generate() {
    return [
      new CallbackDatasetSource(10000, require("raw-loader!client/modules/som-designer/assets/sin.js"))
    ];
  }
});

DataTab.examples.push(new class extends Example {
  name = "Sphere";
  generate() {
    return [
      new CallbackDatasetSource(10000, require("raw-loader!client/modules/som-designer/assets/sphere.js"))
    ];
  }
});

DataTab.examples.push(new class extends Example {
  name = "Spiral";
  generate() {
    return [
      new CallbackDatasetSource(1000, require("raw-loader!client/modules/som-designer/assets/spiral.js"))
    ];
  }
});