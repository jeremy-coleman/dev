import * as React from 'react'
import {observer, inject} from 'mobx-react'
import {observable, action} from 'mobx'
import { FillFlex, VerticalStretch, Row } from './dimensions'

import {StatusFooter} from './Footer'

import { IconNavBar } from './IconNavigation';

//import { NavStore } from '../stores/NavStore';
import { MiddlePanel } from './Workspace';
import { CommandBar } from './CommandBar';
import { ThemeChangeModal } from '../../components/modals/ThemeChangeModal';




@inject('nav', 'store')
@observer
export class AppLayout extends React.Component <any, any> {
@observable hasError = false
@action displayError = () => this.hasError = true

handleThemeDialogClose = (selectedOption: string, action: string): void => {
    const uiStore = this.props.store.uiStore
    if (action === "ok") {
      uiStore.updateTheme(selectedOption)
    }
    uiStore.themeDialogToggle.openDrawer(false)
  }


 public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
     this.displayError()
 }


 render() {
    const {children} = this.props
    return (
      <FillFlex>        
        <Row>
            <VerticalStretch>
            <CommandBar/>
            <VerticalStretch>
            <Row>  
            <IconNavBar/>
            <Row>
            <MiddlePanel>
                {this.hasError ? (<ErrorDisplay/>) : (children)}
            </MiddlePanel>
            <div style={{width: '0px'}}>same as above. set width to 100px or something to see</div>
            </Row>
            
            </Row>
            </VerticalStretch>
            <StatusFooter/>
            </VerticalStretch>
            <div style={{width: '0px'}}>same as above. set width to 100px or something to see</div> 
        </Row>
        <ThemeChangeModal
              style={{ width: "80%", maxHeight: 435}}
              open={this.props.store.uiStore.themeDialogToggle.open}
              onOptionDialogClose={this.handleThemeDialogClose}
              selectedOption={this.props.store.uiStore.themeId}
              options={["myriad", "velocity", "ranger"]}
              dialogOptions={{ dialogTitle: "Choose Theme", cancelText: "Cancel", okText: "Update" }}
            />
        </FillFlex>
  )
 }
}

const ErrorDisplay = observer((props) => 
    <div style={{ textAlign: 'center', paddingTop: 25, paddingBottom: 25 }}>
    <h1>An unknown error occurred</h1>
    <h1>{props.error}</h1>
    <h1>{props.errorInfo}</h1>
    </div>
)