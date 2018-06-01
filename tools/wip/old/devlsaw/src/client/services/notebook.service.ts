import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import * as http from './http';

export const sendNotebook = (data) => {
    const params = {
        notebookId: data.notebook.id,
        name: data.notebook.name,
        notebookLines: data.lines,
        recipients: data.recipients,
    };
    return http.post(`/notebook/notebook/send-notebook`, params)
        .map((res) => res);
};

export const changeAlertStatus = (data) => {
    const params = {
        alertId: data.alert,
        status: data.status,
    };
    return http.post(`/notebook/notebook/change-alert-status-notebook`, params)
        .map((res) => res);
};


export const getAlerts = () => {
    let data: any
    return http.get(`/notebook/notebook/get-new-notebooks`, data)
        .map((res) => res);
};