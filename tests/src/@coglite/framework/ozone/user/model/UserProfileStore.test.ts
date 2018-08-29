import { MockUserService } from "../service/MockUserService";
import { UserServiceContext } from "../service/UserServiceContext";
import { UserProfileStore } from "./UserProfileStore";

describe("User Profile Store Test", () => {
    test("load user profile", async () => {
        const userService = new MockUserService();
        userService.userProfile = {
            id: 1,
            bio: "Test User Bio",
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

        await UserProfileStore.load();

        const userProfile = UserProfileStore.value;

        expect(userProfile).toBeTruthy();
        
        expect(userProfile.id).toBe(1);
        expect(userProfile.bio).toBe("Test User Bio");
        expect(userProfile.display_name).toBe("Test User");

        expect(userProfile.user).toBeTruthy();
        expect(userProfile.user.email).toBe("test.user@test.woo");
        expect(userProfile.user.username).toBe("test");
        expect(userProfile.user.groups.length).toBe(2);
        expect(userProfile.user.groups[0].name).toBe("admin");
        expect(userProfile.user.groups[1].name).toBe("developer");
    });
});