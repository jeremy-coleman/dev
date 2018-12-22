"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ux_1 = require("@coglite/common/ux");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const typestyle_1 = require("typestyle");
const ComponentView_1 = require("./ComponentView");
const hsplitStyles = typestyle_1.stylesheet({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    splitter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        backgroundColor: 'black'
    },
    splitterHandle: {
        cursor: "ew-resize",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: -2,
        right: -2,
        overflow: "hidden",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        transition: "background-color 0.3s ease",
        $nest: {
            ":hover": {
                backgroundColor: 'black',
                opacity: 0.5,
            },
            ".hsplit-icon": {
                fontSize: '10px',
                visibility: "hidden",
                color: 'white'
            },
            "&.active": {
                backgroundColor: 'black',
                opacity: 1.0,
                $nest: {
                    ".hsplit-icon": {
                        visibility: "visible"
                    }
                }
            }
        }
    },
    leftPane: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        overflow: "hidden"
    },
    leftContent: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "auto"
    },
    rightPane: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        overflow: "hidden"
    },
    rightContent: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "auto"
    }
});
let HSplit = class HSplit extends React.Component {
    constructor() {
        super(...arguments);
        this.ref = React.createRef();
        this.splitterRef = React.createRef();
        this._onDocumentMouseUp = (e) => {
            this.ref.current.ownerDocument.removeEventListener("mousemove", this._onDocumentMouseMove);
            this.ref.current.ownerDocument.removeEventListener("mouseup", this._onDocumentMouseUp);
            this.props.hsplit.setSplitActive(false);
        };
        this._onDocumentMouseMove = (e) => {
            e.preventDefault();
            this._resize(e);
        };
        this._onSplitterMouseDown = (e) => {
            e.preventDefault();
            this.ref.current.ownerDocument.addEventListener("mousemove", this._onDocumentMouseMove);
            this.ref.current.ownerDocument.addEventListener("mouseup", this._onDocumentMouseUp);
            this.props.hsplit.setSplitActive(true);
        };
    }
    _resize(e) {
        const minItemWidth = this.props.hsplit.minItemWidth;
        const bounds = this.ref.current.getBoundingClientRect();
        const splitterBounds = this.splitterRef.current.getBoundingClientRect();
        const max = bounds.width - splitterBounds.width - minItemWidth;
        let splitterPos = e.clientX - bounds.left;
        if (splitterPos <= minItemWidth) {
            splitterPos = minItemWidth;
        }
        else if (splitterPos >= max) {
            splitterPos = max;
        }
        const offset = splitterPos / bounds.width;
        this.props.hsplit.setOffset(offset);
    }
    _renderLeftPane() {
        const { hsplit } = this.props;
        return (React.createElement("div", { className: hsplitStyles.leftPane, style: { width: hsplit.leftWidth } },
            React.createElement("div", { className: hsplitStyles.leftContent },
                React.createElement(ComponentView_1.ComponentView, { component: hsplit.left }))));
    }
    _renderSplitter() {
        const { hsplit } = this.props;
        return (React.createElement("div", { className: ux_1.css(hsplitStyles.splitter, { active: hsplit.splitActive }), onMouseDown: this._onSplitterMouseDown, style: { left: hsplit.leftWidth, width: hsplit.splitterWidth }, ref: this.splitterRef },
            React.createElement("div", { className: ux_1.css(hsplitStyles.splitterHandle, { active: hsplit.splitActive }) })));
    }
    _renderRightPane() {
        const { hsplit } = this.props;
        return (React.createElement("div", { className: hsplitStyles.rightPane, style: { left: hsplit.leftWidth + hsplit.splitterWidth, width: hsplit.rightWidth } },
            React.createElement("div", { className: hsplitStyles.rightContent },
                React.createElement(ComponentView_1.ComponentView, { component: hsplit.right }))));
    }
    render() {
        return (React.createElement("div", { className: hsplitStyles.root, ref: this.ref },
            this._renderLeftPane(),
            this._renderSplitter(),
            this._renderRightPane()));
    }
};
HSplit = __decorate([
    mobx_react_1.observer
], HSplit);
exports.HSplit = HSplit;
class HSplitViewFactory {
    constructor() {
        this.className = void 0;
    }
    createView(comp) {
        return React.createElement(HSplit, { hsplit: comp, className: this.className });
    }
}
exports.HSplitViewFactory = HSplitViewFactory;
