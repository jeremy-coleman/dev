module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst storm_react_diagrams_1 = require(\"storm-react-diagrams\");\r\nconst _ = require(\"lodash\");\r\nclass CogliteLinkModel extends storm_react_diagrams_1.DefaultLinkModel {\r\n    constructor() {\r\n        super(\"coglite\");\r\n        super.setColor(\"rgba(0,0,0,0.75)\");\r\n        super.setWidth(2);\r\n    }\r\n    setTargetPort(port) {\r\n        if (port !== null && (_.size(port.links) >= port.getMaximumLinks())) {\r\n            return;\r\n        }\r\n        super.setTargetPort(port);\r\n    }\r\n    setSourcePort(port) {\r\n        if (port !== null && (_.size(port.links) >= port.getMaximumLinks())) {\r\n            return;\r\n        }\r\n        super.setSourcePort(port);\r\n    }\r\n}\r\nexports.CogliteLinkModel = CogliteLinkModel;\r\n",
dependencies: ["storm-react-diagrams","lodash"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689143,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
