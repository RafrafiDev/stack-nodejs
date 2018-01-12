import { JsonController, Get, Post, Put, Param, Delete, Body, OnUndefined, Authorized, CurrentUser } from 'routing-controllers';
import { UserService } from '../services/UserService';
import { User } from '../models/User';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import {ObjectID} from 'typeorm';


@Authorized()
@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    public find( @CurrentUser() user?: User): Promise<User[]> {
        return this.userService.find();
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    public one( @Param('id') id: ObjectID): Promise<User | undefined> {
        return this.userService.findOne(id);
    }

    @Post()
    public create( @Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Put('/:id')
    public update( @Param('id') id: ObjectID, @Body() user: User): Promise<User> {
        return this.userService.update(id, user);
    }

    @Delete('/:id')
    public delete( @Param('id') id: ObjectID): Promise<void> {
        return this.userService.delete(id);
    }

}