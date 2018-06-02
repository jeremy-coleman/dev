import {Observable} from 'rxjs';
import base from './configs';
import * as electron from 'electron';


class IpcRendererService {
    notebookEvents$;
    ipcRenderer;

    constructor() {
        if (base.electron) {
            this.ipcRenderer = electron.ipcRenderer;
        }
    }

    send = (event, ...args) => {
        this.ipcRenderer.send(event, args);
    };

    getNotebookData = () => {
        this.notebookEvents$ = new Observable(observer => {

            this.ipcRenderer.on('source-files', (event, data) => {
                observer.next(data[0]);
            });

            this.ipcRenderer.on('render-file', (event, arg) => {
                const csv = arg[0];
                const output = csv;
                if (typeof output['fields'] === 'undefined') {
                    output['fields'] = csv['data'][0];
                }

                output['data'].splice(0, 1);
                observer.next(output);
            });

            this.ipcRenderer.on('code-output', (event, data) => {
                observer.next({
                    type: 'code-output',
                    line: data[0]
                });
            });

            this.ipcRenderer.on('notebooks', (event, arg) => {
                observer.next({
                    type: 'notebooks',
                    notebooks: arg[0]
                });
            });

            this.ipcRenderer.on('notebook-lines', (event, arg) => {
                observer.next({
                    type: 'notebook-lines',
                    lines: arg[0].lines
                });
            });

            this.ipcRenderer.on('new-notebook', (event, arg) => {
                observer.next({
                    type: 'new-notebook',
                    notebook: arg[0]
                });
            });

        });

        return this.notebookEvents$;
    }

}


export default IpcRendererService;