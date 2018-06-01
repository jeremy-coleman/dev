import {Schema, Model, Document, model} from 'mongoose';
import {Alert} from './alerts';
import {Observable} from 'rxjs';


interface INotebookLine {
    index?: number;
    inputIndex?: number;
    code: string;
    language: string;
    output: {
        success: boolean;
        output?: string;
        errorType?: string;
    };
}

export interface INotebook extends Document {
    userId: Schema.Types.ObjectId;
    notebookId: string;
    name: string;
    notebookLines: Array<INotebookLine>;
    updatedAt: Date;
    createdAt: Date;
}

export interface INotebookModel {
    createOrUpdate(upsertData: any, callback: any): void

    changeStatus(alert: string, status: string, notebookId: string): Observable<any>;
}

const notebookSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
        "default": 'No Name'
    },
    notebookId: {
        type: String,
        required: true,
    },
    notebookLines: {
        type: Array,
        required: true
    },
    updatedAt: {
        type: Date,
        "default": Date.now()
    },
    createdAt: {
        type: Date,
        "default": Date.now()
    }
});

notebookSchema.static('createOrUpdate', (upsertData: any, callback: any) => {
    Notebook.findOneAndUpdate({
        notebookId: upsertData.notebookId,
        userId: upsertData.userId
    }, upsertData, {upsert: true, 'new': true, setDefaultsOnInsert: true }, callback);
});

notebookSchema.static('changeStatus', (alert: string, status: string, notebookId: string) => {
    return new Observable(observer => {
        Alert.update({_id: alert}, {status: status}, (err) => {
            if (err) {
                Observable.throw('something went wrong');
            } else {
                Notebook.findOne({_id: notebookId}, (err, notebook) => {
                    if (err) {
                        Observable.throw('something went wrong');
                    } else {
                        observer.next(notebook);
                    }
                });
            }
        });
    });
});

export type NotebookModel = Model<INotebook> & INotebook & INotebookModel;

export const Notebook: NotebookModel = <NotebookModel>model<INotebook>("Notebook", notebookSchema);
