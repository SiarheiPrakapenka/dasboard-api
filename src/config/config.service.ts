import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { IConfigService } from './config.service.interface';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();

		if (result.error) {
			this.logger.error('[ConfigService] Connot read .env file');
		} else {
			this.logger.log('[ConfigService] Config .env has been loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
