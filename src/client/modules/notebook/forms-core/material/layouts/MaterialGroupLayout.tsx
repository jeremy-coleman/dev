import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as _ from 'lodash';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import {
GroupLayout, mapStoreValuesToLayoutProps, RankedTester, rankWith,
  //RendererProps,
  uiTypeIs, withIncreasedRank
} from '../../core';
import { createPropsForItem } from '../../react';
import { MaterialLayoutRenderer, MaterialLayoutRendererProps } from '../util/layout';


type AnyMaterialLayoutRendererProps = MaterialLayoutRendererProps & any;

export const groupTester: RankedTester = rankWith(1, uiTypeIs('Group'));

export const MaterializedGroupLayoutRenderer = props => {
    const { uischema, schema, path, visible } = props;

    const groupLayout = uischema as GroupLayout;

    const childProps: AnyMaterialLayoutRendererProps = {
        elements: groupLayout.elements,
        schema,
        path,
        direction: 'column',
        visible,
        ...props
    };
    const style: {[x: string]: any} = { marginBottom: '10px' };
    
    if (!visible) {
        style.display = 'none';
    }

    return (
        <Card style={style} {...props}>
          {!_.isEmpty(groupLayout.label) && <CardHeader title={groupLayout.label}/>}
          <CardContent>
            <MaterialLayoutRenderer {...childProps}/>
          </CardContent>
        </Card>
    );
};

@inject("jsonFormsStore")
@observer
export default class MaterializedGroupLayout extends React.Component<any, any>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToLayoutProps)
    return (
      <MaterializedGroupLayoutRenderer {...effectiveProps}/>
    )
  }
}

export const materialGroupTester: RankedTester = withIncreasedRank(1, groupTester);
