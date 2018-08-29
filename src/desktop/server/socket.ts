
import { Server } from 'rpc-websockets';

export const initiateRpcServer = (port = 9000, host = "localhost") => {
   
  //instantiate Server and start listening for requests
  const server = new Server({port: port,host: host})
  
  // register an RPC method
  server.register('Add', function(params) {
    return parseFloat(params[0]) + parseFloat(params[1])
  })

  server.register('Subtract', function(params) {
    return parseFloat(params[0]) - parseFloat(params[1])
  })

  server.register('Divide', function(params) {
    return parseFloat(params[0]) / parseFloat(params[1])
  })

  server.register('Multiply', function(params) {
    return parseFloat(params[0]) * parseFloat(params[1])
  })
  
  // create an event
  server.event('initialised')
  
  // emit an event to subscribers
  server.emit('initialised')

 // process.on('exit', () => {
 //   server.close()
    //process.exit(0)
  //}
//  )
  
  return server
}


// not using this atm, handling shutdowns through process.exit .. will need better start/stop control not based on app lifecycle later on. same for python server
export const closeRpcServer = (server) => {
    server.close()
}


export const executeRequest = (ws, method, params, callback) => {
  ws.on('open', function() {
    console.log("OK BLOCK!!!")
    const callMethod = ws[method](...params)
    if (callback)
        callMethod.then(callback)
  })
}





// instantiate Client and connect to an RPC server
//const ws = new Client('ws://localhost:8080')

/* ws.on('open', function() {
  // call an RPC method with parameters
  ws.call('sum', [5, 3]).then(function(result) {
    require('assert').equal(result, 8)
  })

  // send a notification to an RPC server
  ws.notify('openedNewsModule')

  // subscribe to receive an event
  ws.subscribe('feedUpdated')

  ws.on('feedUpdated', function() {
    //no-op
  })

  // unsubscribe from an event
  ws.unsubscribe('feedUpdated')

  // close a websocket connection
  ws.close()
}) */