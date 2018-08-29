module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst _ = require(\"lodash\");\r\nconst deriveLabel = (controlElement) => {\r\n    if (controlElement.scope !== undefined) {\r\n        const ref = controlElement.scope;\r\n        const label = ref.substr(ref.lastIndexOf('/') + 1);\r\n        return _.startCase(label);\r\n    }\r\n    return '';\r\n};\r\nexports.createLabelDescriptionFrom = (withLabel) => {\r\n    const labelProperty = withLabel.label;\r\n    const derivedLabel = deriveLabel(withLabel);\r\n    if (typeof labelProperty === 'boolean') {\r\n        if (labelProperty) {\r\n            return {\r\n                text: derivedLabel,\r\n                show: labelProperty\r\n            };\r\n        }\r\n        else {\r\n            return {\r\n                text: derivedLabel,\r\n                show: labelProperty\r\n            };\r\n        }\r\n    }\r\n    else if (typeof labelProperty === 'string') {\r\n        return {\r\n            text: labelProperty,\r\n            show: true\r\n        };\r\n    }\r\n    else if (typeof labelProperty === 'object') {\r\n        const show = labelProperty.hasOwnProperty('show') ? labelProperty.show : true;\r\n        const label = labelProperty.hasOwnProperty('text') ?\r\n            labelProperty.text : derivedLabel;\r\n        return {\r\n            text: label,\r\n            show\r\n        };\r\n    }\r\n    else {\r\n        return {\r\n            text: derivedLabel,\r\n            show: true\r\n        };\r\n    }\r\n};\r\n",
dependencies: ["lodash"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689444,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
