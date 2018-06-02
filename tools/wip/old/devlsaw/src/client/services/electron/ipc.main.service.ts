import base from '../configs';
import { remote } from 'electron';
import { Observable } from 'rxjs';



class IpcMainService {
    fileDialogOptions: any;
    notebookEvents$: Observable<{}>;

    ipcMain;

    constructor() {
         
            this.ipcMain = remote.ipcMain;
        
    }

    getNotebookEvents = () => {
        this.notebookEvents$ = new Observable(observer => {
            this.ipcMain.on('new-code', (event, arg) => {
                const input = arg[0];
                if (input.code) {
                    observer.next({
                        type: 'new-code',
                        input: input,
                        event: event
                    });
                }
            });

            this.ipcMain.on('kill-process', (event, arg) => {
                observer.next({
                    type: 'kill-process'
                });
            });

            this.ipcMain.on('get-notebooks', (event, arg) => {
                observer.next({
                    type: 'get-notebooks',
                    event: event
                });
            });

            this.ipcMain.on('save-notebook', (event, arg) => {
                observer.next({
                    type: 'save-notebook',
                    notebook: arg[0],
                    event: event
                });
            });

            this.ipcMain.on('delete-notebook', (event, arg) => {
                observer.next({
                    type: 'delete-notebook',
                    notebook: arg[0],
                    event: event
                });
            });

            this.ipcMain.on('get-notebook-lines', (event, arg) => {
                observer.next({
                    type: 'get-notebook-lines',
                    notebook: arg[0],
                    event: event
                });
            });

            this.ipcMain.on('select-file', (event, arg) => {
                remote.dialog.showOpenDialog(this.fileDialogOptions, (files) => {
                    observer.next({
                        type: 'select-file',
                        files: files,
                        event: event
                    });
                });
            });

            this.ipcMain.on('get-files', (event, arg) => {
                const action = arg[0];
                observer.next({
                    type: 'get-files',
                    action: action,
                    event: event
                });
            });

            this.ipcMain.on('get-file-by-path', (event, arg) => {
                if (arg.length) {
                    const path = arg[0];
                    observer.next({
                        type: 'get-file-by-path',
                        path: path,
                        event: event
                    });
                }
            });

            this.ipcMain.on('export-datasets', (event, arg) => {
                const files = arg[0];
                observer.next({
                    type: 'export-datasets',
                    files: files,
                    event: event
                });
            });

        });

        return this.notebookEvents$;
    };

    send = (event, eventName, ...args) => {
        event.sender.send(eventName, args);
    }
}


export default IpcMainService;