import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { mapStateToLayoutProps, RankedTester, rankWith, RendererProps, uiTypeIs, VerticalLayout } from '../lib/core';
import { mergeTransformProps } from '../lib/react';
import { MaterialLayoutRenderer, MaterialLayoutRendererProps } from '../util/layout';


/**
 * Default tester for a vertical layout.
 * @type {RankedTester}
 */
export const materialVerticalLayoutTester: RankedTester = rankWith(1, uiTypeIs('VerticalLayout'));

export const MaterialVerticalLayoutRenderer  = (
  { schema, uischema, path, visible }: RendererProps) => {
  const verticalLayout = uischema as VerticalLayout;
  const childProps: MaterialLayoutRendererProps = {
    elements: verticalLayout.elements,
    schema,
    path,
    direction: 'column',
    visible
  };

  return <MaterialLayoutRenderer {...childProps}/>;
};

@inject("jsonFormsStore")
@observer
export default class MaterialVerticalLayout extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToLayoutProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, {})
    return (
      <MaterialVerticalLayoutRenderer {...effectiveProps}/>
    )
  }
}

/* export default connectToJsonForms(
  mapStateToLayoutProps
)(MaterialVerticalLayoutRenderer); */
