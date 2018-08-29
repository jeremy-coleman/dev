import { Router } from "@coglite/framework/common/router";
import * as React from "react";

const r = new Router();

r.use("/help", (req, next) => {
    if(req.basePath === req.path) {
        return import("./component/DefaultHelp").then(m => {
            return <m.DefaultHelpMenuItem />;
        });
    }
    return next();
});

export { r as default, r as HelpRouter }