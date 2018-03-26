import Input from 'material-ui/Input';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { FieldProps, isTimeControl, mapActionToFieldProps, mapStateToFieldProps, RankedTester, rankWith } from '../lib/core';
import { mergeTransformProps } from '../lib/react';


export const MaterialTimeField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;

  return (
    <Input
      type='time'
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
export const materialTimeFieldTester: RankedTester = rankWith(2, isTimeControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedTimeField extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToFieldProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, mapActionToFieldProps())
    return (
      <MaterialTimeField {...effectiveProps}/>
    )
  }
}

/* export default connectToJsonForms(
  mapStateToFieldProps,
  mapActionToFieldProps
)(MaterialTimeField); */
