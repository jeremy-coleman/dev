import Checkbox from 'material-ui/Checkbox';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import {
  FieldProps,
  isBooleanControl,
  mapActionToFieldProps,
  mapStateToFieldProps,
  RankedTester,
  rankWith,
} from '../lib/core';
import { mergeTransformProps } from '../lib/react';


export const MaterialBooleanField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;
  const config = {'autoFocus': uischema.options && uischema.options.focus};

  return (
    <Checkbox
      checked={data || ''}
      onChange={(_ev, checked) => handleChange(path, checked)}
      className={className}
      id={id}
      disabled={!enabled}
      inputProps={config}
    />
  );
};

export const materialBooleanFieldTester: RankedTester = rankWith(2, isBooleanControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedBooleanField extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToFieldProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, mapActionToFieldProps())
    return (
      <MaterialBooleanField {...effectiveProps}/>
    )
  }
}

/* export default connectToJsonForms(
  mapStateToFieldProps,
  mapDispatchToFieldProps
)(MaterialBooleanField); */
