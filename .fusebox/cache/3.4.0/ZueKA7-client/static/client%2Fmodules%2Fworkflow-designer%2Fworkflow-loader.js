module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst mobx_1 = require(\"mobx\");\r\nconst jsYaml = require(\"js-yaml\");\r\nfunction isEmptyArray(obj) {\r\n    if (Array.isArray(obj) && obj.length == 0) {\r\n        return true;\r\n    }\r\n    return false;\r\n}\r\nfunction condense(obj) {\r\n    let condensed = {};\r\n    for (var prop in obj) {\r\n        let value = obj[prop];\r\n        if (!(value === null || value === undefined || value === false || value === '' || isEmptyArray(value))) {\r\n            if (typeof (value) === 'object' && !Array.isArray(value)) {\r\n                value = condense(value);\r\n                if (Object.keys(value).length === 0) {\r\n                    condensed[prop] = value;\r\n                }\r\n            }\r\n            else if (Array.isArray(value) && value.length > 0) {\r\n                condensed[prop] = value.map(element => typeof (element) === 'object' ? condense(element) : element);\r\n            }\r\n            else {\r\n                condensed[prop] = value;\r\n            }\r\n        }\r\n    }\r\n    return condensed;\r\n}\r\nfunction saveWorkflow(workflow) {\r\n    return jsYaml.safeDump(condense(mobx_1.toJS(workflow)), { skipInvalid: true });\r\n}\r\nexports.saveWorkflow = saveWorkflow;\r\nfunction loadWorkflow(input) {\r\n    return jsYaml.safeLoad(input);\r\n}\r\nexports.loadWorkflow = loadWorkflow;\r\n",
dependencies: ["mobx","js-yaml"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400690184,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
