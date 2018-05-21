import { basename } from 'path';
import {Engine} from './engine';
import { FileNode } from './../../types/FileNode';
import { getJestBlocks } from './util';
const dirTree = require('directory-tree');

export class TestFiles {
  engine: Engine;
  nodes: Map<string, FileNode>;
  files: FileNode[];

  constructor(engine: Engine) {
    this.engine = engine;
    this.nodes = new Map();
  }

  public read(path: string) {
    this.files = [];
    this.nodes.clear();

    const files = dirTree(path, {
      exclude: /node_modules|\.git/
    });

    this.files = this.transform(files) || [];
    return this.files;
  }

  public transform(node: FileNode, parent?: FileNode) {
    if (!this.files) {
      return;
    }

    const children: FileNode[] = [];
    this.files.forEach(child => {
      const path = child.path;
      let treeNode;

      if (child.type === 'file' && !this.engine.testMatcher(path)) {
        return null;
      }

      if (this.nodes.get(path) && child.type === 'file') {
        treeNode = this.nodes.get(path);
      } else {
        treeNode = this.createFile(path, child);
      }

      if (!treeNode) {
        return null;
      }
      // treeNode.parent = parent;
      if (
        (child.type !== 'file' &&
          treeNode.children &&
          treeNode.children.length > 0) ||
        child.type === 'file'
      ) {
        children.push(treeNode);
      }

      if (child.type === 'file' && !this.nodes.get(path)) {
        this.nodes.set(path, treeNode);
      }
    });

    return children;
  }

  private createFile(path: string, child: FileNode) {
    const node: FileNode = {
      label: basename(path),
      children: [],
      path,
      type: child.type,
      jestBlockArray: child.type === 'file' ? getJestBlocks(path) : []
    };
    this.files = this.transform(child, node);
    return node;
  }
}
