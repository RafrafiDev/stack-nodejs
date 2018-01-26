import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../../models/User';
import { events } from '../../subscribers/events';
import { EventDispatcher, EventDispatcherInterface } from '../../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { HttpException, HttpCodes } from '../../http';
import { Converter } from '../../../helpers/Converter';
import { UserUpdate } from '../../models/UserUpdate';
import { classToPlain } from 'class-transformer';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(filter?: any): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find(filter);
    }

    public findOneBy(filter: any): Promise<User | undefined> {
        this.log.info('Find one user');
        return this.userRepository.findOne(filter);
    }

    public findOneById(id: any): Promise<User | undefined> {
        this.log.info('Find one user');
        return this.userRepository.findOneById(id);
    }


    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        if (await this.userRepository.findByUsername(user.username)) {
            throw new HttpException(HttpCodes.USER_EXISTS);
        }

        const newUser = await this.userRepository.save(user);
        this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public async update(id: any, userUpdate: UserUpdate): Promise<any> {
        this.log.info('Update a user');
        if (!await this.findOneById(id)) {
            throw new HttpException(HttpCodes.USER_NOT_FOUND);
        }

        return this.userRepository.findOneAndUpdate(
            {_id: Converter.toObjectId(id)},
            {$set: classToPlain(userUpdate)}
        );
    }

    public delete(id: any): Promise<any> {
        this.log.info('Delete a user');
        return this.userRepository.findOneAndDelete(
            {_id: Converter.toObjectId(id)}
            );
    }
}
