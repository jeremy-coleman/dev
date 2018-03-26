import Input from 'material-ui/Input';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import {
  FieldProps,
  isRangeControl,
  mapActionToFieldProps,
  mapStateToFieldProps,
  RankedTester,
  rankWith,
} from '../lib/core';
import { mergeTransformProps } from '../lib/react';


const MaterialSliderField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange, scopedSchema } = props;
  const config = {'max': scopedSchema.maximum, 'min': scopedSchema.minimum};

  return (
    <Input
      type='range'
      value={data || scopedSchema.default}
      onChange={ev => handleChange(path, Number(ev.currentTarget.value))}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      inputProps={config}
      endAdornment={<label style={{marginLeft: '0.5em'}}>{data || scopedSchema.default}</label>}
    />
  );
};

@inject("jsonFormsStore")
@observer
export default class MaterializedSliderField extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToFieldProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, mapActionToFieldProps())
    return (
      <MaterialSliderField {...effectiveProps}/>
    )
  }
}

/**
 * Matrial tester for slider controls.
 * @type {RankedTester}
 */
export const materialSliderFieldTester: RankedTester = rankWith(4, isRangeControl);
/* export default connectToJsonForms(
  mapStateToFieldProps,
  mapDispatchToFieldProps
)(MaterialSliderField);
 */