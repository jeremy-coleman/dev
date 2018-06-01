import {
    RESET_CONVERSATION,
    RESET_GROUPS,
    NEW_NOTIFICATION,
    ADD_CONVERSATION_MESSAGE,
    ADD_USER_IS_TYPING,
    ADD_TYPING_TEXT,
    REMOVE_USER_IS_TYPING,
    UPDATE_CONVERSATION_STATUS,
    GROUP_MEMBERS,
    CONVERSATION,
    CURRENT_GROUP,
    CONVERSATION_LIST,
    MESSAGES_GET_GROUPS_LIST,
    ADD_GROUPS_LIST,
    RESET_CURRENT_ROOM,
    CONVERSATION_MESSAGES,
    CONVERSATION_MESSAGES_LIST,
    CURRENT_ROOM,
    RESET_NOTIFICATIONS
} from '../constants/actionTypes';


export const ResetConversationAction = () =>{
    return{
        type : RESET_CONVERSATION,
    }
};

export const ResetGroupsAction  = () => {
    return{
        type: RESET_GROUPS,
    }
};

export const NewNotificationAction  = (payload) => {
    return {
        type: NEW_NOTIFICATION,
        payload
    }
};

export const AddConversationMessagesAction = (payload) => {
    return {
        type: ADD_CONVERSATION_MESSAGE,
        payload
    }
};

export const AddUserIsTypingAction = (payload) => {
    return {
        type: ADD_USER_IS_TYPING,
        payload
    }
};

export const AddTypingTextAction = (payload) =>{
    return {
        type: ADD_TYPING_TEXT,
        payload
    }
};

export const RemoveUserIsTypingAction = (payload) => {
    return {
        type: REMOVE_USER_IS_TYPING,
        payload
    }
};

export const UpdateConversationStatusAction = (payload) => {
    return {
        type: UPDATE_CONVERSATION_STATUS,
        payload
    }
};

export const GroupMembersAction = (payload) => {
    return {
        type: GROUP_MEMBERS,
        payload
    }
};

export const ConversationAction = (payload) => {
    return {
        type: CONVERSATION,
        payload
    }
};

export const CurrentGroupAction = (payload) => {
    return {
        type: CURRENT_GROUP,
        payload
    }
};

export const ConversationListAction = (success,conversationList) => {
    return {
        type: CONVERSATION_LIST,
        success,
        conversationList,
    };
};
export const GetGroupsListAction = (payload) => {
    return {
        type: MESSAGES_GET_GROUPS_LIST,
        payload
    }
};

export const AddGroupsListAction = (payload) =>  {
    return {
        type : ADD_GROUPS_LIST,
        payload
    }
};

export const ResetCurrentRoomAction = () => {
    return {
        type: RESET_CURRENT_ROOM,
    }
};

export const ConversationMessagesAction = (payload) => {
    return {
        type: CONVERSATION_MESSAGES,
        payload
    }
};

export const ConversationMessagesListAction = (payload) =>  {
    return {
        type: CONVERSATION_MESSAGES_LIST,
        payload
    }
};

export const CurrentRoomAction = (payload) => {
    return {
        type: CURRENT_ROOM,
        payload
    }
};

export const ResetNotificationsAction = (payload) => {
    return {
        type: RESET_NOTIFICATIONS,
        payload
    }
};

