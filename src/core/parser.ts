import { ParserParams } from './types/parser-params';
import { Report } from './types/report';

export interface Parser {
  parse(params: ParserParams): Promise<Report>;
}
