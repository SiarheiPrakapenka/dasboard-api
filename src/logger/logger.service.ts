import 'reflect-metadata';
import { Logger, ILogObj } from 'tslog';
import { injectable } from 'inversify';
import { ILogger } from './logger.interface';

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger({
      type: "pretty"
    })
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}