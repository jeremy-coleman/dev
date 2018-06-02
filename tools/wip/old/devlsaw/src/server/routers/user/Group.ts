import {BaseRoute} from '../BaseRoute';
import {Request, Response, Router} from 'express';
import {Group as GroupModel} from '../../models/group';

export class Group extends BaseRoute {

    public createAction(router: Router): void {
        router.get('/create', (req: Request, res: Response) => {
            const group = {
                ownerId: req.body.user._id,
                name: 'Coglite Test',
                description: 'test group',
                members: ['592d63b319d6c078c368cce7', '59357fb019d6c078c368efb4', '5937e04e19d6c078c368f0fa', '5937fd6419d6c078c368f0fb'],
            };
            GroupModel.create(group, (err, group) => {
                if (err) {
                    console.log(err);
                    res.json({success: false, msg: 'unable to create'});
                } else {
                    res.json(group);
                }
            })
        });
    }


    public getGroupsListAction(router: Router): void {
        router.get('/get-list', (req: Request, res: Response) => {
            GroupModel.getUserGroups(req.body.user._id, parseInt(req.query.offset))
                .subscribe(
                    groups => res.json(groups),
                    err => {
                        res.status(400);
                        res.json({success: true, message: 'something went wrong'});
                    }
                );
        });
    }

}

