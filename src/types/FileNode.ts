import { JestBlock } from './JestBlock';

export interface FileNode {
  label: string;
  children?: FileNode[];
  path: string;
  type: 'file' | 'directory';
  parent?: FileNode;
  jestBlockArray?: JestBlock[];
}
