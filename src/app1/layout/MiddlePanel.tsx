import { observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;


export let MiddlePanel: React.SFC<any> = observer(props =>
    <Container>
      <div className='fill-parent'>
     {props.children}
     </div>
    </Container>
  )



