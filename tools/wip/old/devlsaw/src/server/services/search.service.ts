import {Observable} from 'rxjs';
import {Group} from '../models/group';
import {User} from '../models/user';
import {Friend} from '../models/friend'

export class SearchService {

    public static search(condition: string): Observable<{users: Array<object>, groups: Array<object>}> {
        const re = new RegExp(condition, 'i');
        return new Observable( observer => {
            User.find({ displayName : { $regex: re} },
                '_id displayName photoURL',
                (err, result) => {
                observer.next(result);
            });
        }).mergeMap((users: any) => new Observable( observer => {
            Group.find({ name : { $regex: re } },
                '_id name',
                (err, groups) => {
                    observer.next({users: users, groups: groups});
                });
        }));
    }

    public static findPeople(condition: string, offset: number, currentUserId: string): Observable<any[]> {
        const re = new RegExp(condition, 'i');
        const limit = 10;
        return new Observable(observer => {
            User.find({ displayName : { $regex: re} },
                '_id displayName photoURL',
                {skip: offset, limit: limit},
                (err, result) => {
                    observer.next(result);
                });
        }).mergeMap((result: any) => new Observable(observer => {
            const userIds: Array<string> = [];
            result.map(user => userIds.push(user._id));
            Friend.find({ $or: [{userId: {$in: userIds}, friendId: currentUserId},
                                 {friendId: {$in: userIds}, userId: currentUserId}
            ]},'userId friendId',(err, friends) => {
                const friendIds: Array<string> = [];
                const searchResult: Array<object> = [];
                friends.map(friend => {
                    if (friend.userId !== currentUserId) {
                        friendIds.push(friend.userId.toString());
                    } else {
                        friendIds.push(friend.friendId.toString());
                    }
                });
                result.map((user) => {
                    if (friendIds.indexOf(user._id.toString()) > -1) {
                        searchResult.push({
                            _id: user._id,
                            photoURL: user.photoURL,
                            displayName: user.displayName,
                            friend: true,
                        });
                    } else {
                        searchResult.push({
                            _id: user._id,
                            photoURL: user.photoURL,
                            displayName: user.displayName,
                            friend: false,
                        });
                    }
                });
                observer.next(searchResult);
            });
        }));
    }

    public static findGroups(condition: string, offset: number): Observable<any> {
        const re = new RegExp(condition, 'i');
        const limit = 10;
        return new Observable(observer => {
            Group.find({ name : { $regex: re } },
                '_id name',
                {skip: offset, limit: limit},
                (err, groups) => {
                    observer.next({groups: groups});
                });
        });
    }
}