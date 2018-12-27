"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
const SampleRoutes_1 = require("./SampleRoutes");
const SamplesHost_1 = require("./SamplesHost");
const Home_1 = require("../Home");
exports.Sample = mobx_react_1.observer((props) => React.createElement(SamplesHost_1.SamplesHost, { host: props.host, title: "Samples" },
    React.createElement("div", { style: { padding: 8 } },
        React.createElement("h2", null, "Samples"),
        React.createElement("div", null, SampleRoutes_1.sampleRoutes.map(group => React.createElement("div", { key: group.key },
            React.createElement("h3", null, group.title),
            React.createElement("div", { style: { display: "flex", flexWrap: "wrap", padding: 8 } }, group.items.map(item => React.createElement(Home_1.TileLink, { key: item.path, host: props.host, request: Object.assign({}, item, { replace: true }) })))))))));
