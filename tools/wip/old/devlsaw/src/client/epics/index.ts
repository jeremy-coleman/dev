import {combineEpics} from 'redux-observable';

import {
    profileEpic,
} from './profile.epic';
import {
    register,
    check
} from './auth.epic';

import {
    getSearchList,
    getSearchUsers,
    getSearchGroups,
    userFriendRequest
} from './search.epic';
import {
    getConversations,
    getGroupsList,
    getConversationsMessages
} from './messages.epic';
import {
    getFriendsList,
    globalGroupsList
} from './global.epic'
import {
    sendNotebook,
    changeStatus,
    getAlerts
} from './notebook.epic'
export const rootEpic = combineEpics(
    check,
    profileEpic,
    register,
    getSearchList,
    getSearchUsers,
    getSearchGroups,
    userFriendRequest,
    getConversations,
    getGroupsList,
    getConversationsMessages,
    getFriendsList,
    globalGroupsList,
    sendNotebook,
    changeStatus,
    getAlerts
);
