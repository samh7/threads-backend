// src/logger/winston.config.ts

import * as winston from 'winston';
import 'winston-daily-rotate-file';

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            // Add a timestamp to the console logs
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, context, trace }) => {
                return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
            }),
        ),
    }),

    new winston.transports.DailyRotateFile({
        filename: 'logs/%DATE%-error.log',
        level: "error",
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
        format: winston.format.combine(
            winston.format.timestamp(), // Add a timestamp to file logs
            winston.format.json(),
        ),
    }), ,

    new winston.transports.DailyRotateFile({
        filename: 'logs/%DATE%-combined.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
        format: winston.format.combine(
            winston.format.timestamp(), // Add a timestamp to file logs
            winston.format.json(),
        ),
    }),

];

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),  //
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports,
});