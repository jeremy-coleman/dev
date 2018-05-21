import * as React from 'react'
import { observer, inject } from 'mobx-react';
import styled from 'styled-jss'
import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz } from '@material-ui/icons';
import {NavigationStore} from '../stores'
import { NavListIcon } from './NavIcon';
import { Card } from '@material-ui/core';


const VertFlexContainer = styled(Card)({
    maxWidth: '64px',
    minHeight: '100%',
    flex: '1 1 auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignmentBaseline: 'central',
    marginBottom: '5px'
})


@inject('navigation')
@observer
export class IconNavBar extends React.Component<any, any> {
    public render() {
      const nav = this.props as NavigationStore
        return (     
            <VertFlexContainer {...this.props}>
              <NavListIcon route="/" icon={<Dashboard />} />
              <NavListIcon route="/pages/notebook" icon={<SwapHoriz />} />
              <NavListIcon route="/pages/charts" icon={<SwapHoriz />} />
              <NavListIcon route="/pages/datasets" icon={<AccountBalanceWallet />} />
              <NavListIcon route="/pages/workflowgraph" icon={<SwapHoriz />} />
              <NavListIcon route="/pages/cloud" icon={<Cloud />} />
              <NavListIcon route="/pages/settings" icon={<Settings />} />
              <NavListIcon route="/pages/about" icon={<HelpOutline />} />
            </VertFlexContainer>
        );
    }
}

/*
const VertFlexContainer = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: flex-start;
`;
*/
/*
 export const IconNavigation  = observer(({fill, vertical, large, size, props}: BlueprintNavIconProps) => (        
            <StyledButtonGroup large={true} fill={true} vertical={true}>
                <BlueprintNavIcon icon={IconNames.DASHBOARD} size={35} large={true} route="/"/>
                <BlueprintNavIcon icon={IconNames.CODE} size={35} large={true} route="/pages/notebook"/>
                <BlueprintNavIcon icon={IconNames.CHART} size={35} large={true} route="/pages/charts"/>
                <BlueprintNavIcon icon={IconNames.DATABASE} size={35} large={true}  route="/pages/datasets"/>
                <BlueprintNavIcon icon={IconNames.GRAPH} size={35} large={true}  route="/pages/dashboard" />
                <BlueprintNavIcon icon={IconNames.CLOUD} size={35} large={true}  route="/pages/cloud"/>
                <BlueprintNavIcon icon={IconNames.COG} size={35} large={true}  route="/pages/settings"/>
                <BlueprintNavIcon icon={IconNames.HELP} size={35} large={true}  route="/pages/about"/>
            </StyledButtonGroup >
  ))
  */



//import styled from 'styled-components'

/*
const Container = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  padding: 0px !important;
  list-style: none;
  background-color: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
  width: 50px !important;
  border-color: white;
  border: 10px;
`;

const VertFlexContainer = styled(ButtonGroup)`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: flex-start;
`;

export const MenuIcon = styled(Button)`
  background: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
`;

export const MenuIconDivider = styled(MenuDivider)`
  width: 50px !important;
`;

const LeftNavSC = styled.div`
    width: 64px;
    flex-direction: column;
    align-items: central;
    border: 3px solid black;
`
*/