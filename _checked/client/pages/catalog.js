"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const csx_1 = require("csx");
const typestyle_1 = require("typestyle");
const navClass = typestyle_1.style({
    width: csx_1.percent(100),
});
const listClass = typestyle_1.style({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    backgroundColor: 'black',
    display: 'flex',
    textAlign: 'center',
    $nest: {
        '& li': {
            float: 'left',
            $nest: {
                '& a': {
                    display: 'inline-block',
                    minWidth: csx_1.rem(1.4),
                    height: csx_1.rem(5),
                    lineHeight: csx_1.rem(5),
                    color: 'white',
                    textDecoration: 'none',
                    padding: csx_1.rem(1),
                    $nest: {
                        '&:hover': {
                            backgroundColor: 'purple',
                        },
                    },
                },
            },
        },
    },
});
exports.Header = () => (React.createElement("nav", { className: navClass },
    React.createElement("ul", { className: listClass },
        React.createElement("li", null,
            React.createElement("a", null, "Home")),
        React.createElement("li", null,
            React.createElement("a", null, "About")),
        React.createElement("li", null,
            React.createElement("a", null, "Currency")),
        React.createElement("li", null,
            React.createElement("a", null, "NotALink")))));
const FancyButton = React.forwardRef((props, ref) => (React.createElement("button", { ref: ref, className: "FancyButton" }, props.children)));
const ref = React.createRef();
exports.CatalogPage = mobx_react_1.observer((props) => React.createElement(React.Fragment, null,
    React.createElement("div", null, "CatalogPage"),
    React.createElement(exports.Header, null),
    React.createElement(FancyButton, { ref: ref }, "Click me!")));
