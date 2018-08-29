module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst electron_1 = require(\"electron\");\r\nconst React = require(\"react\");\r\nconst ReactDOM = require(\"react-dom\");\r\nconst app_1 = require(\"./app\");\r\nrequire(\"./index.styl\");\r\nprocess.on('uncaughtException', (error) => { console.error('[err-client]', error.message, error.stack); });\r\nwindow.onerror = (message, filename, lineno, colno, error) => { console.error('[err-client]', message, filename, lineno, colno, error); return true; };\r\nelectron_1.webFrame.registerURLSchemeAsPrivileged('coglite');\r\nelectron_1.webFrame.setZoomLevel(1);\r\nelectron_1.webFrame.setZoomFactor(1);\r\nelectron_1.webFrame.setVisualZoomLevelLimits(1, 1);\r\nelectron_1.webFrame.setLayoutZoomLevelLimits(0, 0);\r\ndocument.addEventListener(\"dragover\", event => event.preventDefault());\r\ndocument.addEventListener(\"drop\", event => event.preventDefault());\r\nReactDOM.render(React.createElement(app_1.AppView, null), document.getElementById(\"coglite-app-root\"));\r\n",
dependencies: ["electron","react","react-dom","./app","./index.styl","process"],
sourceMap: {},
headerContent: ["/* fuse:injection: */ var process = require(\"process\");"],
mtime: 1535437405092,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
