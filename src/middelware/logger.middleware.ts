import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from 'src/logger/winston.config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req;
        const { statusCode } = res;

        // Log the request at 'info' level
        logger.info({
            context: 'RouterExplorer',  // This will be the context for all requests
            message: `Mapped {${originalUrl}, ${method}} route`,
        });

        res.on('finish', () => {
            if (statusCode >= 400) {
                // Log errors at the 'error' level
                logger.error({
                    context: 'RouterExplorer',
                    message: `Error in {${originalUrl}, ${method}} route with status ${statusCode}`,
                });
            }
        });

        next();
    }
}
