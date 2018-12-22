"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const host_1 = require("@coglite/common/host");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const HomeHostAppView_1 = require("./HomeHostAppView");
const HomeRoutes_1 = require("./HomeRoutes");
const ux_1 = require("@coglite/common/ux");
const typestyle_1 = require("typestyle");
let T = typestyle_1.stylesheet({
    Outline: {
        position: "relative",
        width: 100,
        height: 100,
        margin: 10,
        boxShadow: "0 0 5px 0px rgba(0,0,0,0.4)"
    },
    TopHalf: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0, right: 0, left: 0, height: 60,
        backgroundColor: 'white'
    },
    Title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 8
    },
    BottomHalf: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        fontSize: 10,
        top: 60,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        color: 'white'
    }
});
exports.TileLink = mobx_react_1.observer((props) => {
    return (React.createElement(host_1.AppLink, { host: props.host, request: props.request, style: { textDecoration: "none" }, title: props.request.title },
        React.createElement("div", { className: T.Outline },
            React.createElement("div", { className: T.TopHalf },
                React.createElement(ux_1.MDFontIconOnly, { icon: 'screen_share_outline' })),
            React.createElement("div", { className: T.BottomHalf },
                React.createElement("div", { className: T.Title }, props.request.title)))));
});
exports.Home = mobx_react_1.observer((props) => React.createElement(HomeHostAppView_1.HomeHostAppView, { host: props.host, title: "Home" },
    React.createElement("div", null,
        React.createElement("div", { style: { padding: 8 } },
            React.createElement("h2", null, "Home"),
            React.createElement("div", null, HomeRoutes_1.homeRoutes.map(group => React.createElement("div", { key: group.key },
                React.createElement("h3", null, group.title),
                React.createElement("div", { style: { display: "flex", flexWrap: "wrap", padding: 8 } }, group.items.map(item => (React.createElement(exports.TileLink, { key: item.path, host: props.host, request: Object.assign({}, item, { replace: true }) })))))))))));
