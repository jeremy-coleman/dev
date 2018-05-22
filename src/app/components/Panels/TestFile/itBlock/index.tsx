import { Intent, Tooltip } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';
import It from '../../../stores/It';
import { getColorForStatus } from '../../../theme';
import { Status } from '../../../../types/JestRepoter';
import { styledComponentWithProps } from '../../../util/styled';
import StatusIcon from './ItStatusIcon';
var Convert = require('ansi-to-html');
var convert = new Convert();

const BarDiv = styledComponentWithProps<{status: Status},HTMLDivElement>(styled.span);

const ActionButton = styledComponentWithProps<{status: Status},HTMLDivElement>(styled.button);


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Bar = BarDiv`
  border-top: 2px solid ${props => getColorForStatus(props.status)};
  display: flex;
  background-color: ${props => props.theme.main};
  color: ${props => props.theme.text};
  font-size: 13px;
  font-weight: 600;
  border-radius: 2px;
  margin-bottom: 12px;
  align-items: center;
  height: 35px;
`;

const RightContent = styled.div`
  padding: 5px;
  flex-grow: 1;
`;

const CodePanel = styled.pre`
  color: white !important;
  background-color: ${props => props.theme.main} !important;
  border: 0px !important;
  border-radius: 0px;
  margin-top: -12px;
  white-space: pre-wrap;
  font-size: 14px;
`;

const ExcutingLabel = styled.span`
  color: blue;
  font-weight: 400 !important;
  font-size: 12px;
  color: ${props => props.theme.text};
`;

const TimeTakenLabel = styled.span`
  color: gray;
  font-weight: 400 !important;
  font-size: 12px;
  margin-left: 10px;
`;

const ThemedButton = ActionButton`
  &:before {
    color: ${props => getColorForStatus(props.status)} !important;
  }
`;

interface ItBlockProps {
  itBlock: It;
  onRunTest: (it: It) => void;
  onUpdateSnapshot: () => void;
  launchInEditor: (test: It) => void;
  debugTest: () => void;
  isDebugging: boolean;
}

function ItBlock({
  itBlock,
  onRunTest,
  onUpdateSnapshot,
  launchInEditor,
  debugTest,
  isDebugging
}: ItBlockProps) {
  return (
    <Container>
      <Bar status={itBlock.status}>
        <RightContent>
          <StatusIcon status={itBlock.status} />
          {itBlock.name}
          {itBlock.timeTaken !== undefined && (
            <TimeTakenLabel>{itBlock.timeTaken} ms</TimeTakenLabel>
          )}
        </RightContent>
        {itBlock.executing && <ExcutingLabel>⚡ Executing</ExcutingLabel>}
        {itBlock.updatingSnapshot && (
          <ExcutingLabel>⚡ Updating snapshot</ExcutingLabel>
        )}
        {itBlock.isSnapshotFailure && (
          <Tooltip
            content={'Update snapshot'}
            className={'pt-dark'}
            intent={Intent.PRIMARY}
          >
            <button
              type="button"
              className="pt-button pt-small pt-minimal pt-icon-camera"
              onClick={() => {
                onUpdateSnapshot();
              }}
            />
          </Tooltip>
        )}
        <Tooltip
          content={'Launch editor'}
          className={'pt-dark'}
          intent={Intent.PRIMARY}
        >
          <ThemedButton
            type="button"
            status={itBlock.status}
            className="pt-button pt-small pt-minimal pt-icon-document-open"
            onClick={() => {
              launchInEditor(itBlock);
            }}
          />
        </Tooltip>
        <Tooltip
          content={'Launch a debug session'}
          className={'pt-dark'}
          intent={Intent.PRIMARY}
        >
          <ThemedButton
            type="button"
            className="pt-button pt-small pt-minimal pt-icon-pulse"
            status={itBlock.status}
            onClick={() => {
              debugTest();
            }}
          />
        </Tooltip>
        <Tooltip
          content={'Run test'}
          className={'pt-dark'}
          intent={Intent.PRIMARY}
        >
          <ThemedButton
            type="button"
            className="pt-button pt-small pt-minimal pt-icon-play"
            status={itBlock.status}
            onClick={() => {
              onRunTest(itBlock);
            }}
          />
        </Tooltip>
      </Bar>
      {itBlock.failureMessage && (
        <CodePanel
          dangerouslySetInnerHTML={{
            __html: convert.toHtml(itBlock.failureMessage)
          }}
        />
      )}
    </Container>
  );
}

export default observer(ItBlock);
