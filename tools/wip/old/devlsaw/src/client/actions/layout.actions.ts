import {
    LAYOUT_TOGGLE_POPUP
} from '../constants/actionTypes';

export const TogglePopupAction = (data) => {
    return {
        type: LAYOUT_TOGGLE_POPUP,
        data
    };
};


