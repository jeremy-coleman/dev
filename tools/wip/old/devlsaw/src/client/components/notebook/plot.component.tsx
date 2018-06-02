import * as React from 'react';

const PlotComponent = ({
    notebookLines,
    editor
}) => (
    <div className="notebook-plot">
        <ul className="plotPreview">
            {
                notebookLines.map((line, index) =>
                    <li key={index} className={(editor.index === index) ? 'selectedCode' : ''}>
                        { line.language === 'python' ?
                            <div>
                                { line.output.output ?
                                    <div className="codeRowOutput">
                                        { line.output.outputType === 'display' ?
                                            <span>Out: [{line.inputIndex}]</span> : ''
                                        }
                                        { line.output.outputType === 'display' ?
                                            <div  className={!(line.output.success) ? 'hasError output ' : 'output'}>
                                                <img src={line.output.output} />
                                            </div> : ''
                                        }
                                    </div> : ''
                                }
                            </div> : ''
                        }
                    </li>
                )
            }
        </ul>
    </div>
);

export default PlotComponent;