import {BaseEvent} from './BaseEvent';
import {Conversation as ConversationModel} from '../models/conversation';
import * as amqp from 'amqplib/callback_api';
import {User as UserModel} from '../models/user';
import {Notification} from '../models/notification';
import {Group} from "../models/group";

export class MessageEvent extends BaseEvent {

    public onGetInterlocutorsEvent(): void {
        this.socket.on('get-conversations', (offset) => {
            const limit = 15;
            offset = parseInt(offset);
            ConversationModel.getConversations(this.socket.user._id, offset, limit).subscribe(
                (interlocutorUsers) => {
                    return this.socket.emit('conversation-list',{type: 'conversations',
                        conversationList: interlocutorUsers
                    });
                });
        });
    }

    public onJoinConversationEvent(): void {
        this.socket.on('join-conversation', (conversation) => {
            console.log('join event');
            ConversationModel.findOne({_id: conversation, $and: [ { $or: [
                {fromUserId: this.socket.user._id},
                {recipient: this.socket.user._id},
                {group: { $exists: true} }
                ]} ] }, (err, conversation) => {
                if (err) {
                    this.socket.emit('conversation-permission-denied');
                } else if (conversation) {
                    if(conversation.type === 'direct') {
                        this.socket.join(conversation._id);
                        this.socket.emit('joined', conversation._id);
                        console.log('joined', conversation._id);
                    } else {
                        Group.findOne({_id: conversation.group,
                                       members: {$elemMatch: {$eq: this.socket.user._id}}},
                            (err, group) => {
                                if (err) {
                                    console.log('error', err.toString());
                                } else if (group) {
                                    this.socket.join(conversation._id);
                                    this.socket.emit('joined', conversation._id);
                                    console.log('joined', conversation._id);
                                }
                            }
                        )
                    }
                }
            });
        });
    }

    public onTypingEvent(): void {
        this.socket.on('typing', (conversation) => {
            console.log('typing');
            this.socket.broadcast.to(conversation.id).emit('typing', {
                type: 'typing',
                conversationId: conversation.id,
                userId: this.socket.user._id,
                user: this.socket.user.displayName
            });
        });
    }

    public onStoppedTypingEvent(): void {
        this.socket.on('stopped-typing', (conversation) => {
            console.log('stopped typing');
            this.socket.broadcast.to(conversation.id).emit('stopped-typing',{
                type: 'stopped-typing',
                conversationId: conversation.id,
                userId: this.socket.user._id
            })
        });
    }

    public onLeaveConversationEvent(): void {
        this.socket.on('leave-conversation', (conversation) => {
            this.socket.leave(conversation);
        });
    }

    public onNewMessageEvent(): void {
        this.socket.on('new-message', (conversationData) => {
            conversationData.senderId = this.socket.user._id;
            conversationData.updatedAt =  Date.now();
            this.socket.broadcast.to(conversationData.id).emit('refresh-messages',
                {
                    type: 'new-message',
                    senderId: conversationData.senderId,
                    conversationId: conversationData.id,
                    message: conversationData.message,
                    updatedAt: Date.now(),
                    displayName: this.socket.user.displayName,
                    photoURL: this.socket.user.photoURL
                });
            this.sendNotifications(conversationData);
            this.messageQueue(conversationData);
        });
    }

    public onStatusCheckEvent(): void {
        this.socket.on('check-status', (data) => {
            UserModel.find({_id: { $in: data }},
                '_id status updatedAt',
                (err: Error, users: any) => {
                if (users) {
                    this.socket.to(this.socket.id).emit('status', {
                        type: 'status',
                        users: users
                    });
                }
            });
        });
    }

    public onMessageReadEvent(): void {
        this.socket.on('mark-as-read', (conversationId) => {
            Notification.update({conversationId: conversationId, toUserId: this.socket.user._id},
                {seen: true}, {multi: true},
                (err, row) => {
                    if (err) {
                        console.log('error', err.toString());
                    }
            });
        });
    }

    public onGetGroupMembersEvent(): void {
        this.socket.on('group-members', (conversationId) => {
            ConversationModel.getGroupConversationUsers(conversationId)
                .subscribe((users) => {
                    this.socket.emit('group-members', {
                        type: 'members',
                        users: users
                    });
                });
        });
    }

    private sendNotifications(conversationData): void {
        ConversationModel.findConversationById(conversationData.id, this.socket.user._id)
            .subscribe((interlocutorUsers) => {
                if(conversationData.userId instanceof Array) {
                    conversationData.userId.map(id => {
                        this.redis.get(id.toString(),
                            (err, socketStore) => {
                                if (socketStore) {
                                    socketStore = JSON.parse(socketStore);
                                    socketStore.socketIds.map((id) => {
                                        this.socket.to(id).emit('notification', {
                                            type: 'notification',
                                            conversationList: interlocutorUsers
                                        });
                                    });
                                }
                            });
                    });
                } else {
                    this.redis.get(conversationData.userId.toString(), (err, socketStore) => {
                        if (socketStore) {
                            socketStore = JSON.parse(socketStore);
                            socketStore.socketIds.map((id) => {
                                this.socket.to(id).emit('notification', {type: 'notification',
                                    conversationList: interlocutorUsers
                                });
                            });
                        }
                    });
                }
            });
    }

    private messageQueue(conversationData): void {
        amqp.connect(process.env.AMQP_HOST, (err, conn) => {
            conn.createChannel((err, ch) => {
                const q = 'messaging';
                ch.assertQueue(q, {durable: false});
                ch.sendToQueue(q, new Buffer(JSON.stringify(conversationData)));
                console.log(" [x] Sent", conversationData);
            });
            setTimeout(() => { conn.close()}, 500);
        });
    }

}