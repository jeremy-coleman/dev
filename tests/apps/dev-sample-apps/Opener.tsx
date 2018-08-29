import * as React from "react";
import { observer } from "mobx-react";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { AppLink } from "@coglite/framework/common/component/AppLink";
import { IAppHost } from "@coglite/framework/common/IAppHost";
import { IAppHostProps } from "../Home/HomeHostAppView";
import { BoundTextField } from "@coglite/framework/common/component/BoundTextField";


interface IAppHostDetailsProps {
    host: IAppHost;
}

@observer
class AppHostDetails extends React.Component<IAppHostDetailsProps, any> {
    private _onClose = () => {
        this.props.host.close();
    }
    render() {
        return (
            <div style={{ margin: 8, padding: 8, border: "1px solid #cccccc" }}>
                <div style={{ paddingTop: 8, paddingBottom: 8 }}>Host Id: {this.props.host.id}</div>
                <BoundTextField label="Window Title" binding={{ target: this.props.host, key: "title" }} />
                <PrimaryButton onClick={this._onClose}>Close Host</PrimaryButton>
            </div>
        );
    }
}

class Opener extends React.Component<IAppHostProps, any> {
    private _beforeUnloadHandler;
    constructor(props : IAppHostProps) {
        super(props);
        this.state = { openHosts: [] };
    }
    private _onHostOpened = (host : IAppHost) => {
        this._beforeUnloadHandler = () => {
            this._onHostClosed(host);
        };
        host.addEventListener("beforeunload", this._beforeUnloadHandler);
        const openHosts = [host].concat(this.state.openHosts);
        this.setState({ openHosts: openHosts });
    }
    private _onHostClosed = (host : IAppHost) => {
        host.removeEventListener("beforeunload", this._beforeUnloadHandler);
        const openHosts = [].concat(this.state.openHosts);
        const idx = openHosts.indexOf(host);
        if(idx >= 0) {
            openHosts.splice(idx, 1);
            this.setState({ openHosts: openHosts });
        }
    }
    render() {
        return (
            <div>
                <div style={{ padding: 8 }}>
                    <AppLink host={this.props.host} request={{ path: "/samples/core/opener" }} open onHostOpened={this._onHostOpened}>Open Another Opener</AppLink>
                </div>
                <div style={{ padding: 8 }}>
                    <AppLink host={this.props.host} request={{ path: "/samples/core/opener", makeActive: true }} open onHostOpened={this._onHostOpened}>Open Another Opener and make active</AppLink>
                </div>
                <div>
                    {this.state.openHosts.map((h, idx) => {
                       return <AppHostDetails key={idx} host={h} />; 
                    })}
                </div>
            </div>
        );
    }
}

export { Opener, Opener as default }