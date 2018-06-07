import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, NgModuleRef, NgZone, Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PromiseDelegate } from './PromiseDelegate';
//import { Widget } from '@phosphor/widgets';

import * as React from 'react';
import * as ReactDOM from 'react-dom'


export class AngularLoader<M> {
  private applicationRef: ApplicationRef;
  private componentFactoryResolver: ComponentFactoryResolver;
  ngZone: NgZone;
  private injector: Injector;

  constructor( ngModuleRef: NgModuleRef<M>) {
    this.injector = ngModuleRef.injector;
    this.applicationRef = this.injector.get(ApplicationRef);
    this.ngZone = this.injector.get(NgZone);
    this.componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
  }

  attachComponent<T>(ngComponent: Type<T>, dom: Element): ComponentRef<T> {
    let componentRef: ComponentRef<T>;
    this.ngZone.run(() => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ngComponent);
      componentRef = componentFactory.create(this.injector, [], dom);
      this.applicationRef.attachView(componentRef.hostView);
    });
    return componentRef;
  }
}





export class AngularWidget<C, M> extends React.Component<any, any> {
  node = document.createElement('div');
  angularLoader: AngularLoader<M>;
  ngZone: NgZone;
  componentRef: ComponentRef<C>;
  componentInstance: C;
  componentReady = new PromiseDelegate<void>();

  constructor(ngComponent: Type<C>, ngModule: Type<M>, props?: any, context?: any) {
    super(props, context);
    platformBrowserDynamic().bootstrapModule(ngModule)
    .then(ngModuleRef => {
      this.angularLoader = new AngularLoader(ngModuleRef);
      this.ngZone = this.angularLoader.ngZone;
      this.componentRef = this.angularLoader.attachComponent(ngComponent, this.node);
      this.componentInstance = this.componentRef.instance;
      this.componentReady.resolve(undefined);
    });
  }

  //@ts-ignore
foundNode = ReactDOM.findDOMNode(this.node)

public dispose(): void {
    this.ngZone.run(() => {
      this.componentRef.destroy();
    })
  }

public componentWillUnmount(): void {
      this.ngZone.run(() => {
      this.componentRef.destroy();
    });
}

render(): React.ReactElement<any> {
  return(
    <div ref={() => this.foundNode}{...this.props}></div>
  )
}
}


