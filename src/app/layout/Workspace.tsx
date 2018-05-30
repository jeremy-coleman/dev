import { Card } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-jss';
import { observer } from 'mobx-react';
import { FillFlex } from '../design';

const Container = styled(Card)({
  position: 'relative',
  display: "flex",
  flex: '1 1 auto',
  width: "100%",
  margin: '5px'
});


export let MiddlePanel: React.SFC<any> = observer(props =>
    <Container>
     <FillFlex>{props.children}</FillFlex>
    </Container>
)