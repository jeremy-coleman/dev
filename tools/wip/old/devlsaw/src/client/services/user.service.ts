import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import * as http from './http';

export const getFriendsList = (offset) => {
    const params = {
        offset: offset,
    };
    return http.get(`/user/profile/get-friends`,params)
        .map((res) => res.json().friends);
};

export const getGroupsList = (offset) => {
    const params = {
        offset: offset,
    };
    return http.get(`/user/group/get-list`,params)
        .map((res) => res);
};