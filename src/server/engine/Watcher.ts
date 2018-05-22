import { JestBlock } from './../../types/JestBlock';
import { getJestBlocks } from './util';
const chokidar = require('chokidar');

export class Watcher {
  public watcher: any;
  public onAddHandler: (path: string) => void = () => ({});
  public onDeleteHandler: (path: string) => void = () => ({});
  public onChangeHandler: (
    path: string,
    jestBlockArray?: JestBlock[]
  ) => void = () => ({});

  constructor(root: string) {
    this.watcher = chokidar.watch(root, {
      ignored: /node_modules|\.git/,
      ignoreInitial: true
    });

    this.watcher
      .on('add', this.onAddHandler)
      .on('change', (path: string) => {
        try {
          this.onChangeHandler(path, getJestBlocks(path));
        } catch (e) {
          this.onChangeHandler(path);
        }
      })
      .on('unlink', this.onDeleteHandler);
  }

  public handlers(
    onAdd: (path: string) => void,
    onDelete: (path: string) => void,
    onChange: (path: string, jestBlockArray?: JestBlock[]) => void
  ) {
    this.onChangeHandler = onChange;
    this.onAddHandler = onAdd;
    this.onDeleteHandler = onDelete;
  }
}
