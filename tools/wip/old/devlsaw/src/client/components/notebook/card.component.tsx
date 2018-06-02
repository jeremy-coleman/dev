import * as React from 'react';

const CardComponent = ({
    currentFileData,
    filePreviewData,
    selectField
}) => (
    <div className="card">
        <div className="card-header">
            <i className="fa fa-table"/> {currentFileData.fileName}
        </div>
        {(filePreviewData !=='')?
            <div className="card-block">
                <div className="table-scroll-wrapper">
                    <table className="table table-sm">
                        <thead>
                        <tr>
                            {
                                filePreviewData.fields.map((field,index) =>
                                    <th key={index}>
                                        <input type="checkbox" defaultChecked={field.checked} onChange={(e) => {
                                            selectField({checked: e.target.checked, index: index})
                                        }}  />{field.name}
                                    </th>
                                )
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filePreviewData.data.map((previewRow, tindex) =>
                                <tr key={tindex}>
                                    {
                                        previewRow.map((previewColumn, index) =>
                                            <td key={index}>{previewColumn}</td>
                                        )
                                    }
                                </tr>
                            )
                        }

                        </tbody>
                    </table>
                </div>
            </div> :''
        }
    </div>
);

export default CardComponent;