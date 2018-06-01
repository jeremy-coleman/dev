

export interface Electron {
  protocol: {
    registerBufferProtocol: (scheme: string, handler: (req: Req, callback: (res: ArrayBuffer) => void) => void, errHandler: (err: Error | TypeError | SyntaxError) => void) => void,
    registerStandardSchemes: (scheme: string[]) => void,
  };
}


export interface Req {
  url: string;
  method: string;
}

export interface Route {
  method: string;
  route: string; // Route to server
  handler: (req: Req, res: object) => void;
}

export class Response {
  public callback: (res: ArrayBuffer) => void;
  public contents: ArrayBuffer;
  private encoder: (contents: any) => any;
  constructor(callback: (res: ArrayBuffer) => void, encoder: (contents: any) => any) {
    this.callback = callback;
    this.encoder = encoder;
  }
  public send(text: string) {this.contents = this.encoder(text);}

  public end() {this.callback(this.contents);}

}
