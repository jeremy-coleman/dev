import {
    PROFILE_VIEW
} from '../constants/actionTypes'

export const initialState  = {
    profileData: {
        user: {
            _id: null,
            __v: null,
            uid: null,
            displayName: null,
            email: null,
            photoURL: null,
            location: null,
            timezone: null,
            create_date: null,
        },
        groups: [],
    }
};

const profile = (state = initialState, action)  => {
    switch (action.type) {
        case PROFILE_VIEW: {
            return {...state, profileData: action.data, };
        }
        default: { return state; }
    }
};

export default profile;