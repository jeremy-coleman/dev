module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst React = require(\"react\");\r\nconst storm_react_diagrams_1 = require(\"storm-react-diagrams\");\r\nclass CogliteDiagramWidget extends React.Component {\r\n    constructor(props) {\r\n        super(props);\r\n        this.onDoubleClick = (event) => {\r\n            event.preventDefault();\r\n            const model = this.child.getMouseElement(event);\r\n            console.log(model);\r\n            if (model === null) {\r\n            }\r\n            else if (model.model instanceof storm_react_diagrams_1.PortModel) {\r\n            }\r\n            else {\r\n                if (this.props.formAction)\r\n                    this.props.formAction(model);\r\n            }\r\n        };\r\n    }\r\n    render() {\r\n        return (React.createElement(\"div\", { className: \"coglite-custom-widget\", onDoubleClickCapture: this.onDoubleClick },\r\n            React.createElement(storm_react_diagrams_1.DiagramWidget, Object.assign({ ref: instance => { this.child = instance; } }, this.props))));\r\n    }\r\n}\r\nexports.default = CogliteDiagramWidget;\r\n",
dependencies: ["react","storm-react-diagrams"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689131,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
