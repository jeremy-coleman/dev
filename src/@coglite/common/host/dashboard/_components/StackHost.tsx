import { defaultTheme as theme } from '@coglite/common/ux';
import * as React from 'react';

import { AppHostContainer } from '../../core';
import { observer } from 'mobx-react';
import { Stack } from './Stack';
import { WindowAppHost, StackModel, WindowModel } from '../models';


let createStack = observer(() =>
 < AppHostContainer host={new WindowAppHost(new WindowModel())}>
 <Stack stack={new StackModel()} />
 </ AppHostContainer>
 )