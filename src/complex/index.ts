import { isArrayObjectControl, RankedTester, rankWith } from '../lib/core';
import MaterialArrayControlRenderer from './MaterialArrayControlRenderer';


export const materialArrayControlTester: RankedTester = rankWith(3, isArrayObjectControl);
export { MaterialArrayControlRenderer };
