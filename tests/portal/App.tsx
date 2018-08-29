//import { DashboardListAppView } from "@coglite/framework/dashboard/DashboardListAppView";
import { DashboardListAppView } from "@coglite/framework/dashboard/component/DashboardListAppView";

import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import { IOzoneAppProps } from "./common/component/IOzoneAppProps";
import { createUserProfileMenu } from "./user/component/UserProfileMenuHelper";
import { DashboardListStore } from './Storage';


class DashboardPortal extends React.Component<IOzoneAppProps, any> {
    
    get host() {return this.props.match.host}

    get userProfile() {return this.props.match.userProfile}

    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "back",
                text: "<"
            },
                        {
                key: "forward",
                text: ">"
            },
            {
                key: "brand",
                text: "Coglite"
            }
        ];

        const farItems : IContextualMenuItem[] = [];
        
        if(this.userProfile) {
            const userProfileItem = createUserProfileMenu(this.userProfile);
            farItems.push(userProfileItem);
        }

        return (
            <DashboardListAppView 
                dashboardList={DashboardListStore}
                host={this.host}
                commandBarProps={{ items: items, farItems: farItems }}
            />
        );
    }
}

export { DashboardPortal, DashboardPortal as default };
