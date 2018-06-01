import * as React from 'react';
import * as layoutActions from '../actions/layout.actions';



class PopupService {

    togglePopup = (popupName) => {
         new layoutActions.TogglePopupAction(popupName);
    }
}

export default PopupService;
