import * as React from 'react'
import { MenuDivider, ButtonGroup, Button } from "@blueprintjs/core";
import {IconNames} from '@blueprintjs/icons'


import styled from 'styled-components'

export const StyledButtonGroup = styled(ButtonGroup)`
  top: 0;
  bottom: 0;
  left: 0;
  list-style: none;
  background-color: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
  min-width: 50px !important;
  border-color: white;
`;

const VertFlexContainer = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ThemedButton_BP = styled(Button)`
  background: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
`;


export class IconNavBar extends React.Component<{}, {}> {
    leftNavCollapsed = true
    public render() {
        return (     
            
            <StyledButtonGroup vertical={true}>
                <VertFlexContainer>
                <ThemedButton_BP icon={IconNames.MENU} large={true} onClick={this.handleClick}/>
                <ThemedButton_BP icon={IconNames.DATABASE} large={true}  onClick={this.handleClick}/>
                <ThemedButton_BP icon={IconNames.GRAPH} large={true}  onClick={this.handleClick} />
                <ThemedButton_BP icon={IconNames.COG} large={true} onClick={this.handleClick}/>
                </VertFlexContainer>
            </StyledButtonGroup>
        );
    }
 
    private handleClick(e: React.SyntheticEvent<any>) {
        console.log("clicked", (e.target as HTMLElement).textContent);
    }
}
