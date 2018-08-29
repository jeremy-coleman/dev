import { Client } from 'rpc-websockets';


export const initiateRpcClient = (port = 9000, host = "localhost") => {
  const webSocketString = `ws://${host}:${port}`
  const ws = new Client(webSocketString)
  return ws
}
