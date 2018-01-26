import * as express from 'express';
import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import jwt = require('jsonwebtoken');

import { env } from '../../../core/env';
import { RefreshToken } from '../../models/RefreshToken';
import { User } from '../../models/User';
import { TokenInfo } from '../../models/TokenInfo';
import { RefreshTokenService } from './RefreshTokenService';
import { HttpException } from '../../http';
import { HttpCodes } from '../../http';
import { UserService } from '../../user/services/UserService';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        private refreshTokenService: RefreshTokenService,
        private userService: UserService
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

    public async refreshToken(body: {refresh_token: string}): Promise<{token: string, refresh_token: string}> {
        const refreshToken = await this.refreshTokenService.get(body.refresh_token);

        if (refreshToken) {
            const date = new Date();
            if (refreshToken.isValid()) {
                const user = await this.userService.findOneBy({username: refreshToken.username});
                if (user) {
                    refreshToken.valid = new Date(date.setDate(+env.security.ttlRefresh + date.getDate()));
                    this.refreshTokenService.update(refreshToken.id, refreshToken);

                    return {token: this.signUser(user), refresh_token: refreshToken.token};
                }
                throw new HttpException(HttpCodes.USER_NOT_FOUND);
            }
            throw new HttpException(HttpCodes.REFRESH_TOKEN_EXPIRED);
        }
        throw new HttpException(HttpCodes.INVALID_REFRESH_TOKEN);
    }

    public signUser(user: User): string {
        const ttlToken = env.security.ttlToken + 'd';
        return jwt.sign(
            new TokenInfo(user).toPlainObj(),
            env.security.passPhrase,
            {expiresIn: ttlToken}
        );
    }
    public async generateJwtTokens(user: User): Promise<{token: string, refresh_token: string}> {

        const refreshToken = await this.generateRefreshToken(user);

        return {token: this.signUser(user), refresh_token: refreshToken};
    }

    private async generateRefreshToken(user: User): Promise<string> {
        const refreshToken = new RefreshToken();
        refreshToken.username = user.username;
        const date = new Date();
        refreshToken.valid = new Date(date.setDate(+env.security.ttlRefresh + date.getDate()));

        try {
            do {
                refreshToken.token = '';
            } while (await this.refreshTokenService.get(refreshToken.token));
        } catch (e) {
            this.log.error('Error on generating refresh token');
        }
        return (await this.refreshTokenService.create(refreshToken)).token;
    }
}
