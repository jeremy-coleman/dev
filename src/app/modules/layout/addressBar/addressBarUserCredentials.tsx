import * as React from 'react';
const remote = require('electron').remote;


export class AddressBarUserCredentials extends React.Component<any, any> {


componentWillMount() {
      //  window.addEventListener('keypress', (e) => this.onKeyPress(e));
     //   this.settingsUnsubscribe = () => {this.forceUpdate(); };
}

componentWillUnmount() {
        window.removeEventListener('keypress', (e) => this.onKeyPress(e));
}

appIdChanged = (text: string) => {
        const settings = null;
        console.log(settings + 'address bar app settings')
}

appPasswordChanged = (text: string) => {
        const settings = null;
        console.log(settings + 'address bar password settings')
    }

localeChanged = (text: string) => {
        const settings = null;
        console.log(settings + 'address bar location settings')
}

connectToKernel = () => {
        const settings = null;
        console.log(settings + 'address bar connect settings')
    }

onKeyPress = (e: any) => {
        if (!this.isVisible())
            return;
        if(e.key && e.key === 'Enter') {
            this.connectToKernel();}
}

isVisible = (): boolean => false

render() {

        return (
            <div className={"addressbar-usercreds"}>
                <div className="input-group">
                    <label
                        className="form-label">
                         ID:
                    </label>
                    <input
                        type="text"
                        className="form-input addressbar-usercreds-input addressbar-usercreds-appid"
                        value={"TODO"}
                        onChange={e => this.appIdChanged((e.target as any).value)} />
                </div>
                <div className="input-group">
                    <label
                        className="form-label">
                         Password:
                    </label>
                    <input
                        type="password"
                        className="form-input addressbar-usercreds-input addressbar-usercreds-password"
                        value={"TODO"}
                        onChange={e => this.appPasswordChanged((e.target as any).value)} />
                </div>
                <div className="input-group">
                    <label
                        className="form-label">
                        Locale:
                    </label>
                    <input
                        type="text"
                        className="form-input addressbar-usercreds-input addressbar-usercreds-locale"
                        value={"settings.addressBar.selectedTODO.locale" || remote.app.getLocale()}
                        onChange={e => this.localeChanged((e.target as any).value)} />
                </div>
                <div className="input-group">
                    <button
                        className="addressbar-usercreds-connect-button"
                        onClick={() => this.connectToKernel()}>
                        Connect
                    </button>
                </div>
                <div className="addressbar-usercreds-callout" />
            </div>
        );
    }
}
