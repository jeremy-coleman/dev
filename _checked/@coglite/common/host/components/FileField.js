"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typestyle_1 = require("typestyle");
const ux_1 = require("@coglite/common/ux");
const datakit_1 = require("@coglite/common/datakit");
const mobx_react_1 = require("mobx-react");
const fileFieldStyles = typestyle_1.stylesheet({
    root: {},
    wrapper: {},
    selector: {
        position: "relative",
        border: `1px solid a6a6a6`,
        minHeight: 32,
        width: "100%",
        $nest: {
            "&:focus": {
                border: `1px solid black`
            },
            "&:hover": {
                border: `1px solid 666666`
            }
        }
    },
    selectorAction: {
        background: 'white',
        outline: "none",
        textAlign: "left",
        padding: "4px 12px",
        border: "none",
        minHeight: 32,
        width: "100%",
        zIndex: 1
    },
    clearAction: {
        position: "absolute",
        top: 0,
        marginLeft: 0,
        right: 0,
        zIndex: 2
    }
});
class FileNameList1 extends React.Component {
    render() {
        if (this.props.files && this.props.files.length > 0) {
            const items = this.props.files.map((file, idx) => {
                return (React.createElement("div", { key: idx, className: "file-name" }, file.name));
            });
            return (React.createElement("div", { className: "file-name-list" }, items));
        }
        return null;
    }
}
let FileNameList = mobx_react_1.observer((props) => React.createElement(React.Fragment, null, props.files
    && props.files.length > 0
    && props.files.map((file, idx) => React.createElement("div", { className: "file-name-list" },
        React.createElement("div", { key: idx, className: "file-name" }, file.name)))));
const defaultFilesRenderer = (files) => React.createElement(FileNameList, { files: files });
class FileField extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this._onInputChange = (e) => {
            const files = [];
            const fileList = this.ref.current.files;
            const fl = fileList.length;
            for (let i = 0; i < fl; i++) {
                files.push(fileList.item(i));
            }
            if (this.props.onChange) {
                this.props.onChange(files);
            }
            this.setState({ files: files });
        };
        this._onFieldGroupClick = () => {
            if (this.ref.current) {
                this.ref.current.click();
            }
        };
        this._onClickClear = () => {
            this.setState({ files: null });
            if (this.props.onClear) {
                this.props.onClear();
            }
        };
        this.state = { files: this.props.files };
        this._id = datakit_1.getId("image-field");
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ files: nextProps.files || [] });
    }
    render() {
        const files = this.state.files;
        let clearAction = (React.createElement(ux_1.Button, { color: 'primary', variant: 'contained', className: fileFieldStyles.clearAction, onClick: this._onClickClear, disabled: !files },
            React.createElement(ux_1.MDFontIconOnly, { icon: 'clear' }),
            'Remove'));
        const r = this.props.onRenderFiles || defaultFilesRenderer;
        let selectContent = this.state.files && this.state.files.length > 0
            ? r(this.state.files)
            : this.props.onRenderSelect
                ? this.props.onRenderSelect()
                : this.props.defaultSelectText || `Select ${this.props.multiple ? "Files..." : "a File..."}`;
        return (React.createElement("div", { className: fileFieldStyles.root },
            React.createElement("input", { id: this._id, type: "file", accept: this.props.accept, onChange: this._onInputChange, ref: this.ref, value: "", multiple: this.props.multiple, hidden: true, style: { display: "none" }, disabled: this.props.disabled }),
            React.createElement("div", { className: fileFieldStyles.wrapper },
                this.props.label && React.createElement("label", { htmlFor: this._id }, this.props.label),
                React.createElement("div", { className: fileFieldStyles.selector },
                    React.createElement("button", { type: "button", className: fileFieldStyles.selectorAction, onClick: () => this.ref.current.click(), disabled: this.props.disabled }, selectContent),
                    clearAction))));
    }
}
exports.FileField = FileField;
