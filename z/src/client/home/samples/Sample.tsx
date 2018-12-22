import { AppLink } from '@coglite/common/host';


import { observer } from 'mobx-react';
import * as React from 'react';

import { sampleRoutes } from './SampleRoutes';
import { SampleProps, SamplesHost } from './SamplesHost';

//import {MDFontIconOnly} from '@coglite/common/ux'
import { TileLink} from '../Home';



interface IHomeAppTileLinkProps extends SampleProps {
    request: IRequest;
    classes?: any
}

export let Sample = observer((props: SampleProps) => 
    <SamplesHost host={props.host} title="Samples">
        <div style={{ padding: 8 }}>
        <h2>Samples</h2>
        <div>
                        
        {
            sampleRoutes.map(group => 
            <div key={group.key}>
            <h3>{group.title}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", padding: 8 }}>
            {group.items.map(item => <TileLink key={item.path} host={props.host} request={Object.assign({}, item, { replace: true })}/>)}
            </div>
            </div>
        )
        }
            
        </div>
        </div>
    </SamplesHost>
)

