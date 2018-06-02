
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs'

import createHistory from 'history/createHashHistory'


import * as messageService from '../services/messages.service';
import NotificationService from '../services/electron/notification.service';
import * as notebookService from '../services/notebook.service';
import DBService from '../services/electron/db.service';
import * as profileService from '../services/profile.service';
import * as searchService from '../services/search.service'
import AuthService  from '../services/auth.service';
import * as userService from '../services/user.service';





export const register = (userInfo) => {

            return  new AuthService().appAuth(userInfo).map(user => {
                console.log(user);
                return user
            });
        }

let idk1 = () => {
            let history = createHistory();
            history.push('/dashboard')

};


export const check = (user) => {

        return  new AuthService().auth().map(user => {
            if (user) {return user} 
            else {return}
        })}




export const getFriendsList = (offset, friends) => {
            return userService.getFriendsList(offset).map(friends => {
                return friends;})}



export const globalGroupsList = (offset, groups) => {
            return userService.getGroupsList(offset).map(groups => {
                return  groups;
        });
};


export const getConversations = (offset, conversations) => {
            return messageService.getConversations(offset).map(conversations => {
                if (conversations.conversationList.length === 0) {
                    return '';
                }
                else return conversations.success, conversations.conversationList
            })};


export const getGroupsList = (offset, response) => {

            return messageService.getGroupsList(offset).map(response => {
                return response})}


export const getConversationsMessages = (data) => {

            return messageService.getConversationMessages(data).map(response => {
                return response})};



export const sendNotebook = (data) => {

            return notebookService.sendNotebook(data).map(() => {
                new NotificationService().notify('Notebook', 'Sent successfully');
                return })}


export const changeStatus = (data) => {

            return notebookService.changeAlertStatus(data).map((notebook) => {
                if (data.status === 'accepted') {
                  //@ts-ignore
                    this.ipcRenderer.send('save-notebook', {
                        file: {id: '', name: notebook.name},
                        lines: notebook.notebookLines,
                        send: true
                    });
                }
                return {data: data};
            });

};

export const watchAlerts = (alerts$) => {

            return notebookService.getAlerts().map((alerts) => {
                if (alerts.notebooks.length > 0) {
                    return alerts.notebooks;}
                    else return undefined})}
                    


export const profileEpic = (data) => {

            return profileService.getProfileData().map((data) => {
                DBService.get('profile').then(profileStore => {
                    profileStore.findOne().exec().then(profileData => {
                        if (profileData) {
                            profileData.user = data.user;
                            profileData.groups = data.groups;
                            profileData.save();
                        } else {
                            profileStore.insert(data);
                        }
                    });
                    return data;
                })})};

                


let idk = () => {
                return DBService.get('profile').then(profileStore => {
                    return profileStore.findOne().exec().then(profileData => {
                        if (profileData) {
                            return profileData._data.user, profileData._data.groups}

                         else { return };

})});}



export const getSearchList = (search) => {

            return searchService.getSearchList(search).map(response => {
                console.log(response.result.users);
                return response.result.users, response.result.groups;
            });
}


export const getSearchUsers = (search) => {

            return searchService.getSearchUsers(search).map(response => {
                return response.success, response.result;
            });
}


export const getSearchGroups = (search) => {

            return searchService.getSearchGroups(search).map(response => {
                return response.success, response.result.groups})}



export const userFriendRequest = (id) => {
            return searchService.connectRequest(id).map(response => {
                if (response.success) {return id};
            })
}