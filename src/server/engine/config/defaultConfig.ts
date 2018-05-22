const { readConfig } = require('jest-config');
import { JestConfig } from '../../../types/JestConfig';

export default function getConfig(rootPath: string): JestConfig {
  return {
    ...readConfig({}, rootPath).projectConfig,
    jestScript: '/node_modules/jest/bin/jest.js'
  };
}
