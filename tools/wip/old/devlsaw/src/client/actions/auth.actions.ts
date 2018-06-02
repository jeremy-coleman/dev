import {
    AUTH_REGISTER,
    AUTH_CHECK,
    AUTH_DEFAULT,
    AUTH_REGISTER_COMPLETE,
    AUTH_ERROR,
    AUTH_GUEST_MODE,
    AUTH_LOGOUT_COMPLETE
} from '../constants/actionTypes';

export const RegisterAction = (userInfo) => {
    return {
        type: AUTH_REGISTER,
        userInfo
    };
};

export const AuthErrorAction = (error) => {
    return {
        type: AUTH_ERROR,
        error
    };
};

export const RegisterCompleteAction = (user) => {
    return {
        type: AUTH_REGISTER_COMPLETE,
        user
    };
};


export const AuthCheckAction = () => {
    return {
        type: AUTH_CHECK
    };
};

export const DefaultAction = () => {
    return {
        type: AUTH_DEFAULT
    };
};

export const LogoutCompleteAction = () => {
    return {
        type: AUTH_LOGOUT_COMPLETE
    };
};

export const GuestModeAction = (payload) => {
    return {
        type: AUTH_GUEST_MODE,
        payload
    };
};
