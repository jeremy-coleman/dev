import { UserServiceContext } from "./service/UserServiceContext";
import { MockUserService } from "./service/MockUserService";
import { Router } from "@coglite/common/Router";
import { injectUserProfile, requiresGroup, requiresGroupRouter } from "./UserAuthRouters";
import { IUserProfile } from "./IUserProfile";
import { IUserService } from "./service/IUserService";

describe("User Auth Routers", () => {
    beforeAll(() => {
        const userService = new MockUserService();
        userService.userProfile = {
            bio: "Test User",
            display_name: "Test User",
            user: {
                email: "test.user@test.woo",
                username: "test",
                groups: [
                    {
                        name: "admin"
                    },
                    {
                        name: "developer"
                    }
                ]
            }
        };
        UserServiceContext.value = userService;
    });

    test("inject user profile", async () => {
        let requestUserProfile : IUserProfile;

        const r = new Router();
        r.use(injectUserProfile());
        r.use(req => {
            requestUserProfile = req.userProfile;
        });

        await r.handleRequest({ path: "/woo" });

        expect(requestUserProfile).toBeTruthy();
        expect(requestUserProfile.user).toBeTruthy();
        expect(requestUserProfile.user.username).toBe("test");
        expect(requestUserProfile.user.email).toBe("test.user@test.woo");
    });

    test("requires group", async () => {
        let authd = false;

        let r = new Router();
        r.use(requiresGroup("admin"));
        r.use(requiresGroup("developer"));
        r.use(req => {
            authd = true;
        });

        await r.handleRequest({ path: "/woo" });

        expect(authd).toBeTruthy();

        r = new Router();
        r.use(requiresGroup("hello"));
        authd = false;
        let error;

        try {
            await r.handleRequest({ path: "/woo" });
        } catch(e) {
            error = e;
        }

        expect(authd).toBeFalsy();
        expect(error).toBeTruthy();
    });

    test("requires group router", async () => {
        const r = new Router();
        let adminRequest;
        let developerRequest;
        let helloRequest;
        let error;
        r.use(requiresGroupRouter("admin", (req, next) => {
            adminRequest = req;
            next();
        }));

        r.use(requiresGroupRouter("developer", (req, next) => {
            developerRequest = req;
            next();
        }));

        r.use(requiresGroupRouter("hello", req => {
            helloRequest = req;
        }));
        
        try {
            await r.handleRequest({ path: "/woo" });
        } catch(err) {}

        expect(adminRequest).toBeTruthy();
        expect(developerRequest).toBeTruthy();
        expect(helloRequest).toBeFalsy();
    });
});