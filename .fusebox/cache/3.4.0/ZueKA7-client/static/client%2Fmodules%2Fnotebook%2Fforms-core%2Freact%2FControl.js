module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Renderer_1 = require(\"./Renderer\");\r\nclass Control extends Renderer_1.RendererComponent {\r\n    constructor(props) {\r\n        super(props);\r\n        this.handleChange = value => {\r\n            this.setState({ value });\r\n            this.updateData(value);\r\n        };\r\n        this.onFocus = () => {\r\n            this.setState({ isFocused: true });\r\n        };\r\n        this.onBlur = () => { this.setState({ isFocused: false }); };\r\n        this.updateData = value => {\r\n            this.props.handleChange(this.props.path, value);\r\n        };\r\n        this.state = {\r\n            value: props.data ? props.data : '',\r\n            isFocused: false\r\n        };\r\n    }\r\n}\r\nexports.Control = Control;\r\n",
dependencies: ["./Renderer"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689687,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
