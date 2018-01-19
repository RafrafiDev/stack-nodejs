import { Repository, EntityRepository } from 'typeorm';
import {RefreshToken} from './models/RefreshToken';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken>  {

}
