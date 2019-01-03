import { observer } from 'mobx-react';
import * as React from 'react';

import { Error, 
//SyncOverlay 
} from '../components';
import { AppHostModel } from '../models';




let AppHostError = observer((props: IAppHostProps) => <Error className="app-host-error" error={this.props.host.sync.error} />)


let AppHostContainerView = observer((props:IAppHostProps) => 
<React.Fragment>
    {   props.host.sync.error && props.onRenderError && props.onRenderError(props) }
    {   props.host.sync.error && <AppHostError {...props} /> }
    {   !props.host.sync.error && props.host.view }
</React.Fragment>
)


@observer
class AppHostContainer extends React.Component<IAppHostProps, any> {
    componentWillMount() {
        if(!this.props.noLoadOnMount) {
            this.props.host.load();
        }
    }
    private _onRenderSync = () => {
        return this.props.onRenderSync(this.props);
    }

    private _renderContainerBase(){
        return <AppHostContainerView key="view" {...this.props} />
    }

render(){
    return (
                <div {...this.props}>
                    {this._renderContainerBase()}
                </div>
        );
}
}

    // return (
    //         <ThemeProvider theme={state.theme.combinedTheme}>
    //             <div {...this.props}>
    //                 {this._renderContainerBase()}
    //             </div>
    //         </ThemeProvider>
    //     );


class AppContainer extends React.Component<IAppContainerProps, any> {
    protected _host : AppHostModel;
    
    constructor(props : IAppContainerProps) {
        super(props);
        this._host = new AppHostModel();
        this._host.setRoot(this.props.root ? true : false);
        this._host.router = this.props.router;
        this._host.launcher = this.props.launcher;
        this._host.setDefaultRequest(props);
    }

    get host() : AppHostModel {
        return this._host;
    }

    componentWillReceiveProps(nextProps : IAppContainerProps) {
        if(nextProps.router !== this.props.router) {
            this._host.setRoot(this.props.root ? true : false);
            this._host.router = nextProps.router;
            this._host.launcher = nextProps.launcher;
        }
        this._host.load(Object.assign({}, nextProps, { replace: true }));
    }

    render() {
        return (
            <AppHostContainer 
                host={this._host}
                //onRenderSync={this.props.onRenderSync}
                onRenderError={this.props.onRenderError}
            />
        );
    }
}



export {AppContainer,AppHostContainer}


//     private _renderContainerBase(){
//         return [
//             <SyncOverlay key="overlay" sync={this.props.host.sync} onRenderSync={this.props.onRenderSync ? this._onRenderSync : undefined} />,
//             <AppHostContainerView key="view" {...this.props} />
//         ]
//     }
//     render() {
//         return (
//         <React.Fragment {...this.props}>
//              {this._renderContainerBase()}
//         </React.Fragment>
//         );
//     }
// }

//let AppHostContainer = withTheme(_AppHostContainer)

            //  <ThemeProvider theme={theme}>
            //  {this._renderContainerBase()}
            // </ThemeProvider>


    //     return (
    // <MobxProvider theme={theme}>
    //     <ThemeProvider theme={theme}>
    //     <React.Fragment>
    //          {this._renderContainerBase()}
    //     </React.Fragment>
    //     </ThemeProvider>
    // </MobxProvider>
    //     );

