import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {MessagingComponent} from '../components/messaging/messaging.component';
import SocketService from '../services/socket.service';
import { Observable } from 'rxjs/Observable';
import * as messageAction from '../actions/messages.action';

class MessagingContainer extends React.Component<any, any> {
    connection: any;
    userStatus: any;
    timeout: NodeJS.Timer;
    currentUser: any;
    chat: any;
    currentRoom: any;

    typing = false;
    _TYPING_TIMER_LENGTH = 3000;
    STATUS_UPDATE_INTERVAL = 5000;

     static propTypes = {
        ResetConversationAction: PropTypes.func.isRequired,
        ResetGroupsAction: PropTypes.func.isRequired,
        NewNotificationAction: PropTypes.func.isRequired,
        AddConversationMessagesAction: PropTypes.func.isRequired,
        AddUserIsTypingAction: PropTypes.func.isRequired,
        AddTypingTextAction: PropTypes.func.isRequired,
        RemoveUserIsTypingAction: PropTypes.func.isRequired,
        UpdateConversationStatusAction: PropTypes.func.isRequired,
        GroupMembersAction: PropTypes.func.isRequired,
        ConversationAction: PropTypes.func.isRequired,
        GetGroupsListAction: PropTypes.func.isRequired,
        ResetCurrentRoomAction: PropTypes.func.isRequired,
        ConversationMessagesAction: PropTypes.func.isRequired,
        CurrentRoomAction: PropTypes.func.isRequired,
        ResetNotificationsAction: PropTypes.func.isRequired,
     };

     constructor(props){
         super(props);
         this.chat = new SocketService()
     }

    componentWillMount(){

        this.props.ResetConversationAction();
        this.props.ResetGroupsAction();

        this.connection = this.chat.getData().subscribe(data => {
            switch (data.type) {
                case 'notification': {
                    this.props.NewNotificationAction(data.conversationList);
                    break;
                }
                case 'new-message': {
                    this.addConversationMessage(data);
                    break;
                }
                case 'typing': {
                    this.props.AddUserIsTypingAction(data);
                    this.changeTypingText();
                    break;
                }
                case 'stopped-typing': {
                    this.props.RemoveUserIsTypingAction(data);
                    this.changeTypingText();
                    break;
                }
                case 'status': {
                    this.props.UpdateConversationStatusAction(data);
                    break;
                }
                case 'members': {
                    this.props.GroupMembersAction(data.users);
                    break;
                }
            }
        });

        this.getConversationList(0);
        this.getGroupsList(0);
        this.userStatus = Observable.interval(this.STATUS_UPDATE_INTERVAL).subscribe(() => {
            this.checkUserStatus();
        });
    }

    render() {
        return (
            <MessagingComponent
                conversations={this.props.messages.conversations}
                groups={this.props.messages.groups}
                room={this.props.messages.current_room}
                messages={this.props.messages.messages}
                loading={this.props.messages.loading}
                typing_text={this.props.messages.typing_text}
                sendMessage = {this.sendMessage}
                joinRoom = {this.joinRoom}
                onScroll = {this.onScroll}
                onScrollMessaging = {this.onScrollMessaging}
                getGroupMembers = {this.getGroupMembers}
                userIsTyping = {this.userIsTyping}
                markAsRead = {this.markAsRead}
            />
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.messages.current_room.conversationId !== this.props.messages.current_room.conversationId) {
            this.joinRoom({room: nextProps.messages.current_room});
        }
    };

    componentWillUnmount(){
        this.props.ResetCurrentRoomAction();
        this.connection.unsubscribe();
        this.userStatus.unsubscribe();
    };

    addConversationMessage = (data) => {
        this.props.AddConversationMessagesAction(data);
    };

    changeTypingText = () => {
        let isTyping = this.props.messages.is_typing;
        const usersList =  isTyping.length;
        let typingText = '';
        if (usersList > 2) {
            typingText = 'Several people are typing';
        } else if (usersList === 1) {
            typingText = `${isTyping[0].user} is typing`;
        } else if (usersList === 2) {
            typingText = `${isTyping[1].user} and ${isTyping[0].user} are typing`;
        }
        this.props.AddTypingTextAction(typingText);
    };

    getConversationList = (offset) => {
        this.props.ConversationAction(offset);
    };

    getGroupsList =(offset) => {
        this.props.GetGroupsListAction(offset);
    };

    checkUserStatus = () => {
        const statusList = [];
        this.props.messages.conversations.map((item) => {
                statusList.push(item.userId);
        });
        this.chat.getConversationStatus(statusList);
    };

    userIsTyping = () => {
        if (!this.typing) {
            this.typing = !this.typing;
            this.chat.userIsTyping({user: this.props.user.displayName, id: this.currentRoom});
        }
        const lastTypingTime = (new Date()).getTime();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            const typingTimer = (new Date()).getTime();
            const timeDiff = typingTimer - lastTypingTime;
            if (timeDiff >= this._TYPING_TIMER_LENGTH && this.typing) {
               this.chat.userNoLongerTyping({user: this.props.user.displayName, id: this.currentRoom});
                this.typing = false;
            }
        }, this._TYPING_TIMER_LENGTH);
    };

    sendMessage = (message) => {
        this.chat.sendMessage({message: message, id: this.currentRoom, userId: this.currentUser});
        this.addConversationMessage({
            senderId: 'asdsa',
            conversationId: this.currentRoom,
            message: message,
            updatedAt: new Date(),
            displayName: this.props.userData.displayName,
            photoURL: this.props.userData.photoURL
        });
    };


    joinRoom = (room) =>  {
        if (this.currentRoom) {
            this.chat.leaveConversation(this.currentRoom);
        }
        if (room.conversationId) {
            this.currentRoom = room.conversationId;
            this.currentUser = room.userId;
        } else {
            this.currentRoom = room._id;
            this.currentUser = room.members;
        }
        this.chat.joinConversation(this.currentRoom);
        this.props.ConversationMessagesAction({room: this.currentRoom, offset: 0});
        this.props.CurrentRoomAction(room);
    };

    onScroll = () => {
        this.getConversationList(this.props.messages.conversationData.conversationCount);
    };

    onScrollMessaging = () => {
        this.props.ConversationMessagesAction({room: this.currentRoom, offset: this.props.messages.messageData.messageCount});
    };

    getGroupMembers = () => {
        this.chat.getGroupMembers(this.currentRoom);
    };

    markAsRead = () => {
        let room = this.props.messages.current_room;
        if (room.notifications) {
            let room_id;
            if (room.conversationId) {
                room_id = room.conversationId;
            } else {
                room_id = room._id;
            }
            this.props.ResetNotificationsAction(room_id);
            this.chat.markAsRead(room_id);
        }
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.userData,
    messages: state.messages,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({...messageAction}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessagingContainer);


