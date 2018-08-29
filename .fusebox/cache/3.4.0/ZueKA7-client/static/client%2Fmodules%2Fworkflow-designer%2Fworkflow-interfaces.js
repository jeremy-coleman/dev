module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.imageSources = {\r\n    image: '',\r\n    step: ''\r\n};\r\nexports.ImageSources = Object.keys(exports.imageSources);\r\nexports.stepTypes = {\r\n    sequential: '',\r\n    parallel: '',\r\n    service: '',\r\n    compound: ''\r\n};\r\nexports.StepTypes = Object.keys(exports.stepTypes);\r\nexports.healthTypes = {\r\n    http: '',\r\n    https: '',\r\n    tcp: '',\r\n    script: ''\r\n};\r\nexports.HealthTypes = Object.keys(exports.healthTypes);\r\nfunction isStepType(x) {\r\n    return exports.stepTypes.hasOwnProperty(x);\r\n}\r\nexports.isStepType = isStepType;\r\nexports.keysOfIHealth = [\r\n    \"type\", \"script\", \"port\", \"path\",\r\n    \"interval\", \"retries\", \"grace\", \"timeout\", \"headers\"\r\n];\r\nexports.keysOfIReadiness = [\r\n    \"type\", \"script\", \"port\", \"path\", \"skipCheck\",\r\n    \"interval\", \"retries\", \"grace\", \"timeout\", \"headers\"\r\n];\r\nexports.keysOfIWorkflowStepSimple = [\r\n    \"imageSource\", \"image\", \"target\",\r\n    \"generator\", \"script\", \"omitSource\", \"sourceLocation\",\r\n    \"ignoreFailure\", \"ignoreValidation\", \"ignoreMissing\",\r\n    \"includeVariables\", \"excludeVariables\", \"dockerignore\",\r\n    \"ignoreFailure\", \"health\", \"readiness\", \"environment\",\r\n    \"ports\", \"volumes\", \"dockerfile\", \"name\", \"type\"\r\n];\r\n",
dependencies: [],
sourceMap: {},
headerContent: undefined,
mtime: 1535400690177,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
