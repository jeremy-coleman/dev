import {Schema, Model, Document, model} from 'mongoose';
import {User} from './user';
import {Observable} from 'rxjs/Observable';


export interface IFriend extends Document {
    userId: string;
    friendId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IFriendModel {
    getUserFriends(userId: string | Schema.Types.ObjectId, offset: number): Observable<any>
    addToFriends(userId: string | Schema.Types.ObjectId, friendId: string | Schema.Types.ObjectId): Observable<any>
    getFriendList(userId: string | Schema.Types.ObjectId, offset: number): Observable<any[]>
}

const friendSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    friendId: {
        type: String,
        required: true,
        ref: 'User'
    },
    active: {
        type: Boolean,
        required: true,
        "default": true
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


friendSchema.static('addToFriends', (userId: string | Schema.Types.ObjectId, friendId: string | Schema.Types.ObjectId) => {
    return new Observable(observer => {
        User.findOne({_id: friendId}, (err, user: any) => {
            if (err) {
                observer.error(err);
            } else {
                observer.next(user);
            }
        });
    }).mergeMap((user: any) => new Observable(observer => {
        if(user) {
            Friend.update({userId: userId, friendId: user._id, active: true},
                {userId: userId, friendId: user._id, active: true,
                    updatedAt: Date.now(), createdAt: Date.now()},
                {upsert: true},
                (err, friend) => {
                    if (err) {
                        observer.error(err);
                    } else {
                        observer.next(friend);
                    }
            });
        } else {
            observer.next([]);
        }
    }));
});

friendSchema.static('getFriendList', (userId: string | Schema.Types.ObjectId, offset: number) => {
    const limit = 30;
    return new Observable(observer => {
        Friend.find({active: true, $or: [
            {userId: userId},{friendId: userId}
        ]}, 'userId friendId',
            {sort: {updatedAt: -1}, skip: offset, limit: limit},
            (err, friends) => {
            if(err) {
               observer.error(err)
            } else {
               observer.next(friends)
            }
        });
    }).mergeMap((friends: any) => new Observable(observer => {
        if(friends.length) {
            console.log(friends);
            const friendsIds: Array<string> = [];
            friends.map(friend => {
                if(friend.userId.toString() === userId.toString()) {
                    friendsIds.push(friend.friendId);
                } else {
                    friendsIds.push(friend.userId);
                }
            });
            User.find({_id: {$in: friendsIds}},
                '_id displayName photoURL',
                (err, users) => {
                if (err) {
                    observer.error(err)
                } else {
                    observer.next(users);
                }
            });
        } else {
            observer.next([]);
        }
    }));
});

export type FriendModel = Model<IFriend> & IFriendModel & IFriend;

export const Friend: FriendModel = <FriendModel>model<IFriend>("Friend", friendSchema);