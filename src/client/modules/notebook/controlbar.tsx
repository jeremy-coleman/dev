import PlayCircleFilled from "@material-ui/icons/PlayCircleFilled";
import FormatAlignRight from "@material-ui/icons/FormatAlignRight";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import { inject, observer } from "mobx-react";
import * as React from "react";
import { UiStore } from "../../stores/UiStore";

import styled from 'styled-jss'

import {GlobalToaster} from '../../components/modals/toaster';
import { Intent } from '@blueprintjs/core';

import {Stack} from "../../common/Stack"
import * as _ from "lodash"
import {initiateRpcClient} from "../../rpc/socket"
import {withTheme} from 'theming'


const RightControlBarDimensions = withTheme(styled('div')(({theme}) => ({
  maxWidth: 48,
  minWidth: 48,
  width: 48,
  minHeight: "100%",
  flex: "1 1 auto",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignmentBaseline: "central",
  overflow: "hidden",
  border: "3px solid white",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08)",
  backgroundColor: 'white',
  color: theme.palette.primary.main
})))

//  backgroundColor: theme.palette.primary.main,
//  color: theme.palette.primary.contrastText


@inject("store", "jsonFormsStore")
@observer
export class NotebookControlBar extends React.Component<any, any> {

  protected pathStack: Stack
  private dfsPaths = []

  render() { 
    const {nodeDrawerToggle,diagramModel} = this.props.store.uiStore as UiStore

    const isOrphan = (obj) => {
      let isOrphan = false
      if (obj.cogType) {
        //is Node
        obj.ports.some((port) => {
          let doBreak = false
          if (port.name === "leftCenter" && port.links.length == 0) {
            isOrphan = true
            doBreak = true
          }
          return doBreak
        })
      } else {
        //is Link
        if (!obj.target)
          isOrphan = true
      }
      return isOrphan
    }

    const isTerminalNode = (node: any): boolean => {
      let isTerminal = false
      if (node.cogType === "cogliteDebug")
        isTerminal = true
      else if (node.cogType === "cogliteFunctionMath") {
        node.ports.some((port) => {
          let doBreak = false
          if (port.name === "rightCenter" && port.links.length == 0) {
            isTerminal = true
            doBreak = true
          }
          return doBreak
        })
      }
      return isTerminal
    }

    const initializeDiagram = (diagram: any) => {
      let initiatedNodes = []
      let initiatedLinks = []
      diagram.nodes.forEach((node) => {
        if (!isOrphan(node)) {
          node.label = "unexplored"
          if (node.cogType === "cogliteInput")
            node.isRootNode = true
          if (isTerminalNode(node)) {
            node.isTerminal = true
          }
          initiatedNodes.push(node)
        }
      })
      diagram.links.forEach((link) => {
        if (!isOrphan(link)) {
          link.label = "unexplored"
          initiatedLinks.push(link)
        }
      })
      diagram.nodes = initiatedNodes
      diagram.links = initiatedLinks
      return diagram
    }

    const traverseModel = (diagram: any, nodeIndex: number, nodeLinks: any): any => {
      let currentNode = diagram.nodes[nodeIndex]
      currentNode.label = "visited"
      this.pathStack.push(currentNode)
      if (currentNode.isTerminal) {
        this.dfsPaths.push(_.cloneDeep(this.pathStack.elements()))
      }
      nodeLinks[currentNode.id].forEach((link) => {
        let nextLink  = diagram.links.find((currentLink) => currentLink.id === link.id)
        let nextNodeId
        if (nextLink.label === "unexplored") {
          if (nextLink.source === currentNode.id)
            nextNodeId = nextLink.target
          else
            nextNodeId = nextLink.source
          let nextNodeIndex = diagram.nodes.findIndex((node) => node.id === nextNodeId)
          let nextNode = diagram.nodes[nextNodeIndex]
          if (nextNode.label === "unexplored") {
            nextLink.label = "discovered"
            this.pathStack.push(nextLink)
            traverseModel(diagram, nextNodeIndex, nodeLinks)
            this.pathStack.pop()
          } else {
            nextLink.label = "back"
          }
        }
      })
      this.pathStack.pop()
    }

    const runModel = () => {
      let serializedDiagram = diagramModel.serializeDiagram()
      serializedDiagram = initializeDiagram(serializedDiagram)
      console.log(serializedDiagram)
      this.pathStack = new Stack()
      this.dfsPaths = []
      const nodeLinks = {}
      serializedDiagram.links.forEach(link => {
        if (nodeLinks[link.source]) {
          nodeLinks[link.source].push(link)
        } else {
          nodeLinks[link.source] = []
          nodeLinks[link.source].push(link)
        }
        if (nodeLinks[link.target]) {
          nodeLinks[link.target].push(link)
        } else {
          nodeLinks[link.target] = []
          nodeLinks[link.target].push(link)
        }
      });

      serializedDiagram.nodes.some((currentNode, nodeIndex) => {
        let doBreak = false
        if (currentNode.isRootNode) {
          traverseModel(serializedDiagram, nodeIndex, nodeLinks)
          console.log("----The Depth First Search traversal Paths are----")
          console.log(this.dfsPaths)
          const { nodeFormsData } = this.props.store.uiStore as UiStore
          let hasErrors = false
          const pathSteps = []
          this.dfsPaths.forEach((dfsPath) => {
            let currentPathSteps = []
            dfsPath.forEach((obj) => {
              /*Check needs to be in place for empty values, later */
              if (obj.cogType === "cogliteInput") {
                if (nodeFormsData[obj.cogType] && nodeFormsData[obj.cogType][obj.id]) {
                  currentPathSteps.push("input")
                  currentPathSteps.push(nodeFormsData[obj.cogType][obj.id]["inject"])
                } else {
                  hasErrors = true
                }
              } else if (obj.cogType === "cogliteFunctionMath") {
                if (nodeFormsData[obj.cogType] && nodeFormsData[obj.cogType][obj.id]) {
                  currentPathSteps.push(nodeFormsData[obj.cogType][obj.id]["operator"])
                  currentPathSteps.push(nodeFormsData[obj.cogType][obj.id]["operand"])
                } else {
                  hasErrors = true
                }
              } else if (obj.cogType === "cogliteDebug") {
                currentPathSteps.push("debug")
              }
            })
            pathSteps.push(currentPathSteps)
          })
          
          if (!hasErrors) {
            console.log("----The value paths are----")
            console.log(pathSteps)
            let ws = initiateRpcClient()
            let previousValue = null

            const executeNode = (ws, currentPath) => {
              if (currentPath.length == 0) {
                console.log("FUNCTION NODE TERMINALITY...");
                console.log(previousValue)
                return
              } else {
                let latestAction  = currentPath.shift()

                if (latestAction === "input") {
                  previousValue = currentPath.shift()
                  executeNode(ws, currentPath)
                } else if (latestAction === "debug") {
                  console.log("DEBUG ENDPOINT");
                  console.log(previousValue)
                  return
                } else {
                  let latestValue = currentPath.shift()
                  ws.call(latestAction, [previousValue, latestValue]).then(function(result) {
                    previousValue = result
                    executeNode(ws, currentPath)
                  })
                }

              }
            }

            pathSteps.forEach((currentPath, currentPathIndex) => {
              ws.on('open', function() {
                console.log ("--- JSON RPC Websocket execution for path " + currentPathIndex + " INIT")
                executeNode(ws, currentPath)
                console.log ("--- JSON RPC Websocket execution for path " + currentPathIndex + " END")
              })
            })

            }
            else {

              GlobalToaster.show({
                message: 'Please fill all the forms',
                intent: Intent.DANGER,
                action: {
                onClick: () => {/*any function here */},
                text: "add text if u want here"
                }
            })
            }
            
            doBreak = true
        }
        return doBreak
      });
    }
    
  
    return(
      <RightControlBarDimensions>
            <IconButton onClick={() => nodeDrawerToggle.toggleDrawer()} color="inherit">
              {nodeDrawerToggle.open ? <CloseIcon/> : <FormatAlignRight />}
            </IconButton>

            <IconButton onClick={runModel} color="inherit">
              <PlayCircleFilled />
            </IconButton>
      </RightControlBarDimensions>      
  
    )
  }
}




// this is Unused, it's styles to put the notebook control bar on the top similar to app command bar
/*
//@ts-ignore
export const NotebookAppBar = withTheme(styled(NotebookControlBar)(({theme}) => ({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  position: "relative",
  top: 0,
  left: 0,
  right: 0,
  flexWrap: "none",
  overflow: "hidden !important",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText
})));

*/