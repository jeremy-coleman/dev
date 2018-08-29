import * as React from "react"
import IconButton from "@material-ui/core/IconButton"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import { observer, inject } from "mobx-react"
import { UiStore } from "../../../stores/UiStore"
import {JsonForms} from '../forms-core'
import { schema, uischema } from "../Forms/FormConfig"
import {Card, Button }from "@material-ui/core"
import styled from 'styled-jss'

import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"

import { VerticalStretch } from '../../layout';



const NodeFormDrawerDimensions = styled(Card)({
  minWidth: 245,  
  minHeight: "100%",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    alignmentBaseline: "central",
    position: 'relative'
  })



@inject("store", "jsonFormsStore")
@observer
export class NodeFormDrawer extends React.Component<any, any> {
  render() {

    const { nodeFormDrawerToggle, activeCogliteNodeModel, isDynamicNodeFormUpdate } = this.props.store.uiStore as UiStore
    const cogType = activeCogliteNodeModel && activeCogliteNodeModel.model.cogType
    //UPDATE PROP CHANGES
    const updateFormData = () => {
      const { activeCogliteNodeModel, nodeFormsData } = this.props.store.uiStore as UiStore
      
      const currentJsonFormsStoreData = this.props.jsonFormsStore.coreStore.data;
      const currentNodeId = activeCogliteNodeModel.model.id

      for (const key of Object.keys(currentJsonFormsStoreData)) {
          console.log(key, currentJsonFormsStoreData[key]);
          if (nodeFormsData.hasOwnProperty(key)) {
            nodeFormsData[key][currentNodeId] = currentJsonFormsStoreData[key]
          } else {
            nodeFormsData[key] = {
              [currentNodeId]: currentJsonFormsStoreData[key]
            }
          }
      }
      this.props.store.uiStore.updateNodeFormsData(nodeFormsData)
    }

    if (isDynamicNodeFormUpdate) {  
      updateFormData()
    }

    const closeDrawer = () => {
      updateFormData()
      nodeFormDrawerToggle.openDrawer(false)
    }

    const formBlock = (cogType) => {
      if (cogType) {
        if (cogType !== "cogliteDebug")
          return (<JsonForms className='test-json-forms' schema={schema[cogType]} uischema={uischema[cogType]} path={cogType}/>)
        else
          return "Check Console"
      } else {
        return null
      }
    }
    
//button below formBlock displays text from elsewhere, todo: find it and doc


    const nodeFormDrawer = (
      <NodeFormDrawerDimensions >
        <VerticalStretch>
        <Button onClick={updateFormData}>update</Button>
        <div style={nodeFormDrawerHeader}>
          <IconButton onClick={closeDrawer}>
            <ArrowForwardIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
        <div style={formDrawerBlock}>
            {formBlock(cogType)}
            <Button variant="contained" color="primary" style={{margin: '8px'}} onClick={closeDrawer}>
              Done
            </Button>
          </div>
          </List>
        </VerticalStretch>
      </NodeFormDrawerDimensions>
    )
    return nodeFormDrawer
  }
}

const formDrawerBlock: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}


const nodeFormDrawerHeader: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "0 8px"
}