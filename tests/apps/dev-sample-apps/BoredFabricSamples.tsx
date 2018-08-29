import * as React from "react";
import { DashboardWrapper } from "@coglite/framework/dashboard/component/DashboardWrapper";
import { IAppProps } from "@coglite/framework/common/component/IAppProps";
import { createHomeRouter } from "../HomeRouter";
//import { PortalRouter } from "../portal/PortalRouter";
import { observer } from "mobx-react";
import { OzoneRouter } from "@coglite/framework/ozone/Router";

const dashboardRouter = createHomeRouter();
dashboardRouter.use(OzoneRouter);



@observer
class StackSample extends React.Component<IAppProps, any> {
    render() {
        const dashboardConfig = {
            type: "dashboard",
            component: {
                type: "stack",
                closeDisabled: false,
                windows: [
                    {
                        type: "window",
                        path: "/samples/core/opener"
                    },
                    {
                        type: "window",
                        path: "/samples/core/details"
                    },
                    {
                        type: "window",
                        path: "/samples/core/form"
                    }
                ]
            }
        };
        return (
            <DashboardWrapper host={this.props.host} config={dashboardConfig} router={dashboardRouter} addApp={{ path: "/home" }} />
        );
    }
}

class HSplitSample extends React.Component<IAppProps, any> {
    render() {
        const dashboardConfig = {
            type: "dashboard",
            component: {
                type: "hsplit",
                offset: 0.5,
                left: {
                    component: {
                        type: "window",
                        path: "/samples/core/opener"
                    }
                },
                right: {
                    component: {
                        type: "window",
                        path: "/samples/core/details"
                    }
                }
            }
        };
        return (
            <DashboardWrapper host={this.props.host} config={dashboardConfig} router={dashboardRouter} />
        );
    }
}

class HSplitLeftWidthSetExample extends React.Component<IAppProps, any> {
    render() {
        const dashboardConfig = {
            type: "dashboard",
            component: {
                type: "hsplit",
                leftWidth: 100,
                left: {
                    component: {
                        type: "window",
                        path: "/samples/core/opener"
                    }
                },
                right: {
                    component: {
                        type: "window",
                        path: "/samples/core/details"
                    }
                }
            }
        };
        return (
            <DashboardWrapper host={this.props.host} config={dashboardConfig} router={dashboardRouter} />
        );
    }
}

class VSplitSample extends React.Component<IAppProps, any> {
    render() {
        const dashboardConfig = {
            type: "dashboard",
            component: {
                type: "vsplit",
                offset: 0.5,
                top: {
                    component: {
                        type: "window",
                        path: "/samples/core/opener"
                    }
                },
                bottom: {
                    component: {
                        type: "window",
                        path: "/samples/core/details"
                    }
                }
            }
        };
        return (
            <DashboardWrapper host={this.props.host} config={dashboardConfig} router={dashboardRouter} />
        );
    }
}

class VSplitTopHeightSetExample extends React.Component<IAppProps, any> {
    render() {
        const dashboardConfig = {
            type: "dashboard",
            component: {
                type: "vsplit",
                topHeight: 100,
                top: {
                    component: {
                        type: "window",
                        path: "/samples/core/opener"
                    }
                },
                bottom: {
                    component: {
                        type: "window",
                        path: "/samples/core/details"
                    }
                }
            }
        };
        return (
            <DashboardWrapper host={this.props.host} config={dashboardConfig} router={dashboardRouter} />
        );
    }
}

class GridSample extends React.Component<IAppProps, any> {
    render() {
        const dashboardConfig = {
            type: "dashboard",
            component: {
                type: "grid",
                windows: [
                    {
                        type: "window",
                        path: "/samples/core/opener"
                    },
                    {
                        type: "window",
                        path: "/samples/core/details"
                    }
                ]
            }
        };
        return (
            <DashboardWrapper host={this.props.host} config={dashboardConfig} router={dashboardRouter} />
        );
    }
}

export {
    StackSample,
    HSplitSample,
    HSplitLeftWidthSetExample,
    VSplitSample,
    VSplitTopHeightSetExample,
    GridSample
}