import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import * as http from './http';

export const getSearchList = (search) => {
    const params = {
        search: search
    };
    return http.get(`/global/search`,params)
        .map((res) => res);

};

export const getSearchUsers = (data) => {
    const params = {
        search: data.search,
        offset: data.offset
    };
    return http.get(`/global/search/people`,params)
        .map((res) => res);
};

export const getSearchGroups = (data) =>  {
    const params = {
        search: data.search,
        offset: data.offset
    };
    return http.get(`/global/search/groups`,params)
        .map((res) => res);
};

export const connectRequest = (id) => {
    return http.post(`/user/profile/add-to-friends`, {userId: id})
        .map((res) => res);
};
