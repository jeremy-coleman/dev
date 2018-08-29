import * as React from "react";

import { DiagramProps, DiagramWidget, BaseModel, BaseEntity, BaseModelListener, PortModel } from "storm-react-diagrams"

export interface CogliteDiagramProps extends DiagramProps {
	formAction?: (model: any) => void;
}


export default class CogliteDiagramWidget extends React.Component<CogliteDiagramProps, {}> {
    child 
    constructor(props) {
        super(props);
      }

      onDoubleClick = (event) => {
        event.preventDefault();
        //event.stopPropagation();
        const model: { model: BaseModel<BaseEntity, BaseModelListener>; element: Element } = this.child.getMouseElement(event);
        console.log(model)
        if (model === null) {
          //is it a multiple selection
          //No-op
          } else if (model.model instanceof PortModel) {
            //No-op
        } else {
          //its some or other element, probably want to move it
          if(this.props.formAction)
            this.props.formAction(model)
        }
      };

      render() {
        return (
          <div className="coglite-custom-widget" onDoubleClickCapture={this.onDoubleClick}>
            <DiagramWidget ref={instance => { this.child = instance; }} {...this.props} />
        </div>
        );
      }
}