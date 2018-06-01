import * as React from 'react';
import CardComponent from './card.component'
import PlotComponent from './plot.component'
const SideBarComponent = ({
    selectFile,
    exportData,
    currentFileData,
    selectExistFile,
    userFiles,
    filePreviewData,
    selectField,
    editor,
    notebookLines
}) => (
    <div className="sidebar">
        <div className="notebook-data">
            <h3>Data
                <button onClick={() => {selectFile()}} className="btn btn-secondary" type="button">
                    <i className="fa fa-download"/>
                    Import
                </button>
                <button onClick={() => {exportData()}} className="btn btn-secondary" type="button">
                    <i className="fa fa-upload"/>
                    Export
                </button>
            </h3>
            {
                userFiles.length > 0 ?
                <div className="dataSources">
                    <ul className="nav nav-tabs">
                        {
                            userFiles.map((userFile, index) =>
                                <li key={index} className={(userFile.path === currentFileData.path) ? 'nav-item active' : 'nav-item'}
                                    onClick={() => {selectExistFile({path:userFile.path, fileName:userFile.fileName})}}>
                                    {userFile.fileName}
                                </li>
                            )
                        }
                    </ul>
                </div> : ''
            }
            <CardComponent
                currentFileData={currentFileData}
                filePreviewData={filePreviewData}
                selectField={selectField}
            />
            <PlotComponent
                notebookLines={notebookLines}
                editor={editor}
            />
        </div>
    </div>
);

export default SideBarComponent;