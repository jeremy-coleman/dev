// React/mobx
import * as React from "react";
import { observer } from "mobx-react";

// Material-ui
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
// Services
import auth from "../../auth";
// Util:
import { push as pushHist } from "../../router/router-history";

const goLogin = () => {    
    pushHist("login");
};
export const LoginMenuView = observer(
    () => {
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
                    primaryText={loginLinkText}
                    onTouchTap={goLogin} />
            </IconMenu>
        );
    }
);