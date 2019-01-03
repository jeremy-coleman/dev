import { observer } from 'mobx-react';
import * as React from 'react';



const syncSpinnerOverlayStyle: React.CSSProperties = {
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            zIndex: 30000
        
}

interface ISyncOverlayProps {
    sync: ISyncModel;
    syncLabel?: string;
    onRenderSync?: (props : ISyncOverlayProps) => React.ReactNode;
    onRenderError?: (props : ISyncOverlayProps) => React.ReactNode;
    className?: string;
}

const DefaultSpinnerOverlay = observer((props: ISyncOverlayProps) => 
    <div style={syncSpinnerOverlayStyle}>
    <div>{props.syncLabel || "Loading..."}</div>
    </div>
)

let SyncOverlay = observer((props: ISyncOverlayProps) => 
    <React.Fragment>
        {
        props.sync.syncing || (props.onRenderError && props.sync.error) &&
        
        <div style={{display: 'grid', height: '100vh'}}>
            <span style={{margin: 'auto'}}>
                    {props.sync.error && props.onRenderError(props)}
                    {props.sync.syncing && (props.onRenderSync(props) || <DefaultSpinnerOverlay {...props}/>)}
            </span>
        </div>

        }
    </React.Fragment>  
)


export { ISyncOverlayProps, SyncOverlay }