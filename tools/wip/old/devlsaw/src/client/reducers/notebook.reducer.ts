import {
    CHANGE_CURRENT_FILE,
    SOURCE_FILES,
    OUTPUT_LINE,
    FILE_PREVIEW,
    UPDATE_NOTEBOOKS,
    NEW_NOTEBOOK,
    ADD_NOTEBOOK_LINES,
    RESET_CURRENT_FILE,
    EDIT_LINE,
    NEW_LINE,
    NEW_FILE,
    EXPORT_DATA_FIELD,
    UPDATE_CURRENT_NOTEBOOK,
    UPDATE_NEW_NOTEBOOKS,
    DELETE_NOTEBOOK,
    NEW_ALERTS

} from '../constants/actionTypes';

const initialState  = {
    notebookLines: [],
    currentNotebook: {
        id: '',
        name: 'No Name'
    },
    notebooks: [],
    notebookRequests: [],
    sourceFiles: [],
    currentFileData: {
        _id: '',
        fileName: '',
        path: '',
        createdAt: '',
    },
    filePreviewData: '',
    exportData: []

};

const notebook = (state = initialState, action)  => {
    switch (action.type) {
        case CHANGE_CURRENT_FILE:
            return {
                ...state,
                currentFileData: action.payload
            };
        case SOURCE_FILES:
            const currentFile = typeof action.payload[0] !== 'undefined' ? action.payload[0] : state.currentFileData;
            return {
                ...state,
                sourceFiles: action.payload,
                currentFileData: currentFile
            };
        case FILE_PREVIEW:
            const fileInfo = action.payload.fileInfo ? action.payload.fileInfo : state.currentFileData;
            const sourceFiles = action.payload.fileInfo ? state.sourceFiles.concat(action.payload.fileInfo) : state.sourceFiles;
            const fields = {...action.payload.data};
            fields.fields = fields.fields.map((item, i) => {
                const new_item = {name: item, checked: false};
                state.exportData.map((data) => {
                    if (data.filePath === fileInfo.path) {
                        if (data.fields.indexOf(i) > -1) {
                            new_item.checked = true;
                        }
                    }
                });
                return new_item;
            });
            return {
                ...state,
                filePreviewData: fields,
                currentFileData: fileInfo,
                sourceFiles: sourceFiles
            };
        case OUTPUT_LINE: {
            const notebookLines = state.notebookLines;
            let new_state = [];
            new_state = notebookLines.map((line, i) => {
                let new_line = {...line};
                if (i === action.payload.index) {
                    new_line = action.payload;
                }
                return new_line;
            });
            return {
                ...state,
                notebookLines: new_state,
            };
        }
        case UPDATE_NOTEBOOKS:
            return {
                ...state,
                notebooks: action.payload,
            };
        case NEW_NOTEBOOK: {
            let new_state = state.notebooks.concat(action.payload);
            const current_notebook = !action.payload.send ? action.payload : state.currentNotebook;
            return {
                ...state,
                notebooks: new_state,
                currentNotebook: {
                    ...state.currentNotebook,
                    name: current_notebook.name,
                    id: current_notebook.id
                }
            };
        }
        case ADD_NOTEBOOK_LINES:
            return {
                ...state,
                notebookLines: action.payload
            };
        case RESET_CURRENT_FILE:
            return {
                ...state,
                currentFileData: initialState.currentFileData
            };
        case EDIT_LINE: {
            let notebookLines = state.notebookLines;
            let new_state = [];
            new_state = notebookLines.map((line, i) => {
                const new_line = {...line};
                if (i === action.payload.index) {
                    new_line.code = action.payload.code;
                    new_line.language = action.payload.language;
                    new_line.inputIndex = null;
                    new_line.output = {
                        output: '',
                        success: true
                    };
                }
                return new_line;
            });
            return {
                ...state,
                notebookLines: new_state,
            };
        }
        case NEW_LINE:
            let notebookLines = state.notebookLines.concat(action.payload);
            return {
                ...state,
                notebookLines: notebookLines,
            };
        case EXPORT_DATA_FIELD:
            let exportData = [];
            const index = action.payload.index;
            const checked = action.payload.checked;
            const path = state.currentFileData.path;
            let exist = false;

            if (!state.exportData.length) {
                exportData = state.exportData.concat({filePath: path, fields: [index]});
            } else {
                exportData = state.exportData.map((data) => {
                    const new_data = {...data};
                    if (data.filePath === path) {
                        exist = true;
                        if (checked) {
                            new_data.fields = new_data.fields.concat(index);
                        } else {
                            new_data.fields = new_data.fields.filter(item => item !== index);
                        }
                    }
                    return new_data;
                });
            }

            if (!exist) {
                exportData = state.exportData.concat({filePath: path, fields: [index]});
            }

            exportData = exportData.filter((data) => {
                if (data.fields.length) {
                    return data;
                }
            });

            return {
                ...state,
                exportData: exportData
            };
        case NEW_FILE:
            return {
                ...state,
                notebookLines: [],
                currentNotebook: initialState.currentNotebook
            };
        case UPDATE_CURRENT_NOTEBOOK: {
            const newNotebook = {...action.payload};
            if (typeof newNotebook['id'] === 'undefined') {
                newNotebook.id = state.currentNotebook.id;
            }
            let new_state = state.notebooks;
            if (newNotebook.id) {
                new_state = state.notebooks.map(notebook => {
                    const notebook_state = {...notebook};
                    if (notebook_state.id === newNotebook.id) {
                        notebook_state.name = newNotebook.name;
                    }
                    return notebook_state;
                });
            }
            return {
                ...state,
                currentNotebook: newNotebook,
                notebooks: new_state
            };
        }
        case UPDATE_NEW_NOTEBOOKS:
            const update = action.payload;
            const newNotebookRequests = state.notebookRequests.filter((request) => {
                const new_item = {...request};
                if (new_item.alertId !== update.data.alert) {
                    return new_item;
                }
            });
            return {
                ...state,
                notebookRequests: newNotebookRequests
            };
        case DELETE_NOTEBOOK:
            const notebooks = state.notebooks;
            let new_state = [];
            new_state = notebooks.filter((notebook) => {
                if (notebook.id !== action.payload) {
                    return notebook;
                }
            });
            return {
                ...state,
                notebooks: new_state,
            };
        case NEW_ALERTS:
            return {
                ...state,
                notebookRequests: action.payload
            };
        default: {
            return state;
        }
    }

};

export default notebook;