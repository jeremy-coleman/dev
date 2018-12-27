import * as fs from "fs";
import * as path from "path";
import * as electron from "electron";
import * as mpkdirp from "mkdirp";
import { isNullOrUndefined as isNull } from "util";

const userDataPath = electron.app.getPath("userData");
interface JsonResult { data?: any; error?: Error; }


 //JSON.parse inside a try/catch because json.stringify is uncatchable inside a promise
function fromJSON(json: string): JsonResult {
    try {
        return { data: JSON.parse(json) };
    } catch (error) {
        return { error };
    }
}

 // JSON local storage
export class AppStorage {
    static storagePrefix = "storage";
    static location = () => path.join(userDataPath, AppStorage.storagePrefix);
    constructor(private storeName: string) {



    const _self = this;

    this.getItem = () => new Promise((resolve, reject) => {
        
            try { fs.readFile(_self.localPath, "utf-8", (error, data) => {
                    if (error) {reject(error);return;}
                    
                    const result = fromJSON(data);
                    if (!isNull(result.error)) {reject(result.error);
                        return;} // Can't catch JSON parse errors here
         
                    resolve(result.data);
                });
            } catch (e) {
   
                reject(e);
            }
        });
    }
    get localPath(): string {
        return path.resolve(
            AppStorage.location(),
            `${this.storeName}.json`);
    }
    getItem: () => Promise<any>;
    setItem = (data: any) => {
        const _self = this;
        return new Promise((resolve, reject) => {
            try {
                fs.writeFile(_self.localPath, JSON.stringify(data), (error) => {
                        if (error) { reject(error); return; }

                        resolve();
                            });
                        } catch (e) {reject(e);}
        });
    }

    clear = () => this.setItem({});
}

mpkdirp.sync(AppStorage.location());