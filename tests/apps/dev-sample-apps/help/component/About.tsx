import { observer } from "mobx-react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import * as React from "react";
import {IHandleModel} from "../../../../stores/handles";
import "./About.scss";


@observer
class About extends React.Component<any, any> {
    render() {
        return (
            <div className="about">
                <div className="about-main">
                    <div className="ms-Grid">
  
                        <div className="ms-Grid-row app-value-row">
                            <div className="ms-Grid-col ms-sm4"><label className="about-label">Build Date</label></div>
                            <div className="ms-Grid-col ms-sm8"><div className="about-value">{/*AppConfig.buildDate || */'UNKNOWN BUILD DATE'}</div></div>
                        </div>
                        <div className="ms-Grid-row app-value-row">
                            <div className="ms-Grid-col ms-sm4"><label className="about-label">Repository</label></div>
                            <div className="ms-Grid-col ms-sm8"><div className="about-value"></div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

interface IAboutPanelProps {
    toggle: IHandleModel<boolean>;
}

@observer
class AboutPanel extends React.Component<IAboutPanelProps, any> {
    private _onDismiss = () => {
        this.props.toggle.setValue(false);
    }
    render() {
        return (
            <Panel isOpen={this.props.toggle.value}
                   headerText="About Coglite"
                   onDismiss={this._onDismiss}
                   isLightDismiss={true}
                   type={PanelType.medium}>
                <About />
            </Panel>
        );
    }
}

export { About as default, About, AboutPanel }