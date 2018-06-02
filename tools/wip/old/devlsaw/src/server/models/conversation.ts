import { Schema, Model, Document, model } from 'mongoose';
import { Notification } from './notification';
import { Group } from './group';
import { User } from './user';
import { Observable } from 'rxjs/Observable';



export interface IConversation extends Document {
    type: string;
    fromUserId: Schema.Types.ObjectId;
    recipient?: Schema.Types.ObjectId;
    group?: Schema.Types.ObjectId;
    updatedAt: Date;
    createdAt: Date;
}

export interface IConversationModel {
    createOrUpdate(upsertData: any, callback: any): void;
    findOneOrCreate(data: any, callback: Function): void;
    getConversations(userId: string | Schema.Types.ObjectId, offset: number, limit: number): Observable<any>;
    findConversationById(conversationId: string | Schema.Types.ObjectId, userId: string | Schema.Types.ObjectId): Observable<any>;
    getGroupConversationUsers(conversationId: string | Schema.Types.ObjectId): Observable<any>;
}

const conversationSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    fromUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    },
    updatedAt: {
        type: Date,
        "default": Date.now()
    },
    createdAt: {
        type: Date,
        "default": Date.now()
    }
});

conversationSchema.static('createOrUpdate', (upsertData: any, callback: any) => {
    Conversation.update({uid: upsertData.uid}, upsertData, {upsert: true}, callback);
});

conversationSchema.static('findOneOrCreate', (data: any, callback: Function) => {
    Conversation.findOne(data, (err, conversation) => {
        return conversation
            ? callback(err, conversation)
            : Conversation.create(data, (err, conversation) => {
                return callback(err, conversation);
            });
    });
});


conversationSchema.static('getConversations', (userId: string | Schema.Types.ObjectId, offset: number, limit: number) => {
    return new Observable( observer => {
        Conversation.find({$and: [{type: 'direct'},{$or: [{recipient: userId},
                {fromUserId: userId}]}]},
            '_id fromUserId recipient',
            {sort: {updatedAt: -1}, skip: offset, limit: limit})
            .populate('recipient fromUserId', '_id photoURL displayName status updatedAt')
            .exec((err: Error, conversations: any) => {
                if (err) {
                    console.log('error', err.toString());
                    Observable.throw('Something went wrong');
                } else {
                    const conversationIds: Array<string> = [];
                    conversations.map((conversation) => {
                        conversationIds.push(conversation._id);
                    });

                    const interlocutorUsers: Array<{userId: string, photoURL: string | null,
                        displayName: string, conversationId: string,
                        notifications: number, status: string, lastSeen: Date
                    }> = [];
                    const maxNotifyCount = 100;
                    Notification.find({ toUserId: userId, seen: false, conversationId: { $in: conversationIds }},
                        'conversationId',
                        {limit: maxNotifyCount},
                        (err, notifications) => {
                            if (err) {
                                console.log('error', err.toString());
                                Observable.throw('Something went wrong');
                            } else {
                                conversations.map((conversation) => {
                                    const conversationId = conversation._id.toString();
                                    const fromUserId = conversation.fromUserId._id.toString();
                                    const recipient = conversation.recipient._id.toString();
                                    let notifyCount: any = notifications.filter((notification : any) => {
                                        return notification.conversationId.toString() === conversationId;
                                    });
                                    notifyCount = notifyCount.length;
                                    if (fromUserId !== userId) {
                                        interlocutorUsers.push({
                                            userId: fromUserId,
                                            photoURL: conversation.fromUserId.photoURL.toString(),
                                            displayName: conversation.fromUserId.displayName.toString(),
                                            conversationId: conversationId,
                                            notifications: notifyCount,
                                            status: conversation.fromUserId.status,
                                            lastSeen: conversation.fromUserId.updatedAt
                                        });
                                    } else {
                                        interlocutorUsers.push({
                                            userId: recipient,
                                            photoURL: conversation.recipient.photoURL.toString(),
                                            displayName: conversation.recipient.displayName.toString(),
                                            conversationId: conversationId,
                                            notifications: notifyCount,
                                            status: conversation.recipient.status,
                                            lastSeen: conversation.fromUserId.updatedAt
                                        });
                                    }
                                });
                                observer.next(interlocutorUsers);
                            }
                        });
                }
            });
    });

});

conversationSchema.static('findConversationById', (conversationId: string | Schema.Types.ObjectId, userId: string | Schema.Types.ObjectId) => {
    return new Observable( observer => {
        Conversation.find({_id: conversationId},
            '_id fromUserId recipient type',
            {sort: {updatedAt: -1}})
            .populate('recipient fromUserId', '_id photoURL displayName status updatedAt')
            .exec((err: Error, conversations: any) => {
                if(err) {
                    console.log('error', err.toString());
                    Observable.throw('Something went wrong');
                } else {
                    let interlocutor;
                    conversations.map((conversation) => {
                        if(conversation.type === 'direct') {
                            const conversationId = conversation._id.toString();
                            const fromUserId = conversation.fromUserId._id.toString();
                            const recipient = conversation.recipient._id.toString();

                            if (fromUserId === userId.toString()) {
                                interlocutor = {
                                    userId: fromUserId,
                                    photoURL: conversation.fromUserId.photoURL.toString(),
                                    displayName: conversation.fromUserId.displayName.toString(),
                                    conversationId: conversationId,
                                    notifications: 1,
                                    status: conversation.fromUserId.status,
                                    lastSeen: conversation.fromUserId.updatedAt,
                                    newNotification : true
                                };
                            } else {
                                interlocutor = {
                                    userId: recipient,
                                    photoURL: conversation.recipient.photoURL.toString(),
                                    displayName: conversation.recipient.displayName.toString(),
                                    conversationId: conversationId,
                                    notifications: 1,
                                    status: conversation.recipient.status,
                                    lastSeen: conversation.fromUserId.updatedAt,
                                    newNotification : true
                                };
                            }
                        } else {
                            interlocutor = conversation._id.toString();
                        }
                    });
                    observer.next(interlocutor);
                }
            });
    });
});


conversationSchema.static('getGroupConversationUsers', (conversationId: string | Schema.Types.ObjectId) => {
   return new Observable( observer => {
        Conversation.findOne({_id: conversationId}, (err, conversation) => {
            if (err) {
                console.log('error', err.toString());
                Observable.throw('Something went wrong');
            } else {
                if (conversation) {
                    observer.next(conversation);
                } else {
                    observer.complete();
                }
            }
        });
    }).mergeMap((conversation: any) => new Observable( observer => {
            Group.findOne({_id: conversation.group}, (err, group) => {
                if (err) {
                    console.log('error', err.toString());
                    Observable.throw('Something went wrong');
                } else {
                    if (group) {
                        observer.next(group);
                    } else {
                        observer.complete();
                    }
                }
            });

    }).mergeMap((group: any) => new Observable( observer => {
        if (group) {
            User.find({_id: {$in: group.members }},'_id displayName photoURL status',(err, users) => {
                if (err) {
                    console.log('error', err.toString());
                    Observable.throw('Something went wrong');
                }
                observer.next(users);
            });
        }
   })));
});



export type ConversationModel = Model<IConversation> & IConversationModel & IConversation;

export const Conversation: ConversationModel = <ConversationModel>model<IConversation>("Conversation", conversationSchema);
