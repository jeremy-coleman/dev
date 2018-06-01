import {
    RESET_CONVERSATION,
    RESET_GROUPS,
    NEW_NOTIFICATION,
    ADD_CONVERSATION_MESSAGE,
    ADD_USER_IS_TYPING,
    ADD_TYPING_TEXT,
    REMOVE_USER_IS_TYPING,
    GROUP_MEMBERS,
    CURRENT_GROUP,
    UPDATE_CONVERSATION_STATUS,
    ADD_GROUPS_LIST,
    RESET_CURRENT_ROOM,
    CONVERSATION_MESSAGES_LIST,
    CURRENT_ROOM,
    CONVERSATION_LIST,
    RESET_NOTIFICATIONS
} from '../constants/actionTypes';

export const initialState  = {
    conversations: [],
    groups: [],
    current_room: {
        userId: '',
        displayName: '',
        photoURL: 'styles/icons/no-image.png',
        conversationId: '',
        notifications: 0,
        status: 'offline',
        lastSeen: new Date(),
        new_notification: false,
        description: '',
        _id: '',
    },
    conversationData: {
        conversationCount: 0,
        userConversations: 0
    },
    messageData: {
        messageCount: 0,
        allMessages: 0
    },
    messages: [],
    is_typing: [],
    typing_text: '',
    loading: true,
    groupMembers: []


};

const messages = (state = initialState, action)  => {
    switch (action.type) {
        case RESET_CONVERSATION: {
            return {
                ...state,
                conversations: []
            };
        }
        case RESET_GROUPS: {
            return {
                ...state,
                groups: []
            };
        }
        case NEW_NOTIFICATION: {
            let new_state = [];
            let notifications = 0;
            if (action.payload.conversationId) {
                const new_notification = {...action.payload};
                new_state = state.conversations.filter((conversation) => {
                    if (action.payload.conversationId !== conversation.conversationId) {
                        return conversation;
                    } else {
                        notifications = conversation.notifications;
                    }
                });
                new_notification.notifications = notifications + 1;
                new_state.unshift(new_notification);
                return {
                    ...state,
                    conversations: new_state,
                    current_room: new_notification
                };
            } else {
                const new_notification = {...state.current_room};
                if (new_notification._id === action.payload) {
                    new_notification.notifications += 1;
                }
                new_state = state.groups.map((group) => {
                    const new_group = {...group};
                    if (action.payload === new_group._id) {
                        new_group.notifications += 1;
                    }
                    return new_group;
                });
                return {
                    ...state,
                    groups: new_state,
                    current_room: {
                        ...state.current_room,
                        notifications: new_notification.notifications
                    }
                };
            }
        }
        case ADD_CONVERSATION_MESSAGE: {
            const messages = [...state.messages, action.payload];
            return {
                ...state,
                messages: messages,
                messageData: {
                    messageCount: messages.length,
                    allMessages: state.messageData.allMessages + 1
                }
            };
        }
        case ADD_USER_IS_TYPING: {
            return {
                ...state,
                is_typing: [...state.is_typing, action.payload]
            };
        }
        case ADD_TYPING_TEXT: {
            return {
                ...state,
                typing_text: action.payload
            };
        }
        case CONVERSATION_MESSAGES_LIST: {
            let new_messages = [...action.payload.message];
            new_messages = new_messages.reverse();
            let messages = new_messages.concat(state.messages);
            return {
                ...state,
                messages: messages,
                messageData: {
                    messageCount: messages.length,
                    allMessages: 0
                },
                loading: false
            };
        }
        case CURRENT_ROOM: {
            return {
                ...state,
                current_room: action.payload,
                messages: [],
                messageData: {
                    messageCount: 0,
                    allMessages: 0
                },
                loading: true
            };
        }
        case REMOVE_USER_IS_TYPING: {
            let new_state = [];
            new_state = state.is_typing.filter((todo) => {
                if (action.payload.userId !== todo.userId) {
                    return todo;
                }
            });
            return {
                ...state,
                is_typing: new_state,
            };
        }
        case UPDATE_CONVERSATION_STATUS: {
            let new_state = [];
            state.conversations.map((conversation) => {
                const new_conversation = {...conversation};
                action.payload.users.filter((checkedList) => {
                    if (new_conversation.userId === checkedList._id) {
                        new_conversation.status = checkedList.status;
                        new_conversation.lastSeen = checkedList.updatedAt;
                        new_state.push(new_conversation);
                    }
                });
            });
            return {
                ...state,
                conversations: new_state,
            };
        }
        case  GROUP_MEMBERS: {
            const groupMembers = state.groupMembers.concat(action.payload);
            return {
                ...state,
                groupMembers: groupMembers
            };
        }
        case CONVERSATION_LIST: {
            const conversations = state.conversations.concat(action.conversationList);
            const currentRoom = typeof conversations[0] !== 'undefined' ? conversations[0] : state.current_room;
            let new_state = {
                conversations: conversations,
                current_room: state.current_room.conversationId ? state.current_room : currentRoom,
                conversationData: {
                    conversationCount: conversations.length,
                    userConversations: 0
                },
            };
            if (!currentRoom.conversationId) {
                new_state['loading'] = false;
            }
            return Object.assign({}, state, new_state);
        }
        case CURRENT_GROUP: {
            if (state.conversations.length === 0) {
                return {
                    ...state,
                    current_room: state.groups.length > 0 ? state.groups[0] : state.current_room
                };
            }
            return {
                ...state
            };
        }
        case ADD_GROUPS_LIST: {
            const groups = state.groups.concat(action.payload);
            return {
                ...state,
                groups: groups
            };
        }
        case RESET_CURRENT_ROOM: {
            return {
                ...state,
                current_room: initialState.current_room
            };
        }
        case RESET_NOTIFICATIONS: {
            let new_state = [];
            let currentRoom = {...state.current_room};
            currentRoom.notifications = 0;
            currentRoom.new_notification = false;

            if (state.current_room.conversationId) {
                new_state = state.conversations.map((conversation) => {
                    const new_conversation = {...conversation};
                    if (new_conversation.conversationId === action.payload) {
                        new_conversation.notifications = 0;
                    }
                    new_conversation.new_notification = false;
                    return new_conversation;
                });
                return {
                    ...state,
                    conversations: new_state,
                    current_room: currentRoom
                };
            } else {
                new_state = state.groups.map((groups) => {
                    const new_group = {...groups};
                    if (new_group._id === action.payload) {
                        new_group.notifications = 0;
                    }
                    new_group.new_notification = false;
                    return new_group;
                });
                return {
                    ...state,
                    groups: new_state,
                    current_room: currentRoom
                };
            }
        }
        default: {
            return state;
        }
    }
};

export default messages;