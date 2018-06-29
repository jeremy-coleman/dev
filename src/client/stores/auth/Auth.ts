import { observable, action } from "mobx";
import { persist } from "mobx-persist";

export class Auth {
    static persistenceKey = "coglite:auth";
    @persist @observable isLoggedIn = false;

    @action login = (_args: any) => {
        this.isLoggedIn = true;
        this.profile = {username: "user"};
    }
    @action logout = () => {
        this.isLoggedIn = false;
        this.profile = {};
    }
    @observable profile: any = {};
    constructor() {}
}
