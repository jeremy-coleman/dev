import * as _ from 'lodash';
import { Card, CardContent, CardHeader } from 'material-ui';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import {
  GroupLayout,
  mapStateToLayoutProps,
  RankedTester,
  rankWith,
  RendererProps,
  uiTypeIs,
  withIncreasedRank,
} from '../lib/core';
import { mergeTransformProps } from '../lib/react';
import { MaterialLayoutRenderer, MaterialLayoutRendererProps } from '../util/layout';


export const groupTester: RankedTester = rankWith(1, uiTypeIs('Group'));

export const MaterializedGroupLayoutRenderer = (props: RendererProps) => {
    const { uischema, schema, path, visible } = props;

    const groupLayout = uischema as GroupLayout;

    const childProps: MaterialLayoutRendererProps = {
        elements: groupLayout.elements,
        schema,
        path,
        direction: 'column',
        visible
    };
    const style: {[x: string]: any} = { marginBottom: '10px' };
    if (!visible) {
        style.display = 'none';
    }

    return (
        <Card style={style}>
          {!_.isEmpty(groupLayout.label) && <CardHeader title={groupLayout.label}/>}
          <CardContent>
            <MaterialLayoutRenderer {...childProps}/>
          </CardContent>
        </Card>
    );
};

@inject("jsonFormsStore")
@observer
export default class MaterializedGroupLayout extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToLayoutProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, {})
    return (
      <MaterializedGroupLayoutRenderer {...effectiveProps}/>
    )
  }
}

/* export default connectToJsonForms(
  mapStateToLayoutProps
)(MaterializedGroupLayoutRenderer); */

export const materialGroupTester: RankedTester = withIncreasedRank(1, groupTester);
