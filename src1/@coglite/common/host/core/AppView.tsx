import { observer } from 'mobx-react';
import * as React from 'react';
import { style, stylesheet } from 'typestyle';


var appViewStyles = stylesheet({
    main: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            overflow: "auto",
            "&.hasCmdMenu": {top: 35}
    }
})

interface IHostAppViewProps extends IAppHostBaseProps {
    showBackLabel?: boolean;
    backFallback?: any;
    hideTitle?: boolean;
    hideIcon?: boolean;
    className?: string,
    classes?: any
}

let AppViewTemplate: React.FunctionComponent<IHostAppViewProps> = observer((props) => 
    <div className={appViewStyles.main}>{props.children}</div>
)


let HostAppView = AppViewTemplate


export { IHostAppViewProps, HostAppView }



const spacing = '5px';
const niceVerticalLayout = style({
  $nest: {
    '&>*': {
      marginBottom: spacing,
    },
    '&>*:last-child': {
      marginBottom: '0px',
    }
  }
});



// let CommandBar1 = withTheme()(observer((props) => {
// var styles = commandBarStylesheet(props.theme)
//     return (
//         //@ts-ignore
//       <div className={styles.root}>
//       {props.items && props.items.map(Item => React.Children.toArray([<Item key={Item.toString()}/>]))}
//       <div className={styles.spacerStyle} />
//       {props.farItems && props.farItems.map(FarItem => React.Children.toArray([<FarItem key={FarItem.toString()}/>]))}
//       </div>
//     )}
// ))


// @observer
// class AppViewTemplate1 extends React.Component<IHostAppViewProps, any> {
//     protected get hasCommandBar() {
//         const props = this.props.commandBarProps;
//         return (props &&
//                 ((props.items && props.items.length > 0) ||
//                 (props.farItems && props.farItems.length > 0))) ? true : false;
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 {this.hasCommandBar && 
//                     <CommandBar 
//                         items={this.props.commandBarProps.items}
//                         farItems={this.props.commandBarProps.farItems}
//                         className={appViewStyles.menuContainer}
//                     />
//                 }
//             <div role="main" className={css(appViewStyles.main, { hasCmdMenu: this.hasCommandBar, rootView: this.props.host.root })}>
//                 {this.props.children}
//             </div>
//             </React.Fragment>
//         )
//     }
// }
