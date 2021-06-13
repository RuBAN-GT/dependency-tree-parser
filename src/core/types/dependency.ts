export interface Dependency {
  dependencies: Record<string, Dependency>;
  peerDependencies: Record<string, Dependency>;
}
