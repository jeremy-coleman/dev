import {Schema, Model, Document, model} from 'mongoose';
import {Observable} from 'rxjs';
import {INotebook, Notebook} from './notebook';

type AlertTypes = 'new_notebook' | 'friend_request' | 'new_message';
type StatusType = 'accepted' | 'rejected';

export interface IAlert extends Document {
    fromUserId: Schema.Types.ObjectId;
    toUserId: Schema.Types.ObjectId;
    alertType: AlertTypes;
    objectId?: string;
    seen: boolean;
    status?: StatusType;
    updatedAt: Date;
    createdAt: Date;
}

export interface IAlertModel {
    notifyRecipients(recipients: string[], user_id: string, notebook_id: string): Observable<any>;
    getUserNewNotebooks(user_id: string): Observable<INotebook[]>;
}

const alertSchema = new Schema({
    fromUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    toUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    alertType: {
        type: String,
        required: true,
    },
    objectId: {
        type: String,
        required: false,
    },
    seen: {
        type: Boolean,
        required: true,
        "default": false
    },
    status: {
        type: String,
        required: false,
        "default": null
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

alertSchema.static('notifyRecipients', (recipients, user_id, notebook_id) => {
    return new Observable( observer => {
        let newAlerts = [];
        recipients.forEach((recipient) => {
            newAlerts.push({
                objectId: notebook_id,
                toUserId: recipient,
                fromUserId: user_id,
                alertType: 'new_notebook'
            });
        });
        Alert.insertMany(newAlerts, (err, alerts) => {
            if (err) {
                Observable.throw('something went wrong');
            } else {
                observer.next(alerts);
            }
        });
    });
});

alertSchema.static('getUserNewNotebooks', (user_id) => {
    return new Observable( observer => {
        Alert.find({toUserId: user_id, status: null, alertType: 'new_notebook'}, (err, alerts) => {
            if (err) {
                Observable.throw('something went wrong');
            } else {
                let newNotebooks = [];
                alerts.forEach((alert) => {
                    newNotebooks.push(alert.objectId);
                });

                if(newNotebooks.length > 0) {
                    Notebook.find({_id: { $in: newNotebooks }}, (err, notebooks) => {
                        if (err) {
                            Observable.throw('something went wrong');
                        } else {
                            const newNotebooks = notebooks.map((notebook, i) => {
                                let newNotebook = {};
                                alerts.map((alert, i) => {
                                    if(alert.objectId == notebook._id) {
                                        newNotebook = {
                                            alertId: alert._id,
                                            notebookName: notebook.name,
                                        };
                                    }
                                });
                                return newNotebook;
                            });
                            observer.next(newNotebooks);
                        }
                    })
                } else {
                    observer.next([]);
                }
            }
        });
    });
});

export type AlertModel = Model<IAlert> & IAlertModel & IAlert;

export const Alert: AlertModel = <AlertModel>model<IAlert>("Alert", alertSchema);
