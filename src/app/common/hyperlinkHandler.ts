import { shell } from 'electron';
import * as URL from 'url';
import * as QueryString from 'querystring';



export function navigate(url: string) {
    try {
        const parsed: any = URL.parse(url);
        if (parsed.protocol === "cog-main:") {
            const params: any = QueryString.parse(parsed.query);
            if (parsed.host === 'inspect') {navigateInspectUrl(params);} 
                else if (parsed.host === 'appsettings') {navigateAppSettingsUrl(params);}
                else if (parsed.host === 'user-credentials') { navigateUserCredentialsUrl(params);} 
                else if (parsed.host === 'command') {navigateCommandUrl(params); }
           }   
                    else if (parsed.protocol.startsWith('file:')) {/*noop*/}
                    else if (parsed.protocol.startsWith('javascript:')) {/*noop*/} 
                        else {shell.openExternal(url, { activate: true });}} 
         
         catch (e) {console.error(e.message);
    }
}

function navigateInspectUrl(params: string[]) {
    try {
        const encoded = params['obj'];
        let json;
        let obj;
        try {json = decodeURIComponent(encoded); }
         catch (e) {json = encoded;}
         
        try {obj = JSON.parse(json);}
         catch (e) {obj = json;}}

    finally {console.log('fml')}
}

function navigateAppSettingsUrl(args: string[]) {}

function navigateUserCredentialsUrl(args: string[]) {
    args = args || [];
    if (!args.length) {
        const settings = null
        const activeSubscritionId: any = {};

    } else {
        return
        // todo
    }

}

function navigateCommandUrl(params: string[]) {
    if (!params || !params['args'])
        return;
    const json = decodeURIComponent(params['args']);
    const args = JSON.parse(json);

}

/*function navigateExampleUrl(payload: string) {
    const settings = getSettings();
    Electron.ipcRenderer.send("createExampleWindow", { //YOU WILL NEED TO MAKE A CORRESPONDING WINDOW CLASS IN THE SERVER FOLDER
        payload: payload,
        settings: settings,
        serviceUrl: NodeJSMainProxy.serviceUrl
    });
}
*/