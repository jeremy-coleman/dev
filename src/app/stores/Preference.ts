import { observable } from 'mobx';

export class Preference {
  @observable public nodePath: string;
  @observable public preferenceModalOpen: boolean;

  constructor() {
    this.fetchPreference();
    this.preferenceModalOpen = false;
  }

  public async fetchPreference() {}

  public setNodePath(path: string) {this.nodePath = path}

  public async saveConfig() {}

  public togglePreferenceModal(toggle: boolean) {
    this.preferenceModalOpen = toggle;
  }
}

export default new Preference();
