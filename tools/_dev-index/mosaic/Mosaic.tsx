
import * as classNames from 'classnames';
import * as _ from 'lodash';
import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5 from 'react-dnd-html5-backend';
import { v4 as uuid } from 'uuid';
import { MosaicContext, MosaicRootActions } from './contextTypes';
import { MosaicRoot } from './MosaicRoot';
import { MosaicZeroState } from './MosaicZeroState';
import { RootDropTargets } from './RootDropTargets';
import { MosaicKey, MosaicNode, MosaicPath, MosaicUpdate, ResizeOptions, TileRenderer } from './types';
import { createExpandUpdate, createHideUpdate, createRemoveUpdate, updateTree } from './util/mosaicUpdates';
import { getLeaves } from './util/mosaicUtilities';

import styled from 'styled-jss'

const DEFAULT_EXPAND_PERCENTAGE = 70;


let MosaicDropTargetContainer = styled('div')({
  height: "100%",
  width: "100%",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "none",
  })

  let MosaicDropTarget = styled('div')({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: "rgba(0, 0, 0, 0.2)",
    border: "2px solid black",
    opacity: 0,
    zIndex: 5,
    })

  export const MosaicRootElement = styled('div')({
    position: "absolute",
    top: 3,
    right: 3,
    bottom: 3,
    left: 3,
    })

  export const MosaicWindowBody = styled('div')({
      borderTopWidth: 0,
      background: "#f5f8fa",
      borderBottomRightRadius: 3,
      borderBottomLeftRadius: 3,
    })

    export const MosaicWindowPreview = styled('div')({
      position: "relative",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      boxShadow: "0 0 1px rgba(0, 0, 0, 0.2)",
    })

    export const MosaicWindowPreviewToolbar = styled('div')({
      zIndex: 4,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexShrink: 0,
      height: 30,
      background: "white",
      boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
    })

    export const MosaicWindowBodyOverlay = styled('div')({
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0,
      background: "white",
      display: "none",
      zIndex: 2,
    })

   export const MosaicWindowTitle = styled('div')({
      paddingLeft: 15,
      flex: 1,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      minHeight: 18,
    })

    export const MosaicSplitLine = styled('div')({
        boxShadow: "0 0 0 1px #2b95d6",
    })
    

   

export const additionalalToolbarCSS: React.CSSProperties = {height: 30};


export interface MosaicBaseProps<T extends MosaicKey> {
  renderTile: TileRenderer<T>;
  onChange?: (newNode: MosaicNode<T> | null) => void;
  className?: string;
  resize?: ResizeOptions;
  zeroStateView?: JSX.Element;
}

export interface MosaicControlledProps<T extends MosaicKey> extends MosaicBaseProps<T> {
  value: MosaicNode<T> | null;
  onChange: (newNode: MosaicNode<T> | null) => void;
}

export interface MosaicUncontrolledProps<T extends MosaicKey> extends MosaicBaseProps<T> {
  initialValue: MosaicNode<T> | null;
}

export type MosaicProps<T extends MosaicKey> = MosaicControlledProps<T> | MosaicUncontrolledProps<T>;

function isUncontrolled<T extends MosaicKey>(props: MosaicProps<T>): props is MosaicUncontrolledProps<T> {
  return (props as MosaicUncontrolledProps<T>).initialValue != null;
}



export interface MosaicState<T extends MosaicKey> {
  currentNode: MosaicNode<T> | null;
  mosaicId: string;
}

export class MosaicWithoutDragDropContext<T extends MosaicKey = string> extends React.PureComponent<
  MosaicProps<T>,
  MosaicState<T>
> {
  static defaultProps = {
    onChange: () => void 0,
    zeroStateView: <MosaicZeroState />
  };

  static childContextTypes = MosaicContext;

  static ofType<T extends MosaicKey>() {
    return MosaicWithoutDragDropContext as new (props: MosaicProps<T>, context?: any) => MosaicWithoutDragDropContext<T>;
  }

  state: MosaicState<T> = {
    currentNode: null,
    mosaicId: uuid(),
  };

  getChildContext(): MosaicContext<T> {
    return {
      mosaicActions: this.actions,
      mosaicId: this.state.mosaicId,
    };
  }

  render() {
    const { className } = this.props;

    return (
      <div>
      <MosaicDropTargetContainer>
        {this.renderTree()}
        <RootDropTargets />
      </MosaicDropTargetContainer>
      </div>
    );
  }

  componentWillReceiveProps(nextProps: MosaicProps<T>) {
    if (
      isUncontrolled(nextProps) &&
      nextProps.initialValue !== (this.props as MosaicUncontrolledProps<T>).initialValue
    ) {
      this.setState({ currentNode: nextProps.initialValue });
    }
  }

  componentWillMount() {
    if (isUncontrolled(this.props)) {
      this.setState({ currentNode: this.props.initialValue });
    }
  }

  private getRoot(): MosaicNode<T> | null {
    if (isUncontrolled(this.props)) {
      return this.state.currentNode;
    } else {
      return this.props.value;
    }
  }

  private updateRoot = (updates: MosaicUpdate<T>[]) => {
    const currentNode = this.getRoot() || ({} as MosaicNode<T>);

    this.replaceRoot(updateTree(currentNode, updates));
  };

  private replaceRoot = (currentNode: MosaicNode<T> | null) => {
    this.props.onChange!(currentNode);

    if (isUncontrolled(this.props)) {
      this.setState({ currentNode });
    }
  };

  private actions: MosaicRootActions<T> = {
    updateTree: this.updateRoot,
    remove: (path: MosaicPath) => {
      if (path.length === 0) {
        this.replaceRoot(null);
      } else {
        this.updateRoot([createRemoveUpdate(this.getRoot(), path)]);
      }
    },
    expand: (path: MosaicPath, percentage: number = DEFAULT_EXPAND_PERCENTAGE) =>
      this.updateRoot([createExpandUpdate<T>(path, percentage)]),
    getRoot: () => this.getRoot()!,
    hide: (path: MosaicPath) => this.updateRoot([createHideUpdate<T>(path)]),
    replaceWith: (path: MosaicPath, newNode: MosaicNode<T>) =>
      this.updateRoot([
        {
          path,
          spec: {
            $set: newNode,
          },
        },
      ]),
  };

  private renderTree() {
    const root = this.getRoot();
    this.validateTree(root);
    if (root === null || root === undefined) {
      return this.props.zeroStateView!;
    } else {
      const { renderTile, resize } = this.props;
      return <MosaicRoot root={root} renderTile={renderTile} resize={resize} />;
    }
  }

  private validateTree(node: MosaicNode<T> | null) {
    if (process.env.NODE_ENV !== 'production') {
      const duplicates = _.chain(getLeaves(node))
        .countBy()
        .pickBy((n) => n > 1)
        .keys()
        .value();

      if (duplicates.length > 0) {
        throw new Error(
          `Duplicate IDs [${duplicates.join(', ')}] detected. Mosaic does not support leaves with the same ID`,
        );
      }
    }
  }
}

@(DragDropContext(HTML5) as ClassDecorator)
export class Mosaic<T extends MosaicKey = string> extends MosaicWithoutDragDropContext<T> {
  static ofType<T extends MosaicKey>() {
    return Mosaic as new (props: MosaicProps<T>, context?: any) => Mosaic<T>;
  }
}

// Factory that works with generics
export function MosaicFactory<T extends MosaicKey = string>(
  props: MosaicProps<T> & React.Attributes,
  ...children: React.ReactNode[]
) {
  const element: React.ReactElement<MosaicProps<T>> = React.createElement(
    Mosaic as React.ComponentClass<MosaicProps<T>>,
    props,
    ...children,
  );
  return element;
}
