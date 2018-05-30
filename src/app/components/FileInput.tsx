import * as React from 'react'
import { FormControl, InputLabel, Input, IconButton, FormHelperText } from '@material-ui/core'
import FileUpload from '@material-ui/icons/FileUpload'
import { FormControlProps } from '@material-ui/core/FormControl';
import { InputLabelProps } from '@material-ui/core/InputLabel';
import { InputProps } from '@material-ui/core/Input';

interface FileInputProps {
  name?: string,
  label?: string
  onChange: (...args: any[]) => any
  helperText?: string,
  formControlProps?: FormControlProps,
  inputLabelProps?: InputLabelProps,
  inputProps?: InputProps,
}


class FileInput extends React.Component<FileInputProps, any> {
    fileInputRef: HTMLInputElement;
  constructor(props) {
    super(props)
    this.state = {
      file: '',
    }
  }

  handleClickUploadButton() {
    this.fileInputRef.click()
  }

  getFileName(file) {
    return file && file.name
  }

  handleFileChange(event) {
    const file = event.target.files[0]

    if (!file) return

    this.setState({ file })

    this.props.onChange(file)
  }

  render() {
    return (
      <FormControl fullWidth {...this.props.formControlProps}>
        <InputLabel
          htmlFor={this.props.name}
          shrink={true}
          {...this.props.inputLabelProps}
        >
          {this.props.label}
        </InputLabel>
        <Input
          type="text"
          endAdornment={
            <IconButton onClick={() => this.handleClickUploadButton()}>
              <FileUpload />
            </IconButton>
          }
          value={this.getFileName(this.state.file)}
          onClick={() => this.handleClickUploadButton()}
          {...this.props.inputProps}
        />
        <input
          ref={input => {
            this.fileInputRef = input
          }}
          type="file"
          style={{ display: 'none' }}
          onChange={e => this.handleFileChange(e)}
        />
        {this.props.helperText && (
          <FormHelperText>{this.props.helperText}</FormHelperText>
        )}
      </FormControl>
    )
  }
}

