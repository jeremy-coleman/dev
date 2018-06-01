import {
    AUTH_REGISTER_COMPLETE,
    AUTH_GUEST_MODE,
    AUTH_LOGOUT_COMPLETE,
    AUTH_ERROR
} from '../constants/actionTypes'

const initialState = {
    userData: {
        uid: null,
        displayName: null,
        photoURL: null,
        email: null,
        providerId: null,
    },
    isLoggedIn: false,
    error: null

};

const auth = (state = initialState, action)  => {
    switch (action.type) {
        case AUTH_REGISTER_COMPLETE:
            return {
                ...state,
                userData: action.user,
                isLoggedIn: true,
                error: null
            };
        case AUTH_GUEST_MODE:
            return {
                ...state,
                userData: action.payload,
                isLoggedIn: true,
                error: null
            };
        case AUTH_LOGOUT_COMPLETE: {
            return {
                ...state,
                userData: initialState.userData,
                isLoggedIn: false,
            };
        }
        case AUTH_ERROR: {
            return {
                ...state,
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
};


export default auth;