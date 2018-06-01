import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { ValidatorPipe } from './validator.pipe';


import { config } from 'dotenv';



export async function bootstrap() {
  config();

  const instance = express();
  instance.use(bodyParser.json());
  instance.use(cors());

  const app = await NestFactory.create(ApplicationModule, instance);
  app.useGlobalPipes(new ValidatorPipe());
  await app.listen(3000);

  
}

/*

var io = require("socket.io")(server);
io.set("origins", "*:*");


export default function initializeServer() {
  return getPort({ port: 4000 }).then(port => {
    console.log("Port" + port);
    io.on("connection", function(client) {
      console.log("Client connected...");
      client.emit("connected", {
        port,
        version: app.getVersion()
      });

      relayMessage("change", client);
      relayMessage("update", client);
      relayMessage("initialize", client);
      relayMessage("executeAction", client);
      relayMessage("applySnapshot", client);
      relayMessage("applyPatch", client);
      relayMessage("action", client);
      relayMessage("snapshot", client);
      relayMessage("patch", client);
      relayMessage("observe", client);
      relayMessage("recordingStart", client);
      relayMessage("recordingEnd", client);
      relayMessage("startRecording", client);
      relayMessage("stopRecording", client);
      relayMessage("playRecording", client);
    });

    server.listen(port);

    return port;
  });
}

function relayMessage(name, client) {
  client.on(name, function(data) {
    client.broadcast.emit(name, data);
  });
}

*/





// createMainWindow()
// initStore()
