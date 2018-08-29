import { observer } from "mobx-react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { IContextualMenuItem, IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import * as React from "react";
import {IHandleModel} from "../../../../stores/handles";
import AboutToggleStore from "../store/AboutToggleStore";
import HelpToggleStore from "../store/HelpToggleStore";
import { AboutPanel } from "./About";
import "./DefaultHelp.scss";

class DefaultHelp extends React.Component<any, any> {
    render() {
        return (
            <div className="default-help">
                <p>
                    The Coglite provides a customisable workspace for Business Analysts and features a range of apps that can be added or removed according to your needs.
                </p>
            </div>
        );
    }
}

interface IDefaultHelpPanelProps {
    toggle: IHandleModel<boolean>;
}

@observer
class DefaultHelpPanel extends React.Component<IDefaultHelpPanelProps, any> {
    private _onDismiss = () => {
        this.props.toggle.setValue(false);
    }
    render() {
        return (
            <Panel isOpen={this.props.toggle.value}
                   headerText="Help"
                   onDismiss={this._onDismiss}
                   isLightDismiss={true}
                   type={PanelType.medium}>
                <DefaultHelp />
            </Panel>
        );
    }
}

class DefaultHelpMenuItem extends React.Component<any, any> {
    private _onClickAbout = () => {
        AboutToggleStore.setValue(!AboutToggleStore.value);
    }
    private _onClickHelp = () => {
        HelpToggleStore.setValue(!HelpToggleStore.value);
    }
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "help",
                name: "Help",
                iconProps: { iconName: "Help" },
                onClick: this._onClickHelp
            },
            {
                key: "about",
                name: "About Coglite",
                iconProps: { iconName: "Info" },
                onClick: this._onClickAbout
            }
        ];
        const menuProps : IContextualMenuProps = {
            items: items
        };
        return (
            <div className="help-menu-item">
                <IconButton title="Help" className="help-menu-button app-menu-button" iconProps={{ iconName: "Help" }} menuProps={menuProps} />
                <AboutPanel toggle={AboutToggleStore} />
                <DefaultHelpPanel toggle={HelpToggleStore} />
            </div>
        );
    }
}

export { DefaultHelpMenuItem as default, DefaultHelpMenuItem, DefaultHelp }