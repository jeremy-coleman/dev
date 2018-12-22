import { CardContainer, FillFlex, Row, VerticalStretch } from '@coglite/common/ux';
import { observer } from 'mobx-react';
import * as React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { IconNavBar } from './IconNavigation';
import { ThemeChangeModal } from './ThemeChangeModal';

export let MiddlePanel: React.SFC<any> = observer((props) =>
    <CardContainer>
    {props.children}
    </CardContainer>
)


let AppShellLayout = observer((props) => 
      <FillFlex>        
        <Row>
            <VerticalStretch>
                <Header/>
            {/** <div style={{ height: '25px'}}>alternative command bar here</div> */}
            <VerticalStretch>
            <Row>  
            <IconNavBar/>
            <Row>
            <MiddlePanel>
                {props.children}
            </MiddlePanel>
            <div style={{width: '0px'}}>same as above. set width to 100px or something to see</div>
            </Row>
            </Row>
            </VerticalStretch>
            <Footer/>
            </VerticalStretch>
            <div style={{width: '0px'}}>same as above, but outside footer set width to 100px or something to see</div> 
             </Row>
             <ThemeChangeModal/>
        </FillFlex>
  )



export {AppShellLayout}
export default AppShellLayout



        // <ThemeChangeModal
        //       style={{ width: "80%", maxHeight: 435}}
        //       open={this.props.ui.themeDialogToggle.open}
        //       onClose={this.handleThemeDialogClose}
        //       selectedOption={this.props.theme.themeId}
        //       options={["myriad", "velocity", "ranger"]}
        //       dialogOptions={{ dialogTitle: "Choose Theme", cancelText: "Cancel", okText: "Update" }}
        //     />