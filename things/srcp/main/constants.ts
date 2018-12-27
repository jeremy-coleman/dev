import {normalize} from 'path';
import {homedir} from 'os';

let cogliteDir = normalize(`${homedir()}/.coglite/`);
let uploadDir = normalize(`${homedir()}/.coglite/uploads/`);

const darwinEnv = process.platform === "darwin";

const iconPath = "static/icon.ico";

export let CONSTANTS = {
    cogliteDir,
    uploadDir,
    iconPath,
    darwinEnv
}