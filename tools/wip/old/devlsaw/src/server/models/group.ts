import {Schema, Model, Document, model} from 'mongoose';
import { Observable } from 'rxjs';
import { Conversation } from '../models/conversation';
import { Notification } from '../models/notification';

export interface IGroup extends Document {
    ownerId: string;
    name: string;
    description?: string;
    members: string;
}

export interface IGroupModel {
    getUserGroups(userId: string | Schema.Types.ObjectId, offset: number): Observable<any>
}

const groupSchema = new Schema({
    ownerId: {
        type: String,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    members: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        "default": Date.now()
    },
    updatedAt: {
        type: Date,
        "default": Date.now()
    }
});



groupSchema.static('getUserGroups', (userId: string | Schema.Types.ObjectId, offset: number) => {
    const limit = 10;
    return new Observable( observer => {
        Group.find({members: {$elemMatch: {$eq: userId} }},
            '_id name description members',
            {sort: {name: 1}, skip: offset, limit: limit},
            (err: Error, groups: any) => {
            if (err) {
                Observable.throw('something went wrong');
            } else {
                observer.next(groups);
            }
        });
    }).mergeMap((groups: any) => new Observable( observer => {
        const groupIds = [];
        groups.map(group => groupIds.push(group._id));
        Conversation.find({ group : { $in : groupIds } },
            '_id group',
            (err, conversations) => {
            if (err) {
                Observable.throw('something went wrong');
            } else {
                const maxNotifyCount = 100;
                const conversationIds = [];
                conversations.map(conversation => conversationIds.push(conversation._id));
                Notification.find({ toUserId: userId, seen: false, conversationId: { $in: conversationIds }},
                    'conversationId',
                    {limit: maxNotifyCount},
                    (err, notifications) => {
                        if (err) {
                            Observable.throw('something went wrong');
                        } else {
                            const groupConversation: Array<object> = [];
                            conversations.map( conversation => {
                                const notifyCount: any = notifications.filter((notification : any) => {
                                    return notification.conversationId.toString() === conversation._id.toString();
                                });
                                let groupElement = groups.find((group) => {
                                    return group._id.toString() === conversation.group.toString();
                                });
                                groupConversation.push({
                                    _id: conversation._id,
                                    name: groupElement.name,
                                    description: groupElement.description,
                                    members: groupElement.members,
                                    notifications: notifyCount.length || 0,
                                });
                            });
                            observer.next(groupConversation);
                        }
                    });
            }
        });

    }));
});




export type GroupModel = Model<IGroup> & IGroupModel & IGroup;

export const Group: GroupModel = <GroupModel>model<IGroup>("Group", groupSchema);