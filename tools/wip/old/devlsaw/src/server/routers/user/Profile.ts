import {BaseRoute} from '../BaseRoute';
import {Request, Response, Router} from 'express';
import {Group as GroupModel} from '../../models/group';
import {Friend} from '../../models/friend';

export class Profile extends BaseRoute {

    public infoAction(router: Router): void {
        router.get('/info', (req: Request, res: Response) => {
            GroupModel.find({members: {$elemMatch: {$eq:req.body.user.uid} } }, (err, groups) => {
                res.json( {user: req.body.user, groups: groups} );
            });
        });
    }

    public getFriendsAction(router: Router): void {
        router.get('/get-friends', (req: Request, res: Response) => {
            Friend.getFriendList(req.body.user._id, parseInt(req.query.offset)).subscribe(
                friends => {
                    res.json({success: true, friends: friends});
                },
                error => {
                    this.winston.log('error', error.toString());
                    res.status(400);
                    res.json({success: false, message: 'something went wrong'})
                }
            );
        });
    }

    public addToFriendsAction(router: Router): void {
        router.post('/add-to-friends', (req: Request, res: Response) => {
            if (req.body.userId) {
                Friend.addToFriends(req.body.user._id, req.body.userId).subscribe(
                    friend => {
                        if (friend) {
                            res.json({success: true, message: 'user succesfuly added'});
                        } else {
                            res.status(400);
                            res.json({success: false, message: 'Something went wrong'});
                        }
                    },
                    err => {
                        this.winston.log('error', err.toString());
                        res.status(400);
                        res.json({success: false, message: 'Something went wrong'});
                    });
            }
        });
    }
}

