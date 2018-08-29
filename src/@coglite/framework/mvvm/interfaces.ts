import * as React from 'react'


export interface IComponentContext {
  resolver: IViewModelResolver
}

export interface IComponentDefinition {
  view: IView<IViewModel>
  displayName?: string
  inputs?: string[]
  outputs?: string[]
}

export interface IComponentProps<TViewModel extends IViewModel>{
  model?: TViewModel
  modelRef?: (model: TViewModel) => void
}

export interface IComponentState {
  model: IViewModel
  shouldDispose: boolean
}

export type IEventListener<TEvent> = (e?: TEvent) => void

export type IEventListenerDisposer = () => void

export interface IEventEmitter<TEvent>{
    emit(e?: TEvent): void
    subscribe(listener: IEventListener<TEvent>): IEventListenerDisposer
    dispose(): void
}

export interface ILinkDisposer{
  (): void
}




/**
 * A View is basically a React component receiving a "model" prop 
 * which is a ViewModel instance.
 * Note that this component will be wrapped in order to create the actual
 * MVVM component.
 */
export interface IViewProps<TViewModel extends IViewModel>{
    model?: TViewModel
}

/**
 * A View is basically a React component receiving a "model" prop 
 * which is a ViewModel instance.
 * Note that this component will be wrapped in order to create the actual
 * MVVM component.
 */
export type IView<TViewModel extends IViewModel> = 
      React.ComponentClass<IViewProps<TViewModel>>
   |  React.StatelessComponent<IViewProps<TViewModel>>
   |  React.SFC<IViewProps<TViewModel>>
   |  React.ReactElement<IViewProps<TViewModel>>



export interface IViewModel extends Object{
      /**
       * Disposes the ViewModel, here you should cleanup listeners.
       * If created internally, any internal reference to the ViewModel
       * will be removed.
       */
      dispose?()
  }

export interface IViewModelResolver {
    (key?: any): IViewModel
}