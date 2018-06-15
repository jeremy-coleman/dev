
function newService(CogliteServiceContext) { console.log('new service generator')}

let service = {
    cogUrl: '',
    cogAppId: '',
    cogPassword: '',
    locale: ''
}

export class CogliteServiceContext {
    public endpoint: string;
    public appId: string;
    public appPassword: string;
    public locale: string;
    public cloudHostname: string;
    public localNodePort: string;
    public serviceUrl: string;

    private static _propertySetters: any = 
    {
        'endpoint':         (context: CogliteServiceContext, x: string) => { context.endpoint = x; },
        'appid':            (context: CogliteServiceContext, x: string) => { context.appId = x; },
        'apppassword':      (context: CogliteServiceContext, x: string) => { context.appPassword = x; },
        'locale':           (context: CogliteServiceContext, x: string) => { context.locale = x; },
        'cloudhostname':    (context: CogliteServiceContext, x: string) => { context.cloudHostname = x; },
        'emulatorport':     (context: CogliteServiceContext, x: string) => { context.localNodePort = x; },
        'serviceurl':       (context: CogliteServiceContext, x: string) => { context.serviceUrl = x; }
    };


    public constructor(encodedContext: string) {
        let decodedUri = decodeURIComponent(encodedContext);

        if (decodedUri.startsWith('?')) { decodedUri = decodedUri.substr(1);}

        if (decodedUri.startsWith('coglite://')) {
            decodedUri = decodedUri.substr(14);

            decodedUri.split('&').forEach(p => {
                let pair = p.split('=', 2);
                if (pair && pair.length === 2) {
                    this.setProperty(pair[0], pair[1]);
                }
            });
        }
    }

    // checks if all required properties are set
    public isValid(): boolean {return this.endpoint && this.endpoint.length > 0;}

    public toNewService(): any {return newService({ serviceUrl: this.endpoint, cogAppId: this.appId, cogPassword: this.appPassword });}

    public updateService(thing: any): any {
        return Object.assign({}, service, {
            serviceUrl: this.endpoint, 
            locale: this.locale,
            cogAppId: this.appId,
            cogPassword: this.appPassword });
    }

    public matchesService(thing: any): boolean {
        return CogliteServiceContext.areEqual(this.endpoint, service.cogUrl) &&
        CogliteServiceContext.areEqual(this.appId, service.cogAppId) &&
        CogliteServiceContext.areEqual(this.appPassword, service.cogPassword) &&
        CogliteServiceContext.areEqual(this.locale, service.locale);
    }

    private static areEqual(a: string, b: string): boolean {
        return (!a && !b) || (a && !b && !a.length) || (b && !a && !b.length) || (a && b && a.toLowerCase() === b.toLowerCase());
    }

    private setProperty(property: string, value: string): void {
        let setter = CogliteServiceContext._propertySetters[property.toLowerCase()];
        if (setter) {
            setter(this, value);
        }
    }
}