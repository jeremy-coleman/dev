import { IStores } from '../stores';
import { routes as AboutRoutes } from '../app-routes/about-routes';
import { routes as CurrencyRoutes } from '../app-routes/currency-routes';
import { routes as HomeRoutes } from '../app-routes/home-routes';
import { RouteConfig } from 'yester';
import { links } from './routes-app-links';
import { transition } from './transition-helper';

export type RouteFunc = (stores?: IStores) => RouteConfig;

function notFound(stores?: IStores): RouteConfig {
    return {
        $: '*',
        enter: () => transition(
            { route: '*', stores },
            async (s) => s.router.setStatus(404),
        ),
    };
}

export function Routes(stores?: IStores): RouteConfig[] {
    return [
        ...AboutRoutes(stores),
        ...CurrencyRoutes(stores),
        ...HomeRoutes(stores),
        notFound(stores),
    ];
}

export { links, transition }
