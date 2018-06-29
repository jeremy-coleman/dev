
import * as React from 'react';
import { ButtonGroup, Button } from "@blueprintjs/core";
import {IconNames} from '@blueprintjs/icons'
import { observer } from 'mobx-react';



export const LabToolbar  = observer((props: any) => (
            <ButtonGroup large={true} fill={true}>
                <Button icon={IconNames.CODE}  />
                <Button icon={IconNames.GRAPH}/>
                <Button icon={IconNames.SCATTER_PLOT} />
                <Button icon={IconNames.GRAPH}/>
            </ButtonGroup >
          
))