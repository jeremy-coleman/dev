import { equalsIgnoreCase, isBlank } from "@coglite/framework/common/StringUtils";
import { IUserProfile } from "./IUserProfile";



const isMemberOfGroup = (userProfile : IUserProfile, group : string) : boolean => {
    return isBlank(group) ||
        (userProfile && userProfile.user && userProfile.user.groups && userProfile.user.groups.some(g => equalsIgnoreCase(g.name, group)));
};

export { isMemberOfGroup };
