import {
    CHANGE_CURRENT_FILE,
    SOURCE_FILES,
    FILE_PREVIEW,
    OUTPUT_LINE,
    UPDATE_NOTEBOOKS,
    NEW_NOTEBOOK,
    ADD_NOTEBOOK_LINES,
    RESET_CURRENT_FILE,
    EDIT_LINE,
    NEW_LINE,
    EXPORT_DATA_FIELD,
    NEW_FILE,
    SEND_NOTEBOOK_RECIPIENTS,
    UPDATE_CURRENT_NOTEBOOK,
    CHANGE_STATUS,
    UPDATE_NEW_NOTEBOOKS,
    DELETE_NOTEBOOK,
    GET_ALERTS,
    NEW_ALERTS
} from '../constants/actionTypes';



export const ChangeCurrentFileAction = (payload) => {
    return {
        type: CHANGE_CURRENT_FILE,
        payload
    };
};
export const SourceFilesAction = (payload) => {
        return {
            type: SOURCE_FILES,
            payload
        }
};

export const FilePreviewAction = (payload) => {
    return {
        type:FILE_PREVIEW,
        payload
    }
};

export const LineOutputAction = (payload) => {
    return {
        type : OUTPUT_LINE,
        payload
    }
};

export const UpdateNotebooksAction = (payload) => {
    return {
        type: UPDATE_NOTEBOOKS,
        payload
    }
};

export const NewNotebookAction = (payload) => {
    return {
        type: NEW_NOTEBOOK,
        payload
    }
};

export const AddNotebookLinesAction = (payload) => {
    return {
        type: ADD_NOTEBOOK_LINES,
        payload
    }
};

export const ResetCurrentFileAction = (payload) => {
    return {
        type: RESET_CURRENT_FILE,
        payload
    }
};

export const EditLineAction = (payload) => {
    return {
        type: EDIT_LINE,
        payload
    }
};

export const NewLineAction = (payload) => {
    return {
        type:NEW_LINE,
        payload
    }
};

export const ExportDataFieldAction = (payload) => {
    return {
        type: EXPORT_DATA_FIELD,
        payload
    }
};

export const NewFileAction = (payload) => {
    return {
        type: NEW_FILE,
        payload
    }
};

export const SendNotebookRecipientsAction = (payload) => {
    return {
        type: SEND_NOTEBOOK_RECIPIENTS,
        payload
    }
};

export const UpdateCurrentNotebookAction = (payload)  => {
    return {
        type: UPDATE_CURRENT_NOTEBOOK,
        payload
    }
};

export const ChangeStatusAction = (payload) => {
    return {
        type: CHANGE_STATUS,
        payload
    }
};

export const UpdateNewNotebooksAction = (payload) => {
    return {
        type: UPDATE_NEW_NOTEBOOKS,
        payload
    }
};

export const DeleteNotebookAction = (payload) => {
    return {
        type: DELETE_NOTEBOOK,
        payload
    }
};

export const GetAlertsAction = () => {
    return {
        type: GET_ALERTS,

    }
};

export const NewAlertsAction = (payload) => {
    return {
        type: NEW_ALERTS,
        payload
    }
};