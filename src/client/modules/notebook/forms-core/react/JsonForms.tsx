
import * as _ from 'lodash';
import { inject, observer } from "mobx-react";
import * as React from 'react';
import { JsonFormsProps, mapStoreValuesToRendererProps } from '../core';
import { UnknownRenderer } from './UnknownRenderer';

type AnyFormProp = JsonFormsProps & any;

class JsonFormsRenderer extends React.Component<AnyFormProp, {}> {
  render() {
    const { uischema, schema, path, renderers } =  this.props as JsonFormsProps;

    const renderer = _.maxBy(renderers, r => r.tester(uischema, schema));
  if (renderer === undefined || renderer.tester(uischema, schema) === -1) {
    return <UnknownRenderer type={'renderer'}/>;
  } else {
    const Render = renderer.renderer;

    return (
      <Render
        uischema={uischema}
        schema={schema}
        path={path}
        renderers={renderers}
      />
    );
  }
  }
}

@inject("jsonFormsStore")
@observer
export class JsonForms extends React.Component<any, {}>  {
  render() {
    const {jsonFormsStore, ...otherProps} = this.props
    const effectiveProps = mapStoreValuesToRendererProps(jsonFormsStore, otherProps);
    return (
      <JsonFormsRenderer {...effectiveProps}/>
    )
  }
}