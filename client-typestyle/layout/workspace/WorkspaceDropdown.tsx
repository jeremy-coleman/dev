import { Button, MDFontIconOnly } from '@coglite/common/ux';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Divider from '@material-ui/core/Divider';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import Paper from '@material-ui/core/Paper';

import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

const dbDropdownStyles = stylesheet({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 36,
    right: 'auto',
    left: 0,
    zIndex: 4
  }
});

const modalState = observable.object({open: false});

let toggleModal = () => {
  modalState.open = !modalState.open
}

let safeClose = () => modalState.open ? toggleModal() : void 0;

let WorkspaceDropdown = inject('theme', 'ui')(observer((props) => 
 <div className={dbDropdownStyles.root}>
          <div>
            <Button style={{color: 'var(--cog-primary)'}} onClick={() => toggleModal()} >
            {props.dropdownHeading || 'Workspace'}
            <MDFontIconOnly icon={'expand_more'}/>
            </Button>
            
            {/* {modalState.open &&
              <ClickAwayListener onClickAway={safeClose}> // this was just under the first div b4
              <Paper className={dbDropdownStyles.paper}>
                <MenuList>
                    <ListSubheader>Current Workspaces</ListSubheader>
                    {props.dashboardListItems}
                    <Divider variant="inset" />
                  
                  <ListSubheader>New</ListSubheader>

                      <MenuItem onClick={props.onClickNew}>
                      <MDFontIconOnly icon={'library_add'}/>
                       <ListItemText primary="Add New"/>
                      </MenuItem>

                      <MenuItem onClick={() => modalState.open ? toggleModal() : void 0}>
                      <MDFontIconOnly icon={'library_add'}/>
                       <ListItemText primary="From Template[TODO]"/>
                      </MenuItem>

            <Divider variant="inset"/>

            <ListSubheader>Delete</ListSubheader>
                      <MenuItem onClick={props.onRemoveAll}>
                      <MDFontIconOnly icon={'delete_sweep'}/>
                       <ListItemText primary="Remove All Workspaces"/>
                      </MenuItem>

                    </MenuList>
              </Paper>
              </ClickAwayListener>
            } */}
          </div>
        
      </div>
))

export {WorkspaceDropdown}
export default WorkspaceDropdown
