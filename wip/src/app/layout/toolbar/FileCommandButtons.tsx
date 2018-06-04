import { Alignment, Button, ButtonGroup, IconName, Intent, Popover, Position, Switch } from "@blueprintjs/core";
import * as React from "react";


import { IProps, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

export interface IFileMenuProps extends IProps {
    shouldDismissPopover?: boolean;
}

export const FileMenu: React.SFC<IFileMenuProps> = props => (
    <Menu className={props.className}>
        <MenuItem text="New" icon="document" {...props} />
        <MenuItem text="Open" icon="folder-shared" {...props} />
        <MenuItem text="Close" icon="add-to-folder" {...props} />
        <MenuDivider />
        <MenuItem text="Save" icon="floppy-disk" {...props} />
        <MenuItem text="Save as..." icon="floppy-disk" {...props} />
        <MenuDivider />
        <MenuItem text="Exit" icon="cross" {...props} />
    </Menu>
);



export interface IFileCommandButtonsState {
    alignText: Alignment;
    intent: Intent;
    large: boolean;
    minimal: boolean;
    vertical: boolean;
}

export class FileCommandButtons extends React.PureComponent<any, IFileCommandButtonsState> {
    public state: IFileCommandButtonsState = {
        alignText: Alignment.CENTER,
        intent: Intent.NONE,
        large: false,
        minimal: false,
        vertical: false,
    };

    public render() {
        const { intent, ...bgProps } = this.state;

        return (
                <ButtonGroup {...bgProps} style={{ minWidth: 120 }}>
                    {this.renderButton("File", "document")}
                    {this.renderButton("Edit", "edit")}
                    {this.renderButton("View", "eye-open")}
                </ButtonGroup>
        );
    }

    private renderButton(text: string, iconName: IconName) {
        const { intent, vertical } = this.state;
        const rightIconName: IconName = vertical ? "caret-right" : "caret-down";
        const position = vertical ? Position.RIGHT_TOP : Position.BOTTOM_LEFT;
        return (
            <Popover content={<FileMenu />} position={position}>
                <Button intent={intent} rightIcon={rightIconName} icon={iconName} text={text} />
            </Popover>
        );
    }

}