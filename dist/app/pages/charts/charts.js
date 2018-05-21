"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.ChartsPage = () => React.createElement(exports.TogglableSidebarLayout, null);
const react_splitter_layout_1 = require("react-splitter-layout");
const design_1 = require("../../design");
const drawer_1 = require("./drawer/drawer");
const toolbar_1 = require("./drawer/toolbar");
const react_router_dom_1 = require("react-router-dom");
class _TogglableSidebarLayout extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.state = {
            sidebarVisible: true
        };
    }
    toggleSidebar() { this.setState({ sidebarVisible: !this.state.sidebarVisible }); }
    render() {
        return (React.createElement(react_splitter_layout_1.default, { percentage: true, secondaryInitialSize: 25, style: { height: '100%', position: 'relative', display: 'flex', flexDirection: 'row' } },
            React.createElement(design_1.FillParent, null,
                React.createElement("h2", null, "1st Pane"),
                React.createElement("button", { onClick: this.toggleSidebar },
                    this.state.sidebarVisible && 'Hide Sidebar',
                    !this.state.sidebarVisible && 'Show Sidebar')),
            this.state.sidebarVisible &&
                React.createElement(design_1.FillParent, null,
                    React.createElement("h2", null, "2nd Pane"),
                    React.createElement(toolbar_1.ChartDrawerToolbar, null),
                    React.createElement(drawer_1.WorkDrawerRoutes, null))));
    }
}
exports.TogglableSidebarLayout = react_router_dom_1.withRouter(_TogglableSidebarLayout);
