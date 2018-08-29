import axios from "axios";
import { IUserProfile } from "../IUserProfile";
import { IUser } from "../IUser";
import { IUserService, IGetUsersRequest } from "./IUserService";
import { IBasicAuthCredentials } from "@coglite/framework/common/IBasicAuthCredentials";

const Defaults = {
    baseUrl: "/api",
    auth: undefined
}

class RestUserService implements IUserService {
    private _baseUrl : string;
    private _auth : IBasicAuthCredentials;
    get baseUrl() {
        return this._baseUrl || Defaults.baseUrl;
    }
    set baseUrl(value) {
        this._baseUrl = value;
    }
    get auth() {
        return this._auth || Defaults.auth;
    }
    set auth(value) {
        this._auth = value;
    }
    getUsers(request?: IGetUsersRequest) : Promise<IUser[]> {
        return axios.get(`${this.baseUrl}/user/`, { params: request, auth: this.auth }).then(value => {
            return value.data as IUser[];
        });
    }
    getUserProfile() : Promise<IUserProfile> {
        return axios.get(`${this.baseUrl}/self/profile/`, { auth: this.auth }).then(value => {
            return value.data as IUserProfile;
        });
    }
}

export {
    RestUserService
}