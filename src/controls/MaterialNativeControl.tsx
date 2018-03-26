import TextField from 'material-ui/TextField';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import {
  computeLabel,
  ControlProps,
  ControlState,
  formatErrorMessage,
  isDateControl,
  isDescriptionHidden,
  isPlainLabel,
  isTimeControl,
  mapActionToControlProps,
  mapStateToControlProps,
  or,
  RankedTester,
  rankWith,
} from '../lib/core';
import { Control, mergeTransformProps } from '../lib/react';


export class MaterialNativeControl extends Control<ControlProps, ControlState> {
  render() {
    const {
      id,
      errors,
      label,
      scopedSchema,
      description,
      visible,
      required,
      path,
      handleChange,
      data,
      config
    } = this.props;
    const isValid = errors.length === 0;
    const trim = config.trim;
    let style = {};
    if (!visible) {
      style = {display: 'none'};
    }
    const onChange = ev => handleChange(path, ev.target.value);
    const fieldType = scopedSchema.format;
    const showDescription = !isDescriptionHidden(visible, description, this.state.isFocused);

    return (
      <TextField
        id={id}
        label={computeLabel(isPlainLabel(label) ? label : label.default, required)}
        type={fieldType}
        error={!isValid}
        style={style}
        fullWidth={!trim}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        helperText={!isValid ? formatErrorMessage(errors) : showDescription ? description : null}
        InputLabelProps={{shrink: true}}
        value={data}
        onChange={onChange}
      />
    );
  }
}

export const materialNativeControlTester: RankedTester = rankWith(
  2,
  or(isDateControl, isTimeControl)
);

@inject("jsonFormsStore")
@observer
export default class MaterializedNativeControl extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToControlProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, mapActionToControlProps())
    return (
      <MaterialNativeControl {...effectiveProps}/>
    )
  }
}

/* export default connectToJsonForms(
  mapStateToControlProps,
  mapDispatchToControlProps
)(MaterialNativeControl); */
