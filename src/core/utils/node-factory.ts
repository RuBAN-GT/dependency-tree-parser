import { Dependency } from '../types/dependency';

export function nodeFactory(dependency: Dependency, combineDependencies: boolean): Dependency {
  if (!combineDependencies) {
    return dependency;
  }

  const { dependencies = {}, peerDependencies = {} } = dependency;
  return { dependencies: { ...dependencies, ...peerDependencies } };
}
