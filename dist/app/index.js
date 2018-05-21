"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css.config");
const ReactDOM = require("react-dom");
const React = require("react");
const App_1 = require("./App");
require("./styles/main.css");
//import '@blueprintjs/icons/lib/css/blueprint-icons.css';
ReactDOM.render(React.createElement(App_1.CogliteAppRoot, null), document.getElementById("coglite-app-root"));
