export function nameFormatter(name: string): string {
  return name.split('@npm')[0];
}
