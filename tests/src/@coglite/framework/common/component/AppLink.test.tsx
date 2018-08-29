import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { AppLink } from "./AppLink";
import { AppHost } from "../model/AppHost";
import { Router } from "../Router";

describe("App Host Container Component", () => {
    test("render", async () => {
        const router = new Router();
        router.use("/test/woo", () => {
            return "Test Woo";
        });
        const host = new AppHost();
        host.router = router;
        const defaultStateRenderer = () => {
            return "Default State";
        };
        let r = ReactTestRenderer.create(
            <AppLink host={host} request={{ path: "/test/woo" }} />
        );
        let out = r.toJSON();
        console.log("Link Output: " + JSON.stringify(out));
    });
});