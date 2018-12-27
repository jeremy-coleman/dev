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
const constants_1 = require("../constants");
const windowStyles = typestyle_1.stylesheet({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: ux_1.defaultTheme.palette.common.white,
        borderColor: ux_1.defaultTheme.palette.neutralSecondary,
        borderStyle: "solid",
        $nest: {
            "&.content-hidden": {
                height: 28
            },
            "&.maximized": {
                zIndex: 4
            }
        }
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "flex-start",
        cursor: "pointer",
        overflow: "hidden",
        backgroundColor: ux_1.defaultTheme.palette.neutralSecondary,
        color: ux_1.defaultTheme.palette.common.white
    },
    titleContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "hidden",
        paddingLeft: 8,
        paddingRight: 8
    },
    title: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
    action: {
        color: ux_1.defaultTheme.palette.white,
        height: 28,
        width: 28,
        lineHeight: 28,
        cursor: "pointer",
        padding: "0px",
        outline: "none",
        border: "none",
        background: "transparent",
        $nest: {
            ":hover": {
                color: ux_1.defaultTheme.palette.white,
                backgroundColor: ux_1.defaultTheme.palette.neutralTertiary
            },
            "&.close-action": {
                $nest: {
                    ":hover": {
                        color: ux_1.defaultTheme.palette.white,
                        backgroundColor: ux_1.defaultTheme.palette.redDark
                    }
                }
            },
            "& .window-action-icon": {
                lineHeight: "16px",
                fontSize: '10px',
                fontWeight: 400,
                margin: "0px",
                height: "16px",
                width: "16px"
            }
        }
    },
    actionBar: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    body: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        overflow: "auto",
        backgroundColor: ux_1.defaultTheme.palette.white,
        $nest: {
            "&.content-hidden": {
                height: 0,
                overflow: "hidden"
            }
        }
    },
    resize: {
        $nest: {
            "&.top": {
                position: "absolute",
                zIndex: 2,
                top: -2,
                height: 5,
                left: 0,
                right: 0,
                cursor: "n-resize"
            },
            "&.right": {
                position: "absolute",
                zIndex: 2,
                right: -2,
                width: 5,
                top: 0,
                bottom: 0,
                cursor: "e-resize"
            },
            "&.bottom": {
                position: "absolute",
                zIndex: 2,
                bottom: -2,
                height: 5,
                left: 0,
                right: 0,
                cursor: "s-resize"
            },
            "&.left": {
                position: "absolute",
                zIndex: 2,
                left: -2,
                width: 5,
                top: 0,
                bottom: 0,
                cursor: "w-resize"
            },
            "&.topLeft": {
                position: "absolute",
                zIndex: 3,
                left: -4,
                top: -4,
                width: 10,
                height: 10,
                cursor: "nw-resize"
            },
            "&.topRight": {
                position: "absolute",
                zIndex: 3,
                right: -4,
                top: -4,
                width: 10,
                height: 10,
                cursor: "ne-resize"
            },
            "&.bottomLeft": {
                position: "absolute",
                zIndex: 3,
                left: -4,
                bottom: -4,
                width: 10,
                height: 10,
                cursor: "sw-resize"
            },
            "&.bottomRight": {
                position: "absolute",
                zIndex: 3,
                right: -4,
                bottom: -4,
                width: 10,
                height: 10,
                cursor: "se-resize"
            }
        }
    }
});
let WindowCloseAction = class WindowCloseAction extends React.Component {
    constructor() {
        super(...arguments);
        this._onMouseDown = (e) => {
            e.stopPropagation();
        };
        this._onClick = (e) => {
            e.stopPropagation();
            this.props.window.close();
        };
    }
    render() {
        if (this.props.window && !this.props.window.closeDisabled) {
            return (React.createElement("i", { className: ux_1.css(this.props.className, "close-action"), title: `Close ${this.props.window.title || "App"}`, onClick: this._onClick, onMouseDown: this._onMouseDown },
                React.createElement(ux_1.MDFontIconOnly, { icon: 'close' })));
        }
        return null;
    }
};
WindowCloseAction = __decorate([
    mobx_react_1.observer
], WindowCloseAction);
let WindowMaximizeAction = class WindowMaximizeAction extends React.Component {
    constructor() {
        super(...arguments);
        this._onMouseDown = (e) => {
            e.stopPropagation();
        };
        this._onClick = (e) => {
            e.stopPropagation();
            this.props.window.setMaximized(!this.props.window.maximized);
        };
    }
    render() {
        if (this.props.window) {
            return (React.createElement("i", { className: ux_1.css(this.props.className, "maximize-action"), title: this.props.window.maximized ? "Restore" : "Maximize", onClick: this._onClick, onMouseDown: this._onMouseDown }, this.props.window.maximized ? React.createElement(ux_1.MDFontIconOnly, { icon: 'arrow_back' }) : React.createElement(ux_1.MDFontIconOnly, { icon: 'fullscreen' })));
        }
        return null;
    }
};
WindowMaximizeAction = __decorate([
    mobx_react_1.observer
], WindowMaximizeAction);
let Window = class Window extends React.Component {
    constructor() {
        super(...arguments);
        this.ref = React.createRef();
        this._canDrag = false;
        this._onHeaderMouseDown = (e) => {
            if (this.props.window.settings.draggable) {
                this._canDrag = true;
                this.ref.current.draggable = true;
                const bounds = this.ref.current.getBoundingClientRect();
                this._dragOffsetX = e.clientX - bounds.left;
                this._dragOffsetY = e.clientY - bounds.top;
            }
        };
        this._onHeaderDoubleClick = (e) => {
            const { window } = this.props;
            window.setMaximized(!window.maximized);
        };
        this._onMouseUp = (e) => {
            this._canDrag = false;
        };
        this._onDragStart = (e) => {
            if (this._canDrag) {
                e.stopPropagation();
                const transferText = String(JSON.stringify(this.props.window.config));
                e.dataTransfer.setData("text", transferText);
                window.setTimeout(() => {
                    this.props.window.dragStart({ offsetX: this._dragOffsetX, offsetY: this._dragOffsetY });
                }, 1);
            }
            else {
                e.preventDefault();
            }
        };
        this._onDragEnd = (e) => {
            this._canDrag = false;
            this.ref.current.draggable = false;
            this.props.window.dragEnd();
        };
        this._onResizeDragEnd = (e) => {
            this.props.window.resizeEnd();
        };
    }
    _resizeDragStartHandler(type) {
        return (e) => {
            e.stopPropagation();
            e.dataTransfer.setData("text", "Resizing Window " + this.props.window.id);
            window.setTimeout(() => {
                this.props.window.resizeStart(type);
            }, 1);
        };
    }
    _renderTitle() {
        return (React.createElement("div", { className: windowStyles.titleContainer },
            React.createElement("div", { className: windowStyles.title }, this.props.window.title)));
    }
    _renderActionBar() {
        return (React.createElement("div", { className: windowStyles.actionBar },
            React.createElement(WindowMaximizeAction, Object.assign({}, this.props, { className: ux_1.css(windowStyles.action, "maximize-action") })),
            React.createElement(WindowCloseAction, Object.assign({}, this.props, { className: ux_1.css(windowStyles.action, "close-action") }))));
    }
    _renderHeader() {
        if (this.props.window.settings.headerHeight > 0) {
            return (React.createElement("div", { className: windowStyles.header, onMouseDown: this._onHeaderMouseDown, onDoubleClick: this._onHeaderDoubleClick, style: {
                    top: 0,
                    right: 0,
                    left: 0,
                    height: this.props.window.settings.headerHeight
                } },
                this._renderTitle(),
                this._renderActionBar()));
        }
        return null;
    }
    _renderBody() {
        return (React.createElement("div", { className: ux_1.css(windowStyles.body, { "content-hidden": this.props.window.contentHidden }), style: {
                top: this.props.window.settings.headerHeight,
                right: 0,
                bottom: 0,
                left: 0
            } }, this.props.children));
    }
    _renderResizeHandle(resizeType) {
        if (this.props.window.settings.resizable && !this.props.window.maximized) {
            return (React.createElement("div", { className: ux_1.css(windowStyles.resize, resizeType), draggable: true, onDragStart: this._resizeDragStartHandler(resizeType), onDragEnd: this._onResizeDragEnd }));
        }
        return null;
    }
    render() {
        const { window, className } = this.props;
        const { draggable } = window.settings;
        return (React.createElement("div", { className: ux_1.css(windowStyles.root, { maximized: window.maximized }), style: {
                borderWidth: window.settings.borderWidth
            }, onDragStart: draggable ? this._onDragStart : undefined, onDragEnd: draggable ? this._onDragEnd : undefined, ref: this.ref },
            this._renderHeader(),
            this._renderBody(),
            this._renderResizeHandle(constants_1.WindowResizeType.top),
            this._renderResizeHandle(constants_1.WindowResizeType.right),
            this._renderResizeHandle(constants_1.WindowResizeType.bottom),
            this._renderResizeHandle(constants_1.WindowResizeType.left),
            this._renderResizeHandle(constants_1.WindowResizeType.topRight),
            this._renderResizeHandle(constants_1.WindowResizeType.topLeft),
            this._renderResizeHandle(constants_1.WindowResizeType.bottomRight),
            this._renderResizeHandle(constants_1.WindowResizeType.bottomLeft)));
    }
};
Window = __decorate([
    mobx_react_1.observer
], Window);
exports.Window = Window;
