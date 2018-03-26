import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { FieldProps, isEnumControl, mapActionToFieldProps, mapStateToFieldProps, RankedTester, rankWith } from '../lib/core';
import { mergeTransformProps } from '../lib/react';


export const MaterialEnumField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange, scopedSchema } = props;
  const options = scopedSchema.enum;

  return (
    <Select
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      value={data || ''}
      onChange={ev => handleChange(path, ev.target.value)}
      fullWidth={true}
    >
      {
        [<MenuItem value='' key={'empty'} />]
          .concat(
            options.map(optionValue =>
              (
                <MenuItem value={optionValue} key={optionValue}>
                  {optionValue}
                </MenuItem>
              )
            )
          )}
    </Select>
  );
};
/**
 * Default tester for enum controls.
 * @type {RankedTester}
 */
export const materialEnumFieldTester: RankedTester = rankWith(2, isEnumControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedEnumField extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToFieldProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, mapActionToFieldProps())
    return (
      <MaterialEnumField {...effectiveProps}/>
    )
  }
}

//export default connectToJsonForms(mapStateToFieldProps, mapDispatchToFieldProps)(MaterialEnumField);
