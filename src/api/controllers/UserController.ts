import {JsonController, Get, Post, Put, Param, Delete, Body, Authorized, CurrentUser} from 'routing-controllers';
import { UserService } from '../services/UserService';
import { User } from '../models/User';
import {HttpCodes, HttpResponse} from '../http';

@Authorized()
@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    public async find( @CurrentUser() user?: User): Promise<HttpResponse> {
        const users = await this.userService.find();
        return new HttpResponse({users});
    }

    @Get('/:id')
    public async one( @Param('id') id: string): Promise<HttpResponse> {
        const user = await this.userService.findOneById(id);
        return new HttpResponse({user});
    }

    @Post()
    public create( @Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    // @HttpCode(HttpCodes.HTTP_NO_CONTENT)
    @Put('/:id')
    public async update( @Param('id') id: string, @Body() user: User): Promise<HttpResponse> {
        const updatedUser = await this.userService.update(id, user);
        return new HttpResponse(updatedUser, HttpCodes.HTTP_NO_CONTENT);
    }

    @Delete('/:id')
    public delete( @Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }
}
