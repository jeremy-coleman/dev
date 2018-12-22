// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import MuiGrow from '@material-ui/core/Grow';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import MenuList from '@material-ui/core/MenuList';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import { withStyles } from '@material-ui/core/styles';


// import {MDFontIconOnly} from '@coglite/common/ux'

// import * as React from 'react';

// let Grow: any = MuiGrow

// const styles = theme => ({
//   root: {
//     display: 'flex',
//   },
//   paper: {
//     marginRight: theme.spacing.unit * 2,
//     margin: 0
//   },
// });

// class UserButtonBase extends React.Component<any, any> {
//   state = {
//     open: false,
//   };

//   handleToggle = () => this.setState(state => ({ open: !state.open }));
  

//   handleClose = event => {
//     if (this.anchorEl.contains(event.target)) {
//       return;
//     }
//     else this.setState({ open: false });
//   };
  
//   anchorEl: any;




//   render() {
//     const { classes } = this.props;
//     const { open } = this.state;

//     return (
//       <div className={classes.root}>
//         <div>
//           <Button
//             color='secondary'
//             buttonRef={node => this.anchorEl = node}
//             aria-owns={open ? 'menu-list-grow' : null}
//             aria-haspopup="true"
//             onClick={this.handleToggle}
//           >
//     <MDFontIconOnly icon={'perm_identity'}/>
//     <MDFontIconOnly icon={'expand_more'}/>
//           </Button>
//           <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
//             {({ TransitionProps, placement }) => (
//               <Grow
//                 {...TransitionProps}
//                 //@ts-ignore
//                 id="menu-list-grow"
//                 style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//               >
//                 <Paper>
//                   <ClickAwayListener onClickAway={this.handleClose}>
//                     <MenuList>
//                       {this.props.userInfo}
//                     <ListSubheader>Groups</ListSubheader>
//                       {this.props.userGroups}
//                     </MenuList>
//                   </ClickAwayListener>
//                 </Paper>
//               </Grow>
//             )}
//           </Popper>
//         </div>
//       </div>
//     );
//   }
// }


// export let UserButton =  withStyles(styles)(UserButtonBase);
// export default UserButton