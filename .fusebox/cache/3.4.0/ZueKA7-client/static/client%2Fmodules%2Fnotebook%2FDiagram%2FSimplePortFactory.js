module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst storm_react_diagrams_1 = require(\"storm-react-diagrams\");\r\nclass SimplePortFactory extends storm_react_diagrams_1.AbstractPortFactory {\r\n    constructor(type, cb) {\r\n        super(type);\r\n        this.cb = cb;\r\n    }\r\n    getNewInstance(initialConfig) {\r\n        return this.cb(initialConfig);\r\n    }\r\n}\r\nexports.SimplePortFactory = SimplePortFactory;\r\n",
dependencies: ["storm-react-diagrams"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689187,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
