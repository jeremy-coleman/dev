import { JestConfig } from './../../types/JestConfig';
import {Preference} from './Preference';
import {JestRunner} from './JestRunner';
import {TestFiles} from './TestFiles';
import {Watcher} from './Watcher';
import { getTestPatternsMatcher } from './fileMatcher';
const launchEditor = require('react-dev-utils/launchEditor');
const readPkgUp = require('read-pkg-up');

export class Engine {
  root: string;
  testMatcher: (path: string) => boolean;
  testFiles: TestFiles;
  testRunner: JestRunner;
  watcher: Watcher;
  preference: Preference;

  constructor(rootPath: string, config: JestConfig) {
    this.root = rootPath;
    this.testMatcher = getTestPatternsMatcher(rootPath, config);
    this.testFiles = new TestFiles(this);
    this.preference = new Preference();
    this.testRunner = new JestRunner(this, config, this.preference);
    this.watcher = new Watcher(rootPath);
  }

  launchEditor(path: string, lineNo: number) {
    launchEditor(path, lineNo);
  }

  getVersion() {
    return readPkgUp({
      cwd: __dirname
    }).then((result: any) => {
      return result.pkg.version;
    });
  }
}
