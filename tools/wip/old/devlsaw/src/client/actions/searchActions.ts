import {
    GET_SEARCH_LIST,
    SET_SEARCH_LIST,
    LOADING_STATUS,
    RESET_USERS_LIST,
    GET_USERS_LIST,
    RESET_GROUPS_LIST,
    SET_USERS_LIST,
    GET_GROUPS_LIST,
    SET_GROUPS_LIST,
    CONNECT_REQUEST,
    FRIEND_CONNECTED

} from '../constants/actionTypes';

export const GetSearchListAction = (event) => {
    return {
        type: GET_SEARCH_LIST,
        event
    };
};

export const SetSearchListAction = (users,groups) => {
    return {
        type: SET_SEARCH_LIST,
        users,
        groups,
    };
};

export const  ChangeLoadingStatusAction = (payload) => {
    return {
        type: LOADING_STATUS,
        payload
    };
};

export const ResetUsersListAction = () => {
    return {
        type: RESET_USERS_LIST,

    };
};

export const ResetGroupsListAction = () =>  {
    return {
        type: RESET_GROUPS_LIST,
    };
};

export const GetUsersListAction = (payload) => {
    return {
        type: GET_USERS_LIST,
        payload
    };
};

export const  SetUsersListAction = (success,SearchList) => {
    return {
        type: SET_USERS_LIST,
        success,
        SearchList,
    };
};

export const  GetGroupsListAction  = (payload) =>  {
    return {
        type: GET_GROUPS_LIST,
        payload
    };
};
export const SetGroupsListAction = (success, GroupList) =>  {
    return {
        type: SET_GROUPS_LIST,
        success,
        GroupList,
    };
};

export const ConnectRequestAction = (payload) => {
    return {
        type: CONNECT_REQUEST,
        payload
    };
};

export const UserFriedConnectedAction = (payload) => {
    return {
        type: FRIEND_CONNECTED,
        payload
    };
};

