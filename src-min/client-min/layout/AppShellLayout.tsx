import { DIMENSIONS } from '@coglite/common/ux';
import { observer } from 'mobx-react';
import * as React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { IconNavBar } from './IconNavigation';


let AppShellLayout = observer((props) => 
      <div className={DIMENSIONS.FillFlex}>
        <div className={DIMENSIONS.Row}>
            <div className={DIMENSIONS.VerticalStretch}>
                <Header/>
            {/** <div style={{ height: '25px'}}>alternative command bar here</div> */}
            <div className={DIMENSIONS.VerticalStretch}>
            <div className={DIMENSIONS.Row}>
            <IconNavBar/>
            <div className={DIMENSIONS.Row}>
            <div className={DIMENSIONS.CardContainer}>
                {props.children}
            </div>
            <div style={{width: '0px'}}>same as above. set width to 100px or something to see</div>
            </div>
            </div>
            </div>
            <Footer/>
            </div>
            <div style={{width: '0px'}}>same as above, but outside footer set width to 100px or something to see</div> 
             </div>
             {/*theme changer*/}
        </div>
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