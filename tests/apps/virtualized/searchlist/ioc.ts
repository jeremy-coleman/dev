//import "reflect-metadata";
import { Container } from "inversify";
import { makeFluentProvideDecorator} from "inversify-binding-decorators";
import getDecorators from 'inversify-inject-decorators';



export const AppContainer: Container = new Container();

const provide = makeFluentProvideDecorator(AppContainer);

export const provideSingleton = function(identifier: any) {
	return provide(identifier)
		      .inSingletonScope()
		      .done();
};

export const inject = getDecorators(AppContainer).lazyInject;

//import { fluentProvide , buildProviderModule} from "inversify-binding-decorators";
//const makeFluentProvideDecorator = (container: Container) => fluentProvide(container as any);
//AppContainer.load(buildProviderModule());