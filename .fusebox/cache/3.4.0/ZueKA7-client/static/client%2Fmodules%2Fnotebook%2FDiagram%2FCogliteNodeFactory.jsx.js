module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst React = require(\"react\");\r\nconst SRD = require(\"storm-react-diagrams\");\r\nconst CogliteNodeModel_1 = require(\"./CogliteNodeModel\");\r\nconst CogliteNodeWidget_1 = require(\"./CogliteNodeWidget\");\r\nclass CogliteNodeFactory extends SRD.AbstractNodeFactory {\r\n    constructor() {\r\n        super(\"coglite\");\r\n    }\r\n    generateReactWidget(diagramEngine, node) {\r\n        return React.createElement(CogliteNodeWidget_1.CogliteNodeWidget, { node: node });\r\n    }\r\n    getNewInstance(initialConfig) {\r\n        return new CogliteNodeModel_1.CogliteNodeModel();\r\n    }\r\n}\r\nexports.CogliteNodeFactory = CogliteNodeFactory;\r\n",
dependencies: ["react","storm-react-diagrams","./CogliteNodeModel","./CogliteNodeWidget"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689147,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
