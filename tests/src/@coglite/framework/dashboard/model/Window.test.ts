import { Dashboard } from "./Dashboard";
import { Window } from "./Window";
import { MockPortalManager } from "./MockPortal";
import { ComponentFactory } from "./ComponentFactory";
import { Router } from "@coglite/common/Router";

describe("Window Test", () => {
    test("window basic test", async () => {
        const r = new Router();
        r.use("/test/1", () => {
            return "Test 1";
        });
        r.use("/test/2", () => {
            return "Test 2";
        });

        const db = new Dashboard();
        db.componentFactory = ComponentFactory;
        const portalManager = new MockPortalManager();
        db.portalManager = portalManager;
        db.router = r;
        
        const w = new Window();
        w.path = "/test/1";
        w.query = {
            a: "a",
            b: "b"
        };

        db.component = w;

        await w.load();

        expect(w.appHost.url).toBe("/test/1?a=a&b=b");

        expect(w.query.a).toBe("a");
        expect(w.query.b).toBe("b");

        await w.load({ path: "/test/2", query: { c: "c", d: "d" }});

        expect(w.appHost.url).toBe("/test/2?c=c&d=d");


    });
});