// Fix Compile Error: Cannot find module './*.scss`
// From https://github.com/s-panferov/awesome-typescript-loader/issues/146#issuecomment-248808206

declare module '*.scss' {
  const content: any;
  export = content;
}

declare module '*.css' {
  const content: any;
  export = content;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module '*.png' {
  const content: any;
  export = content;
}

declare module 'font-awesome-webpack' {
  var x: any;
  export = x;
}

declare module 'vega' {
  export function parse(spec: any, config?: any): any;
  export function read(data: any, schema: any, dateParse?: any): any;
  export function loader(options?: any): LoaderInstance;
}

interface LoaderInstance {
  options: any,
  sanitize: any,
  load(uri: string, options?: any): Promise<any>,
  file: any,
  http: any,
}

declare module 'react-modal' {
  const Modal: any;
  export default Modal;
}

declare const Modal: any;

interface CopyToClipboard {
  onCopy?: any;
  text: string;
}

declare module 'react-copy-to-clipboard' {
  const CopyToClipboard: any;
  export = CopyToClipboard;
}

declare module 'rc-slider' {
  export default class Slider extends React.Component<any, {}> { }
  export class Range extends React.Component<any, {}> { }
  export class Handle extends React.Component<any, {}> { }
  export const createSliderWithTooltip: any;
}

declare module 'redux-action-log' {
  export const createActionLog: any
}

declare module 'react-file-download' {
  const fileDownload: any;
  export = fileDownload;
}


declare module 'react-spinners' {
  export const ClipLoader: any;
}


declare module "redux-persist" {
  import { Store, StoreEnhancer } from "redux";

  export interface Storage {
    setItem(key: string, value: any, onComplete?: OnComplete<any>): Promise<any>;
    getItem<Result>(
      key: string,
      onComplete?: OnComplete<Result | string>
    ): Promise<Result | string>;
    removeItem(key: string, onComplete?: OnComplete<any>): Promise<any>;
    getAllKeys?<Result>(
      callback?: (error?: Error, keys?: string[]) => void
    ): Promise<string[]>;
    getAllKeys?<Result>(onComplete?: OnComplete<Result>): Promise<Result>;
    keys?: (...args: any[]) => any;
    [key: string]: any; // In case Storage object has some other (private?) methods and properties.
  }

  export interface PersistorConfig {
    blacklist?: string[];
    whitelist?: string[];
    storage?: Storage;
    transforms?: Array<Transform<any, any>>;
    debounce?: number;
    serialize?: boolean;
    keyPrefix?: string;
  }

  export type TransformIn<State, Raw> = (state: State, key: string) => Raw;

  export type TransformOut<Raw, State> = (raw: Raw, key: string) => State;

  export interface Transform<State, Raw> {
    in: TransformIn<State, Raw>;
    out: TransformOut<Raw, State>;
  }

  export type OnComplete<Result> = (err?: any, result?: Result) => any;

  export interface RehydrateOptions {
    serial?: boolean;
  }

  export interface Persistor {
    purge(keys?: string[]): void;
    rehydrate<State>(incoming: State, options: RehydrateOptions): undefined;
    pause(): void;
    resume(): void;
  }

  export type StateReconciler<PrevState, InboundState, NextState> = (state: PrevState, inboundState: InboundState, reducedState: any, log: boolean) => NextState;

  export interface AutoRehydrateConfig {
    log?: boolean;
    stateReconciler?: StateReconciler<any, any, any>;
  }

  export function autoRehydrate<State>(autoRehydrateConfig?: AutoRehydrateConfig): StoreEnhancer<State>;

  export function createPersistor<State>(store: Store<State>, persistorConfig: PersistorConfig): Persistor;

  export interface TransformConfig {
    whitelist?: string[];
    blacklist?: string[];
  }

  export function createTransform<State, Raw>(transformIn: TransformIn<State, Raw>, transformOut: TransformOut<Raw, State>, config?: TransformConfig): Transform<State, Raw>;

  export function getStoredState<State>(persistorConfig?: PersistorConfig, onComplete?: OnComplete<any>): Promise<State>;

  export function persistStore<State>(store: Store<State>, persistorConfig?: PersistorConfig, onComplete?: OnComplete<any>): Persistor;

  export function purgeStoredState(persistorConfig?: PersistorConfig, keys?: string[]): Promise<any>;

  import * as storages from "redux-persist/storages";
  export { storages };
}

declare module "redux-persist/constants" {
  export const KEY_PREFIX = 'reduxPersist:';
  export const REHYDRATE = 'persist/REHYDRATE';
}

declare module "redux-persist/storages" {
  import { Storage } from "redux-persist";

  export const asyncLocalStorage: Storage;
  export const asyncSessionStorage: Storage;
}




declare module 'mui-icons'

declare module 'mui-icons/cmdi/*'

/**
 * TODO: Add typings and publish to DefinitelyTyped.
 */

 
declare module 'chart.piecelabel.js'

declare module 'mui-icons'

declare module 'mui-icons/cmdi/*'

declare module 'react-autocomplete'

/**
 * Globals
 */

/**
 * `_.chain(..)` gives a value of type `_.LoDashExplicitWrapper`. `chain` is
 * convenient because it lets us defer computations over collections and reap
 * the performance benefits of Lodash's loop fusion.
 *
 * We alias this type to `Lazy` and make it available globally for ease of
 * use and superior readability.
 */
type Lazy<T> = _.LoDashExplicitWrapper<T>

