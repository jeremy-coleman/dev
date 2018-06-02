import * as React from "react";
import { observer } from "mobx-react";

// Material-ui
import RaisedButton from "material-ui/RaisedButton";

import auth from "../../auth";
export const LoginView = observer(() => {
    const login = () => {
        auth.isLoggedIn ? auth.logout() : auth.login({ whatever: true });
    };
    return (<div style={{ margin: "15px" }}>
        <RaisedButton
            label={auth.isLoggedIn ? "logout" : "Login"}
            onTouchTap={() => login()} />
    </div>);
});
