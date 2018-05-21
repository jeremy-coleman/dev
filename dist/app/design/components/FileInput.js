"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@material-ui/core");
const FileUpload_1 = require("@material-ui/icons/FileUpload");
class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
        };
    }
    handleClickUploadButton() {
        this.fileInputRef.click();
    }
    getFileName(file) {
        return file && file.name;
    }
    handleFileChange(event) {
        const file = event.target.files[0];
        if (!file)
            return;
        this.setState({ file });
        this.props.onChange(file);
    }
    render() {
        return (React.createElement(core_1.FormControl, Object.assign({ fullWidth: true }, this.props.formControlProps),
            React.createElement(core_1.InputLabel, Object.assign({ htmlFor: this.props.name, shrink: true }, this.props.inputLabelProps), this.props.label),
            React.createElement(core_1.Input, Object.assign({ type: "text", endAdornment: React.createElement(core_1.IconButton, { onClick: () => this.handleClickUploadButton() },
                    React.createElement(FileUpload_1.default, null)), value: this.getFileName(this.state.file), onClick: () => this.handleClickUploadButton() }, this.props.inputProps)),
            React.createElement("input", { ref: input => {
                    this.fileInputRef = input;
                }, type: "file", style: { display: 'none' }, onChange: e => this.handleFileChange(e) }),
            this.props.helperText && (React.createElement(core_1.FormHelperText, null, this.props.helperText))));
    }
}
