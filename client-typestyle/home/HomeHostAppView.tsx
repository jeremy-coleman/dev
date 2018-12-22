import { HostAppView } from '@coglite/common/host';
import { observer } from 'mobx-react';
import * as React from 'react';

import { homeRoutes, IHomeRoute } from './HomeRoutes';


import {MDFontIconOnly} from '@coglite/common/ux'

interface IHomeHostAppViewProps extends IAppHostProps {
    title?: string;
    tabIcon?: any
}


@observer
class HomeHostAppView extends React.Component<IHomeHostAppViewProps, any> {
    // protected get iconName() : string {
    //     return "Close";
    // }
    
    private _onClickItem = (e, item) => {
        this.props.host.load({ path: item.path, replace: true });
    }
    private _updateHostTitle(props : IHomeHostAppViewProps) {
        props.host.setTitle(props.title || "");
    }



    private _updateHostTabIcon(props : IHomeHostAppViewProps) {
        //props.host.icon.text = props.title.substring(0, 1)
        props.host.icon.component = <MDFontIconOnly icon={'home'}/>
        //props.host.icon.component = <Home/>
    }

    componentWillMount() {
        this._updateHostTitle(this.props);
        this._updateHostTabIcon(this.props)
        //this.props.host.icon.name = this.iconName;
        //this.props.host.icon.component = <Home/>
    }

    componentWillReceiveProps(nextProps : IHomeHostAppViewProps) {
        this._updateHostTitle(nextProps);
        this._updateHostTabIcon(this.props)
    }

    render() {
        const homeAppGroups = homeRoutes.map(homeAppGroup => {
            
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
           
            const groupItem = {
                key: homeAppGroup.key,
                name: homeAppGroup.title,
                subMenuProps: {
                    items: homeAppItems
                }
            };

            return groupItem;

        });

        
        
        return (
            <HostAppView host={this.props.host}>
                {this.props.children}
            </HostAppView>
        );
    }
}

const homeAppHandler = (homeRouteKeys : IHomeRoute) : IRequestHandler => {
    return (req => {
        return homeRouteKeys.moduleLoader().then(m => {
            const componentType = m[homeRouteKeys.moduleComponent || "default"];
            if(!componentType) {
                throw { code: "NOT_FOUND", message: "Unable to resolve component type [HomeHostAppView]"};
            }
            return (
                <HomeHostAppView host={req.app} title={homeRouteKeys.title} tabIcon={homeRouteKeys.tabIcon}>
                    {React.createElement(componentType, Object.assign({}, req, { host: req.host }))}
                </HomeHostAppView>
            );
        });
    });
};

export { IHomeHostAppViewProps, HomeHostAppView, homeAppHandler }