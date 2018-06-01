
import { Constant, buffer, bufferEncoder } from "./constants";
import { Electron, Req, Route, Response } from "./interfaces";


export class Router {
  
  // Constants
  public static buffer: Constant = buffer;
  
  // Props
  public type: Constant;
  public name: string;

  // Private stuff
  private electron: Electron;
  private encoder: (contents: any) => any;
  private middleware: Array<(req: Req, res: (res: ArrayBuffer) => void) => void>;
  private routes: Route[];

  constructor(electron: Electron, type: Constant, name: string) {
    
    this.electron = electron;
    this.type = type;
    this.name = name;
    this.middleware = [];
    this.routes = [];
    this.electron.protocol.registerStandardSchemes([this.name]); // Load as standard scheme
    // Encoder
    if (this.type === Router.buffer) {
      this.encoder = bufferEncoder.constant;
    }
  }

  public useErrorHandler(handler: (err: Error | TypeError | SyntaxError) => void) {
    this._errHander = handler;
  }
  
  public attach() {
   
    if (this.type === Router.buffer) {
        this.electron.protocol.registerBufferProtocol(this.name, this._handleResponse, this._errHander);
    }
  }

  public use(middleware: (req: Req, res: (res: ArrayBuffer) => void) => void) {
    this.middleware.push(middleware);
  }

  public get(route: string, handler: (req: Req, res: object) => void) {
    this.routes.push({ method: "GET", handler, route });
  }

  public post(route: string, handler: (req: Req, res: object) => void) {
    this.routes.push({ method: "POST", handler, route });
  }

  private _handleResponse(req: Req, callback: (res: ArrayBuffer) => void) {

    this._runMiddleware(req, callback);
    
    const routes = this.routes.filter((route) => route.method === req.method);
   
    const url = req.url.split(`${this.name}://`)[1];
    
    for (let route of routes) {
        if (route.route === url) {
        route.handler(req, new Response(callback, this.encoder));
      }
    }
  }

  private _runMiddleware(req: Req, res: (res: ArrayBuffer) => void) {
    for (let middleware of this.middleware) {
      middleware(req, res);
    }
  }

   private _errHander(err: Error | TypeError | SyntaxError) {
     throw err;
   }
}
