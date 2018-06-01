import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {
    GLOBAL_GET_FRIEND_LIST,
    GLOBAL_GET_GROUPS_LIST
} from '../constants/actionTypes';
import * as globalActions  from '../actions/global.actions';
import * as userService from '../services/user.service';


export const getFriendsList = (action$) => {
    return action$
        .ofType(GLOBAL_GET_FRIEND_LIST)
        .map(action => action.payload)
        .switchMap((offset) => {
            return userService.getFriendsList(offset).map(friends => {
                return new globalActions.AddFriendsListAction(friends);
            }).catch(() => {
                return [];
            });
        });
};

export const globalGroupsList = (action$) => {
    return action$
        .ofType(GLOBAL_GET_GROUPS_LIST)
        .map(action => action.payload)
        .switchMap((offset) => {
            return userService.getGroupsList(offset).map(groups => {
                return new globalActions.AddGroupsListAction(groups);
            }).catch(() => {
                return [];
            });
        });
};