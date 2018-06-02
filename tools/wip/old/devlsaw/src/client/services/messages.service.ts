import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import * as http from './http';


export const getConversations = (offset) => {
    const params = {
        offset: offset,
    };
    return http.get(`/messaging/message/get-interlocutors`, params)
        .map((res) => res);
};


export const getGroupsList = (offset) => {
    const params = {
        offset: offset,
    };
    return http.get(`/user/group/get-list`, params)
        .map((res) => res);
};


export const getConversationMessages = (data) => {
    const params = {
        id: data.room,
        offset: data.offset,
    };
    return http.get(`/messaging/message/get-messages`, params)
        .map((res) => res);
};