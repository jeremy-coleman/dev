
import * as React from 'react';
import Editor from './Editor';
import G6Editor from '../../build/g6Editor';
import Navigator from './Navigator';
import ToolBar from './Toolbar';
import Contextmenu from './Contextmenu';
import Page from './Page';
import { Checkbox, Input } from 'antd';
import './editor.css';
import './modelFlowEditor.css';

const Flow = G6Editor.Flow;



// Registration model card base class
Flow.registerNode('model-card', {
  draw(item) {
    const group = item.getGraphicGroup();
    const model = item.getModel();
    const width = 184;
    const height = 40;
    const x = -width / 2;
    const y = -height / 2;
    const borderRadius = 4;
    const keyShape = group.addShape('rect', {
      attrs: {
        x,
        y,
        width,
        height,
        radius: borderRadius,
        fill: 'white',
        stroke: '#CED4D9'
      }
    });
 
    
// left side bar
    group.addShape('path', {
      attrs: {
        path: [
          [ 'M', x, y + borderRadius ],
          [ 'L', x, y + height - borderRadius ],
          [ 'A', borderRadius, borderRadius, 0, 0, 0, x + borderRadius, y + height ],
          [ 'L', x + borderRadius, y ],
          [ 'A', borderRadius, borderRadius, 0, 0, 0, x, y + borderRadius ]
        ],
        fill: this.color_type
      }
    });

        // type logo
    group.addShape('image', {
      attrs: {
        img: this.type_icon_url,
        x: x + 16,
        y: y + 12,
        width: 20,
        height: 16
      }
    });


    //type text
    const label = model.label ? model.label : this.label;
    group.addShape('text', {
      attrs: {
        text: label,
        x: x + 52,
        y: y + 13,
        textAlign: 'start',
        textBaseline: 'top',
        fill: 'rgba(0,0,0,0.65)'
      }
    });


    //status logo
    group.addShape('image', {
      attrs: {
        img: this.state_icon_url,
        x: x + 158,
        y: y + 12,
        width: 16,
        height: 16
      }
    });
    return keyShape;
  },
//set anchor point
  anchor: [
    [ 0.5, 0 ], // Midpoint above
    [ 0.5, 1 ] // Lower midpoint
  ]
});

//K-means clustering
Flow.registerNode('k-means', {
  label: 'k-means',
  color_type: '#1890FF',
  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',

// Set the anchor point
Anchor: [
  [ 0.5, 0, {
    Type: 'input'
  }], // The midpoint above
  [ 0.5, 1, {
    Type: 'output'
  }] // The midpoint below
]
}, 'model-card');

// random-forest
Flow.registerNode('random-forest', {
  label: 'random-forest',
  color_type: '#9254DE',
  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
  
  // set Anchor
  anchor: [
    [ 0.5, 0, {
      type: 'input'
    }],
    [ 0.5, 1, {
      type: 'output'
    }]
  ]
}, 'model-card');

// PS-SMART Classification
Flow.registerNode('PS-SMART', {
  label: 'PS-SMART Classification',
  color_type: '#1890FF',
  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
 
  //set Anchor
  anchor: [
    [ 0.5, 0, {
      type: 'input'
    }],
    [ 0.33, 1, {
      type: 'output'
    }],
    [ 0.66, 1, {
      type: 'output'
    }]
  ]
}, 'model-card');


// Naive Bayes
Flow.registerNode('Bayes', {
  label: 'NaiveBayes',
  color_type: '#9254DE',
  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
  // 设置锚点
  anchor: [
    [ 0.5, 0, {
      type: 'input'
    }],
    [ 0.5, 1, {
      type: 'output'
    }]
  ]
}, 'model-card');



//Read data table
Flow.registerNode('read-data-base', {
  label: 'Read data table',
  color_type: '#FAAD14',
  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
  // set anchor
  anchor: [
    [ 0.5, 1, {
      type: 'output'
    }]
  ]
}, 'model-card');

class ModelFlowEditor extends Editor {
  componentDidMount() {
    setTimeout(() => {
      super.componentDidMount();
      const page = this.page;

     // The input anchor cannot be connected to the edge
      page.on('hoveranchor:beforeaddedge', ev => {
        if (ev.anchor.type === 'input') {
          ev.cancel = true;
        }
      });
      page.on('dragedge:beforeshowanchor', ev => {
       
      // Only allow the target anchor point to be the input, and the source anchor point is the output to connect
        if (!(ev.targetAnchor.type === 'input' && ev.sourceAnchor.type === 'output')) {
          ev.cancel = true;
        }
       // If the target direction is dragged, the anchors that have been connected in the target node are undisplayed
        if (ev.dragEndPointType === 'target' && page.anchorHasBeenLinked(ev.target, ev.targetAnchor)) {
          ev.cancel = true;
        }
        
    // If the source direction is dragged, the anchors that have been connected in the source node are undisplayed
        if (ev.dragEndPointType === 'source' && page.anchorHasBeenLinked(ev.source, ev.sourceAnchor)) {
          ev.cancel = true;
        }
      });
    }, 100);
  }
  render() {
    const { curZoom, minZoom, maxZoom, inputingLabel, selectedModel } = this.state;
    const labelInput = (
      <div className="p">
          name:
        <Input
          size="small"
          className="input name-input"
          value = {inputingLabel !== null ? inputingLabel : selectedModel.label}
          onChange = { ev => {
            this.setState({
              inputingLabel: ev.target.value
            });
          }}
          onBlur = { ev => {
            this.updateGraph('label', ev.target.value);
            this.setState({
              inputingLabel: null
            });
          }}
        />
      </div>
    );
    return <div id="editor">
      <ToolBar />
      <div style={{ height: '42px' }}></div>
      <div className="bottom-container">
        <Contextmenu />
        <div id="itempannel">
          <ul>
            <li className="getItem" data-shape="k-means" data-type="node" data-size="170*34">
              <span className="pannel-type-icon"></span>K-Means
            </li>
            <li className="getItem" data-shape="random-forest" data-type="node" data-size="170*34">
              <span className="pannel-type-icon"></span>Random Forest
            </li>
            <li className="getItem" data-shape="PS-SMART" data-type="node" data-size="170*34">
              <span className="pannel-type-icon"></span>PS-SMART Classification
            </li>
            <li className="getItem" data-shape="read-data-base" data-type="node" data-size="170*34">
              <span className="pannel-type-icon"></span>Read Data Base
            </li>
            <li className="getItem" data-shape="Bayes" data-type="node" data-size="170*34">
              <span className="pannel-type-icon"></span>Naive Bayes
            </li>
          </ul>
        </div>
        <div id="detailpannel">
          <div data-status="node-selected" className="pannel" id="node_detailpannel">
            <div className="pannel-title">Model details</div>
            <div className="block-container">
              {labelInput}
            </div>
          </div>
          <div data-status="group-selected" className="pannel" id="node_detailpannel">
            <div className="pannel-title">Group details</div>
            <div className="block-container">
              {labelInput}
            </div>
          </div>
          <div data-status="canvas-selected" className="pannel" id="canvas_detailpannel">
            <div className="pannel-title">Canvas</div>
            <div className="block-container">
              <Checkbox onChange={ this.toggleGrid.bind(this) } >Grid Alignment</Checkbox>
            </div>
          </div>
        </div>
        <Navigator
          curZoom = {curZoom}
          minZoom = {minZoom}
          maxZoom = {maxZoom}
          changeZoom = {this.changeZoom.bind(this)} />
        <Page />
      </div>
    </div>;
  }
}
module.exports = ModelFlowEditor;
