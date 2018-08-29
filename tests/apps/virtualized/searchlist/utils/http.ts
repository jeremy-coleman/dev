import { provideSingleton } from '../ioc';

@provideSingleton(HTTP)
export class HTTP {
    public GET(resource) {
        return fetch(`/api/${resource}`).then(resp => resp.json());
    }

    // POST, PUT, etc...
}