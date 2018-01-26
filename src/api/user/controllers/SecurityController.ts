import { JsonController, Post, Body } from 'routing-controllers';
import { Credentials } from '../../models/Credentials';
import { AuthService } from '../../auth/services/AuthService';
import { HttpException, HttpCodes, HttpResponse } from '../../http';
import { UserService } from '../services/UserService';
import { User } from '../../models/User';

@JsonController()
export class SecurityController {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @Post('/login')
    public async login(@Body() credentials: Credentials): Promise<HttpResponse> {
        const user = await this.userService.findOneBy({
            username: credentials.username,
            password: credentials.password,
        });

        if (user) {
            return new HttpResponse(await this.authService.generateJwtTokens(user));
        } else {
            throw new HttpException(HttpCodes.INVALID_CREDENTIALS);
        }
    }

    @Post('/refresh')
    public refresh(@Body() body: {refresh_token: string}): Promise<{token: string, refresh_token: string}> {
        return this.authService.refreshToken(body);
    }

    @Post('/register')
    public async register(@Body() user: User): Promise<HttpResponse> {
        const newUser = await this.userService.create(user);
        return new HttpResponse(await this.authService.generateJwtTokens(newUser));
    }
}
