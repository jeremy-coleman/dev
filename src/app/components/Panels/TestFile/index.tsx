import { observer } from 'mobx-react';
import { lighten } from 'polished';
import * as React from 'react';
import styled from 'styled-components';
import It from '../../stores/It';
import Node from '../../stores/Node';
import { Workspace } from '../../stores/Workspace';
import Header from './Header';
import ItBlock from './itBlock';
const { Scrollbars } = require('react-custom-scrollbars');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 !important;
  flex-grow: 1;
  background-color: ${props => lighten(0.1, props.theme.main)} !important;
`;

const Tests = styled.div`
  flex-grow: 1;
  margin-right: 10px;
  margin-left: 10px;
`;

interface TestPanelProps {
  testFile: Node;
  workspace: Workspace;
  onRunTest: (it: It) => void;
  onRunFile: () => void;
  onUpdateSnapshot: (it: It, testFileName: Node) => void;
  launchEditor: (it: It, testFileName: Node) => void;
  debugTest: (it: It, testFileName: Node) => void;
  isDebugging: boolean;
}

function TestFile({
  testFile,
  workspace,
  onRunTest,
  onRunFile,
  onUpdateSnapshot,
  launchEditor,
  debugTest,
  isDebugging
}: TestPanelProps) {
  return (
    <Container className="pt-card pt-dark">
      <Header testFile={testFile} workspace={workspace} onRunFile={onRunFile} />
      <Scrollbars style={{ flexGrow: '1' }}>
        <Tests>
          {testFile &&
            testFile.itBlocks.map((itBlock, i) => (
              <ItBlock
                key={i}
                itBlock={itBlock}
                onRunTest={onRunTest}
                isDebugging={isDebugging}
                onUpdateSnapshot={() => {
                  onUpdateSnapshot(itBlock, testFile);
                }}
                launchInEditor={(it: It) => {
                  launchEditor(it, testFile);
                }}
                debugTest={() => {
                  debugTest(itBlock, testFile);
                }}
              />
            ))}
        </Tests>
      </Scrollbars>
    </Container>
  );
}

export default observer(TestFile);
