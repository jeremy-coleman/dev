import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs'

import createHistory from 'history/createHashHistory'
import {
    AUTH_REGISTER,
    AUTH_CHECK
} from '../constants/actionTypes';
import {
    RegisterCompleteAction,
    AuthErrorAction,
    DefaultAction,
    AuthCheckAction
} from '../actions/auth.actions';
 import AuthService  from '../services/auth.service';

export const register = (action$) => {
    return action$
        .ofType(AUTH_REGISTER)
        .map(action => action.userInfo)
        .switchMap(userInfo => {
            return  new AuthService().appAuth(userInfo).map(user => {
                console.log(user);
                return RegisterCompleteAction(user)
            });
        }).do(() => {
            let history = createHistory();
            history.push('/dashboard')
        })
        .catch((error) => Observable.of(AuthErrorAction(error)));
};


export const check = (action$) => {
    return action$
    .ofType(AUTH_CHECK)
    .startWith(AuthCheckAction)
    .switchMap(() => {
        return  new AuthService().auth().map(user => {
            if (user) {
                return RegisterCompleteAction(user);
            } else {
                return DefaultAction();
            }
        })
    });
};
