import { AppLink } from '@coglite/common/host';

import { observer } from 'mobx-react';
import * as React from 'react';

import { HomeHostAppView } from './HomeHostAppView';
import { homeRoutes } from './HomeRoutes';
import {MDFontIconOnly} from '@coglite/common/ux'

import { stylesheet } from 'typestyle';

//import styled from '@emotion/styled'
// export let Outline = styled('div')({
//     position: "relative",
//     width: 100,
//     height: 100,
//     margin: 10,
//     boxShadow: "0 0 5px 0px rgba(0,0,0,0.4)"
// })

// export let TopHalf = styled('div')((theme: any) => ({
//     display: "flex",
//      alignItems: "center",
//      justifyContent: "center",
//      position: "absolute",
//      top: 0, right: 0, left: 0, height: 60,
//      backgroundColor: 'white'
// }))

// export let Title = styled('div')({
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 8 
// })

// export let BottomHalf = styled('div')(({theme}: any) => ({
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     position: "absolute",
//     fontSize: 10,
//     top: 60,
//     right: 0,
//     bottom: 0,
//     left: 0,
//     backgroundColor: 'black',
//     color: 'white'
// }))

let T = stylesheet({
Outline: {
    position: "relative",
    width: 100,
    height: 100,
    margin: 10,
    boxShadow: "0 0 5px 0px rgba(0,0,0,0.4)"
},

TopHalf :{
    display: "flex",
     alignItems: "center",
     justifyContent: "center",
     position: "absolute",
     top: 0, right: 0, left: 0, height: 60,
     backgroundColor: 'white'
},

 Title:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8 
},

 BottomHalf :{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    fontSize: 10,
    top: 60,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    color: 'white'
}
})




interface IHomeAppTileLinkProps extends IAppHostProps {
    request: IRequest;
    classes?: any
}

export let TileLink = observer((props: IHomeAppTileLinkProps) => {
        return (
            <AppLink 
                host={props.host}
                request={props.request}
                style={{ textDecoration: "none" }}
                title={props.request.title}
            >
            <div className={T.Outline}>
                <div className={T.TopHalf}>
                <MDFontIconOnly icon={'screen_share_outline'}/>
                </div>

                <div className={T.BottomHalf}>
                <div className={T.Title}>
                    {props.request.title}
                </div>
                </div>

                </div>
            </AppLink>
        );
})


export let Home = observer((props: IAppHostProps) => 
    <HomeHostAppView host={props.host} title="Home">
    <div>
    <div style={{ padding: 8 }}>
    <h2>Home</h2>
        
        <div>         
        {
            homeRoutes.map(group => 
                <div key={group.key}>
                <h3>{group.title}</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", padding: 8 }}>
                        {group.items.map(item => (
                            <TileLink 
                                key={item.path} 
                                host={props.host}
                                request={Object.assign({}, item, { replace: true })}/>
                        ))}
                    </div>
                </div>
            )
        }
        </div>

    </div>
    </div>
    </HomeHostAppView>

)

