import { observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';
import { getColorForStatus } from '../../../theme';
import { Status } from '../../../../types/JestRepoter';
import { styledComponentWithProps } from '../../../util/styled';

const StatusIconSpan = styledComponentWithProps<{status: Status }, HTMLDivElement>(styled.span);

const Status = StatusIconSpan`
  margin-right: 5px;
  color: ${props => getColorForStatus(props.status)};
`;

interface StatusIconProps {
  status: Status;
}

function StatusIcon({ status }: StatusIconProps) {
  let icon = 'pt-icon-symbol-circle';

  if (status === 'failed') {
    icon = 'pt-icon-small-cross';
  } else if (status === 'passed') {
    icon = 'pt-icon-small-tick';
  } else if (status === 'pending') {
    icon = 'pt-icon-circle';
  }
  return <Status className={`pt-icon-standard ${icon}`} status={status} />;
}

export default observer(StatusIcon);
