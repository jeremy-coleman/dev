import { Button } from '@coglite/common/ux';
import { observer } from 'mobx-react';
import * as React from 'react';
import { style } from 'typestyle';

const brandStyles = {
    root: {},
    logo: {
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    title: {
        color: 'orange',
        fontSize: '14px'
    }
}


export let BrandButton = observer((props) => <Button><p style={brandStyles.title}>Coglite</p></Button>)

