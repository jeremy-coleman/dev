import { ChildProcess, spawn } from 'child_process';
import fetch from 'node-fetch';
import { join } from 'path';
import {Engine} from './engine';
import { JestConfig } from './../../types/JestConfig';
import {Preference} from './Preference';
import { executeInSequence, getTestPatternForPath } from './util';

export class JestRunner {
  private engine: Engine;
  private jestProcess: ChildProcess;
  private config: JestConfig;
  private onDebuggerExit: () => void;
  private inspectProcess: ChildProcess;
  private preference: Preference;

  constructor(engine: Engine, config: JestConfig, preference: Preference) {
    this.engine = engine;
    this.config = config;
    this.preference = preference;
  }

  public start(
    watch: boolean = false,
    testFile: string = '',
    testName: string = ''
  ) {
    const patchJsFile = join(__dirname, './patch.js');
    const repoterPath = join(__dirname, './reporter.js');
    const loggerPath = join(__dirname, './logger.js');
    const NodeExecutable = this.preference.getNodePath()
      ? this.preference.getNodePath()
      : 'node';

    const jestScript = join(this.engine.root, this.config.jestScript);
    this.jestProcess = spawn(
      `${NodeExecutable} -r ${patchJsFile} ${jestScript}`,
      [
        ...(watch ? ['--watchAll'] : []),
        ...(testName
          ? ['--testNamePattern', testName.replace(/\s/g, '.')]
          : []),
        ...(testFile ? [getTestPatternForPath(testFile)] : []),
        ...['--reporters', 'default', repoterPath],
        ...['--setupFiles', loggerPath],
        ...(this.config.args ? this.config.args : [])
      ],
      {
        cwd: this.engine.root,
        shell: true,
        stdio: 'pipe',
        env: this.getEnvironment()
      }
    );

    this.jestProcess.stdout.on('data', (data: string) => {
      console.log(data.toString().trim());
    });

    this.jestProcess.stderr.on('data', (data: string) => {
      console.log(data.toString().trim());
    });

    this.jestProcess.on('close', code => {
      console.log(`child process exited with code ${code}`);
    });

    this.jestProcess.on('exit', code => {
      console.log(`cthis is exit`);
    });
  }

  public updateSnapshot(testFile: string, testName: string) {
    return new Promise(resolve => {
      const patchJsFile = join(__dirname, './patch.js');

      const updateProcess = spawn(
        `node -r ${patchJsFile} ${join(
          this.engine.root,
          this.config.jestScript
        )} `,
        [
          '--updateSnapshot',
          ...(testName
            ? ['--testNamePattern', testName.replace(/\s/g, '.')]
            : []),
          ...(testFile ? [getTestPatternForPath(testFile)] : [])
        ],
        {
          cwd: this.engine.root,
          shell: true,
          stdio: 'pipe',
          env: this.getEnvironment()
        }
      );

      updateProcess.on('close', () => {
        resolve(JSON.stringify({}));
      });
    });
  }

  public startInspect(testFile: string, testName: string) {
    return new Promise(resolve => {
      // kill the existing inspect process
      this.kill(this.inspectProcess);

      const inspectProcess = spawn(
        `node --inspect-brk ${join(this.engine.root, this.config.jestScript)} `,
        [
          ...(testName
            ? ['--testNamePattern', testName.replace(/\s/g, '.')]
            : []),
          ...(testFile ? [getTestPatternForPath(testFile)] : [])
        ],
        {
          cwd: this.engine.root,
          shell: true,
          stdio: 'pipe',
          env: this.getEnvironment()
        }
      );

      inspectProcess.on('close', () => {
        if (this.onDebuggerExit) {
          this.onDebuggerExit();
        }
      });

      this.getDebuggerUrl().then(url => {
        resolve(
          JSON.stringify({
            url
          })
        );
      });
    });
  }

  public registerOnDebuggerExit(callback: () => void) {
    this.onDebuggerExit = callback;
  }

  public kill(processToKill: ChildProcess = this.jestProcess) {
    if (!processToKill) {
      return;
    }

    if (process.platform === 'win32') {
      // Windows doesn't exit the process when it should.
      spawn('taskkill', ['/pid', '' + processToKill.pid, '/T', '/F']);
    } else {
      processToKill.kill();
    }
  }

  public runTestByFileInteractive(testFileName: string) {
    executeInSequence([
      {
        fn: () => this.jestProcess.stdin.write('p'),
        delay: 0
      },
      {
        fn: () =>
          this.jestProcess.stdin.write(getTestPatternForPath(testFileName)),
        delay: 100
      },
      {
        fn: () =>
          this.jestProcess.stdin.write(new Buffer('0d', 'hex').toString()),
        delay: 200
      }
    ]);
  }

  public runTestByTestNameInteractive(testFileName: string, testName: string) {
    executeInSequence([
      {
        fn: () => this.jestProcess.stdin.write('p'),
        delay: 0
      },
      {
        fn: () =>
          this.jestProcess.stdin.write(getTestPatternForPath(testFileName)),
        delay: 100
      },
      {
        fn: () =>
          this.jestProcess.stdin.write(new Buffer('0d', 'hex').toString()),
        delay: 200
      },
      {
        fn: () => this.jestProcess.stdin.write('t'),
        delay: 200
      },
      {
        fn: () => this.jestProcess.stdin.write(testName),
        delay: 500
      },
      {
        fn: () =>
          this.jestProcess.stdin.write(new Buffer('0d', 'hex').toString()),
        delay: 200
      }
    ]);
  }

  private getEnvironment() {
    const env = process.env || {};
    if (this.config.env) {
      for (const [key, value] of Object.entries(this.config.env)) {
        env[key] = value as string;
      }
    }

    return env;
  }

  private getDebuggerUrl() {
    return fetch('http://localhost:9229/json')
      .then((response: any) => {
        return response.json();
      })
      .then((debugInfo: any) => {
        return `chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=localhost:9229/${
          debugInfo[0].id
        }`;
      });
  }
}
