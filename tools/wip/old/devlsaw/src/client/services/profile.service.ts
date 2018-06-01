import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import * as http from './http';

export const getProfileData = () => {
    let data: any
    return http.get(`/user/profile/info/`, data)

};
