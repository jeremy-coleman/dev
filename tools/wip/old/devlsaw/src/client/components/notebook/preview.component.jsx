import * as React from 'react';
import MarkedComponent from './marked.component';
import AceEditor from 'react-ace';
import SkyLight from 'react-skylight';

import brace from 'brace';
import 'brace/theme/eclipse';
import 'brace/theme/github';
import 'brace/mode/python';
import 'brace/mode/markdown';

class PreviewComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            theme:'eclipse',
            language:'python',
            code:''
        };
    }

    notebookCode(new_line) {
         let dd = {
            code:new_line,
            language:this.state.language,
            index:this.props.editor.index,
            output: {
                        output: '',
                        success: true
                    },
        };
        this.props.currentCode(dd);
    }

    openSendNotebook() {
        this.props.sendNotebook();
        this.props.recipients = [];
    }

    render() {
        return (
            <div>
        <div className="preview">
            <ul className="nav nav-tabs editorMenu">
                <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle">File</button>
                    <div className="dropdown-menu">
                        <button className="nav-link" onClick={() => {
                            this.props.newFile()
                        }}>New
                        </button>
                        <button className="nav-link" onClick={() => {
                            this.props.openNotebooks();
                            if(this.props.popups.notebooks){
                                this.simpleDialog.show();
                            }
                        }}>Open
                        </button>
                        <button className="nav-link" onClick={() => {
                            this.props.saveNotebook()
                        }}>Save
                        </button>
                        <button className="nav-link" onClick={() => {
                            this.openSendNotebook();
                            if(this.props.popups.notebooks){
                                this.simpleDialog.show();
                            }

                        }}>Send
                        </button>
                        <div className="dropdown-divider"/>
                        <button className="nav-link">Exit</button>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle">Themes</button>
                    <div className="dropdown-menu">
                        <button className="nav-link" onClick={() => this.setState({theme :'eclipse'})}>
                            Eclipse
                            {this.state.theme === 'eclipse' ?

                                <i className="fa fa-check"/> : ''
                            }
                        </button>
                        <button className="nav-link" onClick={() => this.setState({theme :'github'})}>
                            Github
                            {this.state.theme === 'github' ?

                                <i className="fa fa-check"/> : ''
                            }
                        </button>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle">Mode</button>
                    <div className="dropdown-menu">
                        <button className="nav-link" onClick={() => this.setState({language :'python'})}>
                            Python
                            {this.state.language === 'python' ?

                                <i className="fa fa-check"/> : ''
                            }
                        </button>
                        <button className="nav-link" onClick={() => this.setState({language :'markdown'})}>
                            Markdown
                            {this.state.language === 'markdown' ?

                                <i className="fa fa-check"/> : ''
                            }
                        </button>
                    </div>
                </li>
                <li className="nav-item">
                    <button className="nav-link" onClick={() => {
                        this.props.newLine();
                        this.setState({code:''})
                    }}>
                        <i className="fa fa-plus"/>
                    </button>
                </li>
                <li className="nav-item">
                    <button className="nav-link" onClick={() => {
                        this.props.resetKernel()
                    }} title="Reset Kernel">
                        <i className="fa fa-refresh"/>
                    </button>
                </li>
            </ul>
            <AceEditor
                mode={this.state.language}
                theme={this.state.theme}
                onChange={(e) => this.notebookCode(e)}
                name="coglite"
                editorProps={{$blockScrolling: true}}
                value={this.state.code}
            />,
            <ul className="notebookPreview">
                {
                    this.props.notebookLines.map((notebookLine, index) =>
                        <li key={index} className={(this.props.editor.index === index) ? 'selectedCode' : ''}>
                            {notebookLine.language === 'python' ?
                                <div>
                                    <div className={(notebookLine.language !== 'markdown') ? 'codeRow' : ''}>
                                        <div>
                                            {
                                                notebookLine.inputIndex ?
                                                    <span className="input">In: [{notebookLine.inputIndex}]</span> : ''
                                            }
                                            <button onClick={() => {
                                                this.props.execCode(index)
                                            }}
                                                    className="linePlayBtn"><i className="fa fa-play"/>
                                            </button>
                                        </div>
                                        <pre onClick={() => {
                                            this.props.editCode(index);
                                            this.setState({code :notebookLine.code})
                                        }}>
                                                              <code
                                                                  className={notebookLine.language}>{notebookLine.code}</code>
                                                            </pre>
                                    </div>
                                    {notebookLine.output.output ?
                                        <div className="codeRowOutput">
                                            {notebookLine.output.outputType === 'string' ?
                                                <span>Out: [{notebookLine.inputIndex}]</span> : ''
                                            }
                                            {notebookLine.output.outputType === 'string' ?
                                                <div
                                                    className={!(notebookLine.output.success) ? 'hasError output' : 'output'}> {notebookLine.output.output} </div> : ''
                                            }
                                        </div> : ''
                                    }
                                </div> : ''
                            }

                            {
                                notebookLine.language === 'markdown' ?
                                    <div onClick={() => {
                                        this.props.editCode(index);
                                        this.setState({code :notebookLine.code})
                                    }}>
                                        <MarkedComponent markdown={notebookLine.code}/>
                                    </div> : ''
                            }

                        </li>
                    )
                }
            </ul>
        </div>
        {this.props.popups.notebooks ?

            <div>
                <SkyLight
                    beforeClose={this._executeBeforeModalClose}
                    hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Hi, I'm a simple modal">
                    <div className="modal-body">

                        { this.props.notebooks.length <= 0 ?
                            <p>No notebooks.</p> :''
                        }

                        <ul className="notebookList">
                            {
                                this.props.notebooks.map((notebook, index) =>
                                    <li >
                                        <span onClick={() => {this.props.changeNotebook(index)}}>{notebook.name}</span>
                                        <button onClick={() => {this.props.deleteNotebook(notebook.id)}}>
                                            <i className="fa fa-trash"/>
                                        </button>
                                    </li>

                                )
                            }

                        </ul>
                    </div>
                </SkyLight>
            </div> : ''
        }

        </div>
        )
    }
}

export default PreviewComponent;
