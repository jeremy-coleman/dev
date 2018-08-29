module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst schema_1 = require(\"./schema\");\r\nexports.generateJsonSchema = schema_1.generateJsonSchema;\r\nconst uischema_1 = require(\"./uischema\");\r\nexports.generateDefaultUISchema = uischema_1.generateDefaultUISchema;\r\nconst Generate = {\r\n    jsonSchema: schema_1.generateJsonSchema,\r\n    uiSchema: uischema_1.generateDefaultUISchema,\r\n};\r\nexports.Generate = Generate;\r\nexports.default = Generate;\r\n",
dependencies: ["./schema","./uischema"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689314,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
