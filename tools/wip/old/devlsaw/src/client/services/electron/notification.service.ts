import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import * as React from 'react';

class NotificationService {

    notify(title, message) {
        new Notification(title, {body: message});
    }
}

export default NotificationService;