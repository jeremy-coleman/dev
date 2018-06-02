import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import NotebookComponent from '../components/notebook/notebook.component';
import IpcRendererService from '../services/ipc.renderer.service';
import PopupService from '../services/popup.service';
import NotebookService from '../services/electron/notebook.service';
import CSVService from '../services/electron/csv.service';
import FileService from '../services/electron/file.service';
import NotificationService from '../services/electron/notification.service';
import {remote} from 'electron';
import {homedir} from 'os';
import  IpcMainService from '../services/electron/ipc.main.service';
import DBService  from '../services/electron/db.service';
import * as notebookAction from '../actions/notebook.actions';
import * as globalAction from '../actions/global.actions';


class NotebookContainer extends React.Component<any, any> {
    currentFileData: any;
    fileService: any;
    csvService: any;
    notify: any;
    ipcMain: any;
    popupService: any;
    ipcRenderer: any;
    notebookService: any;
    notebookEvents: any;
    notebookData: any;
    notebooks$;
    popups$;
    currentNotebook$;
    friends$;
    groups$;
    alerts$;
    recipients = [];
    editor = {
        index: null,
        mode: 'python',
        theme: 'eclipse',
        value: '',
    };
    line = {
        index: [],
        code: '',
        language: '',
        output: {
            output: '',
            success: true,
        }
    };

    static propTypes = {
        ChangeCurrentFileAction: PropTypes.func.isRequired,
        SourceFilesAction: PropTypes.func.isRequired,
        FilePreviewAction: PropTypes.func.isRequired,
        LineOutputAction: PropTypes.func.isRequired,
        UpdateNotebooksAction: PropTypes.func.isRequired,
        NewNotebookAction: PropTypes.func.isRequired,
        AddNotebookLinesAction: PropTypes.func.isRequired,
        ResetCurrentFileAction: PropTypes.func.isRequired,
        EditLineAction: PropTypes.func.isRequired,
        NewLineAction: PropTypes.func.isRequired,
        ExportDataFieldAction: PropTypes.func.isRequired,
        NewFileAction: PropTypes.func.isRequired,
        GetUserFriendListAction: PropTypes.func.isRequired,
        GetUserGroupsListAction: PropTypes.func.isRequired,
        SendNotebookRecipientsAction: PropTypes.func.isRequired,
        UpdateCurrentNotebookAction: PropTypes.func.isRequired,
        ChangeStatusAction: PropTypes.func.isRequired,
        DeleteNotebookAction: PropTypes.func.isRequired,
        GetAlertsAction: PropTypes.func.isRequired,

    };

    constructor(props){
        super(props);
        this.ipcRenderer = new IpcRendererService();
        this.ipcMain = new IpcMainService();
        this.notebookService = new NotebookService();
        this.csvService = new CSVService();
        this.fileService = new FileService();
        this.notify = new NotificationService();
        this.popupService = new PopupService();

    }

    componentWillMount(){
        this.currentFileData = this.props.notebook.currentFileData

        this.notebooks$ = this.props.notebook.notebooks;
        this.currentNotebook$ = this.props.notebook.currentNotebook;
        this.alerts$ = this.props.notebook.notebookRequests;
        this.popups$ = this.props.layout.popups;
        this.friends$ = this.props.global.friends;
        this.groups$ = this.props.global.groups;

        this.getFiles(name, File);

        this.notebookEvents = this.ipcMain.getNotebookEvents().subscribe(data => {
            switch (data.type) {
                case 'new-code':
                    this.notebookService.execPython({
                        index: data.input.index,
                        code: data.input.code,
                        language: data.input.language,
                    }).subscribe((line) => {
                        this.ipcRenderer.send(data.event, 'code-output', line);
                    });
                    break;
                case 'kill-process':
                    this.notebookService.killProcess();
                    break;
                case 'get-notebooks':
                    DBService.get('notebooks').then(table => {
                        table.find().$.subscribe((docs) => {
                            docs = docs.map(item => {
                                return {
                                    id: item._data._id,
                                    name: item._data.name,
                                };
                            });
                            this.ipcMain.send(data.event, 'notebooks', docs);
                        });
                    });
                    break;
                case 'save-notebook':
                    DBService.get('notebooks').then(notebooksStore => {
                        if (data.notebook.file.id) {
                            notebooksStore.findOne().where({_id: data.notebook.file.id}).exec().then((notebook) => {
                                notebook.name = data.notebook.file.name;
                                notebook.lines = data.notebook.lines;
                                notebook.save();
                                this.notify.notify('Notebook', 'Updated successfully!');
                            });
                        } else {
                            notebooksStore.insert({name: data.notebook.file.name, lines: data.notebook.lines}).then((notebook) => {
                                const notebook_data = {id: notebook._data._id, name: notebook._data.name, send: false};
                                if (data.notebook.send) {
                                    notebook_data.send = true;
                                }
                                this.ipcMain.send(data.event, 'new-notebook', notebook_data);
                                this.notify.notify('Notebook', 'Saved successfully!');
                            });
                        }
                    });
                    break;
                case 'delete-notebook':
                    DBService.get('notebooks').then(notebooksStore => {
                        notebooksStore.findOne().where({_id: data.notebook.id}).exec().then((notebook) => {
                            notebook.remove();
                            this.notify.notify('Notebook', 'Deleted successfully!');
                        }).catch(() => {
                            console.log('error');
                        });
                    });
                    break;
                case 'get-notebook-lines':
                    DBService.get('notebooks').then(notebooksStore => {
                        notebooksStore.findOne().where({_id: data.notebook.id}).exec().then((notebook) => {
                            this.ipcMain.send(data.event, 'notebook-lines', {lines: notebook.lines});
                        }).catch(() => {
                            console.log('error');
                        });
                    });
                    break;
                case 'get-files':
                    switch (data.action.name) {
                        case 'source-file': {
                            DBService.get('files').then((files) => {
                                files.findOne().where({_id: data.action.fileId}).exec().then((doc) => {
                                    this.ipcMain.send(data.event, 'source-file', {file: doc});
                                });
                            });
                            break;
                        }
                        default: {
                            DBService.get('files').then((files) => {
                                let dbfiles = [];
                                files.find().$.subscribe((docs) => {
                                    dbfiles = docs.map(item => item._data);
                                    this.ipcMain.send(data.event, 'source-files', {type: 'source-files', files: dbfiles});
                                });
                            });
                        }
                    }
                    break;
                case 'get-file-by-path':
                    this.csvService.readFileByLimit(data.path, 20).subscribe(
                        output => this.ipcMain.send(
                            data.event, 'render-file',
                            {
                                type: 'render-file',
                                data: output
                            }
                        ),
                        error => console.log(error)
                    );
                    break;
                case 'select-file':
                    this.fileService.upload(data.files).subscribe(
                        sourceFile => {
                            if (sourceFile) {
                                this.csvService.readFileByLimit(sourceFile.path, 20).subscribe(
                                    csv => {
                                        this.ipcMain.send(data.event, 'render-file', {
                                            type: 'render-file',
                                            fileInfo: sourceFile,
                                            data: csv
                                        });
                                        this.notify.notify('Files', 'Saved successfully!');
                                    },
                                    error => console.log(error)
                                );
                            }
                        },
                        err => console.log(err)
                    );
                    break;
                case 'export-datasets':
                    this.csvService.combineDataSets(data.files).subscribe((combinedFile) => {
                        remote.dialog.showSaveDialog({
                            title: 'combined.csv',
                            defaultPath: homedir()
                        }, (fileName) => {
                            if (fileName) {
                                this.fileService.mvFile(combinedFile, fileName).subscribe(
                                    saved => console.log(saved),
                                    error => console.log(error)
                                );
                            }
                        });
                    });
                    break;
            }
        });

        this.notebookService.killProcess();
        this.notebookData = this.ipcRenderer.getNotebookData().subscribe(data => {
            switch (data.type) {
                case 'source-files': {
                    this.props.SourceFilesAction(data.files);
                    break;
                }
                case 'render-file': {
                    this.props.FilePreviewAction({data: data, fileInfo: data.fileInfo || ''});
                    break;
                }
                case 'code-output': {
                    this.props.LineOutputAction(data.line);
                    break;
                }
                case 'notebooks': {
                    this.props.UpdateNotebooksAction(data.notebooks);
                    break;
                }
                case 'new-notebook': {
                    this.props.NewNotebookAction(data.notebook);
                    break;
                }
                case 'notebook-lines': {
                    this.props.AddNotebookLinesAction(data.lines);
                    break;
                }
            }
        });

        // run and connect ipython kernel
        this.notebookService.connectKernel();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.notebook.currentFileData.path !== this.props.notebook.currentFileData.path) {
            console.log('asdsa'); //to do
            this.selectExistFile({
                path: nextProps.notebook.currentFileData.path,
                fileName: nextProps.notebook.currentFileData.fileName,
                _id: '',
                createdAt: ''
            });
        }
    };

    componentWillUnmount(){
        this.props.ResetCurrentFileAction();
        this.notebookData.unsubscribe();
        this.notebookEvents.unsubscribe();
        this.notebookService.killProcess();
    };

    newLine = () => {
        if (this.line.code) {
            if (this.line.index !== null) {
                this.props.EditLineAction(this.line);
                this.editor.index = null;
            } else {
                this.props.NewLineAction(this.line);
            }
        }
    };

    editCode = (index) => {
        let notebookLines = this.props.notebook.notebookLines;
        this.editor.mode = notebookLines[index].language;
        this.editor.value = notebookLines[index].code;
        this.editor.index = index;//to do
    };

    execCode = (index) => {
        let notebookLines = this.props.notebook.notebookLines;
        this.ipcRenderer.send('new-code', {index: index, code: notebookLines[index].code, language: notebookLines[index].language});
    };

    selectFile = (path = '') => {
        this.ipcRenderer.send('select-file', path);
    };

    currentCode = (new_line) => {
        this.line = new_line;
    };

    getFiles = (name, fileId) => {
        setTimeout(() => {
            this.ipcRenderer.send('get-files', {name: name, fileId: fileId});
        })
    };

    selectExistFile = (data) => {
        this.ipcRenderer.send('get-file-by-path', data.path);
        this.props.ChangeCurrentFileAction(data);
    };

    selectField = (data) => {
        this.props.ExportDataFieldAction(data);
    };

    exportData = () => {
        if (this.props.notebook.exportData.length) {
            this.ipcRenderer.send('export-datasets', this.props.notebook.exportData);
        }
    };

    newFile = () => {
        this.resetKernel();
        this.props.NewFileAction();
    };

    saveNotebook = () => {
        let currentNotebook = this.props.notebook.currentNotebook;
        let notebookLines = this.props.notebook.notebookLines;
        if (notebookLines.length) {
            this.ipcRenderer.send('save-notebook', {file: currentNotebook, lines: notebookLines});
        }
    };

    sendNotebook = () => {
        this.props.GetUserFriendListAction(0);
        this.props.GetUserGroupsListAction(0);
        this.popupService.togglePopup('send_notebook');
    };

    sendNotebookRecipients = (recipients) => {
        let currentNotebook = this.props.notebook.currentNotebook;
        let notebookLines = this.props.notebook.notebookLines;
        if (notebookLines.length) {
            this.props.SendNotebookRecipientsAction({
                notebook: currentNotebook,
                lines: notebookLines,
                recipients: recipients
            });
        }
        this.popupService.togglePopup('send_notebook');
    };

    openNotebooks = () => {
        this.ipcRenderer.send('get-notebooks');
       this.popupService.togglePopup('notebooks');
    };

    currentNotebookName = (newName) => {
        this.props.UpdateCurrentNotebookAction({name: newName})
    };

    changeNotebook = (index) => {
        //this.popupService.togglePopup('notebooks');
        let notebooks = this.props.notebook.notebooks;
        const notebook = notebooks[index];
        this.props.UpdateCurrentNotebookAction({name: notebook.name, id: notebook.id});
        this.ipcRenderer.send('get-notebook-lines', {id: notebook.id});
    };

    acceptNotebook = (data) => {
        this.props.ChangeStatusAction({
            alert: data.alert.alertId,
            status: 'accepted',
            index: data.index
        });
    };

    rejectNotebook = (data) => {
        this.props.ChangeStatusAction({
            alert: data.alert.alertId,
            status: 'accepted',
            index: data.index
        });
    };

    deleteNotebook = (id) => {
        this.props.DeleteNotebookAction(id);
        this.ipcRenderer.send('delete-notebook', {id: id});
    };

    getAlerts = () => {
        this.props.GetAlertsAction();
    };

    resetKernel = () => {
        this.notebookService.resetKernel();
    };

    render() {
        return (
            <NotebookComponent
                notebookLines = {this.props.notebook.notebookLines}
                userFiles = {this.props.notebook.sourceFiles}
                currentFileData = {this.props.notebook.currentFileData}
                filePreviewData = {this.props.notebook.filePreviewData}
                selectExistFile = {this.selectExistFile}
                newLine = {this.newLine}
                editCode = {this.editCode}
                execCode = {this.execCode}
                selectFile = {this.selectFile}
                currentCode = {this.currentCode}
                selectField = {this.selectField}
                exportData = {this.exportData}
                newFile = {this.newFile}
                saveNotebook = {this.saveNotebook}
                sendNotebook = {this.sendNotebook}
                sendNotebookRecipients = {this.sendNotebookRecipients}
                openNotebooks = {this.openNotebooks}
                currentNotebookName = {this.currentNotebookName}
                changeNotebook = {this.changeNotebook}
                acceptNotebook = {this.acceptNotebook}
                rejectNotebook = {this.rejectNotebook}
                deleteNotebook = {this.deleteNotebook}
                resetKernel = {this.resetKernel}
                getAlerts = {this.getAlerts}
                recipients = {this.recipients}
                alerts = {this.alerts$}
                currentNotebook = {this.props.notebook.currentNotebook}
                editor = {this.editor}
                friends = {this.friends$}
                popups = {this.popups$}
                notebooks={this.notebooks$}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    notebook: state.notebook,
    layout: state.layout,
    global: state.global,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({...notebookAction,...globalAction}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotebookContainer);


