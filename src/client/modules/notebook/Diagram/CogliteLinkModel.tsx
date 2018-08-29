import { DefaultLinkModel, PortModel } from "storm-react-diagrams"
import * as _ from "lodash"

export class CogliteLinkModel extends DefaultLinkModel {
  constructor() {
    super("coglite")
    super.setColor("rgba(0,0,0,0.75)")
    super.setWidth(2)
  }
	/**
	 * Further handling needs to be done for not instantiating a link itself on max ports,
	 * or removing orphan ports, Later.
	 */
  setTargetPort(port: PortModel) {
		if (port !== null && (_.size(port.links) >= port.getMaximumLinks())) {
			return
		}
		super.setTargetPort(port)
	}

	setSourcePort(port: PortModel) {
		if (port !== null && (_.size(port.links) >= port.getMaximumLinks())) {
			return
		}
		super.setSourcePort(port)
	}
}