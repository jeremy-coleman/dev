import * as React from 'react';
import { observer } from 'mobx-react';

export interface TrayWidgetProps {}

export interface TrayWidgetState {}

@observer
export class TrayWidget extends React.Component<TrayWidgetProps, TrayWidgetState> {
	public static defaultProps: TrayWidgetProps = {};

	constructor(props: TrayWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return <div className="tray">{this.props.children}</div>;
	}
}
