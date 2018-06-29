import * as React from "react";
import { observer } from "mobx-react";

// Material-ui
import {Button} from "@blueprintjs/core";

import auth from "../../../../stores/auth";

export const LoginView = observer(() => {
    const displayName = auth.isLoggedIn ? auth.profile.username : "Login";
    const login = () => {auth.isLoggedIn ? auth.logout() : auth.login({ whatever: true })};
    return (

        <Button icon='person' text={displayName} onClick={() => login()} />
)});


/*
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
*/