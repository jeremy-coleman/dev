module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst storm_react_diagrams_1 = require(\"storm-react-diagrams\");\r\nconst CogliteLinkModel_1 = require(\"./CogliteLinkModel\");\r\nclass CogliteLinkFactory extends storm_react_diagrams_1.DefaultLinkFactory {\r\n    constructor() {\r\n        super();\r\n        this.type = \"coglite\";\r\n    }\r\n    getNewInstance(initialConfig) {\r\n        return new CogliteLinkModel_1.CogliteLinkModel();\r\n    }\r\n}\r\nexports.CogliteLinkFactory = CogliteLinkFactory;\r\n",
dependencies: ["storm-react-diagrams","./CogliteLinkModel"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689136,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
