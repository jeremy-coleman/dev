import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { HorizontalLayout, mapStateToLayoutProps, RankedTester, rankWith, RendererProps, uiTypeIs } from '../lib/core';
import { mergeTransformProps } from '../lib/react';
import { MaterialLayoutRenderer, MaterialLayoutRendererProps } from '../util/layout';


/**
 * Default tester for a horizontal layout.
 * @type {RankedTester}
 */
export const materialHorizontalLayoutTester: RankedTester = rankWith(
  2,
  uiTypeIs('HorizontalLayout')
);

export const MaterialHorizontalLayoutRenderer = (
  { schema, uischema, path, visible }: RendererProps) => {
  const horizontalLayout = uischema as HorizontalLayout;
  const childProps: MaterialLayoutRendererProps = {
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
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToLayoutProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, {})
    return (
      <MaterialHorizontalLayoutRenderer {...effectiveProps}/>
    )
  }
}

/* const ConnectedMaterialHorizontalLayoutRendered = connectToJsonForms(
  mapStateToLayoutProps
)(MaterialHorizontalLayoutRenderer);
export default ConnectedMaterialHorizontalLayoutRendered; */
