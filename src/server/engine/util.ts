import { parse as parseJavaScript } from 'jest-editor-support';
import { JestBlock } from './../../types/JestBlock';
const { parse: parseTypeScript } = require('jest-test-typescript-parser');

export async function executeInSequence(
  funcs: Array<{
    fn: () => void;
    delay: number;
  }>
) {
  for (const { fn, delay } of funcs) {
    await setTimeoutPromisify(fn, delay);
  }
}

function setTimeoutPromisify(fn: () => void, delay: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      fn();
      resolve();
    }, delay);
  });
}

export function getTestPatternForPath(filePath: string) {
  let replacePattern = /\//g;

  if (process.platform === 'win32') {
    replacePattern = /\\/g;
  }

  return `^${filePath.replace(replacePattern, '.')}$`;
}

export function getJestBlocks(path: string): JestBlock[] {
  try {
    const parser = getParser(path);
    return parser(path).jestBlockArray;
  } catch (e) {
    return [];
  }
}

function getParser(path: string) {
  const isTypeScript = path.match(/\.tsx?$/);
  return isTypeScript ? parseTypeScript : parseJavaScript;
}
