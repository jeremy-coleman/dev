
import * as React from 'react';
import * as ReactDOM from 'react-dom';


// import {forceRenderStyles} from 'typestyle';
// import {normalize, setupPage} from "csstips";

// normalize();
// setupPage('#root');


const main = document.createElement("div");
main.id = "main";
document.body.appendChild(main);

window.document.body.style.setProperty('--cog-primary', 'orange')

import { AppView } from './AppContainer';

ReactDOM.render(<AppView />, main)

//forceRenderStyles()