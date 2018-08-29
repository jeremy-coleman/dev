import { isMemberOfGroup } from "./UserHelper";
import { IUserProfile } from "./IUserProfile";

describe("User Auth Helper", () => {
    test("isAuthorised", () => {
        expect(isMemberOfGroup(null, null)).toBeTruthy();

        expect(isMemberOfGroup(null, "admin")).toBeFalsy();
        expect(isMemberOfGroup(undefined, "admin")).toBeFalsy();

        const profile : IUserProfile = {
            user: {
                groups: [
                    {
                        name: "admin"
                    },
                    {
                        name: "developer"
                    },
                    {
                        name: "user"
                    }
                ]
            }
        };

        expect(isMemberOfGroup(profile, null)).toBeTruthy();
        expect(isMemberOfGroup(profile, undefined)).toBeTruthy();
        expect(isMemberOfGroup(profile, "")).toBeTruthy();
        expect(isMemberOfGroup(profile, "admin")).toBeTruthy();
        expect(isMemberOfGroup(profile, "developer")).toBeTruthy();
        expect(isMemberOfGroup(profile, "user")).toBeTruthy();
        expect(isMemberOfGroup(profile, "hello")).toBeFalsy();
    });
});