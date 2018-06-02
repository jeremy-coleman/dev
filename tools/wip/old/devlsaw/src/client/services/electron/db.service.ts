import base from '../../services/configs';
import * as RxDB from 'rxdb';
import {configs, notebooks, files, profileData} from '../../schemas/schemas';


class DBService {

    static db = null;

    static async getInstance() {
        this.db = await RxDB.create({
            name: base.localDBname,
            adapter: 'localstorage'
        });

        await this.collections();

        return this;
    }

    static async get(schema) {
        if (this.db === null) {
            await DBService.getInstance();
        }
        return this.db[schema];
    }

    static async collections() {
        await this.db.collection({
            name: 'configs',
            schema: configs
        });

        await this.db.collection({
            name: 'files',
            schema: files
        });

        await this.db.collection({
            name: 'notebooks',
            schema: notebooks
        });

        await this.db.collection({
            name: 'profile',
            schema: profileData
        });
    }
}

RxDB.plugin(require('pouchdb-adapter-localstorage'));

export default DBService;