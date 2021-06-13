import { Report } from './types/report';

export interface OutputManager {
  run(report: Report): Promise<void> | void;
}
