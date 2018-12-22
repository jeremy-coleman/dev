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
const vsplitStyles = typestyle_1.stylesheet({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    splitter: {
        cursor: "ns-resize",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        backgroundColor: ux_1.defaultTheme.palette.themeDark,
        left: 0,
        right: 0
    },
    splitterHandle: {
        position: "absolute",
        top: -2,
        right: 0,
        bottom: -2,
        left: 0,
        overflow: "hidden",
        backgroundColor: "transparent",
        color: ux_1.defaultTheme.palette.themeDark,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        transition: "background-color 0.3s ease",
        $nest: {
            "$:hover": {
                backgroundColor: ux_1.defaultTheme.palette.themeDark,
                opacity: 0.5,
            },
            ".vsplit-icon": {
                fontSize: '10px',
                visibility: "hidden",
                color: ux_1.defaultTheme.palette.white
            },
            "&.active": {
                backgroundColor: ux_1.defaultTheme.palette.themeDark,
                opacity: 1.0,
                $nest: {
                    ".vsplit-icon": {
                        visibility: "visible"
                    }
                }
            }
        }
    },
    topPane: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        overflow: "hidden"
    },
    topContent: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "auto"
    },
    bottomPane: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        overflow: "hidden"
    },
    bottomContent: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "auto"
    }
});
let VSplit = class VSplit extends React.Component {
    constructor() {
        super(...arguments);
        this.ref = React.createRef();
        this.splitterRef = React.createRef();
        this._resize = (e) => {
            const minItemHeight = this.props.vsplit.minItemHeight;
            const bounds = this.ref.current.getBoundingClientRect();
            const splitterBounds = this.splitterRef.current.getBoundingClientRect();
            const max = bounds.height - splitterBounds.height - minItemHeight;
            let splitterPos = e.clientY - bounds.top;
            if (splitterPos <= minItemHeight) {
                splitterPos = minItemHeight;
            }
            else if (splitterPos >= max) {
                splitterPos = max;
            }
            const offset = splitterPos / bounds.height;
            this.props.vsplit.setOffset(offset);
        };
        this._onDocumentMouseUp = (e) => {
            this.ref.current.ownerDocument.removeEventListener("mousemove", this._onDocumentMouseMove);
            this.ref.current.ownerDocument.removeEventListener("mouseup", this._onDocumentMouseUp);
            this.props.vsplit.setSplitActive(false);
        };
        this._onDocumentMouseMove = (e) => {
            e.preventDefault();
            this._resize(e);
        };
        this._onSplitterMouseDown = (e) => {
            e.preventDefault();
            this.ref.current.ownerDocument.addEventListener("mousemove", this._onDocumentMouseMove);
            this.ref.current.ownerDocument.addEventListener("mouseup", this._onDocumentMouseUp);
            this.props.vsplit.setSplitActive(true);
        };
    }
    _renderTopPane() {
        const { vsplit } = this.props;
        return (React.createElement("div", { className: vsplitStyles.topPane, style: { height: vsplit.topHeight } },
            React.createElement("div", { className: vsplitStyles.topContent },
                React.createElement(ComponentView_1.ComponentView, { component: vsplit.top }))));
    }
    _renderSplitter() {
        const { vsplit } = this.props;
        return (React.createElement("div", { className: ux_1.css(vsplitStyles.splitter, { active: vsplit.splitActive }), onMouseDown: this._onSplitterMouseDown, style: { top: vsplit.topHeight, height: vsplit.splitterHeight }, ref: this.splitterRef },
            React.createElement("div", { className: ux_1.css(vsplitStyles.splitterHandle, { active: vsplit.splitActive }) })));
    }
    _renderBottomPane() {
        const { vsplit } = this.props;
        return (React.createElement("div", { className: vsplitStyles.bottomPane, style: { height: vsplit.bottomHeight } },
            React.createElement("div", { className: vsplitStyles.bottomContent },
                React.createElement(ComponentView_1.ComponentView, { component: vsplit.bottom }))));
    }
    render() {
        return (React.createElement("div", { className: vsplitStyles.root, ref: this.ref },
            this._renderTopPane(),
            this._renderSplitter(),
            this._renderBottomPane()));
    }
};
VSplit = __decorate([
    mobx_react_1.observer
], VSplit);
exports.VSplit = VSplit;
class VSplitViewFactory {
    createView(comp) {
        return React.createElement(VSplit, { vsplit: comp });
    }
}
exports.VSplitViewFactory = VSplitViewFactory;
