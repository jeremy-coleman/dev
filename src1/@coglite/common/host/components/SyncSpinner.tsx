import { observer } from 'mobx-react';
import * as React from 'react';

import { Error } from './Error';

let spinnerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 8
}

interface ISyncProps {
    sync: ISyncModel;
    onRenderDone?: (props : ISyncProps) => React.ReactNode;
    syncLabel?: string;
    onRenderDefault?: (props : ISyncProps) => React.ReactNode;
    onRenderSync?: (props : ISyncProps) => React.ReactNode;
    onRenderError?: (error : any, props : ISyncProps) => React.ReactNode;
    classes?: any
    className?: string;
}

let SyncSpinner = observer((props: ISyncProps) => 
        <span style={spinnerStyles}>
            {props.syncLabel || "Loading..."}
        </span>
)

let SyncComponent = observer((props: ISyncProps) => 
    <React.Fragment>
        {props.sync.syncing && <SyncSpinner {...props}/>}
        {props.sync.error && <Error className="sync-error-message" error={props.sync.error}/>}
        {props.sync.hasSynced && props.onRenderDone(props)}
        {props.onRenderDefault && props.onRenderDefault(props)}
    </React.Fragment>
)

export { ISyncProps, SyncComponent, SyncSpinner }