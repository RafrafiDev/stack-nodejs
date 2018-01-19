import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { RefreshTokenRepository } from './RefreshTokenRepository';
import { RefreshToken } from './models/RefreshToken';
import { Logger, LoggerInterface } from '../decorators/Logger';
import {ObjectID} from 'typeorm';


@Service()
export class RefreshTokenService {

    constructor(
        @OrmRepository() private refreshTokenRepository: RefreshTokenRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }


    public get(token: string): Promise<RefreshToken | undefined> {
        this.log.info('Find one refreshToken');
        return this.refreshTokenRepository.findOne({token});
    }

    public create(refreshToken: RefreshToken): Promise<RefreshToken> {
        this.log.info('Create a new refreshToken => ', refreshToken.toString());
        return this.refreshTokenRepository.save(refreshToken);
    }

    public update(id: ObjectID, refreshToken: RefreshToken): Promise<RefreshToken> {
        this.log.info('Update a refreshToken');
        refreshToken.id = id;
        return this.refreshTokenRepository.save(refreshToken);
    }
}
