import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IUserProfileStyles } from "./UserProfile.styles";

interface IUserProfileClassNames {
    root?: string;
    photo?: string;
    photoIconContainer?: string;
    userInfo?: string;
    details?: string;
    name?: string;
    email?: string;
    username?: string;
    body?: string;
    groups?: string;
    groupsTitle?: string;
    groupList?: string;
    group?: string;
}

const getClassNames = memoizeFunction((styles : IUserProfileStyles, className?: string) : IUserProfileClassNames => {
    return mergeStyleSets({
        root: ["user-profile", className, styles.root],
        photo: ["user-profile-photo", styles.photo],
        photoIconContainer: ["user-profile-photo-icon-container", styles.photoIconContainer],
        userInfo: ["user-profile-user-info", styles.userInfo],
        details: ["user-profile-details", styles.details],
        name: ["user-profile-name", styles.name],
        email: ["user-profile-email", styles.email],
        username: ["user-profile-username", styles.username],
        body: ["user-profile-body", styles.body],
        groups: ["user-profile-groups", styles.groups],
        groupsTitle: ["user-profile-groups-title", styles.groupsTitle],
        groupList: ["user-profile-group-list", styles.groupList],
        group: ["user-profile-group", styles.group]
    });
});

export { IUserProfileClassNames, getClassNames };
