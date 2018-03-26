import Input from 'material-ui/Input';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import {
  FieldProps,
  isIntegerControl,
  mapActionToFieldProps,
  mapStateToFieldProps,
  RankedTester,
  rankWith,
} from '../lib/core';
import { mergeTransformProps } from '../lib/react';


export const MaterialIntegerField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;
  const config = {'step': '1'};

  return (
    <Input
      type='number'
      value={data || ''}
      onChange={ev => handleChange(path, parseInt(ev.target.value, 10))}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      inputProps={config}
      fullWidth={true}
    />
  );
};
export const materialIntegerFieldTester: RankedTester = rankWith(2, isIntegerControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedIntegerField extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToFieldProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, mapActionToFieldProps())
    return (
      <MaterialIntegerField {...effectiveProps}/>
    )
  }
}

/* export default connectToJsonForms(
  mapStateToFieldProps,
  mapDispatchToFieldProps
)(MaterialIntegerField);
 */