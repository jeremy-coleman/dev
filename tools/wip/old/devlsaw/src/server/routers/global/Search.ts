import { BaseRoute } from '../BaseRoute';
import { Request, Response, Router } from 'express';
import { SearchService } from '../../services/search.service';


export class Search extends BaseRoute {

    public searchAction(router: Router): void {
        router.get('/', (req: Request, res: Response) => {
            SearchService.search(req.query.search).subscribe(
                result => {
                    res.json({success: true, result: result});
                },
                error => {
                    res.status(400);
                    res.json({success: false, message: 'something went wrong'});
                }
            );
        });
    }

    public findPeopleAction(router: Router): void {
        router.get('/people', (req: Request, res: Response) => {
            SearchService.findPeople(req.query.search, parseInt(req.query.offset), req.body.user._id).subscribe(
                result => {
                    res.json({success: true, result: result});
                },
                error => {
                    res.status(400);
                    res.json({success: false, message: 'something went wrong'});
                }
            );
        });
    }

    public findGroupsAction(router: Router): void {
        router.get('/groups', (req: Request, res: Response) => {
            SearchService.findGroups(req.query.search, parseInt(req.query.offset)).subscribe(
                result => {
                    res.json({success: true, result: result});
                },
                error => {
                    res.status(400);
                    res.json({success: false, message: 'something went wrong'});
                }
            );
        });
    }

}

