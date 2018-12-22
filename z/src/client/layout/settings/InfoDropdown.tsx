
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';



const settingsDropdownStyles = stylesheet({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 36,
    left: 'auto',
    right: 5,
    zIndex: 4
  }
});


const modalState = observable.object({open: false});

let toggleModal = () => {
  modalState.open = !modalState.open
}

let InfoDropdown = inject('theme', 'ui')(observer((props) => 
      <div className={settingsDropdownStyles.root}>
        {/* <ClickAwayListener onClickAway={() => modalState.open ? toggleModal() : void 0}>
          <div>
            <Button style={{color: 'var(--cog-primary)'}} onClick={() => toggleModal()}>
            {props.dropdownHeading}
            <MDFontIconOnly icon={'settings'}/><MDFontIconOnly icon={'expand_more'}/>
            </Button>
            {modalState.open &&
            <Paper className={settingsDropdownStyles.paper}>
                <MenuList>
                    <ListSubheader>Settings</ListSubheader>
          <Divider variant="inset" />
                  
          <MenuItem onClick={props.onClickHelp}>
              <MDFontIconOnly icon={'live_help'}/>
              <ListItemText primary="Help"/>
          </MenuItem>

        <MenuItem onClick={props.onClickAbout}>
            <MDFontIconOnly icon={'build'}/>
            <ListItemText primary="About"/>
        </MenuItem>

        <MenuItem onClick={() => {props.ui.themeDialogToggle.toggle(), toggleModal()}} color="secondary">
            <MDFontIconOnly icon={'color_lens'}/>
            <ListItemText primary="Theme"/>
        </MenuItem>

            <Divider variant="inset"/>

        <ListSubheader>Other</ListSubheader>

                  </MenuList>
              </Paper>
            }
          </div>
        </ClickAwayListener> */}
      </div>
    )
)

export {InfoDropdown}
