import {JsonController, HttpCode, Get, Post, Put, Param, Delete, Body, Authorized, CurrentUser} from 'routing-controllers';
import { UserService } from '../services/UserService';
import { User } from '../../models/User';
import { HttpCodes, HttpResponse } from '../../http';
import { UserUpdate } from '../../models/UserUpdate';

@Authorized()
@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }


    @Get('/me')
    public async findMe( @CurrentUser() user?: User): Promise<HttpResponse> {
        return new HttpResponse({user});
    }

    @HttpCode(HttpCodes.HTTP_NO_CONTENT)
    @Put('/me')
    public async updateMe( @Body() userUpdate: UserUpdate, @CurrentUser() user: User): Promise<HttpResponse> {
        await this.userService.update(user.id, userUpdate);
        return new HttpResponse(undefined, HttpCodes.HTTP_NO_CONTENT);
    }

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
    public async create( @Body() user: User): Promise<HttpResponse> {
        const newUser = await this.userService.create(user);
        return new HttpResponse({user: newUser});
    }

    @HttpCode(HttpCodes.HTTP_NO_CONTENT)
    @Put('/:id')
    public async update( @Param('id') id: string, @Body() userUpdate: UserUpdate): Promise<HttpResponse> {
        await this.userService.update(id, userUpdate);
        return new HttpResponse(undefined, HttpCodes.HTTP_NO_CONTENT);
    }

    @HttpCode(HttpCodes.HTTP_NO_CONTENT)
    @Delete('/:id')
    public async delete( @Param('id') id: string): Promise<HttpResponse> {
        await this.userService.delete(id);
        return new HttpResponse(undefined, HttpCodes.HTTP_NO_CONTENT);
    }
}
