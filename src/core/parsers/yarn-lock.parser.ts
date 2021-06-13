import * as YAML from 'yaml';
import { readFileSync } from 'fs';
import { pick, mapKeys } from 'lodash';

import { Report } from '../types/report';
import { Parser } from '../parser';
import { nameFormatter } from '../utils/name-formetter';
import { ParserParams } from '../types/parser-params';

type YarnLockTree = Record<string, { dependencies: string[]; peerDependencies: string[] }>;

export class YarnLockParser implements Parser {
  public async parse(params: ParserParams): Promise<Report> {
    const tree = mapKeys(this.getLockTree(params.path), (_value, key) => nameFormatter(key));
    return this.getTree(tree, this.filterTargetDependencies(tree, params.mask), 1, params);
  }

  protected getLockTree(lockPath: string): YarnLockTree {
    return YAML.parse(readFileSync(lockPath, 'utf8'));
  }

  protected filterTargetDependencies(dependencies: YarnLockTree, mask?: string): string[] {
    return Object.keys(dependencies).filter((key) => this.isTargetDependency(key, mask));
  }

  protected isTargetDependency(name: string, mask?: string): boolean {
    return mask ? name.startsWith(mask) : true;
  }

  protected getTree(tree: YarnLockTree, filter: string[] = [], deps = 1, params: ParserParams): Report {
    const { mask, maxDepth = 5 } = params || {};

    if (filter.length === 0 || deps >= maxDepth + 1) {
      return {};
    }

    const targetTree = pick(tree, filter);
    return Object.keys(targetTree).reduce((treeMap: any, key: string) => {
      if (!this.isTargetDependency(key, mask)) {
        return treeMap;
      }

      const { dependencies = {}, peerDependencies = {} } = tree[key];
      treeMap[key] = {
        dependencies: this.getTree(tree, this.filterTargetDependencies(dependencies, mask), deps + 1, params),
        peerDependencies: this.getTree(tree, this.filterTargetDependencies(peerDependencies, mask), deps + 1, params),
      };

      return treeMap;
    }, {});
  }
}
