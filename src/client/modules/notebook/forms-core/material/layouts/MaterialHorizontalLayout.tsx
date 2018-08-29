import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { HorizontalLayout, mapStoreValuesToLayoutProps, RankedTester, rankWith, RendererProps, uiTypeIs } from '../../core';
import { createPropsForItem } from '../../react';
import { MaterialLayoutRenderer, MaterialLayoutRendererProps } from '../util/layout';



export const materialHorizontalLayoutTester: RankedTester = rankWith(
  2,
  uiTypeIs('HorizontalLayout')
);

export const MaterialHorizontalLayoutRenderer = (
  { schema, uischema, path, visible }: RendererProps) => {
  const horizontalLayout = uischema as HorizontalLayout;
  const childProps: MaterialLayoutRendererProps & any = {
    elements: horizontalLayout.elements,
    schema,
    path,
    direction: 'row',
    visible
  };

  return <MaterialLayoutRenderer {...childProps}/>;
};

@inject("jsonFormsStore")
@observer
export default class ConnectedMaterialHorizontalLayoutRendered extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToLayoutProps)
    return (
      <MaterialHorizontalLayoutRenderer {...effectiveProps}/>
    )
  }
}

/* const ConnectedMaterialHorizontalLayoutRendered = connectToJsonForms(
  mapStoreToLayoutProps
)(MaterialHorizontalLayoutRenderer);
export default ConnectedMaterialHorizontalLayoutRendered; */
