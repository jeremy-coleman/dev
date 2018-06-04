import * as React from "react";
import { observer } from "mobx-react";

// Material-ui
import {Button} from "@blueprintjs/core";

import auth from "../../../stores/auth";

export const LoginView = observer(() => {
    const login = () => {auth.isLoggedIn ? auth.logout() : auth.login({ whatever: true })};
    return (<div style={{ margin: "15px" }}>
        <Button
            text={auth.isLoggedIn ? "logout" : "Login"}
            onClick={() => login()} />
    </div>);
});
