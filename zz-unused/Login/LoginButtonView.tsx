// React/mobx
import * as React from "react";
import { observer } from "mobx-react";


import { Button, Menu, MenuDivider, MenuItem, Popover, Position, IconName, Tooltip } from "@blueprintjs/core";


import auth from "../stores/auth";
// Util:
import { stores } from "../App";


const login = () => {auth.isLoggedIn ? auth.logout() : auth.login({ whatever: true })};

export const LoginMenuView = observer(() => {
        const tooltip = auth.isLoggedIn ? auth.profile.username : "Login";
        const loginLinkText = auth.isLoggedIn ? "Sign out" : "Sign In";
                const exampleMenu = (
            <Menu>
                <MenuItem text={loginLinkText} onClick={login} />
            </Menu>
        );
        return (
            <Popover content={exampleMenu} position={Position.RIGHT_BOTTOM}>
                <Tooltip content={tooltip} position={Position.RIGHT}>
                    <Button icon='person' text={tooltip} />
                </Tooltip>
            </Popover>

        );
    }
);


/*
export const LoginMenuView1 = observer(() => {
        const tooltip = auth.isLoggedIn ? auth.profile.username : "Login";
        const loginLinkText = auth.isLoggedIn ? "Sign out" : "Sign In";
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton
                        iconClassName="material-icons"
                        tooltip={tooltip}
                        iconStyle={{ color: "white" }}
                        >person</IconButton>
                }
                targetOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
                <MenuItem
                    text={loginLinkText}
                    onClick={goLogin} />
            </IconMenu>
        );
    }
);

export class DropdownMenuExample extends React.PureComponent {
    public render() {
        const exampleMenu = (
            <Menu>
                <MenuItem text={loginLinkText} onClick={goLogin} />
            </Menu>
        );
        return (  
                <Popover content={exampleMenu} position={Position.RIGHT_BOTTOM}>
                <Tooltip content={tooltip} position={Position.RIGHT}>
                    <Button icon='person' text="Open in..." />
                </Tooltip>
                </Popover>
        );
    }
}
*/