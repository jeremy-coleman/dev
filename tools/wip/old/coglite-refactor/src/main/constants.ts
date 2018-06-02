import * as path from 'path';
import {homedir} from 'os';
import * as url from 'url'




let cogliteDir = path.normalize(`${homedir()}/.coglite/`);
let uploadDir = path.normalize(`${homedir()}/.coglite/uploads/`);

const darwinEnv = process.platform === "darwin";

const iconPath = "static/icon.ico";

export let MAIN_CONFIG = {
    cogliteDir,
    uploadDir,
    iconPath,
    darwinEnv
}



/*export const INDEX_HTML_PATH = url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.resolve(__dirname, '..', 'app', 'index.html')
})
*/