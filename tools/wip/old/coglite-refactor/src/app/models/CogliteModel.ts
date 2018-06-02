import { observable, action } from "mobx";
//import { DrawerViewModel } from "../sidenav/DrawerViewModel";

export class CogliteModel {
    
    @observable title = "Coglite";
    //drawer = new DrawerViewModel();

    @observable error: Error;

    @action onError = (error: Error) => {
        this.error = error;
    }
}