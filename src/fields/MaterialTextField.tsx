import Input from 'material-ui/Input';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import {
  FieldProps,
  isStringControl,
  mapActionToFieldProps,
  mapStateToFieldProps,
  RankedTester,
  rankWith,
} from '../lib/core';
import { mergeTransformProps } from '../lib/react';


export const MaterialTextField = (props: FieldProps) => {
  const {
    data,
    config,
    className,
    id,
    enabled,
    uischema,
    isValid,
    path,
    handleChange,
    scopedSchema
  } = props;
  const maxLength = scopedSchema.maxLength;
  let inputProps;
  if (config.restrict) {
    inputProps = {'maxLength': maxLength};
  } else {
    inputProps = {};
  }
  if (config.trim && maxLength !== undefined) {
    inputProps.size = maxLength;
  }
  const onChange = ev => handleChange(path, ev.target.value);

  return (
    <Input
      type='text'
      value={data || ''}
      onChange={onChange}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      multiline={uischema.options && uischema.options.multi}
      fullWidth={!config.trim || maxLength === undefined}
      inputProps={inputProps}
      error={!isValid}
    />
  );
};
/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const materialTextFieldTester: RankedTester = rankWith(1, isStringControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedTextField extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToFieldProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, mapActionToFieldProps())
    return (
      <MaterialTextField {...effectiveProps}/>
    )
  }
}

/* export default connectToJsonForms(
  mapStateToFieldProps,
  mapActionToFieldProps
)(MaterialTextField); */
