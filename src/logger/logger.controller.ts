// src/logger/logger.controller.ts

import { Controller, Get } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("logger")
@Controller('logger')
export class LoggerController {
  constructor(private readonly logger: LoggerService) { }

  @ApiOperation({ summary: "Tests logger info level" })
  @Get('info')
  getInfoLog() {
    this.logger.log('This is an INFO log message from the LoggerController.', 'LoggerController');
    return 'Logged an INFO message.';
  }

  @ApiOperation({ summary: "Tests logger error level" })
  @Get('error')
  getErrorLog() {
    this.logger.error('This is an ERROR log message from the LoggerController.', null, 'LoggerController');
    return 'Logged an ERROR message.';
  }
}