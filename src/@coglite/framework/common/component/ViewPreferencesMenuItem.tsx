import * as React from "react";
import { observer } from "mobx-react";
import { IContextualMenuItem, DefaultButton, CommandBarButton } from "office-ui-fabric-react";
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import IViewPreferencesModel from "../IViewPreferencesModel";
import { css } from "@uifabric/utilities/lib/css";
import { IViewPreferencesMenuItemStyles, getStyles } from "./ViewPreferencesMenuItem.styles";
import { IViewPreferencesMenuItemClassNames, getClassNames } from "./ViewPreferencesMenuItem.classNames";


const createViewPreferencesMenuItem = (model: IViewPreferencesModel, fields: any[]) : IContextualMenuItem => {
    let menuItems: IContextualMenuItem[] = fields.map((field: any) => {
        let _onCheckboxChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => {
            model.setFieldVisible(field.key, isChecked);
        };
        return {
            key: field.key,
            onRender(item : IContextualMenuItem) {
                return <Checkbox className={'view-prefs-menu-item'} key={item.key} label={field.name} defaultChecked={ model.isFieldVisible(field.key) } onChange={ _onCheckboxChange } />
            }
        } as IContextualMenuItem
    });
    return {
        key: "viewPreferences",
        onRender(item : IContextualMenuItem) {
            return <ViewPreferencesMenuButton model={model} menuItems={menuItems} />
        }
    };
};

interface IViewPreferencesMenuButtonProps {
    menuItems: IContextualMenuItem[];
    model: IViewPreferencesModel;
    styles?: IViewPreferencesMenuItemStyles;
    className?: string;
}

@observer
class ViewPreferencesMenuButton extends React.Component<IViewPreferencesMenuButtonProps, any> {
    private _classNames : IViewPreferencesMenuItemClassNames;
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        let hasPrefs = this.props.model.hasPrefs();
        return (
            <CommandBarButton className={css(this._classNames.root, { "has-prefs": hasPrefs })} iconProps={ { iconName: "Settings" }} menuProps={{ items: this.props.menuItems }} />
        );
    }
}

export { createViewPreferencesMenuItem }