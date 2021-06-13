import { Parser } from './parser';
import { YarnLockParser } from './parsers/yarn-lock.parser';
import { ParserType } from './types/parser-type';

export function parserFactory(type: ParserType): Parser {
  switch (type) {
    case ParserType.yarnLock:
      return new YarnLockParser();
    default: {
      throw new Error('Unknown parser type.');
    }
  }
}
