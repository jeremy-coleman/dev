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

let HostAppView: React.FunctionComponent<IHostAppViewProps> = observer((props) => 
    <div className={appViewStyles.main}>{props.children}</div>
)



export { IHostAppViewProps, HostAppView }



