
import * as React from 'react';
import * as ReactDOM from 'react-dom';


 import {forceRenderStyles} from 'typestyle';
// import {normalize, setupPage} from "csstips";

// normalize();
// setupPage('#root');


self.document.body.style.setProperty('--cog-primary', 'orange')

import { AppView } from './AppContainer';

//@ts-ignore
ReactDOM.render(<AppView />, document.getElementById("root"))

forceRenderStyles()