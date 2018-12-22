import { HostAppView } from '@coglite/common/host';
import { observer } from 'mobx-react';
import * as React from 'react';

import { sampleRoutes, ISampleRoute } from './SampleRoutes';


interface SampleProps extends IAppHostProps {
    title?: string;
}


@observer
class SamplesHost extends React.Component<SampleProps, any> {
    private _onClickItem = (e, item) => {
        this.props.host.load({ path: item.path, replace: true });
    }
    private _updateHostTitle(props : SampleProps) {
        props.host.setTitle(props.title || "");
    }
    componentWillMount() {
        this._updateHostTitle(this.props);
    }
    componentWillReceiveProps(nextProps : SampleProps) {
        this._updateHostTitle(nextProps);
    }
    render() {
        const sampleGroups = sampleRoutes.map(sampleGroup => {
            
            const sampleItems = sampleGroup.items.map(item => {
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
                key: sampleGroup.key,
                name: sampleGroup.title,
                subMenuProps: {
                    items: sampleItems
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

const sampleRouteHandler = (sampleApp : ISampleRoute) : IRequestHandler => {
    return (req => {
        return sampleApp.moduleLoader().then(m => {
            const componentType = m[sampleApp.moduleComponent || "default"];
            if(!componentType) {
                throw { code: "NOT_FOUND", message: "Unable to resolve component type [Sample]"};
            }
            return (
                <SamplesHost host={req.app} title={sampleApp.title}>
                    {React.createElement(componentType, Object.assign({}, req, { host: req.host }))}
                </SamplesHost>
            );
        });
    });
};

export { SamplesHost, SampleProps, sampleRouteHandler }