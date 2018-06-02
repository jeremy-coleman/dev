import * as React from 'react';
import PreviewComponent from './preview.component';
import AlertsComponent from './alerts.component';
import SideBarComponent from './sidebar.component';
import { connect } from 'react-redux';


class NotebookComponent extends React.Component<any, any> {
    notebookCode: any;
    constructor(props) {
        super(props);
        this.state = {
            currentNotebookName: this.props.currentNotebook,
        };
        console.log(this.props.recipients);
    }

    nameChanged(event) {
        this.setState({currentNotebookName: event.target.value});
        this.props.currentNotebookName(event.target.value);
    }

    render() {
        return(
            <div>
                {
                    (this.props.alerts).length > 0 ? <AlertsComponent alerts={this.props.alerts}/> : ''
                }
                <div className="notebook">
                    <div className="notebook-app">
                        {this.state.currentNotebookName}
                        <h3>Notebook - <input
                            className="notebookName"
                            onBlur={(e) => {this.nameChanged(e)}}
                            defaultValue={this.state.currentNotebookName}
                            />
                        </h3>
                        <PreviewComponent
                        // @ts-ignore
                            newFile={this.props.newFile}
                            openNotebooks={this.props.openNotebooks}
                            saveNotebook={this.props.saveNotebook}
                            editor={this.props.editor}
                            resetKernel={this.props.resetKernel}
                            notebookCode={this.notebookCode}
                            notebookLines={this.props.notebookLines}
                            execCode={this.props.execCode}
                            editCode={this.props.editCode}
                            resetCode={this.props.resetCode}
                            currentCode = {this.props.currentCode}
                            newLine = {this.props.newLine}
                            sendNotebook = {this.props.sendNotebook}
                            recipients = {this.props.recipients}
                            popups = {this.props.popups}
                            notebooks={this.props.notebooks}
                        />
                    </div>
                    <SideBarComponent
                        selectFile={this.props.selectFile}
                        exportData={this.props.exportData}
                        userFiles={this.props.userFiles}
                        currentFileData={this.props.currentFileData}
                        selectExistFile={this.props.selectExistFile}
                        filePreviewData={this.props.filePreviewData}
                        selectField={this.props.selectField}
                        editor={this.props.editor}
                        notebookLines={this.props.notebookLines}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        currentNotebook: state.notebook.currentNotebook.name
    };
};

export default connect(mapStateToProps)(NotebookComponent);


