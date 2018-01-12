import * as express from 'express';
import { Service } from 'typedi';
// import { TokenInfo } from './TokenInfo';
import { Logger, LoggerInterface } from '../decorators/Logger';
import jwt = require('jsonwebtoken');

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) {
    }

    public parseTokenFromRequest(req: express.Request): string | undefined {
        const authorization = req.header('authorization');

        // Retrieve the token form the Authorization header
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            this.log.info('Token provided by the client');
            return authorization.split(' ')[1];
        }

        this.log.info('No Token provided by the client');
        return;
    }

    public getTokenInfo(token: string): any {
        const decoded = jwt.decode(token, { complete: false, json: false });


        return decoded;
    }

}
