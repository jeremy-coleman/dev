
import * as React from 'react';
//import {observer, inject} from 'mobx-react'
//import styled, { StyledFunction } from 'styled-components';
import { ButtonGroup, Button, Classes } from "@blueprintjs/core";
import {IconNames} from '@blueprintjs/icons'



export const NotebookToolbar  = () => (
            <ButtonGroup large={true} fill={true}>
                <Button icon={IconNames.CODE}  />
                <Button icon={IconNames.GRAPH}/>
                <Button icon={IconNames.SCATTER_PLOT} />
                <Button icon={IconNames.GRAPH}/>
            </ButtonGroup >
          
)
