import { observable } from 'mobx';

export class Preference {
  @observable public filePath: string;
  @observable public preferenceModalOpen: boolean;

  constructor() {
    this.fetchPreference();
    this.preferenceModalOpen = false;
  }

  public async fetchPreference() {}

  public setFilePath(path: string) {this.filePath = path}

  public async saveConfig() {}

  public togglePreferenceModal(toggle: boolean) {
    this.preferenceModalOpen = toggle;
  }
}

export default new Preference();
