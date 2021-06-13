import { Command, flags } from '@oclif/command';

import { outputFactory } from './core/output.factory';
import { parserFactory } from './core/parser.factory';
import { OutputType } from './core/types/output-type';
import { ParserType } from './core/types/parser-type';

class DependencyTreeParser extends Command {
  static description = 'Tool helping to analyze project dependencies using different strategies.';

  static flags = {
    combineDependencies: flags.boolean({
      description: 'Should a parser differs peers and general dependencies',
      default: true,
    }),
    mask: flags.string({ description: 'Filter by this prefix' }),
    maxDepth: flags.integer({ default: 2, description: 'Max depth of dependency tree' }),
    output: flags.enum({ default: OutputType.json, required: true, options: Object.keys(ParserType) }),
    parser: flags.enum({ default: ParserType.yarnLock, required: true, options: Object.keys(ParserType) }),
    path: flags.string({ description: 'Path to dependencies target', required: true }),
  };

  public async run(): Promise<void> {
    const { flags } = this.parse(DependencyTreeParser);

    // Parse
    const parser = parserFactory(flags.parser as ParserType);
    const report = await parser.parse(flags);

    // Output
    const outputManager = outputFactory(flags.output as OutputType);
    await outputManager.run(report);
  }
}

export = DependencyTreeParser;
