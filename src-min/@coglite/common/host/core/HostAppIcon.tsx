import { observer } from 'mobx-react';
import * as React from 'react';


//return <Avatar imageUrl={icon.url} imageAlt={icon.text} text={icon.text} hidePersonaDetails >{icon.text}</Avatar>;

@observer
class HostAppIcon extends React.Component<IAppHostBaseProps, any> {
    render() {
        const { host } = this.props;
        const icon = host.icon;
        if(icon.url || icon.text) {
           // return <Avatar>{icon.text}</Avatar>;
           return null
        }
        if(icon.name) {
            return <icon.name/>;
        }
        if(icon.component) {
            return icon.component;
        }
        return null;
    }
}


@observer
class HostAppIconContainer extends React.Component<IAppHostBaseProps, any> {
    private _onRenderIcon = () => {
        return <HostAppIcon {...this.props} />
    }
    render() {
        const { host } = this.props;
        const icon = host.icon;
        if(icon.url || icon.text || icon.name || icon.component) {
            return this._onRenderIcon;
        }
        return null;
    }
}

const appIconItem = (props : IAppHostBaseProps, key : string = "appIcon") => {
    return {
        key: key,
        onRender(action) {
            return <HostAppIconContainer key={action.key} {...props} />;
        }
    }
}

export { HostAppIcon, appIconItem }



//import { observer } from 'mobx-react';
//import * as React from 'react';

//probably needs ...props spread and deeper logicals
//let HostAppIcon = observer((props: IAppHostBaseProps) => 
//<>
//{props.host.icon && <props.host.icon.component/>}
//</>
//)

//export { HostAppIcon }