import * as _ from 'lodash';
import Typography from 'material-ui/Typography';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { isVisible, LabelElement, RankedTester, rankWith, RendererProps, uiTypeIs } from '../lib/core';
import { mergeTransformProps, StatelessRenderer } from '../lib/react';


/**
 * Default tester for a label.
 * @type {RankedTester}
 */
export const materialLabelRendererTester: RankedTester = rankWith(1, uiTypeIs('Label'));

/**
 * Default renderer for a label.
 */
export const MaterialLabelRenderer: StatelessRenderer<RendererProps> =
  ({ uischema, visible }) => {
    const labelElement: LabelElement = uischema as LabelElement;
    const style: {[x: string]: any} = {};
    if (!visible) {
      style.display = 'none';
    }
    return (
      <Typography variant='title' style={style}>
        {labelElement.text !== undefined && labelElement.text !== null && labelElement.text}
      </Typography>
    );
  };

const mapStateToProps = (state, ownProps) => {
  const visible = _.has(ownProps, 'visible') ? ownProps.visible :  isVisible(ownProps, state);

  return {
    visible,
  };
};

@inject("jsonFormsStore")
@observer
export default class MaterializedLabelRenderer extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, {})
    return (
      <MaterialLabelRenderer {...effectiveProps}/>
    )
  }
}

//export default connectToJsonForms(mapStateToProps, null)(MaterialLabelRenderer);
