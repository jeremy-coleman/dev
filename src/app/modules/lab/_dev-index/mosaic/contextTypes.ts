import * as PropTypes from 'prop-types';
import { MosaicKey, MosaicNode, MosaicPath, MosaicUpdate } from './types';

/**
 * Mosaic provides functionality on the context for components within
 * Mosaic to affect the view state.
 */

/**
 * Context provided to everything within Mosaic
 */
export interface MosaicContext<T extends MosaicKey> {
  mosaicActions: MosaicRootActions<T>;
  mosaicId: string;
}

/**Context provided to everything within a Mosaic Window*/
export interface MosaicWindowContext<T extends MosaicKey> extends MosaicContext<T> {
  mosaicWindowActions: MosaicWindowActions;
}

/**These actions are used to alter the state of the view tree*/
export interface MosaicRootActions<T extends MosaicKey> {
  expand: (path: MosaicPath, percentage?: number) => void;
  remove: (path: MosaicPath) => void;
  hide: (path: MosaicPath) => void;
  replaceWith: (path: MosaicPath, node: MosaicNode<T>) => void;
  updateTree: (updates: MosaicUpdate<T>[]) => void;
  getRoot: () => MosaicNode<T> | null;
}

export interface MosaicWindowActions {
  split: (...args: any[]) => Promise<void>;
  replaceWithNew: (...args: any[]) => Promise<void>;
  setAdditionalControlsOpen: (open: boolean) => void;
  getPath: () => MosaicPath;
}

/*************************************************************
 * PropTypes for React `contextTypes`
 */

export const MosaicActionsPropType = PropTypes.shape({
  expand: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  replaceWith: PropTypes.func.isRequired,
  updateTree: PropTypes.func.isRequired,
  getRoot: PropTypes.func.isRequired,
}).isRequired;

export const MosaicWindowActionsPropType = PropTypes.shape({
  split: PropTypes.func.isRequired,
  replaceWithNew: PropTypes.func.isRequired,
  setAdditionalControlsOpen: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
}).isRequired;

/*************************************************************
 * Bundled PropTypes for convenience
 */

export const MosaicContext = {
  mosaicActions: MosaicActionsPropType,
  mosaicId: PropTypes.string.isRequired,
};

export const MosaicWindowContext = {
  ...MosaicContext,
  mosaicWindowActions: MosaicWindowActionsPropType,
};
