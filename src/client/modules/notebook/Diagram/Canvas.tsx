import * as _ from "lodash"
import * as React from "react"
import {  DiagramEngine, DiagramModel } from "storm-react-diagrams"
import { CogliteLinkFactory } from "./CogliteLinkFactory"

// import the custom models
import { CogliteNodeFactory } from "./CogliteNodeFactory"
import { CogliteNodeModel } from "./CogliteNodeModel"
import { CoglitePortModel } from "./CoglitePortModel"
import { SimplePortFactory } from "./SimplePortFactory"
import CogliteDiagramWidget from "./CogliteDiagramWidget";
import { inject, observer } from "mobx-react";

@inject("store", "jsonFormsStore")
@observer
class Canvas extends React.Component<any, any> {
  protected activeModel: DiagramModel
  protected diagramEngine: DiagramEngine

  constructor(props) {
    super(props)
    this.diagramEngine = new DiagramEngine()
    this.diagramEngine.installDefaultFactories()

    this.initialiseModel()
  }

  initialiseModel() {
    this.diagramEngine.registerLinkFactory(new CogliteLinkFactory())
    this.diagramEngine.registerPortFactory(
      new SimplePortFactory("coglite", config => new CoglitePortModel()),
    )
    this.diagramEngine.registerNodeFactory(new CogliteNodeFactory())

    //2) setup the diagram model
    var model = new DiagramModel()

    //3-B) create our new custom node
    var node2 = new CogliteNodeModel("cogliteInput", "Input")
    node2.setPosition(100, 100)

    var node4 = new CogliteNodeModel("cogliteFunctionMath", "Math")
    node4.setPosition(350, 100)

    const node5 = new CogliteNodeModel("cogliteDebug", "Output")
    node5.setPosition(600, 100)

    var link3 = (node2.getPort("rightCenter") as CoglitePortModel).link(node4.getPort("leftCenter"))

    const link5 = (node4.getPort("rightCenter") as CoglitePortModel).link(node5.getPort("leftCenter"))

    //4) add the models to the root graph
    model.addAll(node2, node4, link3, node5, link5)

    //5) load model into engine
    this.diagramEngine.setDiagramModel(model)
    this.props.store.uiStore.setDiagramModel(this.diagramEngine.diagramModel)
  }

  componentDidMount() {
    this.forceUpdate()
  }

  restoreFormData = (newModel) => {
    const { nodeFormsData } = this.props.store.uiStore
    const currentJsonFormsStoreData = this.props.jsonFormsStore.coreStore.data;
    const currentNodeId = newModel.model.id
    const currentCogType = newModel.model.cogType
    let currentImp = null
    if (nodeFormsData[currentCogType]) {
      currentImp = nodeFormsData[currentCogType][currentNodeId]
      if (!currentImp)
        currentImp = {}
    }
    if (currentImp) {
      currentJsonFormsStoreData[currentCogType] = currentImp
      this.props.jsonFormsStore.coreStore.setData(currentJsonFormsStoreData)
    }
  }

  handleNodeFormAction = (model: any): void => {
    const { nodeFormDrawerToggle } = this.props.store.uiStore
    if (model.model.type === "coglite") {
      this.restoreFormData(model)
      this.props.store.uiStore.updateActiveCogliteNodeModel(model)
      nodeFormDrawerToggle.openDrawer(true)
    }
  }

  render() {
    //6) render the diagram!
    return (
      <div
        className="diagram-layer"
        onDrop={event => {
          const data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"))
          const currentNodes = this.diagramEngine.getDiagramModel().getNodes()
          const currentNodesKeys = _.keys(currentNodes)
          //@ts-ignore
          const isConflictingInput = currentNodesKeys.map(key => currentNodes[key]).find(model => model.cogType === "cogliteInput") && data.type === "cogliteInput"
          if (isConflictingInput) {
            alert("Cannot add more than one input in a flow")
          } else {
            let node = null
            if (data.type === "cogliteInput") {
              node = new CogliteNodeModel(
                "cogliteInput",
                "Node " + (currentNodesKeys.length + 1),
                "rgb(192,255,0)",
              )
            } else if (data.type === "cogliteFunctionMath") {
              node = new CogliteNodeModel(
                "cogliteFunctionMath",
                "Node " + (currentNodesKeys.length + 1),
                "rgb(0,192,255)",
              )
            } else {
              node = new CogliteNodeModel(
                "cogliteDebug",
                "Node " + (currentNodesKeys.length + 1),
                "rgb(0,192,255)",
              )
            }
            var points = this.diagramEngine.getRelativeMousePoint(event)
            node.x = points.x
            node.y = points.y
            this.diagramEngine.getDiagramModel().addNode(node)
            this.forceUpdate()
          }
        }}
        onDragOver={event => {
          //event.preventDefault();
        }}
      >
        <CogliteDiagramWidget formAction={this.handleNodeFormAction} className="srd-coglite-canvas" diagramEngine={this.diagramEngine} />
      </div>
    )
  }
}

export {Canvas}