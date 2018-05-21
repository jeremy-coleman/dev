import * as _ from 'lodash';
import * as React from 'react';
import { DefaultNodeModel, DiagramWidget } from 'storm-react-diagrams';

import { Application } from './Application';
import { TrayItemWidget } from './TrayItemWidget';
import { TrayWidget } from './TrayWidget';



import styled from 'styled-components'
import { FillParent, HorizontalStretch, FillFlex, VerticalStretch } from '../../design';
import { observer } from 'mobx-react';

let GraphCanv: any = styled.div``

export interface BodyWidgetProps {
	app: Application;
}

export interface BodyWidgetState {}

@observer
export class BodyWidget extends React.Component<BodyWidgetProps, BodyWidgetState> {
	constructor(props: BodyWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
					<VerticalStretch {...this.props}>
					<HorizontalStretch {...this.props}>
					<TrayWidget {...this.props}>
						<TrayItemWidget model={{ type: "in" }} name="In Node" color="rgb(192,255,0)" />
						<TrayItemWidget model={{ type: "out" }} name="Out Node" color="rgb(0,192,255)" />
					</TrayWidget>
						<div onDrop={event => {
							var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
							var nodesCount = _.keys(
								this.props.app
									.getDiagramEngine()
									.getDiagramModel()
									.getNodes()
							).length;

							var node = null;
							if (data.type === "in") {
								node = new DefaultNodeModel("Node " + (nodesCount + 1), "rgb(192,255,0)");
								node.addInPort("In");
							} else {
								node = new DefaultNodeModel("Node " + (nodesCount + 1), "rgb(0,192,255)");
								node.addOutPort("Out");
							}
							var points = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
							node.x = points.x;
							node.y = points.y;
							this.props.app
								.getDiagramEngine()
								.getDiagramModel()
								.addNode(node);
							this.forceUpdate();
						}}
						onDragOver={event => {event.preventDefault()}}
					/>
						<DiagramWidget className="srd-demo-canvas" diagramEngine={this.props.app.getDiagramEngine()} />
					</HorizontalStretch>
					</VerticalStretch>
		);
	}
}
