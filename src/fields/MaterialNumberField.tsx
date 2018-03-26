import Input from 'material-ui/Input';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import {
  FieldProps,
  isNumberControl,
  mapActionToFieldProps,
  mapStateToFieldProps,
  RankedTester,
  rankWith,
} from '../lib/core';
import { mergeTransformProps } from '../lib/react';


export const MaterialNumberField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;
  const config = {'step': '0.1'};

  return (
    <Input
      type='number'
      value={data || ''}
      onChange={ev => handleChange(path, Number(ev.target.value))}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      inputProps={config}
      fullWidth={true}
    />
  );
};
/**
 * Default tester for number controls.
 * @type {RankedTester}
 */
export const materialNumberFieldTester: RankedTester = rankWith(2, isNumberControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedNumberField extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToFieldProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, mapActionToFieldProps())
    return (
      <MaterialNumberField {...effectiveProps}/>
    )
  }
}

/* export default connectToJsonForms(
  mapStateToFieldProps,
  mapActionToFieldProps
)(MaterialNumberField);
 */