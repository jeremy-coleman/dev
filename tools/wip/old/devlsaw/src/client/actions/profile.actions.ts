import {
    PROFILE_EMPTY,
    PROFILE_VIEW

} from '../constants/actionTypes';

export const ProfileEmptyAction = () => {
    return {
        type: PROFILE_EMPTY,
    };
};

export const ProfileViewAction = (data) => {
    return {
        type: PROFILE_VIEW,
        data
    };
};
