import * as express from 'express';
import {Middleware, ExpressErrorMiddlewareInterface, HttpError} from 'routing-controllers';
import { env } from '../../core/env';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import {HttpException} from '../http';
import * as lodash from 'lodash';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

    public isProduction = env.isProduction;

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public error(error: HttpError|HttpException, req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.status(error.httpCode || 500);

        if (error instanceof HttpException) {
            res.json({
                status: error.status,
                message: error.message,
                data: error.data || [],
            });
        } else {
            let errors = error['errors'] || [];
            if (errors.length > 0) {
                const fromattedErrors: any = {};
                errors.forEach((element) => {
                    // standardise form errors
                    fromattedErrors[lodash.trim(element.property, '_')] = lodash.trim(element.constraints[Object.keys(element.constraints)[0]], '_');
                });
                errors = {errors: fromattedErrors};
            }
            res.json({
                status: 'error',
                message: error.message,
                data: errors,
            });
        }

        if (this.isProduction) {
            this.log.error(error.name, error.message);
        } else {
            this.log.error(error.name, error.stack);
        }

    }

}
