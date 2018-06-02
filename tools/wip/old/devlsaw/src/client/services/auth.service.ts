import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import configs from './configs';
import {Observable} from 'rxjs/Observable';
import * as React from 'react'
import * as http from './http';


class AuthService {

    apiUrl = `${configs.api.url}/${configs.apiVersion}`;

    setJWTToken = (token) => {
        localStorage.setItem('JWT', token);
    };

    getUserData = () => {
        const userData = localStorage.getItem('user_data');
        if (userData) {
            return JSON.parse(userData);
        }
        return '';
    };

    setUserData = (userData) => {
        localStorage.setItem('user_data', userData);
    };

    isLoggedIn() {
        return this.getUserData();
    }

    isNotGuest() {
        const user = this.getUserData();
        if (user) {
            return user.uid !== null;
        }
        return false;
    }

    appAuth = (userInfo) => {
        return http.post(`${this.apiUrl}/user/auth/`, userInfo).map(res => {
            if (res.success) {
                this.setJWTToken(res.token);
                let user = {
                    photoURL: res.photoURL,
                    displayName: res.displayName,
                    email: res.email,
                    uid: res.uid,
                };
                this.setUserData(JSON.stringify(user));
                return user;
            }
        })
            .catch((error) => Observable.throw(error.json().error || 'Server error'))

    };

    setGuestMode = (guestData) => {
        localStorage.setItem('user_data', JSON.stringify(guestData));
    };

    logoutUser = () => {
        localStorage.removeItem('user_data');
        localStorage.removeItem('JWT');
    };

    auth = () => {
        return Observable.of(this.getUserData());
    }
}

export default AuthService;
