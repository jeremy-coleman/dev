import * as React from "react";
import { observer } from "mobx-react";
import { Button, Menu, MenuDivider, MenuItem, Popover, Position, IconName, Tooltip } from "@blueprintjs/core";

import auth from "../../../stores/auth";


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
