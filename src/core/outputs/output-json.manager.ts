import { OutputManager } from '../output.manager';
import { Report } from '../types/report';

export class OutputJsonManager implements OutputManager {
  public run(report: Report): void {
    console.log(JSON.stringify(report));
  }
}
