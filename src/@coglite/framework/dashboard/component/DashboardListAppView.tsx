import * as React from "react";
import { observer } from "mobx-react"; 
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { HostAppView } from "@coglite/framework/common/component/HostAppView";
import { DashboardListContainer } from "./DashboardList";
import { createCommandBarMenuItem } from "./DashboardMenuHelper";
import { createDashboardListMenu, createDashboardListLayoutActions } from "./DashboardLayoutMenuHelper";
import { IHostAppViewProps } from "@coglite/framework/common/component/HostAppView";
import { IDashboardList } from "../model/IDashboardList";

interface IDashboardListAppViewProps extends IHostAppViewProps {
    dashboardList: IDashboardList;
}

@observer
class DashboardListAppView extends React.Component<IDashboardListAppViewProps, any> {
    componentWillMount() {
        this.props.dashboardList.load();
    }
    render() {
        const { dashboardList } = this.props;
        const items : IContextualMenuItem[] = [
            createCommandBarMenuItem(dashboardList)
        ];
        const layoutItem = createDashboardListMenu(dashboardList);
        if(layoutItem) {
            items.push(layoutItem);
        }
        const actionItems = createDashboardListLayoutActions(dashboardList);
        if(actionItems) {
            actionItems.forEach(i => items.push(i));
        }
        const commandBarProps = Object.assign({}, this.props.commandBarProps);
        commandBarProps.items = commandBarProps.items ? commandBarProps.items.concat(items) : items;
        return (
            <HostAppView {...this.props} commandBarProps={commandBarProps}>
                <DashboardListContainer dashboardList={dashboardList} host={this.props.host} />
                {this.props.children}
            </HostAppView>
        );
    }
}

export { IDashboardListAppViewProps, DashboardListAppView }