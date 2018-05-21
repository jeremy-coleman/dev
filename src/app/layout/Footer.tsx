import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Row } from '../design';
import { observer } from 'mobx-react';
import injectSheet from 'react-jss';
import styled from 'styled-jss';
import { AppBar } from '@material-ui/core';

const version = '0.0.1';

const copyrightString = '© Copyright Coglite 2018';

type FooterProps = {
  classes?: any,
  children?: any
}

const FooterDimensions = styled(AppBar)({
  border: "1px solid orange",
  display: "flex",
  flexDirection: 'row',
  width: "100%",
  position: 'relative',
  bottom: 0,
  left: 0,
  right: 0
})

import { rgba } from 'polished';

export default (theme) => {
  return {
    root: {
      display: 'block',
      position: 'relative',
      backgroundColor: rgba(theme.background.primary.level0, theme.alpha),

      '&$exiting, &$exited': {
        backgroundColor: 'transparent',

        '& $separator': {
          width: 0,
        },
      },
    },
    separator: {
      position: 'absolute',
      top: 'auto',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'block',
      width: '100%',
      borderStyle: 'solid',
      borderColor: theme.color.primary.dark,
      borderWidth: '0 0 1px',
      transition: `all ${theme.animTime}ms ease-in`,
    },
    children: {
      display: 'block',
    },

    entering: {},
    entered: {},
    exiting: {},
    exited: {},
  };
};

export const Footer = observer((P: FooterProps) => (
  <FooterDimensions >
    <span>{copyrightString}</span>
    <div style={{flex: 'auto'}}></div>
    <span>{`Version: ${version || 'pre-release'}`}</span>
  </FooterDimensions>
))
