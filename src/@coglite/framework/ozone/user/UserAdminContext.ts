import { Context } from "@coglite/framework/common/Context";
import { IPredicateFunc } from "@coglite/framework/common/IPredicateFunc";
import { IUserProfile } from "./IUserProfile";
import { equalsIgnoreCase } from "@coglite/framework/common/StringUtils";

const defaultAdminCheck = (userProfile : IUserProfile) => {
    return userProfile && userProfile.user && userProfile.user.groups && userProfile.user.groups.some(g => {
        return equalsIgnoreCase(g.name, "admin");
    });
};

const UserAdminContext = new Context<IPredicateFunc<IUserProfile>>({
    value: defaultAdminCheck
});

export { UserAdminContext }