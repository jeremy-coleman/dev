module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst React = require(\"react\");\r\nclass Rating extends React.Component {\r\n    constructor(props) {\r\n        super(props);\r\n        this.state = {\r\n            rating: props.value,\r\n            hoverAt: null\r\n        };\r\n    }\r\n    handleMouseOver(idx) {\r\n        this.setState({\r\n            hoverAt: idx + 1\r\n        });\r\n    }\r\n    handleMouseOut() {\r\n        this.setState({\r\n            hoverAt: null\r\n        });\r\n    }\r\n    handleClick(idx) {\r\n        this.setState({\r\n            rating: idx + 1\r\n        });\r\n    }\r\n    render() {\r\n        const { onClick } = this.props;\r\n        return (React.createElement(\"div\", null, [0, 1, 2, 3, 4].map(i => {\r\n            const rating = this.state.hoverAt != null ? this.state.hoverAt : this.state.rating;\r\n            return React.createElement(\"span\", { onMouseOver: () => this.handleMouseOver(i), onMouseOut: () => this.handleMouseOut(), onClick: () => {\r\n                    this.handleClick(i);\r\n                    onClick({ value: i + 1 });\r\n                }, key: `${this.props.id}_${i}` }, i < rating ? '\\u2605' : '\\u2606');\r\n        })));\r\n    }\r\n}\r\nexports.Rating = Rating;\r\n",
dependencies: ["react"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689239,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
