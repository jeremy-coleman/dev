import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import configs from './configs';
import { Observable } from 'rxjs/Observable';
import * as React from 'react'
import * as http from './http';
import * as io from 'socket.io-client';



class SocketService {
    socket;
    messagingEvents;

    getConversationStatus = (data) => {
        this.socket.emit('check-status', data);
    };
    userIsTyping = (data) => {
        this.socket.emit('typing', data);
    };

    userNoLongerTyping = (data) => {
        this.socket.emit('stopped-typing', data);
    };
    sendMessage = (data) => {
        this.socket.emit('new-message', data);
    };
    leaveConversation = (conversation) => {
        this.socket.emit('leave-conversation', conversation);
    };
    joinConversation = (conversation) => {
        this.socket.emit('join-conversation', conversation);
    };

    markAsRead = (conversation) => {
        this.socket.emit('mark-as-read', conversation);
    }

    getGroupMembers = (conversation_id) => {
        this.socket.emit('group-members', conversation_id);
    }

    getData = () => {
        this.messagingEvents = new Observable(observer => {
            this.socket = io.connect(`${configs.api.url}`, {
                query: {token: http.getJWTToken }
            });
            this.socket.on('refresh-messages', data => {
                observer.next(data);
            });

            this.socket.on('stopped-typing', data => {
                observer.next(data);
            });

            this.socket.on('typing', data => {
                observer.next(data);
            });

            this.socket.on('notification', data => {
                observer.next(data);
            });

            this.socket.on('check-status', data => {
                observer.next(data);
            });

            this.socket.on('group-members', data => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return this.messagingEvents;
    }
}

export default SocketService;