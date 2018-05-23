import * as React from 'react'
import {observer} from 'mobx-react'
import { Diagram } from './Diagram';
import { HorizontalStretch, FillFlex } from '../../design';
import { WorkspaceDrawer } from './WorkspaceDrawer';


export class WorkflowGraph extends React.Component<any, any> {
width=150
render() {
const {props, width} = this.props
    return (
        <HorizontalStretch>
            <FillFlex><Diagram {...props}/></FillFlex>
            <WorkspaceDrawer width={width}/>
        </HorizontalStretch>
)
}}
