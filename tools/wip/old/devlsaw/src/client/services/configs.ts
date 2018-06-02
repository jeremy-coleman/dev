import {normalize} from 'path';
import {homedir} from 'os';

const  base = {
    env: process.env.ENV ? process.env.ENV : 'local',
    api: {
        url: process.env.API_URL
    },
    localDBname: process.env.localDBname,
    electron: process.env.electron,
    uploadDir: process.env.uploadDir,
    cogliteDir: process.env.cogliteDir,
    apiVersion: process.env.apiVersion
};

if (window && window['process'] && window['process']['type']) {
    base.electron = 'true';
    base.cogliteDir = normalize(`${homedir()}/.coglite/`);
    base.uploadDir = normalize(`${homedir()}/.coglite/uploads/`);
}

 export default base;
