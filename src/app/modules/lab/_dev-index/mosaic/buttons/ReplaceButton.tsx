
import * as _ from 'lodash';
import * as React from 'react';
import { MosaicWindowContext } from '../contextTypes';
import { MosaicKey } from '../types';
import { createDefaultToolbarButton, MosaicButtonProps } from './MosaicButton';

export class ReplaceButton<T extends MosaicKey> extends React.PureComponent<MosaicButtonProps> {
  static contextTypes = MosaicWindowContext;
  context: MosaicWindowContext<T>;

  render() {
    return createDefaultToolbarButton('Replace Window', 'pt-icon-exchange', this.replace);
  }

  private replace = () => {
    this.context.mosaicWindowActions
      .replaceWithNew()
      .then(() => {
        if (this.props.onClick) {
          this.props.onClick();
        }
      })
      .catch(_.noop); // Swallow rejections (i.e. on user cancel)
  };
}

export const ReplaceButtonFactory = React.createFactory(ReplaceButton);
