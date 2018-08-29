import * as _ from "lodash"
import { DiagramEngine, LinkModel, PortModel } from "storm-react-diagrams"
import { CogliteLinkModel } from "./CogliteLinkModel"

export class CoglitePortModel extends PortModel {
  position: string | "leftCenter" | "rightCenter"
  label: string

  constructor(pos: string = "leftCenter") {
    super(pos, "coglite")
    this.position = pos
    if (this.position === "leftCenter")
      this.maximumLinks = 1
  }

  serialize() {
    return _.merge(super.serialize(), {
      position: this.position,
    })
  }

  link(port: PortModel): LinkModel {
    let link = this.createLinkModel()
    link.setSourcePort(this)
    link.setTargetPort(port)
    return link
  }

  deSerialize(data: any, engine: DiagramEngine) {
    super.deSerialize(data, engine)
    this.position = data.position
  }

  createBaseLinkModel(): LinkModel | null {
		if (_.isFinite(this.maximumLinks)) {
			var numberOfLinks: number = _.size(this.links);
			console.log(this)
			console.log(numberOfLinks)
			console.log(this.maximumLinks)
			if (this.maximumLinks === 1 && numberOfLinks >= 1) {
				return _.values(this.links)[0];
			} else if (numberOfLinks >= this.maximumLinks) {
				return null;
			}
		}
		return null;
	}

  createLinkModel(): LinkModel {
    //let link = this.createBaseLinkModel()
    return /* link || */ new CogliteLinkModel()
  }
}