import { Dialog, Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

//import Button from '../button';

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


const DoneButton = styled(Button)`
  min-width: 110px;
`;

const Heading = styled.div`
  font-size: 17px;
  margin-bottom: 20px;
`;

const Label = styled.div`
  margin-bottom: 5px;
`;

const Footer = styled.div`
  margin-top: 50px;
`;

interface PreferenceModalProps {
  preference: Preference;
}

function _PreferenceModal({ preference }: PreferenceModalProps) {
  return (
    <Dialog
      icon="inbox"
      isOpen={preference.preferenceModalOpen}
      title="Dialog header"
      className="pt-dark"
    >
      <div className="pt-dialog-body">
        <Heading>Preference</Heading>
        <Label>Node executable path for majestic to use</Label>
        <div className="pt-input-group">
          <span className="pt-icon pt-icon-cog" />
          <input
            className="pt-input"
            type="input"
            placeholder="Node path"
            dir="auto"
            value={preference.filePath}
            onChange={event => {preference.setFilePath(event.target.value)}}
          />
        </div>
      </div>
      <Footer className="pt-dialog-footer">
        <div className="pt-dialog-footer-actions">
          <DoneButton
            title="Done"
            onClick={() => {
              preference.saveConfig();
              preference.togglePreferenceModal(false);
            }}
          />
        </div>
      </Footer>
    </Dialog>
  );
}

export const PreferenceModal = observer(_PreferenceModal);
