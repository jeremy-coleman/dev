import * as express from 'express';
import * as http from 'http';
import {Engine} from './engine';
import getConfig from './engine/config/craConfig';
import { bootstrap, register } from './portal/PortalServer';
import { JestBlock } from '../types/JestBlock';
import { getConnection } from './relay';
import getRemoteMethods from './remoteMethods';

const app = express();
const server = http.createServer(app);

const engine = new Engine('D:\\sample\\majestic-cra-integration', getConfig());
engine.testFiles.read(engine.root);


server.listen(process.env.PORT || 3005, (err: any) => {
  if (err) {
    console.log(err);
  }
  console.log('🚀 started');
});

bootstrap(server).then(() => {
  register('ui', getRemoteMethods(engine), (remote: any) => {
    engine.watcher.handlers(
      (path: string) => {
        remote.onFileAdd(path, engine.testFiles.read(engine.root));
      },
      (path: string) => {
        remote.onFileDelete(path, engine.testFiles.read(engine.root));
      },
      (path: string, jestBlockArray?: JestBlock[]) => {
        if (jestBlockArray) {
          remote.onFileChange(path, jestBlockArray);
        }
      }
    );
  });
});

getConnection();

process.on('exit', () => {
  console.log('Killing the runner before exit');
  engine.testRunner.kill();
});
