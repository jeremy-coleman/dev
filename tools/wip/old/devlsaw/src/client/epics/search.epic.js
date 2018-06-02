import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {
    GET_SEARCH_LIST,
    GET_USERS_LIST,
    GET_GROUPS_LIST,
    CONNECT_REQUEST
} from '../constants/actionTypes';
import * as searchActions from '../actions/searchActions';
import * as searchService from '../services/search.service';



export const getSearchList = (action$) => {
    return action$
        .ofType(GET_SEARCH_LIST)
        .map(action => action.event)
        .switchMap((search) => {
            return searchService.getSearchList(search).map(response => {
                console.log(response.result.users);
                return new searchActions.SetSearchListAction(response.result.users,response.result.groups);
            });
        }).catch(() => {
            return [];
        });
};

export const getSearchUsers = (action$) => {
    return action$
        .ofType(GET_USERS_LIST)
        .map(action => action.payload)
        .switchMap((search) => {
            return searchService.getSearchUsers(search).map(response => {
                return new searchActions.SetUsersListAction(response.success, response.result);
            });
        }).catch(() => {
            return [];
        });
};

export const getSearchGroups = (action$) => {
return action$
        .ofType(GET_GROUPS_LIST)
        .map(action => action.payload)
        .switchMap((search) => {
            return searchService.getSearchGroups(search).map(response => {
                return new searchActions.SetGroupsListAction(
                    response.success,
                    response.result.groups
                );
            });
        }).catch(() => {
            return [];
        });
};

export const userFriendRequest = (action$) => {
    return action$
    .ofType(CONNECT_REQUEST)
        .map(action => action.payload)
        .switchMap((id) => {
            return searchService.connectRequest(id).map(response => {
                if (response.success) {
                    return new searchActions.UserFriedConnectedAction(id);
                }
            });
        }).catch(() => {
        return [];
    });
};



