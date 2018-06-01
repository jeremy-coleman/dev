import {
    LAYOUT_TOGGLE_POPUP
} from '../constants/actionTypes'

const initialState = {
    popups: {
        notebooks: true,
        send_notebook: false
    },

};

const layout = (state = initialState, action)  => {
    switch (action.type) {
        case LAYOUT_TOGGLE_POPUP:
            let popups: any = [];
            popups = {...state.popups};
            popups[action.payload] = !popups[action.payload];
            
            return {...state, popups: popups };
        default: {return state;}
    }
};


export default layout;