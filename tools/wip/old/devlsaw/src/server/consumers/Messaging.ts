import * as dotenv from 'dotenv';
import * as amqp from 'amqplib/callback_api';
import * as mongoose from 'mongoose';
import {Messages} from '../models/messages';
import {Notification} from '../models/notification';
import {Conversation} from '../models/conversation';
import {Group} from '../models/group';

export class MessagingConsumer {

    private static instance: MessagingConsumer;

    public static bootstrapConsumer(): MessagingConsumer {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        this.setEnvironment();
        this.database();
        this.process();
    }

    private process(): void {
        amqp.connect(process.env.AMQP_HOST, (err, conn) => {
            conn.createChannel((err, ch) => {
                const q = 'messaging';
                ch.assertQueue(q, {durable: false});
                ch.consume(q, (msg) => {
                    const conversationData = JSON.parse(msg.content.toString());
                    Conversation.findOne({_id: conversationData.id}, (err, conversation) => {
                        if (err) {
                            console.log('error', err.toString());
                        } else {
                            this.saveMessage(conversation, conversationData);
                        }
                    });
                }, {noAck: true});
            });
        });
    }

    private updateConversation(conversation: any, conversationData: any) {
        Conversation.update({conversationId: conversation._id},
            {updatedAt: conversationData.updatedAt},
            (err, row) => {
                if (err) {
                    console.log('error', err.toString());
                }
            });
    }

    private saveNotification(conversation: any, conversationData: any, messageId: string) {
        if (conversation.type === 'direct') {
            const userToId = conversation.fromUserId.toString() === conversationData.senderId.toString()
                ? conversation.recipient.toString()
                : conversation.fromUserId.toString();
            Notification.create({
                conversationId: conversation._id,
                messageId: messageId,
                fromUserId: conversationData.senderId,
                toUserId: userToId
            }, (err, notification) => {
                if (err) {
                    console.log('error', err.toString());
                }
            });
        } else {
            Group.findOne({_id: conversation.group}, 'members', (err: Error, group: any) => {
                if (err) {
                    console.log('error', err.toString());
                } else {
                    const members = group.members.filter(member => member !== conversationData.senderId);
                    const notifications: Array<object> = [];
                    members.map((member) => {
                        notifications.push({
                            conversationId: conversation._id,
                            messageId: messageId,
                            fromUserId: conversationData.senderId,
                            toUserId: member
                        });
                    });
                    Notification.create(notifications, (err: Error, notifications: any) => {
                        if (err) {
                            console.log('error', err.toString());
                        }
                    });
                }
            });
        }
    }

    private saveMessage(conversation: any, conversationData: any) {
        Messages.create({
            senderId: conversationData.senderId,
            conversationId: conversation._id,
            messageBody: conversationData.message,
            updatedAt: conversationData.updatedAt
        }, (err, message) => {
            if (err) {
                console.log('error', err.toString());
            } else {
                this.updateConversation(conversation, conversationData);
                this.saveNotification(conversation, conversationData, message._id);
            }
        });
    }

    private database(): void {
        mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
        mongoose.connection.on('error', () => {
            console.log('MongoDB connection error. Please make sure MongoDB is running.');
            process.exit();
        });
    }


    private setEnvironment(): void {
        if (process.env.NODE_ENV === 'test') {
            dotenv.config({path: "../../.env.test"});
        } else {
            dotenv.config({path: "../../.env"});
        }
    }


}

MessagingConsumer.bootstrapConsumer();