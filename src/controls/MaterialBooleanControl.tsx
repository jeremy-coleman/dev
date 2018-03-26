import { FormControlLabel } from 'material-ui/Form';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import MaterialBooleanField from '../fields/MaterialBooleanField';
import { ControlProps, isBooleanControl, mapStateToControlProps, RankedTester, rankWith } from '../lib/core';
import { mergeTransformProps } from '../lib/react';


export const MaterialBooleanControl =
  ({  label, uischema, schema, visible, parentPath }: ControlProps) => {
    let style = {};
    if (!visible) {
      style = {display: 'none'};
    }

    return (
      <FormControlLabel
        style={style}
        label={label}
        control={<MaterialBooleanField uischema={uischema} schema={schema} path={parentPath}/>}
      />
    );
  };

  @inject("jsonFormsStore")
  @observer
  export default class ConnectedMaterialBooleanControl extends React.Component<any, null>  {
    render() {
      const {jsonFormsStore, ...ownProps} = this.props
      const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToControlProps)
      //Merge the dispatch prop here
      const effectiveProps = Object.assign({}, effectiveFromStateProps, {})
      return (
        <MaterialBooleanControl {...effectiveProps}/>
      )
    }
  }

/* const ConnectedMaterialBooleanControl = connectToJsonForms(
  mapStateToControlProps
)(MaterialBooleanControl); */

export const materialBooleanControlTester: RankedTester = rankWith(2, isBooleanControl);
//export default ConnectedMaterialBooleanControl;
