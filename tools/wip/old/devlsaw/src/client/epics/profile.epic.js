import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {
    PROFILE_EMPTY,
} from '../constants/actionTypes';
import DBService from '../services/electron/db.service';
import * as profileAction from '../actions/profile.actions';
import * as globalActions from '../actions/global.actions';
import * as profileService from '../services/profile.service';

export const profileEpic = (action$) => {
    return action$
        .ofType(PROFILE_EMPTY)
        .switchMap(() => {
            return profileService.getProfileData().map((data) => {
                DBService.get('profile').then(profileStore => {
                    profileStore.findOne().exec().then(profileData => {
                        if (profileData) {
                            profileData.user = data.user;
                            profileData.groups = data.groups;
                            profileData.save();
                        } else {
                            profileStore.insert(data);
                        }
                    });
                });

                return new profileAction.ProfileViewAction(data);
            }).catch(() => {
                return DBService.get('profile').then(profileStore => {
                    return profileStore.findOne().exec().then(profileData => {
                        if (profileData) {
                            return new profileAction.ProfileViewAction({
                                user: profileData._data.user,
                                groups: profileData._data.groups,
                            });
                        } else {
                            return new globalActions.DefaultAction();
                        }
                    });
                });
            });
        });
};