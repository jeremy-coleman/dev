import {BaseRoute} from '../BaseRoute';
import {Request, Response, Router} from 'express';
import {Notebook as NotebookModel} from '../../models/notebook';
import {Alert} from '../../models/alerts';

export class Notebook extends BaseRoute {

    public getNewNotebooksAction(router: Router): void {
        router.get('/get-new-notebooks', (req: Request, res: Response) => {
            const newNotebook = {
                name: req.body.name,
                userId: req.body.user._id,
                notebookId: req.body.notebookId,
                notebookLines: req.body.notebookLines
            };
            Alert.getUserNewNotebooks(req.body.user._id).subscribe(
                next => {
                    res.json({success: true, notebooks: next});
                }, () => {
                    res.status(400);
                    res.json({success: false, msg: 'unable to create'});
                }
            );
        });
    }

    public saveNotebookAction(router: Router): void {
        router.post('/send-notebook', (req: Request, res: Response) => {
            const newNotebook = {
                name: req.body.name,
                userId: req.body.user._id,
                notebookId: req.body.notebookId,
                notebookLines: req.body.notebookLines
            };
            NotebookModel.createOrUpdate(newNotebook, (err, notebook) => {
                if (err) {
                    res.json({success: false, msg: 'unable to create'});
                } else {
                    Alert.notifyRecipients(req.body.recipients, req.body.user._id, notebook._id).subscribe(
                        () => {
                            res.json({success: true});
                        },
                        () => {
                            res.status(400);
                            res.json({success: false, message: 'Something went wrong'});
                        }
                    );
                }
            });
        });
    }

    public notebookStatusAction(router: Router): void {
        router.post('/change-alert-status-notebook', (req: Request, res: Response) => {
            Alert.findOne({_id: req.body.alertId, toUserId: req.body.user._id}, (err, alert) => {
                if (err) {
                    res.json({success: false, msg: 'invalid id'});
                } else {
                    NotebookModel.changeStatus(alert._id, req.body.status, alert.objectId).subscribe((notebook) => {
                        res.json(notebook);
                    });
                }
            });
        });
    }
}
