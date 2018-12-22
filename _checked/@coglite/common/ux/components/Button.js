"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const typestyle_1 = require("typestyle");
exports.styles = typestyle_1.stylesheet({
    root: {
        height: '100%',
        display: 'flex',
        flex: '0 0 auto',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        WebkitTapHighlightColor: 'transparent',
        backgroundColor: 'transparent',
        outline: 'none',
        border: 0,
        margin: 0,
        borderRadius: 0,
        padding: 0,
        cursor: 'pointer',
        userSelect: 'none',
        verticalAlign: 'middle',
        appearance: 'none',
        '-moz-appearance': 'none',
        '-webkit-appearance': 'none',
        textDecoration: 'none',
        color: 'inherit',
        $nest: {
            '&::-moz-focus-inner': {
                borderStyle: 'none',
            },
            '&.disabled': {
                pointerEvents: 'none',
                cursor: 'default',
            }
        }
    },
    disabled: {},
    focusVisible: {},
});
const styledBy = (property, mapping) => props => mapping[props[property]];
let GRADIENTS = {
    red: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    blue: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    }
};
const myButtonStyle = typestyle_1.stylesheet({
    root: {
        background: GRADIENTS.blue.background,
        border: 0,
        borderRadius: 3,
        boxShadow: GRADIENTS.blue.boxShadow,
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
});
let MyButton = ({ color, ...props }) => React.createElement("button", Object.assign({ className: myButtonStyle.root }, props), props.children);
function AdpatingRenderProps() {
    return (React.createElement("div", null,
        React.createElement(MyButton, { color: "red" }, "Red"),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(MyButton, { color: "blue" }, "Blue")));
}
exports.AdpatingRenderProps = AdpatingRenderProps;
exports.Button = mobx_react_1.observer((props) => React.createElement("button", { onClick: props.onClick, className: exports.styles.root }, props.children));
