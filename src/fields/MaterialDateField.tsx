import Input from 'material-ui/Input';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { FieldProps, isDateControl, mapActionToFieldProps, mapStateToFieldProps, RankedTester, rankWith } from '../lib/core';
import { mergeTransformProps } from '../lib/react';


export const MaterialDateField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;

  return (
    <Input
      type='date'
      value={data || ''}
      onChange={ev => handleChange(path, ev.target.value)}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      fullWidth={true}
    />
  );
};
export const materialDateFieldTester: RankedTester = rankWith(2, isDateControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedDateField extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToFieldProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, mapActionToFieldProps())
    return (
      <MaterialDateField {...effectiveProps}/>
    )
  }
}

//export default connectToJsonForms(mapStateToFieldProps, mapActionToFieldProps)(mapActionToFieldProps);
