"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class ClickOutside extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.childRef = React.createRef();
        this.handleClick = (e) => {
            if (this.childRef.current &&
                !this.childRef.current.contains(e.target)) {
                this.props.onOutsideClick();
            }
        };
        this.addListener = () => void document.addEventListener("mousedown", this.handleClick);
        this.removeListener = () => void document.removeEventListener("mousedown", this.handleClick);
    }
    componentDidMount() {
        if (!this.props.disabled) {
            this.addListener();
        }
    }
    componentWillUnmount() {
        this.removeListener();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.disabled !== this.props.disabled) {
            this.props.disabled ? this.removeListener() : this.addListener();
        }
    }
    render() {
        const { className, children } = this.props;
        return (React.createElement("div", { ref: this.childRef, className: className }, children));
    }
}
exports.ClickOutside = ClickOutside;
exports.default = ClickOutside;
