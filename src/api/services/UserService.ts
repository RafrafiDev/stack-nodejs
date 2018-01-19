import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { events } from '../subscribers/events';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import {HttpException, HttpCodes} from '../http';
import * as mongodb from 'mongodb';

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

    public findOneById(id: string): Promise<User | undefined> {
        this.log.info('Find one user');
        return this.userRepository.findOneById(id);
    }

    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        const exists = await this.findOneBy({username: user.username});
        if (!exists) {
            const newUser = await this.userRepository.save(user);
            this.eventDispatcher.dispatch(events.user.created, newUser);
            return newUser;
        }
        throw new HttpException(HttpCodes.USER_EXISTS);
    }

    public update(id: string, user: User): Promise<any> {
        this.log.info('Update a user');
        user.id = new mongodb.ObjectID(id);
        return this.userRepository.save(user);
    }

    public delete(id: string): Promise<void> {
        this.log.info('Delete a user');
        return this.userRepository.removeById(id);
    }
}
