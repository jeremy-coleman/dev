import { action, observable } from 'mobx';

import { RankedTester } from '../testers';


export class RendererStore {
  @observable renderers: { tester: RankedTester, renderer: any }[]

  constructor() {
    this.renderers = []
  }

  @action
  setRenderers = (renderers) => {
    this.renderers = renderers;
  }

  @action
  addRenderer = (tester, renderer) => {
    this.renderers = this.renderers.concat([{ tester, renderer }]);
  }

  @action
  removeRenderer = (tester) => {
    this.renderers = this.renderers.filter(t => t.tester !== tester);
  }
}

const rendererStore = new RendererStore();

export default rendererStore;