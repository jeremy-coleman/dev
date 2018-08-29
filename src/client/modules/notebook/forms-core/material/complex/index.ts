
import {
  isArrayObjectControl,
  RankedTester,
  rankWith,
} from '../../core';
import MaterialArrayControlRenderer from './MaterialArrayControlRenderer';

export const materialArrayControlTester: RankedTester = rankWith(3, isArrayObjectControl);
export { MaterialArrayControlRenderer };
