import * as _ from "lodash"
import { DiagramEngine, NodeModel } from "storm-react-diagrams"
import { CoglitePortModel } from "./CoglitePortModel"

export class CogliteNodeModel extends NodeModel {
  //Possibe options, cogliteInput & cogliteFunctionMath
  cogType: string
  name: string
  color: string
  constructor(
    cogType: string = "cogliteInput",
    name: string = "Untitled",
    color: string = "rgb(0,192,255)",
  ) {
    super("coglite")
    this.cogType = cogType
    this.name = name
    this.color = color
    if (cogType === "cogliteInput" || cogType === "cogliteFunctionMath") {
      this.addPort(new CoglitePortModel("rightCenter"))
    }
    if (cogType === "cogliteDebug" || cogType === "cogliteFunctionMath") {
      this.addPort(new CoglitePortModel("leftCenter"))
    }
  }

  deSerialize(object, engine: DiagramEngine) {
    super.deSerialize(object, engine)
    this.cogType = object.cogType
    this.name = object.name
    this.color = object.color
  }

  serialize() {
    return _.merge(super.serialize(), {
      cogType: this.cogType,
      name: this.name,
      color: this.color,
    })
  }
}