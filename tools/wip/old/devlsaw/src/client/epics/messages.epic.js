import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {
    CONVERSATION,
    CONVERSATION_MESSAGES,
    MESSAGES_GET_GROUPS_LIST,
} from '../constants/actionTypes';
import * as messageAction  from '../actions/messages.action';
import * as messageService from '../services/messages.service';


export const getConversations = (action$) => {
    return action$
        .ofType(CONVERSATION)
        .map(action => action.payload)
        .switchMap((offset) => {
            return messageService.getConversations(offset).map(conversations => {
                if (conversations.conversationList.length === 0) {
                    new messageAction.CurrentGroupAction('');
                }
                return new messageAction.ConversationListAction(
                   conversations.success,
                   conversations.conversationList
                );
            });
        }).catch(() => {
            return [];
        });
};

export const getGroupsList = (action$) => {
    return action$
        .ofType(MESSAGES_GET_GROUPS_LIST)
        .map(action => action.payload)
        .switchMap((offset) => {
            return messageService.getGroupsList(offset).map(response => {
                return new messageAction.AddGroupsListAction(response)
            });
        }).catch(() => {
            return [];
        });
};

export const getConversationsMessages = (action$) => {
    return action$
        .ofType(CONVERSATION_MESSAGES)
        .map(action => action.payload)
        .switchMap((data) => {
            return messageService.getConversationMessages(data).map(response => {
                return new messageAction.ConversationMessagesListAction(response);
            });
        }).catch(() => {
            return [];
        });
};