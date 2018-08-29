
import { Grid } from '@material-ui/core';
import * as _ from 'lodash';
import * as React from 'react';
import { JsonSchema, UISchemaElement } from '../../core';
import { JsonForms } from '../../react';

const renderChildren = (
    elements: UISchemaElement[],
    schema: JsonSchema,
    path: string
  ) =>
  elements.map((child, index) =>
      (
        <Grid item key={`${path}-${index}`} xs>
          <JsonForms
            uischema={child}
            schema={schema}
            path={path}
          />
        </Grid>
      )
  );

export interface MaterialLayoutRendererProps {
    elements: UISchemaElement[];
    schema: JsonSchema;
    path: string;
    visible: boolean;
    direction: 'row'|'column';
    className?: any
    style?: any
}
export const MaterialLayoutRenderer = (
  {visible, elements, schema, path, direction}: MaterialLayoutRendererProps) => {

  if (_.isEmpty(elements)) {
    return null;
  } else {
    return (
      <Grid container direction={direction}>
        {renderChildren(elements, schema, path)}
      </Grid>
    );
  }
};

/*
    return (
      <Grid container hidden={{ xsUp: !visible }} direction={direction}>
        {renderChildren(elements, schema, path)}
      </Grid>
    );
    */