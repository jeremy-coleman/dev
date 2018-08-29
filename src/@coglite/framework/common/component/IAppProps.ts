import { IRequest } from "../IRequest";
import { IAppHost } from "../IAppHost";

interface IAppProps {
    match: IRequest;
    host?: IAppHost;
}

export { IAppProps }