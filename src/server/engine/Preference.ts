const Conf = require('conf');

export class Preference {
  public config: any;
  public NodePath: string = 'ConfigNodePath';

  constructor() {
    this.config = new Conf();
  }

  setNodePath(path: string) {
    this.config.set(this.NodePath, path);
  }

  getNodePath() {
    return this.config.get(this.NodePath);
  }
}
