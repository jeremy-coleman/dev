import * as React from 'react';
import { stylesheet } from 'typestyle';


import {MDFontIconOnly, Button} from '@coglite/common/ux'

import { getId } from '@coglite/common/datakit';
import { observer } from 'mobx-react';


const fileFieldStyles = stylesheet({
        root: {},
        wrapper: {},

        //this is kinda wierd because the button turns into the image
        selector: {
            position: "relative",
            border: `1px solid a6a6a6`,
            minHeight: 32,
            width: "100%",
            $nest: {
                "&:focus": {
                    border: `1px solid black`
                },
                "&:hover": {
                    border: `1px solid 666666`
                }
            }
        },
        selectorAction: {
            background: 'white',
            outline: "none",
            textAlign: "left",
            padding: "4px 12px",
            border: "none",
            minHeight: 32,
            width: "100%",
            zIndex: 1
        },
        clearAction: {
            position: "absolute",
            top: 0,
            marginLeft: 0,
            right: 0,
            zIndex: 2
        }
});


interface IFileFieldProps {
    files?: File[];
    label?: string;
    onChange?: (files : File[]) => void;
    onRenderFiles?: (files : File[]) => React.ReactNode;
    onRenderSelect?: () => React.ReactNode;
    defaultSelectText?: string;
    accept?: string;
    multiple?: boolean;
    className?: string;
    disabled?: boolean;
    onClear?: () => void;
}

interface IFilesProps {
    files: File[];
}

class FileNameList1 extends React.Component<IFilesProps, any> {
    render() {
        if(this.props.files && this.props.files.length > 0) {
            const items = this.props.files.map((file, idx) => {
                return (
                    <div key={idx} className="file-name">
                        {file.name}
                    </div>
                );
            });
            return (
                <div className="file-name-list">
                    {items}
                </div>
            )
        }
        return null;
    }
}

let FileNameList = observer((props: IFilesProps) => 
      <React.Fragment>
        {
            props.files
            && props.files.length > 0
            && props.files.map((file, idx) => 
                <div className="file-name-list">
                    <div key={idx} className="file-name">
                    {file.name}
                    </div>
                </div>
            )
        }
      </React.Fragment>
)

const defaultFilesRenderer = (files : File[]) => <FileNameList files={files} />;

interface IFileFieldState {
    files?: File[];
}

class FileField extends React.Component<IFileFieldProps, IFileFieldState> {
    ref = React.createRef<HTMLInputElement>();
    
    private _id : string;
    
    constructor(props : IFileFieldProps) {
        super(props);
        this.state = { files: this.props.files };
        this._id = getId("image-field");
    }
    componentWillReceiveProps(nextProps : IFileFieldProps) {
        this.setState({ files: nextProps.files || [] });
    }
    private _onInputChange = (e) => {
        const files : File[] = [];
        const fileList = this.ref.current.files;
        const fl = fileList.length;
        for(let i = 0; i < fl; i ++) {
            files.push(fileList.item(i));
        }
        if(this.props.onChange) {
            this.props.onChange(files);
        }
        this.setState({ files: files });
    }

    private _onFieldGroupClick = () => {
        if(this.ref.current) {
            this.ref.current.click();
        }
    }

    private _onClickClear = () => {
        this.setState({ files: null });
        if(this.props.onClear) {
            this.props.onClear();
        }
    }

    render() {
        //let selectContent;
        const files = this.state.files;
        
        let clearAction = (
            <Button 
                color='primary'
                variant='contained'
                className={fileFieldStyles.clearAction} 
                onClick={this._onClickClear} 
                disabled={!files}
            >
            <MDFontIconOnly icon={'clear'}/>
            {'Remove'}
            </Button>
            );

        //if(this.props.onClear || (files && files.length > 0)) {clearAction} <- hides button completely until files exist

        // if(this.state.files && this.state.files.length > 0) {
        //     const r = this.props.onRenderFiles || defaultFilesRenderer;
        //     selectContent = r(this.state.files);
        // } else {
        //     selectContent = this.props.onRenderSelect ? this.props.onRenderSelect() : this.props.defaultSelectText || `Select ${this.props.multiple ? "Files..." : "a File..."}`;
        // }
        const r = this.props.onRenderFiles || defaultFilesRenderer;
        let selectContent = 
             this.state.files && this.state.files.length > 0 
                ? r(this.state.files)
                : this.props.onRenderSelect 
                    ? this.props.onRenderSelect() 
                    : this.props.defaultSelectText || `Select ${this.props.multiple ? "Files..." : "a File..."}`
        

        return (
            <div className={fileFieldStyles.root}>
                <input id={this._id}
                       type="file"
                       accept={this.props.accept}
                       onChange={this._onInputChange}
                       ref={this.ref}
                       value=""
                       multiple={this.props.multiple}
                       hidden={true}
                       style={{ display: "none" }}
                       disabled={this.props.disabled} />
                <div className={fileFieldStyles.wrapper}>
                    {this.props.label && <label htmlFor={this._id}>{this.props.label}</label>}
                    <div className={fileFieldStyles.selector}>
                        <button 
                            type="button"
                            className={fileFieldStyles.selectorAction}
                            //onClick={this._onFieldGroupClick}
                            onClick={() => this.ref.current.click()}
                            disabled={this.props.disabled}
                        >
                            {selectContent}
                        </button>
                        {clearAction}
                    </div>
                    
                </div>
            </div>
        );
    }
}

export { IFileFieldProps, IFileFieldState, FileField }