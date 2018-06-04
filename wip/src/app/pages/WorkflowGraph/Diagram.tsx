import * as React from "react";
import { BodyWidget } from "./BodyWidget";
import { Application } from "./Application";

import './styles/main.scss'
import './styles/demo.scss'

export let Diagram = props => {
	var app = new Application();

	return <BodyWidget app={app} />
		
};

