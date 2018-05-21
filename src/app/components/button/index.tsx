import { observer } from 'mobx-react';
import { darken, lighten } from 'polished';
import * as React from 'react';
import styled from 'styled-components';


const PrimaryElement: any = styled.button`
  border-radius: 3px;
  border: 0;
  background-color: ${props => props.theme.primary};
  color: white;
  padding: 6px;
  cursor: pointer;
  min-width: 150px;
  min-height: 31px;
  display: flex;
  align-self: auto;
  justify-content: center;
  align-items: center;
  font-weight: 600;

  &:hover {
    background-color: ${props => darken(0.1, props.theme.primary)};
  }

  &:active {
    background-color: ${props => darken(0.2, props.theme.primary)};
  }

  &:focus {
    outline: none;
  }
`;

const SecondaryElement = PrimaryElement.extend`
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.main};

  &:hover {
    background-color: ${props => darken(0.1, props.theme.secondary)};
  }

  &:active {
    background-color: ${props => darken(0.2, props.theme.secondary)};
  }
`;

const MinimalElement = PrimaryElement.extend`
  background-color: inherit;
  color: ${props => props.theme.text};
  &:hover {
    background-color: ${props => lighten(0.2, props.theme.main)};
  }

  &:active {
    background-color: ${props => lighten(0.2, props.theme.main)};
  }
`;

const ButtonSpan = styled.span`
  margin-right: 10px;
  margin-top: 2px;
`;

interface ButtonProps {
  label: string;
  primary?: boolean;
  minimal?: boolean;
  className?: string;
  icon?: any;
  isActive?: boolean;
  onClick?: () => void;
  children?: any;
}

function Button({
  label,
  primary,
  minimal,
  className,
  icon,
  isActive,
  onClick,
  children
}: ButtonProps) {
  let ElementContainer = primary ? PrimaryElement : SecondaryElement;
  ElementContainer = minimal ? MinimalElement : ElementContainer;
  return (
    <ElementContainer className={className} onClick={onClick}>
      {!children && (
        <React.Fragment>
          {icon && <ButtonSpan>{icon}</ButtonSpan>}
          <span>{label}</span>
        </React.Fragment>
      )}
      {children}
    </ElementContainer>
  );
}

export default observer(Button);
