import { AppLink } from '@coglite/common/host';


import { observer } from 'mobx-react';
import * as React from 'react';

import { sampleRoutes } from './SampleRoutes';
import { SampleProps, SamplesHost } from './SamplesHost';

import {MDFontIconOnly} from '@coglite/common/ux'
import { Outline, TopHalf, BottomHalf, Title } from '../Home';



interface IHomeAppTileLinkProps extends SampleProps {
    request: IRequest;
    classes?: any
}

export let HomeAppTileLink = observer((props: IHomeAppTileLinkProps) => {
        return (
             <AppLink 
                host={props.host}
                request={props.request}
                style={{ textDecoration: "none" }}
                title={props.request.title}
            >
            <Outline>
                <TopHalf>
                <MDFontIconOnly icon={'screen_shared_outlined'}/>
                </TopHalf>
            <BottomHalf>
                        
                        <Title>
                            {props.request.title}
                        </Title>
                    </BottomHalf>
                </Outline>
            </AppLink>
        );
})



export let Sample = observer((props: SampleProps) => {
        return (
            <SamplesHost host={props.host} title="Samples">
                <div>
                    <div style={{ padding: 8 }}>
                        <h2>Samples</h2>
                        <div>
                            {sampleRoutes.map(group => {
                                return (
                                    <div key={group.key}>
                                        <h3>{group.title}</h3>
                                        <div style={{ display: "flex", flexWrap: "wrap", padding: 8 }}>
                                            {group.items.map(item => {
                                                return (
                                                    <HomeAppTileLink 
                                                        key={item.path}
                                                        host={props.host}
                                                        request={Object.assign({}, item, { replace: true })}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </SamplesHost>
        );
    })

