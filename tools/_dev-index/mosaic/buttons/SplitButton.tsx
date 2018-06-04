
import * as _ from 'lodash';
import * as React from 'react';
import { MosaicWindowContext } from '../contextTypes';
import { MosaicKey } from '../types';
import { createDefaultToolbarButton, MosaicButtonProps } from './MosaicButton';

export class SplitButton<T extends MosaicKey> extends React.PureComponent<MosaicButtonProps> {
  static contextTypes = MosaicWindowContext;
  context: MosaicWindowContext<T>;

  render() {
    return createDefaultToolbarButton('Split Window', 'pt-icon-add-column-right', this.split);
  }

  private split = () => {
    this.context.mosaicWindowActions
      .split()
      .then(() => {
        if (this.props.onClick) {
          this.props.onClick();
        }
      })
      .catch(_.noop); // Swallow rejections (i.e. on user cancel)
  };
}

export const SplitButtonFactory = React.createFactory(SplitButton);
