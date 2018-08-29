import * as React from "react";
import { observer } from "mobx-react";
import { HostAppView } from "@coglite/framework/common/component/HostAppView";

import { IAppHostProps } from "@coglite/framework/common/component/AppHost";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { homeApps } from "../homeRoutes";
import { IRequestHandler } from "@coglite/framework/common/IRequestHandler";
import { IHomeApp } from "../IHomeApp";


interface IHomeHostAppViewProps extends IAppHostProps {
    title?: string;
}


@observer
class HomeHostAppView extends React.Component<IHomeHostAppViewProps, any> {
    private _onClickItem = (e, item) => {
        this.props.host.load({ path: item.path, replace: true });
    }
    private _updateHostTitle(props : IHomeHostAppViewProps) {
     if (props.title){   
        props.host.setTitle(props.title || "");
    }
    else void 0
    }
    componentWillMount() {
        this._updateHostTitle(this.props);
    }
    componentWillReceiveProps(nextProps : IHomeHostAppViewProps) {
        this._updateHostTitle(nextProps);
    }
    render() {
        const homeAppGroups = homeApps.map(homeAppGroup => {
            const groupItem : IContextualMenuItem = {
                key: homeAppGroup.key,
                name: homeAppGroup.title
            };
            const homeAppItems = homeAppGroup.items.map(item => {
                return {
                    key: item.path,
                    path: item.path,
                    name: item.title,
                    canCheck: true,
                    checked: this.props.host.path === item.path,
                    onClick: this._onClickItem
                }
            });
            groupItem.subMenuProps = {
                items: homeAppItems
            };
            return groupItem;
        });
        const items : IContextualMenuItem[] = [];
        
        items.push(
            {
                key: "title",
                name: this.props.host.title,
                subMenuProps: {
                    items: homeAppGroups
                }
            }
        );
        
        return (
            <HostAppView host={this.props.host}>
                {this.props.children}
            </HostAppView>
        );
    }
}

const homeAppHandler = (homeApp : IHomeApp) : IRequestHandler => {
    return (req => {
        return homeApp.moduleLoader().then(m => {
            const componentType = m[homeApp.moduleComponent || "default"];
            if(!componentType) {
                throw { code: "NOT_FOUND", message: "Unable to resolve component type"};
            }
            return (
                <HomeHostAppView host={req.app} title={homeApp.title}>
                    {React.createElement(componentType, Object.assign({}, req, { host: req.host }))}
                </HomeHostAppView>
            );
        });
    });
};

export { IHomeHostAppViewProps, HomeHostAppView, IAppHostProps, homeAppHandler }