import { OutputManager } from './output.manager';
import { OutputJsonManager } from './outputs/output-json.manager';
import { OutputType } from './types/output-type';

export function outputFactory(type: OutputType): OutputManager {
  switch (type) {
    case OutputType.json:
      return new OutputJsonManager();
    default: {
      throw new Error('Unknown parser type.');
    }
  }
}
