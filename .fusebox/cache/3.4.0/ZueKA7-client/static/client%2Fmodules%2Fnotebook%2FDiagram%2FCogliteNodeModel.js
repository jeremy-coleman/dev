module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst _ = require(\"lodash\");\r\nconst storm_react_diagrams_1 = require(\"storm-react-diagrams\");\r\nconst CoglitePortModel_1 = require(\"./CoglitePortModel\");\r\nclass CogliteNodeModel extends storm_react_diagrams_1.NodeModel {\r\n    constructor(cogType = \"cogliteInput\", name = \"Untitled\", color = \"rgb(0,192,255)\") {\r\n        super(\"coglite\");\r\n        this.cogType = cogType;\r\n        this.name = name;\r\n        this.color = color;\r\n        if (cogType === \"cogliteInput\" || cogType === \"cogliteFunctionMath\") {\r\n            this.addPort(new CoglitePortModel_1.CoglitePortModel(\"rightCenter\"));\r\n        }\r\n        if (cogType === \"cogliteDebug\" || cogType === \"cogliteFunctionMath\") {\r\n            this.addPort(new CoglitePortModel_1.CoglitePortModel(\"leftCenter\"));\r\n        }\r\n    }\r\n    deSerialize(object, engine) {\r\n        super.deSerialize(object, engine);\r\n        this.cogType = object.cogType;\r\n        this.name = object.name;\r\n        this.color = object.color;\r\n    }\r\n    serialize() {\r\n        return _.merge(super.serialize(), {\r\n            cogType: this.cogType,\r\n            name: this.name,\r\n            color: this.color,\r\n        });\r\n    }\r\n}\r\nexports.CogliteNodeModel = CogliteNodeModel;\r\n",
dependencies: ["lodash","storm-react-diagrams","./CoglitePortModel"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689158,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
