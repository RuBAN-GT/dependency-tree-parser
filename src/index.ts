import { Command, flags } from '@oclif/command';
import { parserFactory } from './core/parser.factory';

import { ParserType } from './core/types/parser-type';

class DependencyTreeParser extends Command {
  static description = 'Tool helping to analyze project dependencies using different strategies.';

  static flags = {
    mask: flags.string({ description: 'Filter by this prefix' }),
    maxDepth: flags.integer({ default: 2, description: 'Max depth of dependency tree' }),
    parser: flags.string({ default: 'yarn-lock', required: true }),
    path: flags.string({ description: 'Path to dependencies target', required: true }),
  };

  public async run(): Promise<void> {
    const { flags } = this.parse(DependencyTreeParser);

    const parser = parserFactory(flags.parser as ParserType);
    const report = await parser.parse(flags);

    this.log(JSON.stringify(report))
  }
}

export = DependencyTreeParser;
