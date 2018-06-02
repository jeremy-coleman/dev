import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {
    SEND_NOTEBOOK_RECIPIENTS,
    CHANGE_STATUS,
    GET_ALERTS
} from '../constants/actionTypes';
import * as notebookActions  from '../actions/notebook.actions';
import * as notebookService from '../services/notebook.service';
import * as globalActions  from '../actions/global.actions';
import NotificationService from '../services/electron/notification.service';


export const sendNotebook = (action$) => {
    return action$
    .ofType (SEND_NOTEBOOK_RECIPIENTS)
        .map(action => action.payload)
        .switchMap((data) => {
            return notebookService.sendNotebook(data).map(() => {
                new NotificationService().notify('Notebook', 'Sent successfully');
                return new globalActions.DefaultAction();
            });
        }).catch(() => {
            return [];
        });
};

export const changeStatus = (action$) => {
    return action$
        .ofType(CHANGE_STATUS)
        .map(action => action.payload)
        .switchMap((data) => {
            return notebookService.changeAlertStatus(data).map((notebook) => {
                if (data.status === 'accepted') {
                    this.ipcRenderer.send('save-notebook', {
                        file: {id: '', name: notebook.name},
                        lines: notebook.notebookLines,
                        send: true
                    });
                }
                return new notebookActions.UpdateNewNotebooksAction({data: data});
            });
        }).catch(() => {
            return [];
        });
};

export const getAlerts = (action$) => {
    return action$
        .ofType(GET_ALERTS)
        .switchMap(() => {
            return notebookService.getAlerts().map((alerts) => {
                if (alerts.notebooks.length > 0) {
                    return new notebookActions.NewAlertsAction(alerts.notebooks);
                }
                return new globalActions.DefaultAction();
            }).catch(() => []);
        }).catch(() => {
            return [];
        });
};