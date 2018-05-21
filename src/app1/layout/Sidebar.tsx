import { observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';



const Container = styled.div`
  height: 100%;
  background-color: ${props => props.theme.main} !important;
`;

const MenuItem = styled.a`
  border-radius: 3px !important;
  background: rgba(151, 173, 187, 0.3) !important;
  margin-bottom: 10px;
`;


@observer
export class Sidebar extends React.Component<any, {}> {
  public render() {
    const {children} = this.props
    return (
      <Container>
        <div style={{minWidth: 0}}>{children} hi</div>
      </Container>
    );
  }

}
