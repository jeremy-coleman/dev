import {
    SET_SEARCH_LIST, GET_SEARCH_LIST,
    LOADING_STATUS, RESET_USERS_LIST,
    GET_USERS_LIST,RESET_GROUPS_LIST,
    GET_GROUPS_LIST,SET_USERS_LIST,
    SET_GROUPS_LIST,FRIEND_CONNECTED
} from '../constants/actionTypes'

const initialState = {
    searchList: [],
    searchData: '',
    loading: false,
    groupList: [],
    type: 'people',
};

const search = (state = initialState, action)  => {
    switch (action.type) {
        case GET_SEARCH_LIST:
            return {...state, searchData: action.event };
        case SET_SEARCH_LIST:
            return {...state, searchList: action.users, groupList: action.groups,};
        case LOADING_STATUS:
            return {...state, loading: action.payload, };
        case RESET_USERS_LIST:
            return {...state, searchList: [], };
        case GET_USERS_LIST:
            return {...state, searchData: action.payload.search};
        case RESET_GROUPS_LIST:
                return {...state, groupList: [], };
        case GET_GROUPS_LIST:
            return {...state, searchData: action.payload.search };
        case SET_USERS_LIST:
            const searchList = state.searchList.concat(action.SearchList);
            return {...state, searchList:searchList, loading: false };
        case SET_GROUPS_LIST:
            const groupList = state.groupList.concat(action.GroupList);
            return {...state, groupList:groupList, loading: false };
        case FRIEND_CONNECTED:
            let new_state = [];
            new_state = state.searchList.map((user) => {
                const new_user = {...user};
                if (new_user._id === action.payload) {
                    new_user.friend = true;
                }
                return new_user;
            });
            let group_state = [];
            group_state = state.groupList.map((group) => {
                const new_group = {...group};
                if (new_group._id === action.payload) {
                    new_group.friend = true;
                }
                return new_group;
            });
            return {...state, searchList: new_state, groupList: group_state, };
        default: return state;
    }
};

export default search;
