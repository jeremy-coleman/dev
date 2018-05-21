"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const storm_react_diagrams_1 = require("storm-react-diagrams");
const CogliteLinkFactory_1 = require("./CogliteLinkFactory");
// import the custom models
const CogliteNodeFactory_1 = require("./CogliteNodeFactory");
const CogliteNodeModel_1 = require("./CogliteNodeModel");
const CoglitePortModel_1 = require("./CoglitePortModel");
const SimplePortFactory_1 = require("./SimplePortFactory");
exports.default = () => {
    //1) setup the diagram engine
    var engine = new storm_react_diagrams_1.DiagramEngine();
    engine.installDefaultFactories();
    // register some other factories as well
    engine.registerLinkFactory(new CogliteLinkFactory_1.CogliteLinkFactory());
    engine.registerPortFactory(new SimplePortFactory_1.SimplePortFactory("coglite", config => new CoglitePortModel_1.CoglitePortModel()));
    engine.registerNodeFactory(new CogliteNodeFactory_1.CogliteNodeFactory());
    //2) setup the diagram model
    var model = new storm_react_diagrams_1.DiagramModel();
    //3-A) create a default node
    var node1 = new storm_react_diagrams_1.DefaultNodeModel("Node 1", "rgb(0,192,255)");
    var port1 = node1.addOutPort("Out");
    node1.setPosition(100, 150);
    //3-B) create our new custom node
    var node2 = new CogliteNodeModel_1.CogliteNodeModel("cogliteIn", "Coglite Transform block");
    node2.setPosition(300, 108);
    var node3 = new storm_react_diagrams_1.DefaultNodeModel("Node 3", "red");
    var port3 = node3.addInPort("In");
    node3.setPosition(550, 150);
    var node4 = new CogliteNodeModel_1.CogliteNodeModel("cogliteOut", "Coglite Transform block");
    node4.setPosition(50, 250);
    //3-C) link the 2 nodes together
    var link1 = port1.link(node2.getPort("leftTop"));
    var link2 = port3.link(node2.getPort("rightBottom"));
    var link3 = node4.getPort("rightTop").link(node2.getPort("leftBottom"));
    //4) add the models to the root graph
    model.addAll(node1, node2, node3, node4, link1, link2, link3);
    //5) load model into engine
    engine.setDiagramModel(model);
    //6) render the diagram!
    return React.createElement(storm_react_diagrams_1.DiagramWidget, { className: "srd-demo-canvas", diagramEngine: engine });
};
