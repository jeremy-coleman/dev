import {
    GLOBAL_ADD_FRIEND_LIST,
    GLOBAL_ADD_GROUP_LIST
} from '../constants/actionTypes'

const initialState = {
    friends: [],
    groups: []
};

const global = (state = initialState, action)  => {
    switch (action.type) {
        case  GLOBAL_ADD_FRIEND_LIST: {
            return {
                ...state,
                friends: action.payload
            };
        }
        case  GLOBAL_ADD_GROUP_LIST:
            return {
                ...state,
                groups: action.payload
            };
        default: {
            return state;
        }
    }
};

export default global;