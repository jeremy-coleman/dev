import {
    GLOBAL_DEFAULT,
    GLOBAL_GET_FRIEND_LIST,
    GLOBAL_ADD_FRIEND_LIST,
    GLOBAL_GET_GROUPS_LIST,
    GLOBAL_ADD_GROUP_LIST
} from '../constants/actionTypes';

export const DefaultAction = () => {
    return {
        type: GLOBAL_DEFAULT,
    };
};

export const GetUserFriendListAction = (payload) => {
    return {
        type: GLOBAL_GET_FRIEND_LIST,
        payload
    }
};

export const AddFriendsListAction = (payload) => {
    return {
        type: GLOBAL_ADD_FRIEND_LIST,
        payload
    }
};

export const GetUserGroupsListAction = (payload) => {
    return {
        type: GLOBAL_GET_GROUPS_LIST,
        payload
    }
};

export const AddGroupsListAction = (payload) => {
    return {
        type: GLOBAL_ADD_GROUP_LIST,
        payload
    }
};